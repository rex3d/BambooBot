const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roast')
    .setDescription('Wyświetla losowy roast')
    .addUserOption(option =>
      option.setName('użytkownik')
        .setDescription('Użytkownik do roastowania')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('użytkownik') || interaction.user;
    const roasts = [
      'Jesteś jak chmura – kiedy znikasz, dzień staje się lepszy.',
      'Twoja inteligencja jest jak Wi-Fi – słaba i niestabilna.',
      'Masz coś wspólnego z pizzą – wszyscy cię lubią, dopóki nie otworzysz ust.',
      'Twoje życie jest jak mem – nikt go nie rozumie.',
      'Jesteś dowodem na to, że ewolucja też popełnia błędy.',
      'Masz mniej sensu niż regulamin TikToka.',
      'Twój mózg to wersja demo – dostępne tylko podstawowe funkcje.',
      'Gdyby głupota świeciła, byłbyś jebanym latarniowcem.',
      'Jesteś jak 404 – osobowość not found.',
      'Twoja obecność obniża średnią IQ serwera.',
      'Jakby ci wyłączyć prąd, znikniesz z listy ludzi.',
      'Masz tyle charyzmy, co Windows Vista – nikt nie tęskni.',
      'Gdyby głupota była sportem, miałbyś złoto na każdej olimpiadzie.',
      'Twoje argumenty mają mniej sensu niż komentarze na Facebooku twojej babci.',
      'Jesteś tak bezużyteczny jak "uefka" w podstawówce.',
      'Masz tyle wdzięku, co ekran ładowania w GTA Online.',
      'Jesteś jak ctrl+z – wszyscy żałują, że nie można cię cofnąć.',
      'Jakbyś zniknął jutro, jedyne co by się zmieniło, to lepszy klimat.'
    ];
    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    await interaction.reply(`🔥 ${user.username}, ${randomRoast}`);
  },
};
