import express = require('express');
import mongoose from 'mongoose';
import PostSchema from '../db/post';
import { getTagIds } from '../helpers';
const posts = express.Router();

posts.get('/:id', (req,res) => {
  //TODO: create new post
  res.send('got /posts/:id')
})

posts.get('/', (req, res) => {
  //TODO: return relevant posts
  res.send('got /posts')
});

posts.post('/', async (req,res) => {
  //TODO: create new post
  const Post = mongoose.model('User', PostSchema);
  const tags = await getTagIds(req.body);
  const post = new Post({...req.body, tags});
  post.save((err, user) => {
    if(err) {
      console.error('save error:', err);
      return res.status(500).send(err);
    } else {
      console.log(`${user} saved successfully`);
      res.send('success')
    }
  })
})

module.exports = posts;