const { SlashCommandBuilder } = require('discord.js');
const Warn = require('../../models/Warn');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn_remove')
    .setDescription('Usuwa konkretne ostrzeżenie użytkownika.')
    .addUserOption(opt => opt.setName('user').setDescription('Kogo ostrzeżenie usunąć?').setRequired(true))
    .addIntegerOption(opt => opt.setName('index').setDescription('Numer ostrzeżenia do usunięcia (np. 1)').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const index = interaction.options.getInteger('index') - 1;

    const data = await Warn.findOne({ guildId: interaction.guild.id, userId: user.id });

    if (!data || data.warnings.length === 0) {
      return interaction.reply(`✅ ${user.tag} nie ma żadnych ostrzeżeń.`);
    }

    if (index < 0 || index >= data.warnings.length) {
      return interaction.reply(`❌ Nieprawidłowy numer ostrzeżenia. Użytkownik ma ${data.warnings.length} ostrzeżeń.`);
    }

    const removedWarn = data.warnings.splice(index, 1);
    await data.save();

    await interaction.reply(`🗑️ Usunięto ostrzeżenie #${index + 1} dla **${user.tag}**:\nPowód: ${removedWarn[0].reason}`);
  },
};