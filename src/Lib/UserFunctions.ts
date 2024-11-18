// src/Lib/UserFunctions.ts
import { User } from '../Models/User';
import { Video } from '../Models/Video';

export const favoriteVideo = (user: User, video: Video): User => {
  const isFavorited = user.favoritedVideos.some(favVideo => favVideo.id === video.id);
  const updatedFavoritedVideos = isFavorited
    ? user.favoritedVideos.filter(favVideo => favVideo.id !== video.id)
    : [...user.favoritedVideos, video];

  return {
    ...user,
    favoritedVideos: updatedFavoritedVideos,
  };
};

export const addToCart = (user: User, video: Video): User => {
  const isInCart = user.cartVideos.some(cartVideo => cartVideo.id === video.id);
  if (isInCart) {
    return user; // Video is already in the cart
  }

  return {
    ...user,
    cartVideos: [...user.cartVideos, video],
  };
};

export const removeFromCart = (user: User, video: Video): User => {
  const updatedCartVideos = user.cartVideos.filter(cartVideo => cartVideo.id !== video.id);
  return {
    ...user,
    cartVideos: updatedCartVideos,
  };
};

export const purchaseVideos = (user: User, videos: Video[]): { user: User, updatedVideos: Video[] } => {
  const updatedCartVideos = user.cartVideos.map(video => ({ ...video, isPurchased: true }));

  const updatedVideos = videos.map(video => {
    const purchasedVideo = updatedCartVideos.find(cartVideo => cartVideo.id === video.id);
    return purchasedVideo ? { ...video, isPurchased: true } : video;
  });

  return {
    user: {
      ...user,
      cartVideos: [],
    },
    updatedVideos,
  };
};