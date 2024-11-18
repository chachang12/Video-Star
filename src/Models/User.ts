import { Video } from './Video';

export interface User {
  favoritedVideos: Video[];
  cartVideos: Video[];
}