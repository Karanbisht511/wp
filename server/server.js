require("dotenv").config();

const express = require("express");
const indexRouter = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./config");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/", indexRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
