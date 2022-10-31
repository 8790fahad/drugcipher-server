const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import multer   from 'multer'

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "drugcipher/folder",
    format: "png", // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});



var storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'src/uploads')
    // cb(null, '/config')
  },

  // destination: '/tmp/my-uploads', .single('avatar')

  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

export const upload = multer({ storage })
export const coopsUpload = multer({ storage: cloudStorage });
