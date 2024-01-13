const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import multer   from 'multer'
cloudinary.config({
  cloud_name: "drxkp1erj",
  api_key: "218187136849528",
  api_secret: "dF879L426Z38DnkBvSKuG_IcSCo",
});
const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "samples/shops",
    format: "png", // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});
export const drugCipherUpload = multer({ storage: cloudStorage });
