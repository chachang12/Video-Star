import { Video } from './../Models/Video';

// Function to sort videos by title
export const sortByTitle = (videos: Video[]): Video[] => {
  return videos.slice().sort((a, b) => a.name.localeCompare(b.name));
};

// Function to sort videos by length (duration)
export const sortByLength = (videos: Video[]): Video[] => {
  return videos.slice().sort((a, b) => {
    const durationA = a.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
    const durationB = b.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
    return durationA - durationB;
  });
};

// Function to sort videos by paid/unpaid status
export const sortByPaidStatus = (videos: Video[]): Video[] => {
  return videos.slice().sort((a, b) => {
    if (a.isFree === b.isFree) {
      return 0;
    }
    return a.isFree ? -1 : 1;
  });
};