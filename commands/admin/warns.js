const { SlashCommandBuilder } = require('discord.js');
const Warn = require('../../models/Warn');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warns')
    .setDescription('Wyświetla ostrzeżenia użytkownika.')
    .addUserOption(opt => opt.setName('user').setDescription('Kogo sprawdzić?').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const data = await Warn.findOne({ guildId: interaction.guild.id, userId: user.id });

    if (!data || data.warnings.length === 0) {
      return interaction.reply(`✅ ${user.tag} nie ma żadnych ostrzeżeń.`);
    }

    const warnsList = data.warnings.map((w, i) => `
      **#${i + 1}**
      Moderator: <@${w.moderatorId}>
      Powód: ${w.reason}
      Data: <t:${Math.floor(w.date.getTime() / 1000)}:F>
    `).join('\n');

    await interaction.reply({ content: `⚠️ Ostrzeżenia dla **${user.tag}**:\n${warnsList}` });
  },
};
