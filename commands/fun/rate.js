const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rate')
    .setDescription('Ocenia podany temat')
    .addStringOption(option =>
      option.setName('temat')
        .setDescription('Temat do oceny')
        .setRequired(true)),
  async execute(interaction) {
    const topic = interaction.options.getString('temat');
    const rating = Math.floor(Math.random() * 11); // Ocena od 0 do 10
    await interaction.reply(`💯 Oceniam "${topic}" na ${rating}/10!`);
  },
};