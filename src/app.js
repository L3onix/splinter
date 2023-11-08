const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const auth = require("./routes/AuthRoute");
const user = require("./routes/UserRoute");
const dbConnection = require("./helpers/dbConnection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConnection();

app.get("/", async (req, res) => {
    res.send("hello world");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", auth);
app.use("/user", user);

module.exports = app;
