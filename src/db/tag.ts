import mongoose, { Schema } from 'mongoose';

const TagSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true}
});

module.exports = TagSchema;