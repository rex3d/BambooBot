const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Zadaj pytanie magicznej kuli')
    .addStringOption(option =>
      option.setName('pytanie')
        .setDescription('Twoje pytanie do magicznej kuli')
        .setRequired(true)),
  async execute(interaction) {
    const responses = [
      'Tak!',
      'Nie.',
      'Może.',
      'Zdecydowanie tak!',
      'Zdecydowanie nie.',
      'Nie jestem pewien, spróbuj ponownie.',
      'To wygląda obiecująco.',
      'Nie licz na to.'
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const question = interaction.options.getString('pytanie');

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('🎱 Magiczna Kula')
      .addFields(
        { name: 'Pytanie', value: question },
        { name: 'Odpowiedź', value: randomResponse }
      )
      .setFooter({ text: `Zadane przez: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};