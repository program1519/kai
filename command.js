function teto(client) {
  console.log("command.js loaded");

  function formatUptime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  }

  
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

   
    if (content.startsWith('!status') || content.startsWith('!status')) {
      const uptime = process.uptime(); 
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; 
      const channelCount = client.channels.cache.size;
      const serverCount = client.guilds.cache.size;

      const statusMessage = `node1
time: ${hours}h ${minutes}m ${seconds}s
Memory: ${memoryUsage.toFixed(2)} MB
Server stay: ${serverCount}
Channels Cached: ${channelCount}`;

      return message.channel.send(statusMessage);
    }

    if (content === '!time') {
      const uptimeInSeconds = process.uptime();
      const formattedUptime = formatUptime(uptimeInSeconds);
      return message.channel.send(`move to !status`);
    }
  });
}

module.exports = {
  teto
};
