import mongoose, { Schema } from 'mongoose';

function atLeastOne(val: string[]){
  return val.length > 0;
}

const PostSchema = new mongoose.Schema({
  upvotes: [{type: Schema.Types.ObjectId, ref: 'User', time: {type: Date, default: Date.now}}],
  downvotes: [{type: Schema.Types.ObjectId, ref: 'User', time: {type: Date, default: Date.now}}],
  tags: {type: [{type: Schema.Types.ObjectId, ref: 'Tag'}], validate: atLeastOne},
  address: {type: String, required: true},
  latitude: {type: String, required: true},
  longitude: {type: String, required: true}
});

export default PostSchema;