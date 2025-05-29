const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Wyświetla pytanie typu trivia'),
  async execute(interaction) {
    try {
      const response = await fetch('https://the-trivia-api.com/v2/questions');
      const data = await response.json();
      const question = data[0];
      const options = [...question.incorrectAnswers, question.correctAnswer]
        .sort(() => Math.random() - 0.5)
        .map((opt, index) => `${index + 1}. ${opt}`)
        .join('\n');

      await interaction.reply(`**${question.question.text}**\n${options}`);
    } catch (error) {
      console.error('Błąd podczas pobierania pytania trivia:', error);
      await interaction.reply('Nie udało się pobrać pytania.');
    }
  },
};
