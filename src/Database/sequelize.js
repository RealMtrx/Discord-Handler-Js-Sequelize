import { Sequelize } from "sequelize";
import config from "../config.js";
import chalk from "chalk";

let sequelize;

export function getSequelize() {
    if (sequelize) return sequelize;

    const db = config.DB;

    if (db.dialect === "sqlite") {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: db.storage,
            logging: db.logging
        });
    } else {
        sequelize = new Sequelize(db.database, db.username, db.password, {
            host: db.host,
            port: db.port,
            dialect: db.dialect,
            logging: db.logging
        });
    }

    return sequelize;
}

export default async () => {
    try {
        const seq = getSequelize();
        await seq.authenticate();
        console.log(chalk.green(`[Database] Connected (${config.DB.dialect})`));
        return true;
    } catch (error) {
        console.error(chalk.red(`[Database] Connection failed: ${error.message}`));
        return false;
    }
};
