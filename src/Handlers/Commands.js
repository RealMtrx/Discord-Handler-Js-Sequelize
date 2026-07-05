import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import config from "../config.js";
import chalk from "chalk";

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith(".js")) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

export default async (client) => {
    const slashCommands = [];
    const commandsPath = path.join(process.cwd(), "src", "Commands", "Slash");

    if (!fs.existsSync(commandsPath)) {
        console.log(chalk.yellow("[Slash] No commands found"));
        return 0;
    }

    const commandFiles = getAllFiles(commandsPath);

    for (const file of commandFiles) {
        const fileURL = pathToFileURL(file).href;
        const command = (await import(fileURL)).default;
        if (command?.data) {
            client.commands.set(command.data.name, command);
            slashCommands.push(command.data.toJSON());
        }
    }

    console.log(chalk.green(`[Slash] ${slashCommands.length} commands loaded`));

    try {
        const rest = new REST({ version: "10" }).setToken(config.token);
        if (slashCommands.length) {
            await rest.put(Routes.applicationCommands(config.clientId), { body: slashCommands });
            console.log(chalk.green("[Slash] Registered with Discord API"));
        }
    } catch (e) {
        console.error(chalk.red("[Slash] Failed to register:"), e.message);
    }

    return slashCommands.length;
};
