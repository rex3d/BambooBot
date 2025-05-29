const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Usuwa wiadomości z kanału.')
    .addIntegerOption(opt => opt.setName('ilosc').setDescription('Ile wiadomości usunąć? (max 100)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const ilosc = interaction.options.getInteger('ilosc');
    if (ilosc > 100 || ilosc < 1) return interaction.reply('❌ Podaj liczbę od 1 do 100.');

    await interaction.channel.bulkDelete(ilosc, true);
    await interaction.reply({ content: `🧹 Usunięto ${ilosc} wiadomości.`, ephemeral: true });
  },
};
