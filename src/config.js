import "dotenv/config";

export default {
    token: process.env.TOKEN || "#",
    clientId: process.env.CLIENT_ID || "#",
    botName: process.env.BOT_NAME || "Discord Handler",
    prefix: process.env.PREFIX || "$",
    ownerIds: (process.env.OWNER_IDS || "#").split(",").map(id => id.trim()),
    errorWebhook: process.env.ERROR_WEBHOOK || "#",
    slashCommandWebhook: process.env.SLASH_COMMAND_WEBHOOK || "#",
    prefixCommandWebhook: process.env.PREFIX_COMMAND_WEBHOOK || "#",
    joinGuildWebhook: process.env.JOIN_GUILD_WEBHOOK || "#",
    leaveGuildWebhook: process.env.LEAVE_GUILD_WEBHOOK || "#",
    readyWebhook: process.env.READY_WEBHOOK || "#",
    DB: {
        dialect: process.env.DB_DIALECT || "sqlite",
        storage: process.env.DB_STORAGE || "./database.sqlite",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_DATABASE || "discord_bot",
        logging: process.env.DB_LOGGING === "true"
    }
};
