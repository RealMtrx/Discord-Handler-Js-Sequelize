import fs from "fs";
import path from "path";
import chalk from "chalk";
import { getSequelize } from "../Database/sequelize.js";

export default async () => {
    const modelsPath = path.join(process.cwd(), "src", "Models");
    if (!fs.existsSync(modelsPath)) {
        console.log(chalk.yellow("[Models] No models found"));
        return 0;
    }

    const modelFiles = fs.readdirSync(modelsPath).filter(file => file.endsWith(".js"));
    for (const file of modelFiles) {
        await import(`../Models/${file}`);
    }

    const sequelize = getSequelize();
    await sequelize.sync({ alter: false });
    console.log(chalk.green(`[Models] ${modelFiles.length} models loaded & synced`));

    return modelFiles.length;
};
