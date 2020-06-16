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