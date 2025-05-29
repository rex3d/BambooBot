const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banlist')
    .setDescription('Wyświetla listę zbanowanych użytkowników na serwerze.'),

  async execute(interaction) {
    const bans = await interaction.guild.bans.fetch();

    if (bans.size === 0) {
      return interaction.reply('✅ Na serwerze nie ma zbanowanych użytkowników.');
    }

    const banList = bans.map(ban => `🔨 **${ban.user.tag}** (ID: ${ban.user.id}) - Powód: ${ban.reason || 'Brak powodu'}`).join('\n');
    await interaction.reply(`🔨 Lista zbanowanych użytkowników:\n${banList}`);
  },
};