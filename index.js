const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

const MongodbConnection = require("./connection.js");
const path = require("path");

const staticRouter = require("./routes/staticRoute.js");
const userRouter = require("./routes/user.js");
const urlRouter = require("./routes/url.js");

const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

MongodbConnection(MONGO_URL);

app.use("/url", restrictToLoggedinUserOnly, urlRouter);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`));
