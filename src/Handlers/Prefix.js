import fs from "fs";
import path from "path";
import chalk from "chalk";

export default async (client) => {
    const commandsPath = path.join(process.cwd(), "src", "Commands", "Prefix");
    if (!fs.existsSync(commandsPath)) {
        console.log(chalk.yellow("[Prefix] No commands found"));
        return 0;
    }

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

    const commandFiles = getAllFiles(commandsPath);

    for (const file of commandFiles) {
        const command = (await import(`file:///${file.replace(/\\/g, "/")}`)).default;
        if (command && command.name) {
            client.prefixCommands.set(command.name, command);
        }
    }

    console.log(chalk.green(`[Prefix] ${client.prefixCommands.size} commands loaded`));

    return client.prefixCommands.size;
};
