function url(client) {
    const config = require('./config.json'); 
    console.log('url.js is loaded');
const containsURL = (text) => /(https?:\/\/[^\s]+)/.test(text);


const handleURLMessage = (message) => {
  const restrictedChannels = (config.restrictedChannels_alink);

  if (restrictedChannels.includes(message.channel.id) && containsURL(message.content)) {
    const member = message.guild.members.cache.get(message.author.id);
    const allowedRoles = ["OWNER", "CO-OWNER", "MODERATOR", "YOUTUBERS"];
    
    if (!member.roles.cache.some((role) => allowedRoles.includes(role.name))) {
      message.author.send("ขออภัย ไม่อนุญาตให้ส่ง URL ในช่องนี้");
      message.delete().catch(console.error);
      
      const logChannel = message.guild.channels.cache.get(confixig.logChannelId); 
      if (logChannel) {
        logChannel.send(`Deleted message: "${message.content}" by ${message.author.tag}`);
      }
    }
  }
};


client.on("messageUpdate", (oldMessage, newMessage) => {
  handleURLMessage(newMessage);
});


client.on("messageCreate", (message) => {
  if (!message.author.bot) {
    handleURLMessage(message);
  }
});
   
  }
  
  module.exports = {
    url
  };
  
