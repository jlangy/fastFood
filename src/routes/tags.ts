import express = require("express");
import mongoose from "mongoose";
import { IPost } from "../interfaces";
import PostSchema from "../db/post";
import { getTagsByLocation, getAllTags } from '../db/queries'
const tag = express.Router();

const Post = mongoose.model<IPost>("Post", PostSchema);

//TODO: selector interface
async function fetchAndSendTags(selector: any[], res: express.Response){
  try {
    const tags = await Post.aggregate(selector);
    res.json({tags: tags[0].tags});
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

tag.get("/", async (req, res) => {
  const longitude = Number(req.query.longitude);
  const latitude = Number(req.query.latitude);
  const radius = Number(req.query.radius);
  const isSearcher = Boolean(Number(req.query.searcher));
  //Return local tags for searchers, return all tags for posters.
  if (isSearcher) {
    fetchAndSendTags(getTagsByLocation(longitude, latitude, radius), res);
  } else {
    fetchAndSendTags(getAllTags(), res);
  }
});

module.exports = tag;
