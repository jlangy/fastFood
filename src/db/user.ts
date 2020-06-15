import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  savedPosts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  createdPosts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
});

module.exports = UserSchema;