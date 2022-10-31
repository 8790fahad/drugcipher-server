const { createCompony } = require("../controllers/kyc");

module.exports = (app) => {
  app.post("/api/v1/create-company", createCompony);
};
