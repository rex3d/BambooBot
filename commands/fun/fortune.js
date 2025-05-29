const { SlashCommandBuilder } = require('discord.js');

const fortunes = [
  'Dziś spotka cię coś niespodziewanego.',
  'Szczęście uśmiechnie się do ciebie.',
  'Unikaj podejmowania ważnych decyzji.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fortune')
    .setDescription('Wyświetla losową wróżbę'),
  async execute(interaction) {
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    await interaction.reply(fortune);
  },
};
