const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('massban')
    .setDescription('Banuje kilka ID użytkowników na raz (oddzielone przecinkami).')
    .addStringOption(option =>
      option.setName('ids')
        .setDescription('ID użytkowników oddzielone przecinkami (np. 123,456,789)')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const rawInput = interaction.options.getString('ids');
    const ids = rawInput.split(',')
      .map(id => id.trim())
      .filter(id => /^\d{17,20}$/.test(id)); // Sprawdza, czy ID wygląda jak Discord Snowflake

    if (ids.length === 0) {
      return await interaction.reply({ content: '❌ Nie podano żadnych poprawnych ID do zbanowania.', ephemeral: true });
    }

    const results = [];

    for (const id of ids) {
      try {
        await interaction.guild.members.ban(id, { reason: `Massban przez ${interaction.user.tag}` });
        results.push(`✅ Zbanowano: ${id}`);
      } catch (err) {
        console.error(`Błąd przy banowaniu ID ${id}:`, err);
        results.push(`❌ Nie udało się zbanować ${id}: ${err.message || 'Nieznany błąd'}`);
      }
    }

    // Dzielone na kawałki jeśli odpowiedź byłaby za długa
    const replyChunks = [];
    let currentChunk = '';
    for (const line of results) {
      if ((currentChunk + line + '\n').length > 1900) {
        replyChunks.push(currentChunk);
        currentChunk = '';
      }
      currentChunk += line + '\n';
    }
    replyChunks.push(currentChunk);

    for (const chunk of replyChunks) {
      await interaction.followUp({ content: chunk, ephemeral: true });
    }
  }
};
