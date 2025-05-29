const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Wyświetla informacje o użytkowniku.')
        .addUserOption(option =>
            option.setName('użytkownik')
                .setDescription('Wybierz użytkownika')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('użytkownik') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);

        // Funkcja pomocnicza do tłumaczenia uprawnień
        function formatPermissions(perms) {
            if (!perms || perms.length === 0) return 'Brak';
            return perms.map(p => `\`${p}\``).join(', ');
        }

        // Najwyższa rola
        const highestRole = member.roles.highest;

        // Lista ról (bez @everyone)
        const roles = member.roles.cache
            .filter(role => role.id !== interaction.guild.id)
            .map(role => `<@&${role.id}>`)
            .join(', ') || 'Brak';

        // Status użytkownika
        const status = member.presence?.status || 'offline';

        // Czy użytkownik jest botem
        const isBot = user.bot ? 'Tak' : 'Nie';

        // Uprawnienia administratora
        const isAdmin = member.permissions.has(PermissionsBitField.Flags.Administrator) ? 'Tak' : 'Nie';

        // Liczba dni od dołączenia
        const joinedDaysAgo = Math.floor((Date.now() - member.joinedTimestamp) / (1000 * 60 * 60 * 24));

        // Liczba dni od utworzenia konta
        const createdDaysAgo = Math.floor((Date.now() - user.createdTimestamp) / (1000 * 60 * 60 * 24));

        const embed = new EmbedBuilder()
            .setTitle(`Informacje o użytkowniku: ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'ID', value: user.id, inline: true },
                { name: 'Bot', value: isBot, inline: true },
                { name: 'Status', value: status, inline: true },
                { name: 'Najwyższa rola', value: highestRole ? `<@&${highestRole.id}>` : 'Brak', inline: true },
                { name: 'Role', value: roles, inline: false },
                { name: 'Administrator', value: isAdmin, inline: true },
                { name: 'Dołączył do serwera', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F> (${joinedDaysAgo} dni temu)`, inline: false },
                { name: 'Konto utworzono', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F> (${createdDaysAgo} dni temu)`, inline: false }
            )
            .setColor(highestRole?.color || 0x00BFFF);

        await interaction.reply({ embeds: [embed] });
    },
};