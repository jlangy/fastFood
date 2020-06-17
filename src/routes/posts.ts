import express = require('express');
import mongoose from 'mongoose';
import PostSchema from '../db/post';
import { convertLatLongToDistance, sortPosts } from '../helpers';
import {IPost, IReturnPost} from '../interfaces';
const posts = express.Router();
const USER_ID = "5eea56183d06b940dd4509bf"

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

posts.put('/:id', async (req,res) => {
  console.log('upvotes route')
  const postId = req.params.id;
  const {upvote, userId} = req.body;
  try {
    if(upvote){
      await Post.updateOne({_id: postId} , {$push: {upvotes: {User: userId}}})
      res.send('upvoted')
    } else {
      await Post.updateOne({_id: postId} , {$push: {downvotes: {User: userId}}})
      res.send('downvoted')
    }
  } catch (e) {
    console.log('upvote error', e)
    res.status(500).send(e)
  }
})

posts.get('/', async (req, res) => {
  const tags = req.query.tag as string[];
  let posts: IPost[], stores: string[] = [];
  let closestPosts: IReturnPost[] = [];
  try {
    posts = await Post.find({tags: {$in: tags}});
    posts.forEach((post: IPost) => {
      const distance: number = convertLatLongToDistance(Number(post.latitude), Number(req.query.latitude), Number(post.longitude), Number(req.query.longitude));
      let userLikedPost = post.upvotes.some(upvote => upvote.User == USER_ID);
      let userDislikedPost = post.downvotes.some(downvote => downvote.User === USER_ID);
      if(distance < 2000000){
        const {tags, address, latitude, longitude, storename} = post;
        closestPosts.push({tags, address, latitude, longitude, distance, userLikedPost, userDislikedPost, storename});
        stores.push(storename);
      }
    })
    res.send({posts: sortPosts(closestPosts), stores})
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
