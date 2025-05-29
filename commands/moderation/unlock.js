const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Odblokowuje kanał')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.channel;

    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: true
    });

    await interaction.reply({
      embeds: [{
        title: '🔓 Kanał odblokowany',
        description: `Wszyscy mogą znowu pisać.`,
        color: 0x00ff00
      }]
    });
  }
};
