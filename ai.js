function ai(client) {
    const config = require('./config.json'); 
    console.log('ai.js is loaded');
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(config.ai); 
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const TARGET_CHANNEL_IDS = config.aich;


    const personalityPrompt = "talk like pepole :3";

    const channelHistories = new Map();

    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        if (!TARGET_CHANNEL_IDS.includes(message.channel.id)) return;

        const channelId = message.channel.id;
        const userInput = message.content;

        if (!channelHistories.has(channelId)) {
            channelHistories.set(channelId, [
                { role: "user", parts: [{ text: personalityPrompt }] }
            ]);
        }
        const history = channelHistories.get(channelId);

        history.push({ role: "user", parts: [{ text: userInput }] });

        if (history.length > 20) history.shift(); 

        try {
            const result = await model.generateContent({
                contents: history
            });

            const responseText = result.response.text();

            history.push({ role: "model", parts: [{ text: responseText }] });

            message.channel.send(responseText);
        } catch (error) {
            console.error("API error:", error);
            message.channel.send("error :( ");
        }
    });
}

module.exports = {
    ai
};
