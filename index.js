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
url.url(client);
role.role(client);
command.teto(client);
youtube.youtube(client);
ai.ai(client);
console.log('file is loaded done ! :3');  

client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);
});

client.login(config.token); 

