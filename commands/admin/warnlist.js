const { SlashCommandBuilder } = require('discord.js');
const Warn = require('../../models/Warn');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn_list')
    .setDescription('Wyświetla wszystkie ostrzeżenia na serwerze.'),

  async execute(interaction) {
    const warns = await Warn.find({ guildId: interaction.guild.id });

    if (!warns || warns.length === 0) {
      return interaction.reply('✅ Na serwerze nie ma żadnych ostrzeżeń.');
    }

    const warnDetails = warns.map(warn => {
      const userWarns = warn.warnings.map((w, i) => `
        **#${i + 1}**
        Użytkownik: <@${warn.userId}>
        Moderator: <@${w.moderatorId}>
        Powód: ${w.reason}
        Data: <t:${Math.floor(w.date.getTime() / 1000)}:F>
      `).join('\n');
      return userWarns;
    }).join('\n\n');

    await interaction.reply({ content: `⚠️ Ostrzeżenia na serwerze:\n${warnDetails}`, ephemeral: true });
  },
};