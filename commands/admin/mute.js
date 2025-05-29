const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Wycisza użytkownika.')
    .addUserOption(opt => opt.setName('target').setDescription('Kogo uciszyć?').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

  async execute(interaction) {
    const member = interaction.options.getMember('target');
    const muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');

    if (!muteRole) return interaction.reply('❌ Nie ma roli `Muted`.');
    if (!member.manageable) return interaction.reply('❌ Nie mogę wyciszyć tego użytkownika.');

    await member.roles.add(muteRole);
    await interaction.reply(`🔇 Użytkownik ${member.user.tag} został wyciszony.`);
  },
};
