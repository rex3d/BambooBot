const { SlashCommandBuilder } = require('discord.js');

const truths = [
  'Jaka jest twoja największa tajemnica?',
  'Czy kiedykolwiek złamałeś prawo?',
  'Kogo najbardziej podziwiasz i dlaczego?',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('truth')
    .setDescription('Wyświetla pytanie typu "prawda"'),
  async execute(interaction) {
    const question = truths[Math.floor(Math.random() * truths.length)];
    await interaction.reply(question);
  },
};
