const muteChecker = require('../../utils/muteChecker'); // Poprawiona ścieżka

module.exports = (client) => {
  console.log(`[ONLINE] Zalogowano jako ${client.user.tag}`);
  setInterval(() => muteChecker(client), 30 * 1000);
};