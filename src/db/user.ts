import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  savedPosts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  createdPosts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
});

export default UserSchema;