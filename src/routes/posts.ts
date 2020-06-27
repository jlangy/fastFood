import express = require("express");
import mongoose from "mongoose";
import PostSchema from "../db/post";
import UserSchema from "../db/user";
import { getFormattedPost, sortPosts } from "../helpers";
<<<<<<< HEAD
import {
  getPostsByTagsAndLocation,
  voteForPost,
  removeVoteForPost,
} from "../db/queries";
=======
import { getPostsByTagsAndLocation , voteForPost, removeVoteForPost, getPostsByLocation} from '../db/queries'
>>>>>>> 0a266ab3decf3b16d56397187257bc9169d77f81
import { IPost, IUser } from "../interfaces";
const posts = express.Router();
//Hardcoded ID for now, user verification to be completed
const USER_ID = "5eead9d6d34bf31f58a86904";

const Post = mongoose.model<IPost>("Post", PostSchema);
const User = mongoose.model<IUser>("User", UserSchema);

posts.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [post, user] = await Promise.all([
      Post.findOne({ _id: id }),
      User.findOne({ _id: USER_ID }),
    ]);
    res.json(
      getFormattedPost(
        <IPost>post,
        <IUser>user,
        Number(req.query.latitude),
        Number(req.query.longitude)
      )
    );
  } catch {
    res.send("bad id");
  }
});

posts.get("/", async (req, res) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const radius = Number(req.query.radius);
  const tags = req.query.tag as string[];
  const sort = String(req.query.sort);
  const filter = String(req.query.filter);
  try {
    let posts: IPost[] | null;
    let user: IUser | null;
    if(filter === 'saved'){
      user = await User.findOne({_id: USER_ID}).populate('savedPosts') as IUser;
      posts = <unknown>user.savedPosts as IPost[];
    } else if (filter === 'created'){
      user = await User.findOne({_id: USER_ID}).populate('createdPosts') as IUser;
      posts = <unknown>user.createdPosts as IPost[];
    } else if(tags && tags.length > 0){
      [posts, user] = await Promise.all([Post.find(getPostsByTagsAndLocation(tags, longitude, latitude, radius)), User.findOne({_id: USER_ID})]);
    } else {
      [posts, user] = await Promise.all([Post.find(getPostsByLocation(longitude, latitude, radius)), User.findOne({_id: USER_ID})]);
    }
    if (!posts || !user) {
      throw new Error("resource not found");
    }
    //@ts-ignore
    const formattedPosts = posts.map((post) =>
      getFormattedPost(post, user, latitude, longitude)
    );
    const sortedPosts = sortPosts(formattedPosts, sort);
    res.json({
      posts: sortedPosts,
      stores: posts.map((post) => post.storename),
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("db err");
  }
});

posts.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const { upvote, userId, remove } = req.body;
  try {
    let conditions, update;
    if (remove) {
      [conditions, update] = removeVoteForPost(postId, userId, upvote);
    } else {
      [conditions, update] = voteForPost(upvote, userId, postId);
    }
    await Post.findOneAndUpdate(conditions, update);
    res.send("success");
  } catch (e) {
    res.status(500).send(e);
  }
});

posts.post("/", async (req, res) => {
  const {
    storename,
    address,
    tags,
    latitude,
    longitude,
    price,
    discountPrice,
    imageUrl,
  } = req.body;
  const location = [Number(longitude), Number(latitude)];
  const post = new Post({
    _id: new mongoose.mongo.ObjectID(),
    storename,
    address,
    tags,
    location,
    price,
    discountPrice,
    imageUrl,
  });
  try {
    const createdPost = await post.save({});
    await User.findOneAndUpdate(
      { _id: USER_ID },
      { $push: { createdPosts: String(createdPost._id) } }
    );
    res.send("success");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = posts;
