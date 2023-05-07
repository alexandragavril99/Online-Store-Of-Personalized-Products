require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const router = require("./routes");

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(mongoSanitize());

app.use(xss());

app.use("/api", router);

module.exports = app;
