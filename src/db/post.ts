import mongoose, { Schema } from 'mongoose';

const PostSchema = new mongoose.Schema({
  upvotes: [{type: Schema.Types.ObjectId, ref: 'User', time: {type: Date, default: Date.now}}],
  downvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  address: {type: String, required: true},
  latitude: {type: String, required: true},
  longitude: {type: String, required: true}
});

module.exports = PostSchema;