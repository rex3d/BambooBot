const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Przeładuj komendę (tylko dev)')
    .addStringOption(option =>
      option.setName('nazwa')
        .setDescription('Nazwa komendy')
        .setRequired(true)),
  async execute(interaction) {
    if (interaction.user.id !== '1229658002798149707')
      return interaction.reply({ content: 'Nie dotykaj tego, to moje.', ephemeral: true });

    const commandName = interaction.options.getString('nazwa').toLowerCase();
    const command = interaction.client.commands.get(commandName);

    if (!command) return interaction.reply(`Nie ma takiej komendy: \`${commandName}\``);

    delete require.cache[require.resolve(`./${commandName}.js`)];
    try {
      const newCommand = require(`./${commandName}.js`);
      interaction.client.commands.set(newCommand.data.name, newCommand);
      await interaction.reply(`✅ Komenda \`${commandName}\` została przeładowana.`);
    } catch (err) {
      await interaction.reply(`❌ Błąd podczas przeładowania komendy:\n\`\`\`${err}\`\`\``);
    }
  },
};