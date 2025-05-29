const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const locations = require('../../data/mockLocations.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('geoguess')
    .setDescription('Zgadnij kraj na podstawie zdjęcia!'),

  async execute(interaction) {
    const random = locations[Math.floor(Math.random() * locations.length)];

    // zapisujemy prawidłową odpowiedź tymczasowo do DB
    const GeoPlayer = require('../../models/GeoPlayer');
    let player = await GeoPlayer.findOne({ userId: interaction.user.id });
    if (!player) {
      player = new GeoPlayer({ userId: interaction.user.id });
    }
    player.lastGuess = random.country.toLowerCase();
    await player.save();

    const embed = new EmbedBuilder()
      .setTitle('🌍 GeoGuess — Gdzie to jest?')
      .setDescription('Zgadnij kraj ze zdjęcia. Użyj `/answer [kraj]` aby odpowiedzieć.')
      .setImage(random.urll)
      .setColor(0x00AEFF);

    await interaction.reply({ embeds: [embed] });
  }
};
