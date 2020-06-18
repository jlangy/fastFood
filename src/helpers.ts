import mongoose from 'mongoose';

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