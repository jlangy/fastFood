import express = require('express');
const posts = express.Router();

posts.get('/:id', (req,res) => {
  //TODO: create new post
  res.send('got /posts/:id')
})

posts.get('/', (req, res) => {
  //TODO: return relevant posts
  res.send('got /posts')
});

posts.post('/', (req,res) => {
  //TODO: create new post
  res.send('posted /posts')
})

module.exports = posts;