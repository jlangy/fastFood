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
  imageUrl: String,
  posterName: String,
  posterId: String,
  posterStatus: String
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
  status: String
});

const Post = mongoose.model("Post", PostSchema);
const User = mongoose.model("User", UserSchema);

const users = [
  {
    _id: '5eead9d6d34bf31f58a86904',
    name: 'Amy',
    email: 'a@b.com',
    password: 'abc',
    savedPosts: ['5eead9d6d34bf31f58a86909', '5eead9d6d34bf31f58a86904'],
    createdPosts: ['5eead9d6d34bf31f58a86907', '5eead9d6d34bf31f58a86908', '5eead9d6d34bf31f58a86909','5eead9d6d34bf31f58a86910','5eead9d6d34bf31f58a86911'],
    status: "super"
  },
  {
    _id: '5eead9d6d34bf31f58a86905',
    name: 'Alice',
    email: 'c@b.com',
    password: 'abc',
    savedPosts: ['5eead9d6d34bf31f58a86904'],
    createdPosts: ['5eead9d6d34bf31f58a86912', '5eead9d6d34bf31f58a86913', '5eead9d6d34bf31f58a86914','5eead9d6d34bf31f58a86915','5eead9d6d34bf31f58a86916'],
    status: "regular"
  },
  {
    _id: '5eead9d6d34bf31f58a86906',
    name: 'Jacob',
    email: 'a@n.com',
    password: 'abc',
    savedPosts: ['5eead9d6d34bf31f58a86907'],
    createdPosts: ['5eead9d6d34bf31f58a86917', '5eead9d6d34bf31f58a86918','5eead9d6d34bf31f58a86919'],
    status: "regular"
  }
]

const posts = [
  {
    _id: '5eead9d6d34bf31f58a86907',
    posterId: '5eead9d6d34bf31f58a86904',
    posterName: "Amy",
    posterStatus: "super",
    tags: ['bread', 'sliced', 'grain'],
    location: [-79.266, 43.872],
    address: '5762 Hwy 7, Markham, ON L3P 1A8, Canada',
    upvotes: [{User: '5eead9d6d34bf31f58a86904', time: Date.now()}, {User: '5eead9d6d34bf31f58a86906', time: Date.now()}],
    downvotes: [],
    price: 2.00,
    discountPrice: 1.35,
    storename: 'No Frills',
    imageUrl: 'https://thumbs.dreamstime.com/b/stacked-bread-packages-store-to-sell-sliced-bread-sealed-plastic-packaging-stacked-basket-store-selling-bakery-148749850.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86908',
    posterId: '5eead9d6d34bf31f58a86904',
    posterName: "Amy",
    posterStatus: "super",
    tags: ['peas', 'canned', 'vegetables'],
    location: [-79.266, 43.872],
    address: '5762 Hwy 7, Markham, ON L3P 1A8, Canada',
    upvotes: [{User: '5eead9d6d34bf31f58a86904', time: Date.now()}, {User: '5eead9d6d34bf31f58a86906', time: Date.now()}],
    downvotes: [],
    price: 1.50,
    discountPrice: 0.79,
    storename: 'No Frills',
    imageUrl: 'https://hip2save.com/wp-content/uploads/2017/11/del-monte-veggies1.jpg?resize=1024%2C538&strip=all'
  },
  {
    _id: '5eead9d6d34bf31f58a86909',
    posterId: '5eead9d6d34bf31f58a86904',
    posterName: "Amy",
    posterStatus: "super",
    tags: ['chicken', 'thighs', 'meat'],
    location: [-79.266, 43.872],
    address: '5762 Hwy 7, Markham, ON L3P 1A8, Canada',
    upvotes: [{User: '5eead9d6d34bf31f58a86904', time: Date.now()}, , {User: '5eead9d6d34bf31f58a86906', time: Date.now()}],
    downvotes: [{User: '5eead9d6d34bf31f58a86905', time: Date.now()}],
    price: 5.10,
    discountPrice: 3.35,
    storename: 'No Frills',
    imageUrl: 'https://iowagirleats.com/wp-content/uploads/2015/08/Grilled-Chili-Honey-Lime-Chicken-Thighs-iowagirleats-05.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86910',
    posterId: '5eead9d6d34bf31f58a86904',
    posterName: "Amy",
    posterStatus: "super",
    tags: ['bread', 'baguette'],
    location: [-79.266, 43.872],
    address: '5762 Hwy 7, Markham, ON L3P 1A8, Canada',
    upvotes: [{User: '5eead9d6d34bf31f58a86904', time: Date.now()}],
    downvotes: [{User: '5eead9d6d34bf31f58a86905', time: Date.now()}],
    price: 2.10,
    discountPrice: 1.35,
    storename: 'No Frills',
    imageUrl: 'https://thumbs.dreamstime.com/z/buyer-baguettes-basket-store-buyer-bread-baguettes-grocery-basket-store-113615541.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86911',
    posterId: '5eead9d6d34bf31f58a86904',
    posterName: "Amy",
    posterStatus: "super",
    tags: ['pork', 'meat', 'shoulder'],
    location: [-79.316, 43.8794],
    address: '4476 16th Ave, Markham, ON L3R 0M1, Canada',
    upvotes: [],
    downvotes: [{User: '5eead9d6d34bf31f58a86905', time: Date.now()}],
    price: 12.00,
    discountPrice: 10.35,
    storename: 'The Village Grocer',
    imageUrl: 'https://c8.alamy.com/comp/2A4YBAA/motion-of-woman-buying-pork-loin-roast-inside-walmart-store-2A4YBAA.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86912',
    posterId: '5eead9d6d34bf31f58a86905',
    posterName: "Alice",
    posterStatus: "regular",
    tags: ['rice', 'wild', 'grain'],
    location: [-79.316, 43.8794],
    address: '4476 16th Ave, Markham, ON L3R 0M1, Canada',
    upvotes: [],
    downvotes: [],
    price: 4.00,
    discountPrice: 1.35,
    storename: 'The Village Grocer',
    imageUrl: 'https://thekrazycouponlady.com/wp-content/uploads/2019/04/rice-image-1-tmh-41719-1555528122.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86913',
    posterId: '5eead9d6d34bf31f58a86905',
    posterName: "Alice",
    posterStatus: "regular",
    tags: ['vegetable', 'mushrooms', 'chopped'],
    location: [-79.316, 43.8794],
    address: '4476 16th Ave, Markham, ON L3R 0M1, Canada',
    upvotes: [],
    downvotes: [],
    price: 4.00,
    discountPrice: 3.35,
    storename: 'The Village Grocer',
    imageUrl: 'https://www.producebusiness.com/wp-content/uploads/2019/06/SHROOMS2-583x437.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86914',
    posterId: '5eead9d6d34bf31f58a86905',
    posterName: "Alice",
    posterStatus: "regular",
    tags: ['shreddies', 'cereal'],
    location: [-79.3222, 43.8577],
    address: '3997 Hwy #7, Markham, ON L3R 5M6, Canada',
    upvotes: [],
    downvotes: [],
    price: 12.00,
    discountPrice: 8.99,
    storename: 'Whole Foods',
    imageUrl: 'https://media.gettyimages.com/photos/customer-removes-a-packet-of-shreddies-breakfast-cereal-manufactured-picture-id118404581'
  },
  {
    _id: '5eead9d6d34bf31f58a86915',
    posterId: '5eead9d6d34bf31f58a86905',
    posterName: "Alice",
    posterStatus: "regular",
    tags: ['sirloin', 'steak', 'meat'],
    location: [-79.3222, 43.8577],
    address: '3997 Hwy #7, Markham, ON L3R 5M6, Canada',
    upvotes: [],
    downvotes: [],
    price: 29.00,
    discountPrice: 18.99,
    storename: 'Whole Foods',
    imageUrl: 'https://c8.alamy.com/comp/P88MD3/beef-steak-for-sale-in-a-store-P88MD3.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86916',
    posterId: '5eead9d6d34bf31f58a86905',
    posterName: "Alice",
    posterStatus: "regular",
    tags: ['fruit', 'watermelon', 'melon'],
    location: [-79.3222, 43.8577],
    address: '3997 Hwy #7, Markham, ON L3R 5M6, Canada',
    upvotes: [],
    downvotes: [],
    price: 29.00,
    discountPrice: 18.99,
    storename: 'Whole Foods',
    imageUrl: 'https://www.watermelon.org/wp-content/uploads/2020/02/display-contest-550x330.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86917',
    posterName: "Jacob",
    posterStatus: "regular",
    posterId: '5eead9d6d34bf31f58a86906',
    tags: ['raisin bran', 'cereal', 'fruit'],
    location: [-79.3047, 43.8601],
    address: '8360 Kennedy Rd, Markham, ON L3R 9W4, Canada',
    upvotes: [],
    downvotes: [],
    price: 3.99,
    discountPrice: 2.99,
    storename: 'Lucky Foodmart',
    imageUrl: 'https://thekrazycouponlady.com/wp-content/uploads/2018/10/walmart-raisin-bran-with-bananas-featured-bm-101-1538421031.gif'
  },
  {
    _id: '5eead9d6d34bf31f58a86918',
    posterName: "Jacob",
    posterStatus: "regular",
    posterId: '5eead9d6d34bf31f58a86906',
    tags: ['potatoes', 'vegetable', 'grain'],
    location: [-79.3047, 43.8601],
    address: '8360 Kennedy Rd, Markham, ON L3R 9W4, Canada',
    upvotes: [],
    downvotes: [],
    price: 6.99,
    discountPrice: 3.99,
    storename: 'Lucky Foodmart',
    imageUrl: 'https://previews.123rf.com/images/yelo34/yelo341504/yelo34150400026/38758624-different-varieties-of-potatoes-in-a-shelf-in-a-grocery-store.jpg'
  },
  {
    _id: '5eead9d6d34bf31f58a86919',
    posterName: "Jacob",
    posterStatus: "regular",
    posterId: '5eead9d6d34bf31f58a86906',
    tags: ['gala', 'apple', 'fruit'],
    location: [-79.2853, 43.8737],
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