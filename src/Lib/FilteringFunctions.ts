import { Video } from './../Models/Video';

// Function to filter videos by duration
export const filterByDuration = (videos: Video[], minDuration: string, maxDuration: string): Video[] => {
  const toSeconds = (duration: string) => duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
  const minSeconds = toSeconds(minDuration);
  const maxSeconds = toSeconds(maxDuration);

  return videos.filter(video => {
    const videoSeconds = toSeconds(video.duration);
    return videoSeconds >= minSeconds && videoSeconds <= maxSeconds;
  });
};

// Function to filter videos by paid/free status
export const filterByPaidStatus = (videos: Video[], showFree: boolean): Video[] => {
  return videos.filter(video => video.isFree === showFree);
};

// Function to filter videos by name (search)
export const filterByName = (videos: Video[], searchTerm: string): Video[] => {
  return videos.filter(video => video.name.toLowerCase().includes(searchTerm.toLowerCase()));
};

// Function to filter videos by favorited status
export const filterByFavoritedStatus = (videos: Video[], favoritedVideos: Video[]): Video[] => {
  const favoritedIds = new Set(favoritedVideos.map(video => video.id));
  return videos.filter(video => favoritedIds.has(video.id));
};