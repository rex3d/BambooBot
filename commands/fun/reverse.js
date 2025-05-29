const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reverse')
    .setDescription('Odwraca podany tekst')
    .addStringOption(option =>
      option.setName('tekst')
        .setDescription('Tekst do odwrócenia')
        .setRequired(true)),
  async execute(interaction) {
    const text = interaction.options.getString('tekst');
    const reversedText = text.split('').reverse().join('');
    await interaction.reply(`🔄 Odwrócony tekst: ${reversedText}`);
  },
};