import mongoose, { Schema } from 'mongoose';

function atLeastOne(val: string[]){
  return val.length > 0;
}

const PostSchema = new mongoose.Schema({
  upvotes: [{User: {type: Schema.Types.ObjectId, ref: 'User'}, time: {type: Date, default: Date.now}}],
  downvotes: [{User: {type: Schema.Types.ObjectId, ref: 'User'}, time: {type: Date, default: Date.now}}],
  tags: {type: [String], validate: atLeastOne},
  address: {type: String, required: true},
  storename: {type: String, required: true},
  location: { type: [Number], index: '2d'},
  price: { type: Number, required: true},
  discountPrice: { type: Number, required: true},
  createdAt: {type: Date, default: Date.now}
});

export default PostSchema;