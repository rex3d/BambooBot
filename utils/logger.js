const chalk = require('chalk');

module.exports = {
  success: (msg) => console.log(chalk.green('[SUCCESS]'), msg),
  error: (msg) => console.log(chalk.red('[ERROR]'), msg),
  info: (msg) => console.log(chalk.blue('[INFO]'), msg),
  warn: (msg) => console.log(chalk.yellow('[WARN]'), msg),
  debug: (msg) => console.log(chalk.magenta('[DEBUG]'), msg),
  cmd: (msg) => console.log(chalk.cyan('[CMD]'), msg),
  event: (msg) => console.log(chalk.gray('[EVENT]'), msg),
  db: (msg) => console.log(chalk.white('[DB]'), msg),
  api: (msg) => console.log(chalk.green('[API]'), msg),
  log: (msg) => console.log(chalk.white('[LOG]'), msg),
};
