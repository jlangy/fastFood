import express = require('express');
import mongoose from 'mongoose';
import UserSchema from '../db/user';
import { IUser } from '../interfaces';

const User = mongoose.model<IUser>("User", UserSchema);
const users = express.Router();

users.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save(); 
    res.send('success')
  } catch (e) {
    console.log(e);
    res.status(500).send('db err');
  }
});

users.put('/:id', async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const postId = req.body.postId;
  const saving = req.body.saving;
  try {
    if(saving){
      //@ts-ignore
      await User.findOneAndUpdate({_id: userId}, {$addToSet: {savedPosts: String(postId)}})
    } else {
      //@ts-ignore
      await User.findOneAndUpdate({_id: userId}, {$pull: {savedPosts: String(postId)}})
    }
    res.send('success')
  } catch (e) {
    console.error(e)
    res.status(500).send('err');
  }
})

module.exports = users;