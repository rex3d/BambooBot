const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shutdown')
    .setDescription('Wyłącza bota (tylko dev)'),
  async execute(interaction) {
    if (interaction.user.id !== '1229658002798149707')
      return interaction.reply({ content: 'Nawet nie próbuj.', ephemeral: true });

    await interaction.reply('💀 Bot wyłączany...');
    process.exit(0);
  },
};