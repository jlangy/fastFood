import mongoose, { Schema } from 'mongoose';

const TagSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
});

module.exports = TagSchema;