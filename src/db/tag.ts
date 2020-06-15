import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  name: {type: String, unique: true}
});

export default TagSchema;