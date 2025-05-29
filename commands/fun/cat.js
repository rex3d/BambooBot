const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Wyświetla losowe zdjęcie kota'),
  async execute(interaction) {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      const catImage = data[0].url;

      const embed = new EmbedBuilder()
        .setTitle('Oto Twój kotek! 🐱')
        .setImage(catImage)
        .setColor(0xFFC0CB)
        .setFooter({ text: 'Źródło: thecatapi.com' });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('Nie udało się pobrać zdjęcia kota. Spróbuj ponownie później.');
    }
  },
};