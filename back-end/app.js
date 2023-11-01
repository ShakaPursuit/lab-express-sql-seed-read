const cors = require("cors");
const express = require("express");
const songController= require('./controllers/songController')


const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to the Song App");
});
app.use("/songs", songController);

// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;