const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('my_commands')
    .setDescription('Wyświetla listę komend, które możesz używać.'),

  async execute(interaction) {
    const executor = interaction.guild.members.cache.get(interaction.user.id);
    const availableCommands = [];

    interaction.client.commands.forEach(command => {
      // Sprawdzenie, czy komenda wymaga określonych ról
      if (command.requiredRoles) {
        const hasRole = command.requiredRoles.some(role => executor.roles.cache.has(role));
        if (hasRole) {
          availableCommands.push(command.data.name);
        }
      } else {
        // Jeśli komenda nie wymaga ról, jest dostępna dla wszystkich
        availableCommands.push(command.data.name);
      }
    });

    if (availableCommands.length === 0) {
      return interaction.reply('❌ Nie masz dostępu do żadnych komend.');
    }

    await interaction.reply(`✅ Komendy, które możesz używać:\n- ${availableCommands.join('\n- ')}`);
  },
};