# 🤖 Discord Handler Js Sequelize

> A modular Discord.js v14 bot framework using **Sequelize ORM** — supports SQLite, PostgreSQL, MySQL, MariaDB, and MSSQL via config. Choose your database in the config and fill in the credentials.

## ✨ Features

- **Multi-Database Support** — SQLite (default, zero config), PostgreSQL, MySQL, MariaDB, or MSSQL — switch via `.env`
- **Slash Commands** — Fully supports Discord.js v14 slash commands with auto-registration
- **Prefix Commands** — Classic message-based commands with custom prefix
- **Event System** — Modular event handling ready, guildCreate, guildDelete, error
- **Anti-Crash System** — Handles unhandled rejections, uncaught exceptions, and warnings
- **Webhook Logging** — Separate webhooks for errors, commands, guild joins/leaves, and bot ready
- **Cooldown System** — Per-command cooldowns to prevent spam
- **Dynamic Model Loading** — Auto-loads and syncs Sequelize models on startup
- **Sequelize ORM** — Robust, battle-tested ORM with migrations, transactions, and relations

## 📁 Project Structure

```
src/
├── Commands/
│   ├── Slash/          # Slash command files
│   │   └── Public/
│   │       └── ping.js
│   └── Prefix/         # Prefix command files
│       └── Public/
│           └── ping.js
├── Events/             # Discord event handlers
│   ├── ready.js
│   ├── messageCreate.js
│   ├── interactionCreate.js
│   ├── guildCreate.js
│   ├── guildDelete.js
│   └── error.js
├── Handlers/           # Loaders and utilities
│   ├── AntiCrash.js
│   ├── Commands.js
│   ├── Events.js
│   ├── Prefix.js
│   ├── Models.js
│   └── logger.js
├── Core/               # Shared utilities
│   ├── commandUtils.js
│   ├── emojis.js
│   ├── errorWebhook.js
│   ├── joinGuildWebhook.js
│   ├── leaveGuildWebhook.js
│   ├── prefixCommandWebhook.js
│   ├── readyWebhook.js
│   └── slashCommandWebhook.js
├── Database/
│   └── sequelize.js    # Sequelize connection factory
├── Models/
│   └── userModel.js    # Example Sequelize model
├── config.js           # Configuration loader
└── index.js            # Entry point
```

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RealMtrx/Discord-Handler-Js-Sequelize.git
   cd Discord-Handler-Js-Sequelize
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your bot:
   - Copy `.env.example` to `.env`
   - Fill in your bot token, client ID, and webhook URLs
   - Choose your database dialect and fill in the credentials

4. Run the bot:
   ```bash
   npm start
   ```

## 🔧 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| discord.js | ^14.11.0 | Discord API library |
| sequelize | ^6.35.0 | SQL ORM |
| sqlite3 | ^5.1.6 | SQLite driver (default) |
| chalk | ^5.3.0 | Terminal colors |
| boxen | ^7.0.0 | Terminal boxes |
| dotenv | ^17.2.1 | Environment variables |

> **Note:** For PostgreSQL, MySQL, MariaDB, or MSSQL, install the corresponding driver:
> - PostgreSQL: `npm install pg pg-hstore`
> - MySQL/MariaDB: `npm install mysql2`
> - MSSQL: `npm install tedious`

## ⚙️ Configuration

Edit your `.env` file:

```env
TOKEN=your_bot_token
CLIENT_ID=your_client_id
BOT_NAME=My Bot
PREFIX=$

# Database
DB_DIALECT=sqlite         # sqlite | postgres | mysql | mariadb | mssql
DB_STORAGE=./database.sqlite  # SQLite only
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=discord_bot
```

## 📝 Adding Commands

### Slash Command

```js
// src/Commands/Slash/Public/hello.js
import { SlashCommandBuilder } from 'discord.js';

export default {
  dir: "Public",
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Say hello!'),
  run: async (client, interaction) => {
    await interaction.reply('Hello! 👋');
  }
};
```

### Prefix Command

```js
// src/Commands/Prefix/Public/hello.js
export default {
  dir: "Public",
  name: 'hello',
  description: 'Say hello!',
  run: async (client, message, args) => {
    await message.reply('Hello! 👋');
  }
};
```

## 🗄️ Adding Models

```js
// src/Models/guildModel.js
import { DataTypes } from "sequelize";
import { getSequelize } from "../Database/sequelize.js";

const sequelize = getSequelize();

const Guild = sequelize.define("Guild", {
  guildId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  prefix: {
    type: DataTypes.STRING,
    defaultValue: "$"
  }
});

export default Guild;
```

## 📜 License

MIT License — Copyright © 2026 Mtrx

---

**Discord Handler — Built by Mtrx — Discord: 0hu2**
