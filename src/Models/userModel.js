import { DataTypes } from "sequelize";
import { getSequelize } from "../Database/sequelize.js";

const sequelize = getSequelize();

const User = sequelize.define("User", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

export default User;
