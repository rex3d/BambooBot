const { SlashCommandBuilder } = require('discord.js');
const Warn = require('../../models/Warn');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn_clean')
    .setDescription('Usuwa wszystkie ostrzeżenia użytkownika.')
    .addUserOption(opt => opt.setName('user').setDescription('Kogo ostrzeżenia usunąć?').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const data = await Warn.findOne({ guildId: interaction.guild.id, userId: user.id });

    if (!data || data.warnings.length === 0) {
      return interaction.reply(`✅ ${user.tag} nie ma żadnych ostrzeżeń do usunięcia.`);
    }

    await Warn.deleteOne({ guildId: interaction.guild.id, userId: user.id });
    await interaction.reply(`🗑️ Wszystkie ostrzeżenia dla **${user.tag}** zostały usunięte.`);
  },
};