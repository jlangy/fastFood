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
  createdAt: {type: Date, default: Date.now},
  imageUrl: String
  //Add this to auto-delete docs. If we want to only set in-active, need a cron job.
  // active: {type: Date, default: Date.now, expires: "30s"}
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
    tags: ['bread', 'sliced', 'grain'],
    location: [43.872, -79.266],
    address: '5762 Hwy 7, Markham, ON L3P 1A8, Canada',
    upvotes: [{User: '5eead9d6d34bf31f58a86904', time: Date.now()}, {User: '5eead9d6d34bf31f58a86906', time: Date.now()}],
    downvotes: [],
    price: 2.00,
    discountPrice: 1.35,
    storename: 'No Frills',
    imageUrl: 'https://thumbs.dreamstime.com/b/stacked-bread-packages-store-to-sell-sliced-bread-sealed-plastic-packaging-stacked-basket-store-selling-bakery-148749850.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86905',
    tags: ['chicken', 'thighs', 'meat'],
    location: [43.872, -79.266],
    address: '5762 Hwy 7, Markham, ON L3P 1A8, Canada',
    upvotes: [{User: '5eead9d6d34bf31f58a86904', time: Date.now()}],
    downvotes: [{User: '5eead9d6d34bf31f58a86905', time: Date.now()}, {User: '5eead9d6d34bf31f58a86906', time: Date.now()}],
    price: 5.10,
    discountPrice: 3.35,
    storename: 'No Frills',
    imageUrl: 'https://iowagirleats.com/wp-content/uploads/2015/08/Grilled-Chili-Honey-Lime-Chicken-Thighs-iowagirleats-05.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86906',
    tags: ['pork', 'meat', 'shoulder'],
    location: [43.8794, -79.316],
    address: '4476 16th Ave, Markham, ON L3R 0M1, Canada',
    upvotes: [],
    downvotes: [{User: '5eead9d6d34bf31f58a86905', time: Date.now()}],
    price: 12.00,
    discountPrice: 10.35,
    storename: 'The Village Grocer',
    imageUrl: 'https://c8.alamy.com/comp/2A4YBAA/motion-of-woman-buying-pork-loin-roast-inside-walmart-store-2A4YBAA.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86907',
    tags: ['rice', 'wild', 'grain'],
    location: [43.8794, -79.316],
    address: '4476 16th Ave, Markham, ON L3R 0M1, Canada',
    upvotes: [],
    downvotes: [],
    price: 4.00,
    discountPrice: 1.35,
    storename: 'The Village Grocer',
    imageUrl: 'https://thekrazycouponlady.com/wp-content/uploads/2019/04/rice-image-1-tmh-41719-1555528122.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86908',
    tags: ['shreddies', 'cereal'],
    location: [43.8577, -79.3222],
    address: '3997 Hwy #7, Markham, ON L3R 5M6, Canada',
    upvotes: [],
    downvotes: [],
    price: 12.00,
    discountPrice: 8.99,
    storename: 'Whole Foods',
    imageUrl: 'https://media.gettyimages.com/photos/customer-removes-a-packet-of-shreddies-breakfast-cereal-manufactured-picture-id118404581'
  },
  {
    _id: '5eead9d6d34bf31f58a86911',
    tags: ['sirloin', 'steak', 'meat'],
    location: [43.8577, -79.3222],
    address: '3997 Hwy #7, Markham, ON L3R 5M6, Canada',
    upvotes: [],
    downvotes: [],
    price: 29.00,
    discountPrice: 18.99,
    storename: 'Whole Foods',
    imageUrl: 'https://c8.alamy.com/comp/P88MD3/beef-steak-for-sale-in-a-store-P88MD3.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86909',
    tags: ['raisin bran', 'cereal', 'fruit'],
    location: [43.8601, -79.3047],
    address: '8360 Kennedy Rd, Markham, ON L3R 9W4, Canada',
    upvotes: [],
    downvotes: [],
    price: 3.99,
    discountPrice: 2.99,
    storename: 'Lucky Foodmart',
    imageUrl: 'https://thekrazycouponlady.com/wp-content/uploads/2018/10/walmart-raisin-bran-with-bananas-featured-bm-101-1538421031.gif'
  },
  {
    _id: '5eead9d6d34bf31f58a86910',
    tags: ['gala', 'apple', 'fruit'],
    location: [43.8737, -79.2853],
    address: '200 Bullock Dr, Markham, ON L3P 1W2, Canada',
    upvotes: [],
    downvotes: [],
    price: 1.99,
    discountPrice: 1.49,
    storename: 'Loblaws',
    imageUrl: 'https://i.etsystatic.com/14888379/r/il/1c93bd/1558553054/il_794xN.1558553054_r214.jpg'
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