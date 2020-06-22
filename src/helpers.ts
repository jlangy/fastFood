import { IReturnPost, IPost, IUser } from "./interfaces";
import mongoose from 'mongoose';
import UserSchema from "./db/user";
const USER_ID = "5eead9d6d34bf31f58a86904";

const User = mongoose.model<IUser>("User", UserSchema)

export function convertLatLongToDistance(
  lat1: number,
  lat2: number,
  long1: number,
  long2: number
) {
  const R = 6371e3;
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const deltaLatRad = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLongRad = ((long2 - long1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLongRad / 2) *
      Math.sin(deltaLongRad / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function sortPosts(posts: IReturnPost[], sort: string) {
  //TODO: implement sort function
  switch (sort) {
    case "distance":
      return posts.sort((a, b) => a.distance - b.distance);
    case "likes":
      return posts.sort((a, b) => b.likes - a.likes);
    case "discount":
      return posts.sort(
        (a, b) => (b.price - b.discountPrice) - (a.price - a.discountPrice)
      );
    case "recent":
      return posts.sort(
        (a,b) => a.createdAt.getTime() - b.createdAt.getTime()
      )
    default:
      return posts;
  }
}

export function getFormattedPost(dbPost: IPost, user: IUser, lat: number, long: number) {
  const distance: number = convertLatLongToDistance(
    Number(dbPost.location[1]),
    Number(lat),
    Number(dbPost.location[0]),
    Number(long)
  );
  let userLikedPost = dbPost.upvotes.some((upvote) => upvote.User == USER_ID);
  let userDislikedPost = dbPost.downvotes.some((downvote) => downvote.User == USER_ID);
  const { tags, address, location, storename, _id, price, discountPrice, createdAt } = dbPost;
  let userSavedPost = user.savedPosts.some((post: IPost | string) => typeof post === 'string' ? post === _id : post._id === _id);
  return {
    id: _id,
    tags,
    address,
    latitude: location[1],
    longitude: location[0],
    distance,
    userLikedPost,
    userDislikedPost,
    storename,
    likes: dbPost.upvotes.length,
    dislikes: dbPost.downvotes.length,
    price,
    discountPrice,
    createdAt,
    userSavedPost
  };
}
