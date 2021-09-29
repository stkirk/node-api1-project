// BUILD YOUR SERVER HERE
const express = require("express");

//import model

//instance of server
const server = express();
server.use(express.json());

//Hello world endpoint
server.use("*", (req, res) => {
  res.status(404).json({ message: "404 Resource Not Found" });
});

// EXPORT YOUR SERVER
module.exports = server;
