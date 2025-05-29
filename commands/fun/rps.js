const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Zagraj w papier, kamień, nożyce')
    .addStringOption(option =>
      option.setName('wybór')
        .setDescription('Wybierz papier, kamień lub nożyce')
        .setRequired(true)
        .addChoices(
          { name: 'Papier', value: 'papier' },
          { name: 'Kamień', value: 'kamień' },
          { name: 'Nożyce', value: 'nożyce' }
        )),
  async execute(interaction) {
    const userChoice = interaction.options.getString('wybór');
    const choices = ['papier', 'kamień', 'nożyce'];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;
    if (userChoice === botChoice) {
      result = 'Remis!';
    } else if (
      (userChoice === 'papier' && botChoice === 'kamień') ||
      (userChoice === 'kamień' && botChoice === 'nożyce') ||
      (userChoice === 'nożyce' && botChoice === 'papier')
    ) {
      result = 'Wygrałeś!';
    } else {
      result = 'Przegrałeś!';
    }

    await interaction.reply(`Twój wybór: ${userChoice}\nWybór bota: ${botChoice}\n**${result}**`);
  },
};