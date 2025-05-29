const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
require('dotenv').config();
const logger = require('../utils/logger');

const commands = [];

// Funkcja do rekurencyjnego ładowania komend
function walkCommands(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkCommands(filePath); // REKURSJA
    } else if (file.endsWith('.js')) {
      try {
        const command = require(filePath);
        if (command.data && command.data.name) {
          commands.push(command.data.toJSON());
          logger.cmd(`Załadowano komendę: ${filePath}`);
        } else {
          logger.warn(`Pominięto ${filePath} – brak eksportu 'data' lub 'name'.`);
        }
      } catch (error) {
        logger.error(`Błąd podczas ładowania komendy ${filePath}: ${error.message}`);
      }
    }
  }
}

// Funkcja do rejestracji komend
async function deployCommands() {
  const commandsPath = path.join(__dirname, '../commands');
  walkCommands(commandsPath);

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    logger.info('Rejestracja komend w API Discorda...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    logger.success('Komendy zarejestrowane pomyślnie!');
  } catch (error) {
    logger.error(`Błąd podczas rejestracji komend: ${error.message}`);
    if (error.response?.data) {
      logger.error(`Szczegóły błędu: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }
}

module.exports = deployCommands;