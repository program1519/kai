//ai 
function ai(client) {
    console.log('ai .js is loaded');
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const config = require('./config.json');
    const genAI = new GoogleGenerativeAI(config.ai); 
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const TARGET_CHANNEL_IDS = ['1306281117254422629', '1342165246244032512', '1003260873785225289'];
    
    
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
       if (!TARGET_CHANNEL_IDS.includes(message.channel.id)) return;
       const role = "your attributes Kindness Compassionate Respectful Patient Open-minded Understanding Empathetic Trustworthy Intelligent Resourceful Adaptable Positive Fun-loving Reliable  You're sweet, talkative, and always ready to offer a warm hug and gentle words of support. :3(no long text)"; 
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