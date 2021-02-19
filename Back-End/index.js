const express = require("express");
const bodyParse = require("body-parser");
const dbConnection = require("./connection/db");
const path = require("path");
const cors = require("cors");

/* DB Connection */
dbConnection.authenticate()
    .then(() => {
        console.log('Connection established successfully!');
    })
    .catch((err) => {
        console.log("unable to connect to DB");
    });

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "public"))); /* use public folder to serve web pages */

/* parse application/json and form-urlencoded */
/* parse application/x-www-form-urlencoded */
app.use(
    bodyParse.urlencoded({
        extended: true,
    })
);

/* parse application/json */
app.use(bodyParse.json());

/* api routes */
app.use("/api/user", require("./api/user"));
app.use("/api/movie", require("./api/movie"));

app.get("/*", (req,res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.listen(process.eventNames.port || 3000, () => console.log("Server is UP"));
