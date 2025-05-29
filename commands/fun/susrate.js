const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('susrate')
    .setDescription('Jak bardzo ktoś jest podejrzany?')
    .addUserOption(option =>
      option.setName('użytkownik')
        .setDescription('Kto podejrzany?')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('użytkownik') || interaction.user;
    const percentage = Math.floor(Math.random() * 101);

    await interaction.reply(`${user.username} jest ${percentage}% sus 👀`);
  }
};
