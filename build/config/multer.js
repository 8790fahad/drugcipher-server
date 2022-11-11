"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drugCipherUpload = undefined;

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cloudinary = require("cloudinary").v2;

var _require = require("multer-storage-cloudinary"),
    CloudinaryStorage = _require.CloudinaryStorage;

var cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "samples/shops",
    format: "png", // supports promises as well
    public_id: function public_id(req, file) {
      return file.originalname;
    }
  }
});
var drugCipherUpload = exports.drugCipherUpload = (0, _multer2.default)({ storage: cloudStorage });
//# sourceMappingURL=multer.js.map