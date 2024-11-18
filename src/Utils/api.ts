// api.ts

import { mockVideos } from './../Mocks/mockVideos';
import { Video } from './../Models/Video';

const isMock = import.meta.env.VITE_USE_MOCK === 'true';

export const fetchVideos = async (): Promise<Video[]> => {
  if (isMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockVideos), 500);
    });
  } else {
    const response = await fetch('/api/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
};