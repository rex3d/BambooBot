const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('randomcolor')
    .setDescription('Generuje losowy kolor'),
  async execute(interaction) {
    const randomColor = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase();
    const embed = new EmbedBuilder()
      .setTitle('🎨 Twój losowy kolor')
      .setDescription(`#${randomColor}`)
      .setColor(`#${randomColor}`)
      .setThumbnail(`https://singlecolorimage.com/get/${randomColor}/100x100`)
      .setFooter({ text: 'Użyj tego koloru gdzie chcesz!' });

    await interaction.reply({ embeds: [embed] });
  },
};