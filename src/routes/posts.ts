import express = require('express');
import mongoose from 'mongoose';
import PostSchema from '../db/post';
import { convertLatLongToDistance } from '../helpers';
const posts = express.Router();


interface IPost extends mongoose.Document {
  tags: string[],
  address: string,
  latitude: string,
  longitude: string
}

const Post = mongoose.model<IPost>('Post', PostSchema);

posts.get('/:id', async (req,res) => {
  const id = req.params.id;
  const Post = mongoose.model('Post', PostSchema);
  let post;
  try{
    post = await Post.findOne({_id: id});
    res.json(post)
  } catch {
    res.send('bad id')
  }
})

posts.get('/', async (req, res) => {
  const tags = req.query.tag as string[];
  let posts;
  let closestPosts: IPost[] = [];
  try {
    posts = await Post.find({tags: {$in: tags}});
    posts.forEach((post: IPost) => {
      const distance = convertLatLongToDistance(Number(post.latitude), Number(req.query.latitude), Number(post.longitude), Number(req.query.longitude));
      if(distance < 20000){
        closestPosts.push(post);
      }
    })
    res.send(closestPosts)
  } catch {
    res.status(500).send('db err')
  }
  // res.send('got /posts')

});

posts.post('/', async (req,res) => {
  //TODO: create new post
  const post = new Post({...req.body});
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
