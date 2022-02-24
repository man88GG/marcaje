module.exports = {
  USER: "root",
  HOST: "localhost",
  PASSWORD: "",
  DB: "dbregistro",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
