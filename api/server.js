// BUILD YOUR SERVER HERE
const express = require("express");

//import model
const User = require("./users/model.js");

//instance of server
const server = express();
server.use(express.json());

// [GET] user by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  //   console.log("req.params: ", id);
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "404 user does not exist" });
      } else res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// [GET] all users
server.get("/api/users", (req, res) => {
  //   res.status(200).json({ message: "get /api/users works" });
  User.find()
    .then((users) => {
      //   console.log("users --> ", users);
      if (users) {
        res.json(users);
      } else throw new Error();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// [POST] new user
server.post("/api/users", (req, res) => {
  // newUser object submitted in POST request
  const newUser = req.body;
  //   console.log("new user name: ", newUser.name, "new user bio: ", newUser.bio);
  if (!newUser.name || !newUser.bio) {
    res.status(400).json({ message: "provide name and bio" });
  } else
    User.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
});

// [DELETE] user
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  User.remove(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "user does not exist" });
      } else res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// [PUT] existing user
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.name || !changes.bio) {
    res.status(400).json({ message: "provide name and bio" });
  } else {
    User.update(id, changes)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "does not exist" });
        } else res.json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
});

//Hello world endpoint
server.use("*", (req, res) => {
  res.status(404).json({ message: "404 Resource Not Found" });
});

// EXPORT YOUR SERVER
module.exports = server;
