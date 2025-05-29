const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Bot powtarza twoją wiadomość.')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('Co mam powiedzieć?')
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString('text');
    await interaction.reply({ content: message, ephemeral: false });
  },
};
