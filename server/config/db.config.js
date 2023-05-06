module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Adina1",
    DB: "covid_management",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }; 