const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "drxkp1erj",
  api_key: "218187136849528",
  api_secret: "dF879L426Z38DnkBvSKuG_IcSCo",
});

exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};
