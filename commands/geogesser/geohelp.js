// 3. Komenda: /geohelp - Pokazuje instrukcje gry
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('geohelp')
    .setDescription('Jak grać w GeoGuess?'),

  async execute(interaction) {
    const msg = `🗺️ **Jak grać w GeoGuess**
1. Użyj komendy \`/geoguess\`, żeby dostać zdjęcie.
2. Obejrzyj je dokładnie i zgadnij kraj.
3. Użyj \`/answer [kraj]\`, aby odpowiedzieć.
4. Sprawdź swoje wyniki komendą \`/geostats\`.
5. Możesz też zerknąć na \`/geoleaderboard\`.

Powodzenia! 🌍`;
    await interaction.reply({ content: msg, ephemeral: true });
  }
};
