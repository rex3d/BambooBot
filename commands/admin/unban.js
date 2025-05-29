const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Odbanowuje użytkownika na serwerze.')
    .addStringOption(opt => opt.setName('userid').setDescription('ID użytkownika do odbanowania').setRequired(true)),

  async execute(interaction) {
    const userId = interaction.options.getString('userid');

    try {
      await interaction.guild.members.unban(userId);
      await interaction.reply(`✅ Użytkownik o ID **${userId}** został odbanowany.`);
    } catch (error) {
      await interaction.reply(`❌ Nie udało się odbanować użytkownika o ID **${userId}**. Sprawdź, czy ID jest poprawne.`);
    }
  },
};