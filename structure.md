discord-bot/
│
├── 📁 commands/             # Slash commandy
│   ├── 📁 admin/
│   │   ├── ping.js
│   │   └── ban.js           # Komenda do banowania użytkowników
│   └── 📁 user/
│       ├── profile.js
│       └── help.js          # Komenda pomocy dla użytkowników
│
├── 📁 events/               # Eventy Discorda
│   ├── client/
│   │   ├── ready.js
│   │   └── error.js         # Obsługa błędów klienta
│   └── guild/
│       ├── interactionCreate.js
│       └── memberAdd.js     # Obsługa dołączania nowych członków
│
├── 📁 models/               # Modele Mongoose
│   ├── User.js
│   └── Guild.js             # Model serwera Discord
│
├── 📁 config/               # Konfiguracja
│   ├── config.js
│   └── commands.json        # Konfiguracja komend
│
├── 📁 utils/                # Helpery, logi itd.
│   ├── logger.js
│   ├── loadCommands.js
│   └── permissions.js       # Sprawdzanie uprawnień użytkowników
│
├── 📁 services/             # Integracje z zewnętrznymi API
│   └── statsService.js      # Pobieranie statystyk
│
├── .env                     # Token, Mongo URI itd.
├── .gitignore
├── index.js                 # Start point
├── package.json
└── README.md

