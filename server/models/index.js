const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Employee = require("./employee.js")(sequelize, Sequelize);

(async () => {
  try {
    // await db.sequelize.sync({force: true}); // notice the force: true and read what it does
    // await db.sequelize.sync()
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("An error occurred while synchronizing the models:", error);
  }
})();

module.exports = db;