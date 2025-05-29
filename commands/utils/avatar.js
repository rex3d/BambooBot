const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Wyświetla avatar użytkownika oraz dodatkowe informacje.')
        .addUserOption(option =>
            option.setName('użytkownik')
                .setDescription('Wybierz użytkownika')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('użytkownik') || interaction.user;
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 512 });
        const formats = ['png', 'jpg', 'webp'];
        if (user.avatar && user.avatar.startsWith('a_')) formats.unshift('gif');

        const formatLinks = formats
            .map(fmt => `[${fmt.toUpperCase()}](${user.displayAvatarURL({ format: fmt, size: 1024, dynamic: true })})`)
            .join(' | ');

        const embed = new EmbedBuilder()
            .setTitle(`Avatar użytkownika ${user.tag}`)
            .setDescription(`Pobierz avatar: ${formatLinks}`)
            .setImage(avatarURL)
            .setColor(0x00AE86)
            .setFooter({ text: `ID: ${user.id}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};