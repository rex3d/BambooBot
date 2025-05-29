const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Wyświetla losowy dowcip'),
  async execute(interaction) {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
      const data = await response.json();
      await interaction.reply(data.joke);
    } catch (error) {
      console.error('Błąd podczas pobierania dowcipu:', error);
      await interaction.reply('Nie udało się pobrać dowcipu.');
    }
  },
};
