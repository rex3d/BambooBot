const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mock')
    .setDescription('Konwertuje tekst na styl "mocking SpongeBob"')
    .addStringOption(option =>
      option.setName('tekst')
        .setDescription('Tekst do konwersji')
        .setRequired(true)),
  async execute(interaction) {
    const text = interaction.options.getString('tekst');
    const mockedText = text
      .split('')
      .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join('');
    await interaction.reply(mockedText);
  },
};