import express = require('express');
import mongoose from 'mongoose';
import PostSchema from '../db/post';
import TagSchema from '../db/tag';
const posts = express.Router();

interface Post {
  tags: string[],
  address: string,
  latitude: string,
  longitude: string
}

//Retrieve ref id's, create tag if it doesn't exist
function getTagIds(post: Post){
  const tags: string[] = [];
  const Tag = mongoose.model('Tag', TagSchema);
  return new Promise(async (resolve, reject) => {
    for(let tag of post.tags){
      const tagExists = await Tag.findOne({name: tag})
      if(!tagExists){
        //Create new tag if doesnt exist
        const newTag = new Tag({name: tag})
        await newTag.save((err, tag) => {
          if(err) reject('saving tag failed');
          else tags.push(tag._id);
        });
      } else {
        tags.push(tagExists._id)
      }
    }
    resolve(tags)
  })
}

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