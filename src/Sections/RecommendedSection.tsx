import React, { useEffect, useState } from 'react';
import { Video } from './../Models/Video';
import VideoCard from '../Components/Cards/VideoCard';

interface RecommendedSectionProps {
  onVideoSelect: (video: Video) => void;
  videos: Video[];
}

const RecommendedSection: React.FC<RecommendedSectionProps> = ({ onVideoSelect, videos }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [videos]);

  const getRandomVideos = (videos: Video[], count: number): Video[] => {
    const shuffled = videos.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomVideos = getRandomVideos(videos, 3);

  return (
    <>
      <h1 className='text-[#91BA92] font-[600] text-xl mb-2'>
        Recommended
      </h1>
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : randomVideos.length === 0 ? (
        <div className="text-center text-white">No videos available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {randomVideos.map(video => (
            <VideoCard key={video.id} video={video} onVideoSelect={onVideoSelect} />
          ))}
        </div>
      )}
    </>
  );
};

export default RecommendedSection;