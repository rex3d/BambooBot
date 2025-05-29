// filepath: c:\Users\mikol\Desktop\bambooBot\commands\fun\meme.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Wyświetla losowy mem'),
  async execute(interaction) {
    try {
      // Odpowiedz wstępnie, aby uniknąć błędu "Unknown interaction"
      await interaction.deferReply();

      // Pobierz dane z API
      const response = await fetch('https://meme-api.com/gimme');
      const data = await response.json();

      // Wyślij odpowiedź z memem
      await interaction.editReply({ content: data.title, files: [data.url] });
    } catch (error) {
      console.error(error);

      // Wyślij wiadomość o błędzie
      await interaction.editReply('Nie udało się pobrać mema. Spróbuj ponownie później.');
    }
  },
};