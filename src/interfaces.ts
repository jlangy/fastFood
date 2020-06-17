import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
  tags: string[],
  address: string,
  latitude: string,
  longitude: string,
  //TODO: Make upvote/downvote interfaces
  upvotes: any[],
  downvotes: any[],
  distance: number,
  storename: string
}

export interface IReturnPost {
  tags: string[],
  address: string,
  latitude: string,
  longitude: string,
  distance: number,
  userLikedPost: boolean,
  userDislikedPost: boolean,
  storename: string,
  likes: number,
  dislikes: number
}