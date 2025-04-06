   //add role to someone who join the server
   function role(client) {
    console.log('role.js is loaded');
  
    client.on("guildMemberAdd", (member) => {
      const guild = member.guild;
      const fanRole = guild.roles.cache.find((role) => role.name === "fan");
      const peopleRole = guild.roles.cache.find((role) => role.name === "People");
    
      if (!fanRole || !peopleRole) {
        console.error("no add Role");
        return;
      }
    
      member.roles.add([fanRole, peopleRole])
        .then(() => console.log(" add role!"))
        .catch((error) => console.error(error));
    });
   
  }
  
  module.exports = {
   role
  };
  