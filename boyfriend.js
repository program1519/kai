function boyfriend(client) {
  console.log('is loaded');
  const userId = '560019076169203712'; 

  cron.schedule('00 00 * * *', async () => {
    try {
        const user = await client.users.fetch(userId); 
        if (user) {
            await user.send('i love you owo ');
            console.log('i love you :<  is sent ');
        } else {
            console.error('User not found.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
  }, {
    timezone: "Asia/Bangkok"
  });
  
 
}

module.exports = {
  boyfriend
};