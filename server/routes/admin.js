const express = require("express");
const Router = express.Router();

const adminController = require("../controllers/adminController");
console.log("admin");
Router.get("/login", adminController.Login);
Router.post("/signup", adminController.Signup);

module.exports = Router;
