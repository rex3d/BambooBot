const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');
const packageJson = require('../../package.json'); // Adjust path if needed

function formatUptime(ms) {
    const sec = Math.floor((ms / 1000) % 60);
    const min = Math.floor((ms / (1000 * 60)) % 60);
    const hr = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const day = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${day}d ${hr}h ${min}m ${sec}s`;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Wyświetla informacje o bocie.'),
    async execute(interaction) {
        const { client } = interaction;
        const totalGuilds = client.guilds.cache.size;
        const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        const embed = new EmbedBuilder()
            .setTitle('Informacje o bocie')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Nazwa', value: client.user.tag, inline: true },
                { name: 'ID', value: client.user.id, inline: true },
                { name: 'Uptime', value: formatUptime(client.uptime), inline: true },
                { name: 'Serwery', value: `${totalGuilds}`, inline: true },
                { name: 'Użytkownicy', value: `${totalUsers}`, inline: true },
                { name: 'Node.js', value: process.version, inline: true },
                { name: 'Platforma', value: os.platform(), inline: true },
                { name: 'RAM', value: `${memoryUsage} MB`, inline: true }
            )
            .setFooter({ text: `Autor: ${packageJson.author || 'Nieznany'}` })
            .setColor(0xFFFF00)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};