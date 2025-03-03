require("dotenv").config();
const sequelize = require("./database");
const Establishment = require("../models/Establishment");


async function syncDatabase() {

    try{
        await sequelize.sync({ alter: true });
        console.log("Database synchronized successfully");
    }catch (error){
        console.error("Database synchronization error:", error);
    } finally{
        await sequelize.close();
    }
}

syncDatabase();