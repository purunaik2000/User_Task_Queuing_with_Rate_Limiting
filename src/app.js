const express = require("express");
const client = require("./configs/redisConfig");
const route = require("./router");

const app = express();

app.use(express.json());
app.use("/api/v1/", route);

const start = () => {
  client.connect();
  app.listen(3000, (err) =>
    err ? console.log(err.message) : console.log("Application started...")
  );
};

module.exports.start = start;
