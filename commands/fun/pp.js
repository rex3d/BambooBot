const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pp')
    .setDescription('Sprawdź długość fiuta')
    .addUserOption(option =>
      option.setName('użytkownik')
        .setDescription('Komu sprawdzić fiuta')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('użytkownik') || interaction.user;
    const length = Math.floor(Math.random() * 20) + 1;
    const dick = '8' + '='.repeat(length) + 'D';

    await interaction.reply(`${user.username} ma takiego kutasa: \`${dick}\``);
  }
};
