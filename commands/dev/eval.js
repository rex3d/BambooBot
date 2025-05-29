const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Wykonuje kod JavaScript (tylko dev)')
    .addStringOption(option =>
      option.setName('kod')
        .setDescription('Kod do wykonania')
        .setRequired(true)),
  async execute(interaction) {
    if (interaction.user.id !== '1229658002798149707')
      return interaction.reply({ content: 'Nie pierdol się w moje komendy, to dla deva.', ephemeral: true });

    try {
      const code = interaction.options.getString('kod');
      let evaled = eval(code);
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
      await interaction.reply(`🧠 Wynik:\n\`\`\`${evaled}\`\`\``);
    } catch (err) {
      await interaction.reply(`❌ Błąd:\n\`\`\`${err}\`\`\``);
    }
  },
};