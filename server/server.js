require("dotenv").config();

const express = require("express");
const indexRouter = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const db = require("./config");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.json());
// app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.urlencoded({ extended: true }));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/", indexRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
