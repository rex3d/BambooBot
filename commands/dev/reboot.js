const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reboot')
    .setDescription('Restartuje bota (właściciel only)'),

  async execute(interaction) {
    if (interaction.user.id !== '1229658002798149707') {
      return interaction.reply({ content: 'Nie dla psa, tylko dla właściciela.', ephemeral: true });
    }

    await interaction.reply('🔁 Restartuję się, spierdalaj na chwilę...');
    process.exit(0);
  }
};
