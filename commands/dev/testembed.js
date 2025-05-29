const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('testembed')
    .setDescription('Wysyła przykładowy embed (tylko dev)'),
  async execute(interaction) {
    if (interaction.user.id !== '1229658002798149707')
      return interaction.reply({ content: 'To nie twoje zabawki.', ephemeral: true });

    await interaction.reply({
      embeds: [{
        title: '🔧 Testowy embed',
        description: 'Wygląda jak działa!',
        color: 0x00ff00
      }]
    });
  },
};