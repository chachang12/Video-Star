import { Video } from '../Models/Video';

export const fetchVideos = async (): Promise<Video[]> => {
  const response = await fetch('/api/');
  const videos: Video[] = await response.json();
  return videos.map(video => ({
    ...video,
    isFavorited: false,
    isInCart: false,
  }));
};