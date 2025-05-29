const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Warn = require('../../models/Warn');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Nadaje ostrzeżenie użytkownikowi.')
    .addUserOption(opt => opt.setName('user').setDescription('Kogo ostrzec?').setRequired(true))
    .addStringOption(opt => opt.setName('powod').setDescription('Powód').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('powod');

    let data = await Warn.findOne({ guildId: interaction.guild.id, userId: user.id });
    if (!data) data = new Warn({ guildId: interaction.guild.id, userId: user.id, warnings: [] });

    data.warnings.push({ moderatorId: interaction.user.id, reason });
    await data.save();

    await interaction.reply(`⚠️ Ostrzeżenie dla **${user.tag}**: ${reason}\nData: <t:${Math.floor(Date.now() / 1000)}:F>`);
  },
};