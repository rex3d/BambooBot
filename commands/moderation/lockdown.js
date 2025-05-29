const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lockdown')
    .setDescription('Zamyka kanał dla chujów bez uprawnień')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.channel;

    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: false
    });

    await interaction.reply({
      embeds: [{
        title: '🔒 Kanał zablokowany',
        description: `Tylko uprawnieni mogą pisać.`,
        color: 0xff0000
      }]
    });
  }
};
