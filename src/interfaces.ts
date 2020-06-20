import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
  tags: string[],
  address: string,
  location: number[],
  //TODO: Make upvote/downvote interfaces
  upvotes: any[],
  downvotes: any[],
  distance: number,
  storename: string
}

export interface IReturnPost {
  tags: string[],
  address: string,
  latitude: number,
  longitude: number,
  distance: number,
  userLikedPost: boolean,
  userDislikedPost: boolean,
  storename: string,
  likes: number,
  dislikes: number
}