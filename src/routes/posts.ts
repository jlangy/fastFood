import express = require("express");
import mongoose from "mongoose";
import PostSchema from "../db/post";
import { getFormattedPost } from "../helpers";
import { getPostsByTagsAndLocation } from '../db/queries'
import { IPost } from "../interfaces";
const posts = express.Router();

const Post = mongoose.model<IPost>("Post", PostSchema);

posts.get("/:id", async (req, res) => {
  const id = req.params.id;
  let post: IPost;
  try {
    post = (await Post.findOne({ _id: id })) as IPost;
    res.json(
      getFormattedPost(
        post,
        Number(req.query.latitude),
        Number(req.query.longitude)
      )
    );
  } catch {
    res.send("bad id");
  }
});

posts.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const { upvote, userId } = req.body;
  try {
    const voteType = upvote ? "upvotes" : "downvotes";
    const oppositeVoteType = upvote ? "downvotes" : "upvotes";
    await Post.findOneAndUpdate(
      { 
        _id: postId,
        [`${voteType}.User`]: {$ne: userId}
      },
      { 
        $addToSet: { [voteType]: { User: userId } },
        $pull: { [oppositeVoteType]: {User: userId} }
      }
    );
    res.send('success');
  } catch (e) {
    res.status(500).send(e);
  }
});

posts.get("/", async (req, res) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const radius = Number(req.query.radius);
  const tags = req.query.tag as string[];
  let posts: IPost[];
  try {
    posts = await Post.find(
      getPostsByTagsAndLocation(tags, longitude, latitude, radius)
    );
    res.json({posts: posts.map(post => getFormattedPost(post, latitude, longitude)), stores: posts.map(post => post.storename)});
  } catch (e) {
    res.status(500).send("db err");
  }
});

posts.post("/", async (req, res) => {
  //TODO: create new post
  const {
    storename,
    address,
    tags,
    latitude,
    longitude,
    price,
    discountPrice,
  } = req.body;
  const location = [Number(longitude), Number(latitude)];
  const post = new Post({
    storename,
    address,
    tags,
    location,
    price,
    discountPrice,
  });
  try {
    await post.save();
    res.send('success');
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = posts;
