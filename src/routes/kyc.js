const {  drugCipherUpload } = require("../config/multer");
const {
  createCompony,
  createNewsLetterFun,
  updateKycPL,
  updateKycSP,
  getPendingKYC,
} = require("../controllers/kyc");

module.exports = (app) => {
  app.post("/api/v1/create-company", createCompony);
  app.post("/api/v1/create-news-letter", createNewsLetterFun);
  app.put("/api/v1/upload-pl-url",  drugCipherUpload.single("image"),updateKycPL);
  app.put('/api/v1/upload-sp-url',drugCipherUpload.single("image"),updateKycSP);
  app.get('/api/v1/get-pending-kyc',getPendingKYC)
};
