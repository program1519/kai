//ai 
function ai(client) {
    console.log('ai .js is loaded');
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const config = require('./config.json');
    const genAI = new GoogleGenerativeAI(config.ai); 
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    //here set your channel id for bot reply your message 
    const TARGET_CHANNEL_IDS = ['-', '-', '-'];
    
    
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
       if (!TARGET_CHANNEL_IDS.includes(message.channel.id)) return;
        //you can set rule here 
       const role = "---"; 
        const prompt = `${role}: ${message.content}`;
    
        try {
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
    
            message.channel.send(responseText);
         } catch (error) {
            console.error("fuck you api or something", error);
            message.channel.send("error :( ");
        }
    });
   
  }
  
  module.exports = {
    ai
  };
