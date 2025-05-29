const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Usuwa wyciszenie użytkownika.')
    .addUserOption(opt => opt.setName('user').setDescription('Kogo odciszyć?').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const member = interaction.options.getMember('user');
    await member.timeout(null);
    await interaction.reply(`🔊 Odciszono ${member.user.tag}`);
  },
};
