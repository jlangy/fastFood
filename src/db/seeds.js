const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
require('dotenv').config();

function atLeastOne(val){
  return val.length > 0;
}

const PostSchema = new mongoose.Schema({
  //For seeding test data only. Remove to have mongoose auto-generate
  _id: String,
  upvotes: [{User: String, time: {type: Date, default: Date.now}}],
  downvotes: [{User: String, time: {type: Date, default: Date.now}}],
  tags: {type: [String], validate: atLeastOne},
  address: {type: String, required: true},
  storename: {type: String, required: true},
  location: { type: [Number], index: '2d'},
  price: { type: Number, required: true},
  discountPrice: { type: Number, required: true},
  createdAt: {type: Date, default: Date.now}
});

const UserSchema = new mongoose.Schema({
  //For seeding test data only. Remove to have mongoose auto-generate
  _id: String,
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  savedPosts: [String],
  createdPosts: [String],
});

const Post = mongoose.model("Post", PostSchema);
const User = mongoose.model("User", UserSchema);

const users = [
  {
    _id: '5eead9d6d34bf31f58a86904',
    name: 'Jack',
    email: 'a@b.com',
    password: 'abc',
    savedPosts: ['5eead9d6d34bf31f58a86909', '5eead9d6d34bf31f58a86904'],
    createdPosts: ['5eead9d6d34bf31f58a86905', '5eead9d6d34bf31f58a86906']
  },
  {
    _id: '5eead9d6d34bf31f58a86905',
    name: 'Alice',
    email: 'c@b.com',
    password: 'abc',
    savedPosts: ['5eead9d6d34bf31f58a86904'],
    createdPosts: ['5eead9d6d34bf31f58a86905', '5eead9d6d34bf31f58a86906', '5eead9d6d34bf31f58a86908']
  },
  {
    _id: '5eead9d6d34bf31f58a86906',
    name: 'Rachel',
    email: 'a@n.com',
    password: 'abc',
    savedPosts: ['5eead9d6d34bf31f58a86904', '5eead9d6d34bf31f58a86906'],
    createdPosts: ['5eead9d6d34bf31f58a86907']
  }
]

const posts = [
  {
    _id: '5eead9d6d34bf31f58a86904',
    tags: ['bread', 'sliced'],
    location: [7, 3],
    address: '1 main st.',
    upvotes: [{User: '5eead9d6d34bf31f58a86904', time: Date.now()}, {User: '5eead9d6d34bf31f58a86906', time: Date.now()}],
    downvotes: [],
    price: 2.00,
    discountPrice: 1.35,
    storename: 'walmart'
  },
  {
    _id: '5eead9d6d34bf31f58a86905',
    tags: ['chicken', 'meat'],
    location: [5, 3.2],
    address: '2 main st.',
    upvotes: [{User: '5eead9d6d34bf31f58a86904', time: Date.now()}],
    downvotes: [{User: '5eead9d6d34bf31f58a86905', time: Date.now()}, {User: '5eead9d6d34bf31f58a86904', time: Date.now()}],
    price: 5.10,
    discountPrice: 3.35,
    storename: 'walmart'
  },
  {
    _id: '5eead9d6d34bf31f58a86906',
    tags: ['pork', 'meat'],
    location: [1, 3],
    address: '4 road st.',
    upvotes: [],
    downvotes: [{User: '5eead9d6d34bf31f58a86905', time: Date.now()}],
    price: 12.00,
    discountPrice: 10.35,
    storename: 'sobeys'
  },
  {
    _id: '5eead9d6d34bf31f58a86907',
    tags: ['cheese', 'sliced'],
    location: [7.12, 3.45],
    address: '6 fake st.',
    upvotes: [],
    downvotes: [],
    price: 4.00,
    discountPrice: 1.35,
    storename: 'sobeys',
  },
  {
    _id: '5eead9d6d34bf31f58a86908',
    tags: ['shreddies', 'cereal'],
    location: [7, 3],
    address: '1 main st.',
    upvotes: [],
    downvotes: [],
    price: 2.00,
    discountPrice: 1.35,
    storename: 'save on foods'
  },
  {
    _id: '5eead9d6d34bf31f58a86909',
    tags: ['raisin bran', 'cereal'],
    location: [6.3, 7.4],
    address: '1 main st.',
    upvotes: [],
    downvotes: [],
    price: 3.99,
    discountPrice: 2.99,
    storename: 'save on foods'
  }
]

async function seedDb(){
  try {
    const promises = [];
    await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    await Post.remove({})
    await User.remove({})
    posts.forEach(async post => {
      promises.push(Post.create(post));
    })
    users.forEach(async user => {
      promises.push(User.create(user));
    });
    await Promise.all(promises);
    console.log('completed');
    process.exit();
  } catch (e) {
    console.log(e)
  }
}

seedDb();