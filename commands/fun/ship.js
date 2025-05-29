const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Sprawdza dopasowanie między dwoma użytkownikami')
    .addUserOption(option =>
      option.setName('osoba1')
        .setDescription('Pierwsza osoba')
        .setRequired(true))
    .addUserOption(option =>
      option.setName('osoba2')
        .setDescription('Druga osoba')
        .setRequired(true)),
  async execute(interaction) {
    const user1 = interaction.options.getUser('osoba1');
    const user2 = interaction.options.getUser('osoba2');
    const compatibility = Math.floor(Math.random() * 101); // Losowy procent od 0 do 100

    await interaction.reply(`❤️ Dopasowanie między ${user1.username} a ${user2.username}: **${compatibility}%**!`);
  },
};