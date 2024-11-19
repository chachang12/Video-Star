import { Video } from '../Models/Video';

export const favoriteVideo = (video: Video): Video => {
  return { ...video, isFavorited: !video.isFavorited };
};

export const addToCart = (video: Video): Video => {
  return { ...video, isInCart: true };
};

export const removeFromCart = (video: Video): Video => {
  return { ...video, isInCart: false };
};

export const purchaseVideos = (videos: Video[]): Video[] => {
  return videos.map(video => video.isInCart ? { ...video, isPurchased: true, isInCart: false } : video);
};