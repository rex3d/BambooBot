const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Wyrzuca użytkownika z serwera.')
    .addUserOption(opt => opt.setName('user').setDescription('Kogo wyrzucić?').setRequired(true))
    .addStringOption(opt => opt.setName('powod').setDescription('Powód'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);
    const reason = interaction.options.getString('powod') || 'Brak powodu';

    await member.kick(reason);
    await interaction.reply(`👢 Wyrzucono ${user.tag} | Powód: ${reason}`);
  },
};
