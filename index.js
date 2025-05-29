const { Client, Collection, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const config = require('./config/config');
const logger = require('./utils/logger');
const deployCommands = require('./deploy/deploy'); // Import deploy script

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

client.commands = new Collection();

// Ładowanie komend
const loadCommands = require('./utils/loadCommands');
loadCommands(client);
logger.success('Komendy zostały załadowane.');

// Rejestracja komend
(async () => {
  logger.cmd('Rejestruję komendy...');
  await deployCommands();
})();

// Eventy
fs.readdirSync('./events').forEach(dir => {
  const events = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));
  for (const file of events) {
    const event = require(`./events/${dir}/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, (...args) => event(client, ...args));
  }
});
logger.success('Eventy zostały załadowane.');

// MongoDB
mongoose.connect(config.mongoURI)
    .then(() => {
        logger.success('Połączono z MongoDB!');
    })
    .catch(err => {
        logger.error('MongoDB ERROR:', err);
    });

client.login(config.token);