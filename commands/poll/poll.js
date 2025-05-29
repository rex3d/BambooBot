const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Stwórz głosowanie TAK/NIE')
    .addStringOption(option =>
      option.setName('pytanie')
        .setDescription('O co pytasz?')
        .setRequired(true)
    ),

  async execute(interaction) {
    const question = interaction.options.getString('pytanie');

    const msg = await interaction.reply({
      embeds: [{
        title: '📊 Głosowanie',
        description: question,
        color: 0x3498db
      }],
      fetchReply: true
    });

    await msg.react('✅');
    await msg.react('❌');
  }
};
