import express = require('express');
import mongoose from 'mongoose';
import PostSchema from '../db/post';
import TagSchema from '../db/tag';
import { getTagIds } from '../helpers';
const posts = express.Router();

posts.get('/:id', async (req,res) => {
  const id = req.params.id;
  const Post = mongoose.model('Post', PostSchema);
  const Tag = mongoose.model("Tag", TagSchema)
  const post = await Post.findOne({_id: id}).populate('tags');
  res.json(post)
})

posts.get('/', (req, res) => {
  console.log(req.body.params)
  res.send('got /posts')
});

posts.post('/', async (req,res) => {
  //TODO: create new post
  const Post = mongoose.model('Post', PostSchema);
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
