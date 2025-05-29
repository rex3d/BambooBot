const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
  const foldersPath = path.join(__dirname, '../commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`${foldersPath}/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`${foldersPath}/${folder}/${file}`);
      client.commands.set(command.data.name, command);
    }
  }
};
