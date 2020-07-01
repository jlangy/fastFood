import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedPosts: [{ type: String, ref: "Post" }],
  createdPosts: [{ type: String, ref: "Post" }],
  status: String
});

export default UserSchema;
