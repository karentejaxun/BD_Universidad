module.exports = {
  HOST: "ep-lingering-hat-a44lmlbu-pooler.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_i5SeJYcopL7U",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};