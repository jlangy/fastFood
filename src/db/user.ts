import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  //For seed data, remove for prod
  _id: String,
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  // savedPosts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  //For seed data, remove for prod
  savedPosts: [{type: String, ref: 'Post', unique: true}],
  // createdPosts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  //For seed data, remove for prod
  createdPosts: [{type: String, ref: 'Post', unique: true}],
});

export default UserSchema;