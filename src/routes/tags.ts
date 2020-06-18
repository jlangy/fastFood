import express = require("express");
import mongoose from "mongoose";
import { IPost } from "../interfaces";
import PostSchema from "../db/post";
const tag = express.Router();

const Post = mongoose.model<IPost>("Post", PostSchema);

tag.get("/", async (req, res) => {
  const longitude = Number(req.query.longitude);
  const latitude = Number(req.query.latitude);
  const radius = Number(req.query.radius);
  const isSearcher: string = String(req.query.searcher);
  if (isSearcher) {
    try {
      const tags = await Post.aggregate([
        {
          $geoNear: {
            includeLocs: "location",
            distanceField: "distance",
            near: { type: "Point", coordinates: [longitude, latitude] },
            maxDistance: radius,
            spherical: true,
          },
        },
        {
          $unwind: {
            path: '$tags'
          },
        },
        {
          $group: {
            _id: null,
            tags: { $addToSet: "$tags"}
          },
        },
      ]);
      res.json({tags: tags[0].tags});
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
    //Loop through posts, build object of tags within radius as object, tagName: numOfPosts
  }
});

module.exports = tag;
