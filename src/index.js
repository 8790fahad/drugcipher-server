import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import models from "./models";
const cloudinary = require("cloudinary");
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
app.use(bodyParser.json());

let port = process.env.PORT || 34567;

// set the view engine to ejs
app.set("view engine", "ejs");

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + "/public"));

app.use(cors());

// initialize nodemailer
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "8790fahadado@gmail.com",
    pass: "ahjdonxvjbfeamzu",
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./src/views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/views"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));
// force: true will drop the table if it already exits
// models.sequelize.sync({ force: true }).then(() => {
models.sequelize.sync().then(() => {
  console.log("Drop and Resync with {force: true}");
});

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);
export { transporter };
//default route
app.get("/", (req, res) => res.send("Hello my World"));
cloudinary.config({
  cloud_name: "drxkp1erj",
  api_key: "218187136849528",
  api_secret: "dF879L426Z38DnkBvSKuG_IcSCo",
});
require("./routes/user.js")(app);
require("./routes/kyc.js")(app);

//create a server
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
