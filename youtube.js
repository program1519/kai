// Description: This script checks for new videos on a specified YouTube channel and sends a notification to a Discord channel when a new video is uploaded. It uses the Google APIs client library for Node.js to interact with the YouTube Data API and the Discord.js library to send messages to Discord.
// It checks for new videos every 30 seconds and sends a message to the specified Discord channel with the video title and link if a new video is found. The script also handles errors that may occur during the API requests or message sending process.
function youtube(client) {
  console.log('youtube.js is loaded');
  const config = require('./config.json');
  const { google } = require('googleapis');

  const youtube = google.youtube({
    version: 'v3',
    auth: config.youtube_api_key
  });

  const channelId = config.youtube_channel_id;
  const discordChannelId = config.discordyoutubeChannelId;

  let lastVideoId = null;

  const checkLatestVideo = async () => {
    try {
      const response = await youtube.channels.list({
        part: 'contentDetails',
        id: channelId
      });

      const uploadsPlaylistId = response.data.items[0].contentDetails.relatedPlaylists.uploads;
      const playlistResponse = await youtube.playlistItems.list({
        part: 'snippet',
        playlistId: uploadsPlaylistId,
        maxResults: 1
      });

      const latestSnippet = playlistResponse.data.items[0].snippet;
      const videoId = latestSnippet.resourceId.videoId;
      const videoTitle = latestSnippet.title;
      const videoPublishedAt = new Date(latestSnippet.publishedAt);
      const timeDifference = (new Date() - videoPublishedAt) / (1000 * 60); 

      if (timeDifference > 60 || lastVideoId === videoId) {
        return null;
      }

      const videoDetails = await youtube.videos.list({
        part: 'snippet,liveStreamingDetails',
        id: videoId
      });

      const videoType = videoDetails.data.items[0].snippet.liveBroadcastContent || 'none';

      lastVideoId = videoId;

      return {
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        videoTitle,
        videoPublishedAt,
        videoType
      };
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      return null;
    }
  };

  const sendDiscordNotification = async () => {
    const latestVideo = await checkLatestVideo();
    if (latestVideo) {
      try {
        const channel = await client.channels.fetch(discordChannelId);

        let typeLabel = 'New Video!';
        if (latestVideo.videoType === 'live') {
          typeLabel = 'LIVE Now!';
        } else if (latestVideo.videoType === 'upcoming') {
          typeLabel = 'Upcoming Live Stream!';
        }

        await channel.send(`${typeLabel}\n**${latestVideo.videoTitle}**\n▶️ Watch: ${latestVideo.videoUrl}`);
      } catch (error) {
        console.error('Error sending message to Discord:', error);
      }
    }
  };

  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(sendDiscordNotification, 30000); 
  });
}

module.exports = {
  youtube
};
