const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Wyświetla listę komend z możliwością wyboru kategorii.'),

  async execute(interaction) {
    const commandsPath = path.join(__dirname, '..');
    const categories = fs.readdirSync(commandsPath).filter(folder =>
      fs.statSync(path.join(commandsPath, folder)).isDirectory()
    );

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('help-category-select')
      .setPlaceholder('📂 Wybierz kategorię komend')
      .addOptions(categories.map(category => ({
        label: category.charAt(0).toUpperCase() + category.slice(1),
        value: category,
        description: `Komendy z kategorii "${category}"`
      })));

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const introEmbed = new EmbedBuilder()
      .setTitle('🆘 Pomoc — Lista komend')
      .setDescription('Wybierz kategorię z menu poniżej, aby zobaczyć dostępne komendy.\n\nKażda komenda zawiera opis — wszystko jasno i przejrzyście.')
      .setColor(0x00aeff)
      .setFooter({ text: `Wybór ważny przez 60 sekund.` });

    await interaction.reply({
      embeds: [introEmbed],
      components: [row]
    });

    const collector = interaction.channel.createMessageComponentCollector({
      filter: i => i.customId === 'help-category-select' && i.user.id === interaction.user.id,
      time: 60000
    });

    collector.on('collect', async i => {
      const selectedCategory = i.values[0];
      const categoryPath = path.join(commandsPath, selectedCategory);
      const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

      const commands = commandFiles.map(file => {
        const command = require(path.join(categoryPath, file));
        return `🔹 **/${command.data.name}** — ${command.data.description}`;
      });

      const embed = new EmbedBuilder()
        .setTitle(`📂 Komendy: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`)
        .setDescription(commands.join('\n') || 'Brak komend w tej kategorii.')
        .setColor(0x00ff99)
        .setFooter({ text: `Wybierz inną kategorię, aby zobaczyć więcej.` });

      await i.update({ embeds: [embed], components: [row] });
    });

    collector.on('end', async () => {
      try {
        await interaction.editReply({ components: [] });
      } catch (err) {
        console.error('❌ Błąd przy usuwaniu komponentów:', err.message);
      }
    });
  }
};
