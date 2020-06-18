import express = require("express");
import mongoose from "mongoose";
import PostSchema from "../db/post";
import { getFormattedPost } from "../helpers";
import { getPostsByTagsAndLocation } from '../db/queries'
import { IPost } from "../interfaces";
const posts = express.Router();
const USER_ID = "5eea56183d06b940dd4509bf";

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
    if (upvote) {
      await Post.updateOne(
        { _id: postId },
        { $push: { upvotes: { User: userId } } }
      );
      res.send("upvoted");
    } else {
      await Post.updateOne(
        { _id: postId },
        { $push: { downvotes: { User: userId } } }
      );
      res.send("downvoted");
    }
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
    res.json({posts, stores: posts.map(post => post.storename)});
  } catch (e) {
    console.log(e)
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
  post.save((err, user) => {
    if (err) {
      console.error("save error:", err);
      return res.status(500).send(err);
    } else {
      console.log(`${user} saved successfully`);
      res.send("success");
    }
  });
});

module.exports = posts;
