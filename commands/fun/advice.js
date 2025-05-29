const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('advice')
    .setDescription('Wyświetla losową poradę'),
  async execute(interaction) {
    try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();

      const embed = new EmbedBuilder()
        .setColor(0x00bfae)
        .setTitle('💡 Porada dnia')
        .setDescription(`"${data.slip.advice}"`)
        .setFooter({ text: 'Źródło: adviceslip.com', iconURL: 'https://api.adviceslip.com/favicon.ico' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Nie udało się pobrać porady. Spróbuj ponownie później.',
        ephemeral: true
      });
    }
  },
};