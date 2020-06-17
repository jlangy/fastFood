import { IReturnPost, IPost } from './interfaces';
const USER_ID = "5eea56183d06b940dd4509bf"

export function convertLatLongToDistance(lat1: number, lat2: number, long1: number, long2: number){
  const R = 6371e3;
  const lat1Rad = lat1 * Math.PI/180; 
  const lat2Rad = lat2 * Math.PI/180;
  const deltaLatRad = (lat2-lat1) * Math.PI/180;
  const deltaLongRad = (long2-long1) * Math.PI/180;

  const a = Math.sin(deltaLatRad/2) * Math.sin(deltaLatRad/2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(deltaLongRad/2) * Math.sin(deltaLongRad/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

export function sortPosts(posts: IReturnPost[], radius: boolean = true, upvotes: boolean = true){
  //TODO: implement sort function
  return posts;
}

export function getFormattedPost(dbPost: IPost, lat: number, long: number){
  const distance: number = convertLatLongToDistance(Number(dbPost.latitude), Number(lat), Number(dbPost.longitude), Number(long));
  let userLikedPost = dbPost.upvotes.some(upvote => upvote.User == USER_ID);
  let userDislikedPost = dbPost.downvotes.some(downvote => downvote.User === USER_ID);
  const {tags, address, latitude, longitude, storename} = dbPost;
  return {tags, address, latitude, longitude, distance, userLikedPost, userDislikedPost, storename, likes: dbPost.upvotes.length, dislikes: dbPost.downvotes.length}
}