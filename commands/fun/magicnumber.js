const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('magicnumber')
    .setDescription('Generuje magiczną liczbę'),
  async execute(interaction) {
    const number = Math.floor(Math.random() * 100) + 1;
    await interaction.reply(`Twoja magiczna liczba to: ${number}`);
  },
};
