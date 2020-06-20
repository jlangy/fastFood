import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
  _id: string,
  tags: string[],
  address: string,
  location: number[],
  //TODO: Make upvote/downvote interfaces
  upvotes: any[],
  downvotes: any[],
  distance: number,
  storename: string,
  price: number,
  discountPrice: number,
  createdAt: Date
}

export interface IUser extends mongoose.Document {
  _id: string,
  name: string,
  email: string, 
  password: string,
  savedPosts: string[] | IPost[],
  createdPosts: string[] | IPost[]
}

export interface IReturnPost {
  id: string,
  tags: string[],
  address: string,
  latitude: number,
  longitude: number,
  distance: number,
  userLikedPost: boolean,
  userDislikedPost: boolean,
  storename: string,
  likes: number,
  dislikes: number,
  price: number,
  discountPrice: number,
  createdAt: Date,
  userSavedPost: Boolean
}