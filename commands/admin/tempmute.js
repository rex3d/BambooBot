const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tempmute')
    .setDescription('Wycisza użytkownika na określony czas.')
    .addUserOption(opt => opt.setName('user').setDescription('Kogo wyciszyć?').setRequired(true))
    .addStringOption(opt => opt.setName('czas').setDescription('Np. 10m, 1h, 1d').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const ms = require('ms');
    const member = interaction.options.getMember('user');
    const czas = interaction.options.getString('czas');
    const muteTime = ms(czas);

    if (!muteTime || muteTime > 2419200000) return interaction.reply('❌ Niepoprawny czas (max 28 dni).');

    await member.timeout(muteTime, `TempMute by ${interaction.user.tag}`);
    await interaction.reply(`🔇 Wyciszono ${member.user.tag} na ${czas}`);
  },
};
