import express = require('express');
const users = express.Router();

users.post('/', (req, res) => {
  //TODO: register user when posting users
  res.send('posted /users')
});

module.exports = users;