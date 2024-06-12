//Did  npm install express cors body-parser

const express = require("express");
const app = express();
// const port = 8000; // You can choose any port
require("dotenv/config");
const cors = require("cors");
const bodyParser = require("body-parser");
// const { connectToDatabase } = require("./lib/database/index");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
};

// connectToDatabase();

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hello from the Node.js backend!");
});

app.get("/products", (req, res) => {
    res.send("Hello from the products page!");
});

app.get("/products/:productId", (req, res) => {
    const id = req.params.productId;
    res.send(`Hello from the product detail page of id ${id} !`);
});

const port = process.env.PORT || 8000; // const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port number ${port}`);
});

module.exports = app;
