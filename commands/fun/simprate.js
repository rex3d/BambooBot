const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('simprate')
    .setDescription('Sprawdza, jak bardzo ktoś jest "simp"')
    .addUserOption(option =>
      option.setName('użytkownik')
        .setDescription('Użytkownik do oceny')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('użytkownik') || interaction.user;
    const percentage = Math.floor(Math.random() * 101); // Losowy procent od 0 do 100
    await interaction.reply(`💘 ${user.username} jest w ${percentage}% simp!`);
  },
};