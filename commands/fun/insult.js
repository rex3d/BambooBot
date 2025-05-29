const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('insult')
    .setDescription('Wyświetla losową obelgę'),
  async execute(interaction) {
    try {
      const response = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
      const data = await response.json();
      await interaction.reply(data.insult);
    } catch (error) {
      console.error('Błąd podczas pobierania obelgi:', error);
      await interaction.reply('Nie udało się pobrać obelgi.');
    }
  },
};
