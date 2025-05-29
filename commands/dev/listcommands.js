const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listcommands')
    .setDescription('Lista komend bota (tylko dev)'),
  async execute(interaction) {
    if (interaction.user.id !== '1229658002798149707')
      return interaction.reply({ content: 'Co ty odpierdalasz?', ephemeral: true });

    const commands = interaction.client.commands.map(cmd => cmd.data.name).join(', ');
    await interaction.reply(`🧾 Dostępne komendy: ${commands}`);
  },
};