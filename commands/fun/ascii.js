const { SlashCommandBuilder } = require('discord.js');
const figlet = require('figlet');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ascii')
    .setDescription('Konwertuje tekst na styl ASCII')
    .addStringOption(option =>
      option.setName('tekst')
        .setDescription('Tekst do konwersji')
        .setRequired(true)),
  async execute(interaction) {
    const text = interaction.options.getString('tekst');
    if (text.length > 20) {
      return interaction.reply('❌ Tekst jest za długi! Maksymalna długość to 20 znaków.');
    }

    figlet(text, (err, result) => {
      if (err) {
        console.error(err);
        return interaction.reply('❌ Wystąpił błąd podczas generowania ASCII.');
      }
      interaction.reply(`\`\`\`\n${result}\n\`\`\``);
    });
  },
};