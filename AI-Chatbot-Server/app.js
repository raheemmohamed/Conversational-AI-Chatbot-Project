const express = require("express");
const path = require("path");
const cors = require("cors");

require("./configs/mongoose.config");

const organizationRouter = require("./routes/organization.route");

// controller
const organizationController = require("./controllers/organization.controller");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS origin whitelisting: add your localdev server url with port: Angular default http://localhost:4200
// ========= References ===========
// const whitelist = [
//   "http://inproto.net",
//   "https://inproto.net",
//   "http://127.0.0.1:5500",
//   "http://localhost:5500",
//   "http://localhost:4200",
// ];
// =================================

let whitelist = ["http://localhost:4200"];

async function getAllOrganizationWebsiteURl() {
  const organizationWebsiteURLS =
    await organizationController.getAllOrganizationWebsitURL();

  if (!organizationWebsiteURLS) return;

  for (let organizaiton of organizationWebsiteURLS) {
    organizaiton.organizationWebsite.forEach((orgUrl) => {
      whitelist.push(orgUrl);
    });
  }
}
// Use this if you want to allow access for specific urls only
// app.use(
//   cors({
//     origin: async function (origin, callback) {
//       console.log("Check my whitelist", whitelist);
//       whitelist = ["http://localhost:4200"];
//       await getAllOrganizationWebsiteURl();
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );
// otherwise allow access to all
app.use(cors());

// ExpressJS middleware for check and parse the incomming request string in to JSON in payload
app.use(express.json());

// public path for pull assets
// app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/organization", organizationRouter);

module.exports = {
  app,
  PORT,
};
