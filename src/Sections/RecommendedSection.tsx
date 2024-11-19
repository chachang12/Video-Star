import React, { useEffect, useState } from 'react';
import { Video } from './../Models/Video';
import VideoCard from '../Components/Cards/VideoCard';
import { useVideoContext } from '../Context/VideoContext';

const RecommendedSection: React.FC<{ onVideoSelect: (video: Video) => void }> = ({ onVideoSelect }) => {
  const { randomVideos } = useVideoContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (randomVideos.length > 0) {
      setLoading(false);
    }
  }, [randomVideos]);

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
        <div className="flex flex-row gap-6 flex-wrap">
          {randomVideos.map(video => (
            <VideoCard key={video.id} video={video} onVideoSelect={onVideoSelect} />
          ))}
        </div>
      )}
    </>
  );
};

export default RecommendedSection;