require('dotenv').config();

module.exports = {
  token: process.env.TOKEN,
  mongoURI: process.env.MONGO_URI,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  clientSecret: process.env.CLIENT_SECRET,
  logChannelId: process.env.LOG_CHANNEL_ID,
  adminRoleIds: ['123456789012345678', '987654321098765432'], // Lista ID ról
  protectedUsers: ['123456789012345678', '987654321098765432'], // ID chronionych użytkowników
  devRole: ['1229658002798149707'], // ID roli dewelopera
};

