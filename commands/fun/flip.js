const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Rzuca monetą i zwraca wynik'),
  async execute(interaction) {
    const result = Math.random() < 0.5 ? 'Orzeł 🦅' : 'Reszka 🪙';
    await interaction.reply(`🪙 Wynik rzutu: ${result}`);
  },
};