const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banuje użytkownika na serwerze.')
    .addUserOption(opt => opt.setName('user').setDescription('Kogo zbanować?').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Powód bana').setRequired(false)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Brak powodu';

    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return interaction.reply(`❌ Nie znaleziono użytkownika **${user.tag}** na serwerze.`);
    }

    if (!member.bannable) {
      return interaction.reply(`❌ Nie mogę zbanować użytkownika **${user.tag}**. Sprawdź moje uprawnienia.`);
    }

    await member.ban({ reason });
    await interaction.reply(`🔨 Użytkownik **${user.tag}** został zbanowany.\nPowód: ${reason}`);
  },
};