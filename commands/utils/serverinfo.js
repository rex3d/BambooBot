const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Wyświetla rozbudowane informacje o serwerze.'),
    async execute(interaction) {
        const { guild } = interaction;
        await guild.fetch(); // Upewnij się, że dane są aktualne

        // Pobierz liczbę kanałów tekstowych i głosowych
        const textChannels = guild.channels.cache.filter(c => c.type === 0).size;
        const voiceChannels = guild.channels.cache.filter(c => c.type === 2).size;

        // Pobierz liczbę ról
        const rolesCount = guild.roles.cache.size;

        // Pobierz liczbę emoji
        const emojisCount = guild.emojis.cache.size;

        // Pobierz poziom weryfikacji
        const verificationLevels = [
            'Brak', 'Niski', 'Średni', 'Wysoki', 'Bardzo wysoki'
        ];
        const verificationLevel = verificationLevels[guild.verificationLevel] || 'Nieznany';

        // Pobierz boosty
        const boostCount = guild.premiumSubscriptionCount || 0;
        const boostTier = guild.premiumTier ? `Poziom ${guild.premiumTier}` : 'Brak';

        // Pobierz region (jeśli dostępny)
        const region = guild.preferredLocale || 'Nieznany';

        const embed = new EmbedBuilder()
            .setTitle(`Informacje o serwerze: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Właściciel', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Liczba członków', value: `${guild.memberCount}`, inline: true },
                { name: 'Utworzono', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },
                { name: 'Kanały tekstowe', value: `${textChannels}`, inline: true },
                { name: 'Kanały głosowe', value: `${voiceChannels}`, inline: true },
                { name: 'Liczba ról', value: `${rolesCount}`, inline: true },
                { name: 'Liczba emoji', value: `${emojisCount}`, inline: true },
                { name: 'Poziom weryfikacji', value: verificationLevel, inline: true },
                { name: 'Boosty', value: `${boostCount} (${boostTier})`, inline: true },
                { name: 'Region', value: region, inline: true }
            )
            .setColor(0x00FF00)
            .setFooter({ text: `ID serwera: ${guild.id}` });

        await interaction.reply({ embeds: [embed] });
    },
};