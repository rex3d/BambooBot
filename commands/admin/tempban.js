const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tempban')
    .setDescription('Tymczasowo banuje użytkownika na serwerze.')
    .addUserOption(opt => opt.setName('user').setDescription('Kogo zbanować?').setRequired(true))
    .addIntegerOption(opt => opt.setName('duration').setDescription('Czas bana w minutach').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Powód bana').setRequired(false)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'Brak powodu';

    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return interaction.reply(`❌ Nie znaleziono użytkownika **${user.tag}** na serwerze.`);
    }

    if (!member.bannable) {
      return interaction.reply(`❌ Nie mogę zbanować użytkownika **${user.tag}**. Sprawdź moje uprawnienia.`);
    }

    await member.ban({ reason });
    await interaction.reply(`🔨 Użytkownik **${user.tag}** został zbanowany na ${duration} minut.\nPowód: ${reason}`);

    setTimeout(async () => {
      try {
        await interaction.guild.members.unban(user.id);
        console.log(`✅ Użytkownik **${user.tag}** został odbanowany po ${duration} minutach.`);
      } catch (error) {
        console.error(`❌ Nie udało się odbanować użytkownika **${user.tag}**:`, error);
      }
    }, duration * 60 * 1000);
  },
};