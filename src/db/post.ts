import mongoose, { Schema } from 'mongoose';

const PostSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  upvotes: [{type: Schema.Types.ObjectId, ref: 'User', time: {type: Date, default: Date.now}}],
  downvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  address: String,
  latitude: String,
  longitude: String
});

module.exports = PostSchema;