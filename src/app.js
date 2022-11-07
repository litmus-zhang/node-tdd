const express = require("express");
const UserRouter = require("./User/UserRouter");
const app = express();

app.use(express.json());
app.use(UserRouter);

module.exports = app;
