const { EmbedBuilder } = require('discord.js');
const config = require('../../config/config');
const path = require('path');

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    // Sprawdzanie, czy komenda jest w folderze admin
    const commandPath = path.join(__dirname, '../../commands/admin');
    if (commandPath.includes('admin') && commandPath.includes(interaction.commandName)) {
      const member = interaction.member;

      // Sprawdzanie, czy użytkownik ma przynajmniej jedną z wymaganych ról
      const hasRequiredRole = config.adminRoleIds.some(roleId => member.roles.cache.has(roleId));
      if (!hasRequiredRole) {
        return interaction.reply({
          content: '❌ Nie masz wymaganej roli, aby użyć tej komendy.',
          ephemeral: true,
        });
      }
    }

    // Wykonanie komendy
    await command.execute(interaction);

    // Logowanie użycia komendy
    const logChannel = interaction.guild.channels.cache.get(config.logChannelId);
    if (logChannel) {
      const embed = new EmbedBuilder()
        .setTitle('Użycie komendy')
        .setColor(0x00FF00)
        .addFields(
          { name: 'Komenda', value: `/${interaction.commandName}`, inline: true },
          { name: 'Użytkownik', value: `${interaction.user.tag} (${interaction.user.id})`, inline: true },
          { name: 'Kanał', value: `${interaction.channel.name} (${interaction.channel.id})`, inline: true },
          { name: 'Czas', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: false }
        )
        .setFooter({ text: 'Log systemu bota' })
        .setTimestamp();

      await logChannel.send({ embeds: [embed] });
    }
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: 'Coś poszło nie tak.', ephemeral: true });
  }
};