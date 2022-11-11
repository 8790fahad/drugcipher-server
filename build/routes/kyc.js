"use strict";

var _require = require("../config/multer"),
    drugCipherUpload = _require.drugCipherUpload;

var _require2 = require("../controllers/kyc"),
    createCompony = _require2.createCompony,
    createNewsLetterFun = _require2.createNewsLetterFun,
    updateKycPL = _require2.updateKycPL,
    updateKycSP = _require2.updateKycSP,
    getPendingKYC = _require2.getPendingKYC,
    updateKycAppproved = _require2.updateKycAppproved,
    updateKycReject = _require2.updateKycReject,
    regeneratePassPhrase = _require2.regeneratePassPhrase,
    recoverAccount = _require2.recoverAccount,
    loadWithToken = _require2.loadWithToken;

module.exports = function (app) {
  app.post("/api/v1/create-company", createCompony);
  app.post("/api/v1/create-news-letter", createNewsLetterFun);
  app.put("/api/v1/upload-pl-url", drugCipherUpload.single("image"), updateKycPL);
  app.put("/api/v1/upload-sp-url", drugCipherUpload.single("image"), updateKycSP);
  app.get("/api/v1/get-pending-kyc", getPendingKYC);
  app.put("/api/v1/approved-kyc", updateKycAppproved);
  app.put("/api/v1/reject-kyc", updateKycReject);
  app.get("/api/v1/regenerate-passphrase", regeneratePassPhrase);
  app.post("/api/v1/recover-account-passphrass", recoverAccount);
  app.get("/api/v1/load-with-token", loadWithToken);
};
//# sourceMappingURL=kyc.js.map