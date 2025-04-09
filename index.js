const { Client, GatewayIntentBits } = require('discord.js');
const express = require("express");
const cron = require('node-cron');
const axios = require("axios");
const fs = require('fs');
const config = require('./config.json'); 
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ]
});

const command = require('./command.js');
const role = require('./role.js');
const url = require('./url.js');
const youtube = require('./youtube.js');
const ai = require('./ai.js');
// You can remove any of these lines if you don't need them
url.url(client);        // Channel ID deleted messages when this channel have a link (from url.js)
role.role(client);      // Automatically assigns a role when someone joins the server (from role.js)
command.teto(client);   // bot commands (from command.js)
youtube.youtube(client); // Sends new YouTube videos to a Discord channel (from youtube.js)
ai.ai(client);          // AI responds a messages (from ai.js)
//yeeeeeeeeeeeeeeeeeeeee
console.log('file is loaded done ! :3');  

client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);
});

client.login(config.token); 

