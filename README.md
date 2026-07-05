<div align="center">
  <h1>Discord Handler — JavaScript (SQL Edition)</h1>
  <p><strong>A production-ready Discord bot framework built with Discord.js v14 and Sequelize ORM — supports SQLite, PostgreSQL, MySQL, MariaDB, and MSSQL with a modular <code>src/</code> architecture.</strong></p>

  <p>
    <a href="https://github.com/RealMtrx/Discord-Handler-Js-Sequelize/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
    <a href="https://github.com/RealMtrx/Discord-Handler-Js-Sequelize/releases"><img src="https://img.shields.io/badge/version-0.9.0--beta-yellow" alt="Version 0.9.0 Beta"></a>
    <a href="https://github.com/RealMtrx/Discord-Handler-Js-Sequelize/stargazers"><img src="https://img.shields.io/github/stars/RealMtrx/Discord-Handler-Js-Sequelize" alt="Stars"></a>
    <a href="https://github.com/RealMtrx/Discord-Handler-Js-Sequelize/issues"><img src="https://img.shields.io/github/issues/RealMtrx/Discord-Handler-Js-Sequelize" alt="Issues"></a>
    <a href="https://github.com/RealMtrx/Discord-Handler-Js-Sequelize/network"><img src="https://img.shields.io/github/forks/RealMtrx/Discord-Handler-Js-Sequelize" alt="Forks"></a>
    <a href="https://github.com/RealMtrx/Discord-Handler/graphs/contributors"><img src="https://img.shields.io/badge/ecosystem-26%20repos-brightgreen" alt="26 Repos"></a>
    <a href="https://discord.gg/0hu2"><img src="https://img.shields.io/badge/discord-0hu2-5865F2" alt="Discord"></a>
  </p>

  <br>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-database-configuration">Database Config</a> •
    <a href="#-api-reference">API</a> •
    <a href="#-mongodb-edition">MongoDB Edition</a> •
    <a href="#-related-repositories">Ecosystem</a>
  </p>
</div>

---

## Overview

Discord Handler JavaScript (SQL Edition) is a production-ready Discord bot framework built on **Discord.js v14** with **Sequelize ORM** for SQL database storage. It provides the same modular architecture as the MongoDB edition but replaces document storage with relational database support — SQLite (default, zero configuration), PostgreSQL, MySQL, MariaDB, or MSSQL — switchable via a single `.env` setting.

> **Version:** 0.9.0 (Stable Beta) — Part of the [Discord Handler](https://github.com/RealMtrx/Discord-Handler) ecosystem (26 repos across 13 languages).

---

## Features

- **Multi-Database Support** — SQLite (default), PostgreSQL, MySQL, MariaDB, MSSQL — switch via `.env`
- **Sequelize ORM** — Battle-tested ORM with migrations, transactions, model synchronization, and relation support
- **Dual Command System** — Slash commands and prefix commands with auto-registration
- **Modular Architecture** — Clean separation: Commands, Events, Handlers, Core, Database, Models
- **Anti-Crash Protection** — Handles `unhandledRejection`, `uncaughtException`, and `warning` events
- **Webhook Logging** — Dedicated webhooks for errors, commands, guild events, and bot status
- **Cooldown System** — Per-command rate limiting with automatic periodic cleanup
- **Dynamic Model Loading** — Auto-loads and syncs Sequelize models on startup
- **Unicode Emoji System** — Flat-export emoji constants for consistent rendering
- **Environment Configuration** — Secure token and secrets management via `dotenv`
- **Graceful Shutdown** — Proper database connection cleanup on process exit

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/RealMtrx/Discord-Handler-Js-Sequelize.git
cd Discord-Handler-Js-Sequelize

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your bot token, client ID, and database settings

# Start the bot
npm start
```

### Prerequisites

- **Node.js 18+** — Runtime environment
- **SQLite** (default, no setup required) or **PostgreSQL** / **MySQL** / **MSSQL**
- **Discord Application** — Bot token and client ID from the [Discord Developer Portal](https://discord.com/developers/applications)

---

## Project Structure

```
Discord-Handler-Js-Sequelize/
├── package.json
├── .env.example
├── src/
│   ├── index.js                 # Entry point — initializes everything
│   ├── config.js                # Configuration loader (env vars)
│   ├── Core/                    # Shared utilities
│   │   ├── commandUtils.js      # Cooldown, error formatting, logging
│   │   ├── emojis.js            # Unicode emoji constants
│   │   ├── errorWebhook.js      # Error reporting webhook
│   │   ├── joinGuildWebhook.js  # Guild join notification webhook
│   │   ├── leaveGuildWebhook.js # Guild leave notification webhook
│   │   ├── prefixCommandWebhook.js
│   │   ├── readyWebhook.js      # Bot ready event webhook
│   │   └── slashCommandWebhook.js
│   ├── Database/
│   │   └── sequelize.js         # Sequelize connection factory (multi-dialect)
│   ├── Events/                  # Discord event listeners
│   │   ├── error.js
│   │   ├── guildCreate.js
│   │   ├── guildDelete.js
│   │   ├── interactionCreate.js
│   │   ├── messageCreate.js
│   │   └── ready.js
│   ├── Handlers/                # Loaders and registrars
│   │   ├── AntiCrash.js         # Global error handlers
│   │   ├── Commands.js          # Slash command loader and Discord API registration
│   │   ├── Events.js            # Event file loader
│   │   ├── Models.js            # Sequelize model loader and sync
│   │   ├── Prefix.js            # Prefix command loader
│   │   └── logger.js            # Startup report logger
│   ├── Models/
│   │   └── userModel.js         # Sequelize User model
│   └── Commands/
│       ├── Slash/Public/ping.js
│       └── Prefix/Public/ping.js
```

---

## Database Configuration

Edit your `.env` file to select and configure your database:

```env
# Bot Configuration
TOKEN=your_bot_token
CLIENT_ID=your_client_id
BOT_NAME=My Bot
PREFIX=$

# Database — change DB_DIALECT to switch storage engines
DB_DIALECT=sqlite         # sqlite | postgres | mysql | mariadb | mssql
DB_STORAGE=./database.sqlite  # SQLite only — path to database file
DB_HOST=localhost          # Network databases only
DB_PORT=5432              # PostgreSQL default: 5432, MySQL: 3306, MSSQL: 1433
DB_USERNAME=root          # Network databases only
DB_PASSWORD=              # Network databases only
DB_DATABASE=discord_bot   # Database name
```

### Installing Database Drivers

| Dialect | Command |
| ------- | ------- |
| SQLite (default) | Bundled with `sqlite3` |
| PostgreSQL | `npm install pg pg-hstore` |
| MySQL / MariaDB | `npm install mysql2` |
| MSSQL | `npm install tedious` |

---

## API Reference

### Database

| Function | Location | Description |
| -------- | -------- | ----------- |
| `getSequelize()` | `Database/sequelize.js` | Returns the Sequelize instance (creates if not initialized) |
| `closeDatabase()` | `Database/sequelize.js` | Closes the database connection gracefully |

### Core Functions

| Function | Location | Description |
| -------- | -------- | ----------- |
| `checkCooldown(userId, commandName, cooldownTime)` | `Core/commandUtils.js` | Checks and sets per-command cooldowns |
| `formatError(error, commandName)` | `Core/commandUtils.js` | Formats error objects for logging |
| `sendErrorToWebhook(error, context)` | `Core/errorWebhook.js` | Sends error reports to Discord webhook |
| `sendBotReadyEvent(client)` | `Core/readyWebhook.js` | Sends bot online notification |
| `sendGuildJoinEvent(guild, client)` | `Core/joinGuildWebhook.js` | Sends guild join notification |
| `sendGuildLeaveEvent(guild, client)` | `Core/leaveGuildWebhook.js` | Sends guild leave notification |
| `sendSlashCommandUsage(user, commandName, guildName)` | `Core/slashCommandWebhook.js` | Logs slash command usage |
| `sendPrefixCommandUsage(user, commandName, guildName)` | `Core/prefixCommandWebhook.js` | Logs prefix command usage |

---

## Adding Commands

### Slash Command

```javascript
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

```javascript
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

---

## MongoDB Edition

This is the **SQL edition**. A **MongoDB edition** is also available:

| Feature | MongoDB Edition | SQL Edition |
| ------- | --------------- | ----------- |
| Repository | [Discord-Handler-Js](https://github.com/RealMtrx/Discord-Handler-Js) | [Discord-Handler-Js-Sequelize](https://github.com/RealMtrx/Discord-Handler-Js-Sequelize) |
| Database | MongoDB | SQLite, PostgreSQL, MySQL, MSSQL |
| ORM | Mongoose | Sequelize |
| Dialects | MongoDB only | Multi-dialect via config |

---

## Related Repositories

Discord Handler JavaScript (SQL Edition) is part of a **26-repo ecosystem**.

### Core Framework (MongoDB)

| Language | Repository |
| -------- | ---------- |
| JavaScript | [Discord-Handler-Js](https://github.com/RealMtrx/Discord-Handler-Js) |
| TypeScript | [Discord-Handler-Ts](https://github.com/RealMtrx/Discord-Handler-Ts) |
| Go | [Discord-Handler-Go](https://github.com/RealMtrx/Discord-Handler-Go) |
| Rust | [Discord-Handler-Rs](https://github.com/RealMtrx/Discord-Handler-Rs) |
| Python | [Discord-Handler-Py](https://github.com/RealMtrx/Discord-Handler-Py) |
| C# | [Discord-Handler-Cs](https://github.com/RealMtrx/Discord-Handler-Cs) |
| Java | [Discord-Handler-Java](https://github.com/RealMtrx/Discord-Handler-Java) |
| Kotlin | [Discord-Handler-Kt](https://github.com/RealMtrx/Discord-Handler-Kt) |
| C++ | [Discord-Handler-Cpp](https://github.com/RealMtrx/Discord-Handler-Cpp) |
| Dart | [Discord-Handler-Dart](https://github.com/RealMtrx/Discord-Handler-Dart) |
| Ruby | [Discord-Handler-Rb](https://github.com/RealMtrx/Discord-Handler-Rb) |
| Lua | [Discord-Handler-Lua](https://github.com/RealMtrx/Discord-Handler-Lua) |
| PHP | [Discord-Handler-Php](https://github.com/RealMtrx/Discord-Handler-Php) |

### Database Editions (SQL)

| Language | Repository |
| -------- | ---------- |
| TypeScript | [Discord-Handler-Ts-Sequelize](https://github.com/RealMtrx/Discord-Handler-Ts-Sequelize) |
| Go | [Discord-Handler-Go-Sequelize](https://github.com/RealMtrx/Discord-Handler-Go-Sequelize) |
| Rust | [Discord-Handler-Rs-Sequelize](https://github.com/RealMtrx/Discord-Handler-Rs-Sequelize) |
| Python | [Discord-Handler-Py-Sequelize](https://github.com/RealMtrx/Discord-Handler-Py-Sequelize) |
| C# | [Discord-Handler-Cs-Sequelize](https://github.com/RealMtrx/Discord-Handler-Cs-Sequelize) |
| Java | [Discord-Handler-Java-Sequelize](https://github.com/RealMtrx/Discord-Handler-Java-Sequelize) |
| Kotlin | [Discord-Handler-Kt-Sequelize](https://github.com/RealMtrx/Discord-Handler-Kt-Sequelize) |
| C++ | [Discord-Handler-Cpp-Sequelize](https://github.com/RealMtrx/Discord-Handler-Cpp-Sequelize) |
| Dart | [Discord-Handler-Dart-Sequelize](https://github.com/RealMtrx/Discord-Handler-Dart-Sequelize) |
| Ruby | [Discord-Handler-Rb-Sequelize](https://github.com/RealMtrx/Discord-Handler-Rb-Sequelize) |
| Lua | [Discord-Handler-Lua-Sequelize](https://github.com/RealMtrx/Discord-Handler-Lua-Sequelize) |
| PHP | [Discord-Handler-Php-Sequelize](https://github.com/RealMtrx/Discord-Handler-Php-Sequelize) |

### Hub

| Repository | Description |
| ---------- | ----------- |
| [Discord-Handler](https://github.com/RealMtrx/Discord-Handler) | Central hub — documentation, examples, changelog, roadmap |

---

## License

MIT License — Copyright © 2026 Mtrx

---

<div align="center">
  <sub>Built by <strong>Mtrx</strong> — Discord: <strong>0hu2</strong></sub>
  <br>
  <sub><a href="https://github.com/RealMtrx/Discord-Handler">Discord Handler Ecosystem</a></sub>
</div>
