"use strict";

var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "drxkp1erj",
  api_key: "218187136849528",
  api_secret: "dF879L426Z38DnkBvSKuG_IcSCo"
});

exports.uploads = function (file) {
  return new Promise(function (resolve) {
    cloudinary.uploader.upload(file, function (result) {
      resolve({ url: result.url, id: result.public_id });
    }, { resource_type: "auto" });
  });
};
//# sourceMappingURL=cloudinary.js.map