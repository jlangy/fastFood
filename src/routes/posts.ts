import express = require("express");
import mongoose from "mongoose";
import PostSchema from "../db/post";
import UserSchema from "../db/user";
import { getFormattedPost, sortPosts } from "../helpers";
import { getPostsByTagsAndLocation , voteForPost} from '../db/queries'
import { IPost, IUser } from "../interfaces";
const posts = express.Router();
//Hardcoded ID for now, user verification to be completed
const USER_ID = "5eead9d6d34bf31f58a86904";

const Post = mongoose.model<IPost>("Post", PostSchema);
const User = mongoose.model<IUser>("User", UserSchema);

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

posts.get("/", async (req, res) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const radius = Number(req.query.radius);
  const tags = req.query.tag as string[];
  const sort = String(req.query.sort);
  const filter = String(req.query.filter);
  try {
    let posts: IPost[];
    if(filter === 'saved'){
      const user = await User.findOne({_id: USER_ID}).populate('savedPosts') as IUser;
      posts = user.savedPosts;
    } else if (filter === 'created'){
      const user = await User.findOne({_id: USER_ID}).populate('createdPosts') as IUser;
      posts = user.createdPosts;
    } else {
      posts = await Post.find(
        getPostsByTagsAndLocation(tags, longitude, latitude, radius)
      );
    }
    const formattedPosts = posts.map(post => getFormattedPost(post, latitude, longitude));
    const sortedPosts = sortPosts(formattedPosts, sort)
    res.json({posts: sortedPosts, stores: posts.map(post => post.storename)});
  } catch (e) {
    res.status(500).send("db err");
  }
});

posts.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const { upvote, userId } = req.body;
  try {
    const [conditions, update] = voteForPost(upvote, userId, postId)
    await Post.findOneAndUpdate(conditions, update);
    res.send('success');
  } catch (e) {
    res.status(500).send(e);
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
    _id: new mongoose.mongo.ObjectID(),
    storename,
    address,
    tags,
    location,
    price,
    discountPrice,
  });
  try {
    const createdPost = await post.save();
    //@ts-ignore
    await User.findOneAndUpdate({_id: USER_ID}, {$push: {createdPosts: String(createdPost._id)}})
    res.send('success');
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});

module.exports = posts;
