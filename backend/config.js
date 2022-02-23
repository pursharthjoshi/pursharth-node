module.exports = {
  port: 8080,
  db: {
    prod: process.env.DATABASE_URL || "mongodb://localhost/exampleapp",
    test: "mongodb://localhost/exampleapp_test",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "development_secret",
    expiry: "7d",
  },

  clientUrl: "http://localhost:3000",
};
