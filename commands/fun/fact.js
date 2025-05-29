const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fact')
    .setDescription('Wyświetla losowy fakt'),
  async execute(interaction) {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();

      const embed = new EmbedBuilder()
        .setColor(0x00bfff)
        .setTitle('📚 Losowy Fakt')
        .setDescription(data.text)
        .setFooter({ text: 'Źródło: uselessfacts.jsph.pl' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('Nie udało się pobrać faktu. Spróbuj ponownie później.');
    }
  },
};