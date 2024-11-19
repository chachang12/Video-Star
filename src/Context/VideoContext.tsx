import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Video } from '../Models/Video';

interface VideoContextProps {
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  selectedVideo: Video | null;
  setSelectedVideo: React.Dispatch<React.SetStateAction<Video | null>>;
  randomVideos: Video[];
  handleFavorite: (video: Video) => void;
  handleAddToCart: (video: Video) => void;
  handleRemoveFromCart: (video: Video) => void;
  handlePurchase: () => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [randomVideos, setRandomVideosState] = useState<Video[]>([]);
  const [randomVideosSet, setRandomVideosSet] = useState(false);

  const setRandomVideos = useCallback(() => {
    const getRandomVideos = (videos: Video[], count: number): Video[] => {
      const shuffled = [...videos].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    setRandomVideosState(getRandomVideos(videos, 3));
    setRandomVideosSet(true);
  }, [videos]);

  useEffect(() => {
    if (videos.length > 0 && !randomVideosSet) {
      setRandomVideos();
    }
  }, [videos, randomVideosSet, setRandomVideos]);

  const handleFavorite = useCallback((video: Video) => {
    setVideos(prevVideos =>
      prevVideos.map(v => v.id === video.id ? { ...v, isFavorited: !v.isFavorited } : v)
    );
    setSelectedVideo(prevVideo => prevVideo && prevVideo.id === video.id ? { ...prevVideo, isFavorited: !prevVideo.isFavorited } : prevVideo);
  }, [setVideos, setSelectedVideo]);

  const handleAddToCart = useCallback((video: Video) => {
    setVideos(prevVideos => prevVideos.map(v => v.id === video.id ? { ...v, isInCart: true } : v));
  }, [setVideos]);

  const handleRemoveFromCart = useCallback((video: Video) => {
    setVideos(prevVideos => prevVideos.map(v => v.id === video.id ? { ...v, isInCart: false } : v));
  }, [setVideos]);

  const handlePurchase = useCallback(() => {
    setVideos(prevVideos => prevVideos.map(video => video.isInCart ? { ...video, isPurchased: true, isInCart: false } : video));
  }, [setVideos]);

  return (
    <VideoContext.Provider value={{ videos, setVideos, selectedVideo, setSelectedVideo, randomVideos, handleFavorite, handleAddToCart, handleRemoveFromCart, handlePurchase }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};