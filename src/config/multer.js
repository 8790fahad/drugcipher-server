const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import multer   from 'multer'

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "samples/shops",
    format: "png", // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});
export const drugCipherUpload = multer({ storage: cloudStorage });
