export function getPostsByTagsAndLocation(tags: string[], longitude: number, latitude: number, radius: number){
  return {
    tags: { $in: tags },
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: radius,
      },
    }
  }
}

export function getTagsByLocation(longitude: number, latitude: number, radius: number){
  return [
    {
      $geoNear: {
        includeLocs: "location",
        distanceField: "distance",
        near: { type: "Point", coordinates: [longitude, latitude] },
        maxDistance: radius,
        spherical: true,
      },
    },
    {
      $unwind: {
        path: '$tags'
      },
    },
    {
      $group: {
        _id: null,
        tags: { $addToSet: "$tags"}
      },
    },
  ]
}

export function getAllTags(){
  return [
    {
      $unwind: {
        path: '$tags'
      },
    },
    {
      $group: {
        _id: null,
        tags: { $addToSet: "$tags"}
      },
    },
  ]
}

export function voteForPost(upvote: boolean, userId: string, postId: string){
  const voteType = upvote ? "upvotes" : "downvotes";
  const oppositeVoteType = upvote ? "downvotes" : "upvotes";
  return [
    { 
      _id: postId,
      [`${voteType}.User`]: {$ne: userId}
    },
    { 
      $addToSet: { [voteType]: { User: userId } },
      $pull: { [oppositeVoteType]: {User: userId} }
    }
  ]
}