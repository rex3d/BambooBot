const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('guessnumber')
    .setDescription('Zgadnij liczbę od 1 do 10')
    .addIntegerOption(option =>
      option.setName('number')
        .setDescription('Twoja liczba')
        .setRequired(true)
    ),
  async execute(interaction) {
    const userNumber = interaction.options.getInteger('number');
    const correctNumber = Math.floor(Math.random() * 10) + 1;

    if (userNumber === correctNumber) {
      await interaction.reply(`Gratulacje! Zgadłeś liczbę: ${correctNumber}`);
    } else {
      await interaction.reply(`Niestety, to nie ta liczba. Prawidłowa to: ${correctNumber}`);
    }
  },
};
