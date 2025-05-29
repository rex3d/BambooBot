const { SlashCommandBuilder } = require('discord.js');

const dares = [
  'Zrób 10 przysiadów.',
  'Zaśpiewaj fragment ulubionej piosenki.',
  'Opowiedz żart.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dare')
    .setDescription('Wyświetla wyzwanie'),
  async execute(interaction) {
    const challenge = dares[Math.floor(Math.random() * dares.length)];
    await interaction.reply(challenge);
  },
};
