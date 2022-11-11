"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _models = require("./models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");
require("babel-polyfill");
var cloudinary = require("cloudinary");
var hbs = require("nodemailer-express-handlebars");
var nodemailer = require("nodemailer");
var path = require("path");
var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

var port = process.env.PORT || 34561;

// set the view engine to ejs
app.set("view engine", "ejs");

// make express look in the public directory for assets (css/js/img)
app.use(_express2.default.static(__dirname + "/public"));

app.use((0, _cors2.default)());

// initialize nodemailer
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "8790fahadado@gmail.com",
    pass: "ahjdonxvjbfeamzu"
  }
});

// point to the template folder
var handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./src/views"),
    defaultLayout: false
  },
  viewPath: path.resolve("./src/views")
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));
// force: true will drop the table if it already exits
// models.sequelize.sync({ force: true }).then(() => {
_models2.default.sequelize.sync().then(function () {
  console.log("Drop and Resync with {force: true}");
});

// passport middleware
app.use(_passport2.default.initialize());

// passport config
require("./config/passport")(_passport2.default);
exports.transporter = transporter;
//default route

app.get("/", function (req, res) {
  return res.send("Hello my World");
});
cloudinary.config({
  cloud_name: "drxkp1erj",
  api_key: "218187136849528",
  api_secret: "dF879L426Z38DnkBvSKuG_IcSCo"
});
require("./routes/user.js")(app);
require("./routes/kyc.js")(app);

//create a server
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
//# sourceMappingURL=index.js.map