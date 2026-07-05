import fs from "fs";
import path from "path";
import chalk from "chalk";

export default async (client) => {
    const eventsPath = path.join(process.cwd(), "src", "Events");
    if (!fs.existsSync(eventsPath)) {
        console.log(chalk.yellow("[Events] No events found"));
        return 0;
    }

    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

    for (const file of eventFiles) {
        const event = (await import(`../Events/${file}`)).default;
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }

    console.log(chalk.green(`[Events] ${eventFiles.length} events loaded`));

    return eventFiles.length;
};
