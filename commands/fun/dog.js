const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Wyświetla losowe zdjęcie psa'),
  async execute(interaction) {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();

      const embed = new EmbedBuilder()
        .setTitle('Oto Twój piesek! 🐶')
        .setImage(data.message)
        .setColor(0xFFC300)
        .setFooter({ text: 'Źródło: dog.ceo' });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('Nie udało się pobrać zdjęcia psa. Spróbuj ponownie później.');
    }
  },
};