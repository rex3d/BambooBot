const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fight')
    .setDescription('Rozpoczyna walkę między dwoma użytkownikami')
    .addUserOption(option =>
      option.setName('przeciwnik')
        .setDescription('Wybierz przeciwnika')
        .setRequired(true)),
  async execute(interaction) {
    const user1 = interaction.user;
    const user2 = interaction.options.getUser('przeciwnik');
    const winner = Math.random() < 0.5 ? user1.username : user2.username;

    await interaction.reply(`🥊 ${user1.username} walczy z ${user2.username}...`);
    setTimeout(() => {
      interaction.followUp(`🏆 Zwycięzca: **${winner}**!`);
    }, 2000); // Dodanie opóźnienia dla efektu dramatycznego
  },
};