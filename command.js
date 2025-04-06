//yep
  
  function teto(client) {
    console.log("command.js loaded");

client.on('messageCreate', message => {
    if (message.content.includes(':chickensleep:')) {
      message.channel.send(':rage: ');
    }
  });
  
  client.on('messageCreate', message => {
    if (message.content.includes(':ball_bird_so_zeed:')) {
      message.channel.send(':kissing_heart:');
    }
  });
  
  client.on('messageCreate', message => {
    if (message.content.includes(':yuuri:')) {
      message.channel.send(':D');
    }
  });
  
  
  client.on('messageCreate', message => {
    if (message.content.includes(':teto:')) {
      message.channel.send('teto!');
    }
  });
  
  
  
  function formatUptime(seconds) {
      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor((seconds % (3600 * 24)) / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
    
      return `${d}d ${h}h ${m}m ${s}s`;
    }
    
    client.on('messageCreate', (message) => {  
      if (message.content === '!time') {
          const uptimeInSeconds = process.uptime();
          const formattedUptime = formatUptime(uptimeInSeconds);
          message.channel.send(`Bot run time : ${formattedUptime} :D`);
      }
    });

  }
  
  module.exports = {
    teto
  };
  
  
  