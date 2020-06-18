import express = require('express');
import mongoose from 'mongoose';
import UserSchema from '../db/user';

const users = express.Router();

interface User {
  name: number,
  email: string,
  gibberish: string
}

users.post('/', (req, res) => {
  const User = mongoose.model('User', UserSchema);
  const user = new User(req.body);
  user.save((err, user) => {
    if(err) {
      console.error('save error:', err);
      return res.status(500).send(err);
    } else {
      console.log(`${user} saved successfully`);
    }
  })
  //TODO: register user when posting users
  res.send('posted /users')
});

module.exports = users;