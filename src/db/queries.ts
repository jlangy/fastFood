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