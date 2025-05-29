const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('whoami')
    .setDescription('Pokazuje info o tobie (tylko dev)'),
  async execute(interaction) {
    if (interaction.user.id !== '1229658002798149707')
      return interaction.reply({ content: 'Nie twoja komenda, spierdalaj.', ephemeral: true });

    await interaction.reply(`🆔 ID: \`${interaction.user.id}\`\n👤 Użytkownik: \`${interaction.user.tag}\``);
  },
};
