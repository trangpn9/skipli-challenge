"use strict";
// import lib / third party / create global variable
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const config = require("./config");
const userRouters = require("./routers/users");

const app = express();
const port = config.port || 3600;

app.use(morgan("combined"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routers api
app.use("/api", userRouters.routers);

// listen app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
