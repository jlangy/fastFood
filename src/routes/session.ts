import express = require('express');
const session = express.Router();

session.post('/', (req, res) => {
  //TODO: login user when posting session
  res.send('posted /session')
});

module.exports = session;