import TagSchema from './db/tag';
import mongoose from 'mongoose';

interface Post {
  tags: string[],
  address: string,
  latitude: string,
  longitude: string
}

//Retrieve ref id's, create tag if it doesn't exist 
export function getTagIds(post: Post){
  const tags: string[] = [];
  const Tag = mongoose.model('Tag', TagSchema);
  return new Promise(async (resolve, reject) => {
    for(let tag of post.tags){
      const tagExists = await Tag.findOne({name: tag})
      if(!tagExists){
        //Create new tag if doesnt exist
        const newTag = new Tag({name: tag})
        await newTag.save((err, tag) => {
          if(err) reject('saving tag failed');
          else tags.push(tag._id);
        });
      } else {
        tags.push(tagExists._id)
      }
    }
    resolve(tags)
  })
}

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