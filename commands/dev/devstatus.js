const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('devstatus')
        .setDescription('Zarządzaj statusem bota (tylko dev)')
        .addSubcommand(sub =>
            sub.setName('set')
                .setDescription('Ustaw status bota')
                .addStringOption(option =>
                    option.setName('tekst')
                        .setDescription('Nowy status (lub zostaw puste, aby usunąć)')
                        .setRequired(false))
                .addStringOption(option =>
                    option.setName('status')
                        .setDescription('Ustaw typ statusu')
                        .addChoices(
                            { name: 'Dostępny', value: 'online' },
                            { name: 'Nie przeszkadzać', value: 'dnd' },
                            { name: 'Zaraz wracam', value: 'idle' }
                        )
                        .setRequired(false))
        )
        .addSubcommand(sub =>
            sub.setName('info')
                .setDescription('Sprawdza status bota')
        ),
    async execute(interaction) {
        const ownerId = '1229658002798149707'; // Zamień na swoje ID jeśli trzeba

        if (interaction.user.id !== ownerId)
            return interaction.reply({ content: 'Spierdalaj. Tylko właściciel może to używać.', ephemeral: true });

        if (interaction.options.getSubcommand() === 'set') {
            const statusText = interaction.options.getString('tekst');
            const presenceStatus = interaction.options.getString('status');

            // Set presence status if provided
            if (presenceStatus) {
                await interaction.client.user.setStatus(presenceStatus);
            }

            // Set or clear activity
            if (statusText && statusText.trim() !== '') {
                await interaction.client.user.setActivity(statusText);
                await interaction.reply(`🛠️ Status ustawiony na: \`${statusText}\`${presenceStatus ? ` (${presenceStatus})` : ''}`);
            } else {
                await interaction.client.user.setActivity(null);
                await interaction.reply(`🛠️ Status bota został usunięty${presenceStatus ? `, obecny status: ${presenceStatus}` : ''}.`);
            }
        } else if (interaction.options.getSubcommand() === 'info') {
            const uptime = process.uptime();
            const uptimeFormatted = `${Math.floor(uptime / 60)} min ${Math.floor(uptime % 60)} sek`;

            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('🖥️ Status Bota')
                    .setDescription(`Bot działa od **${uptimeFormatted}**`)
                    .setColor(0x00ff00)
                ]
            });
        }
    },
};