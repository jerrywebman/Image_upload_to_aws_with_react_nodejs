const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const dbConfig = require("./config/dbconfig");
require("dotenv").config();
const cookieParser = require("cookie-parser");

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//routes
//cors allows us to call data/api from cross domains
app.use(cors({ origin: "*" }));
// Add headers
app.use(function (req, res, next) {

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

const profile = require("./routes/profile");
app.use(profile);

const PORT = process.env.PORT || 4000;

app.listen(
    PORT,
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
);

