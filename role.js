   //add role to someone who join the server
   function role(client) {
    console.log('role.js is loaded');
  
    client.on("guildMemberAdd", (member) => {
      const guild = member.guild;
       //set "name" role to auto add
      const Role = guild.roles.cache.find((role) => role.name === "name");
      const Role1 = guild.roles.cache.find((role) => role.name === "name");
    
      if (!Role || !Role1) {
        console.error("no add Role");
        return;
      }
    
      member.roles.add([Role,Role1])
        .then(() => console.log("add role!"))
        .catch((error) => console.error(error));
    });
   
  }
  
  module.exports = {
   role
  };
  
