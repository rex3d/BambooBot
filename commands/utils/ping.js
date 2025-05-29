const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Odpowiada pongiem.'),
  async execute(interaction) {
    const ping = Math.round(interaction.client.ws.ping);
    const uptime = Math.floor(interaction.client.uptime / 1000); // in seconds

    function formatUptime(seconds) {
      const d = Math.floor(seconds / (3600*24));
      const h = Math.floor(seconds % (3600*24) / 3600);
      const m = Math.floor(seconds % 3600 / 60);
      const s = Math.floor(seconds % 60);
      return `${d}d ${h}h ${m}m ${s}s`;
    }

    const embed = new EmbedBuilder()
      .setTitle('Informacje o bocie')
      .setColor(0x00FF00)
      .addFields(
      { name: 'Ping', value: `${ping}ms`, inline: true },
      { name: 'Uptime', value: formatUptime(uptime), inline: true },
      { name: 'Serwery', value: `${interaction.client.guilds.cache.size}`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
