import React from 'react';
import { Video } from '../../Models/Video';
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { formatDuration, truncateText } from '../../Lib/FormatingFunctions';

interface VideoCardProps {
  video: Video;
  onVideoSelect: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onVideoSelect }) => {
  return (
    <div className="rounded-lg overflow-hidden group relative cursor-pointer w-[350px]" onClick={() => onVideoSelect(video)}>
      <div className="relative rounded-lg overflow-hidden border border-white">
        <video
          crossOrigin="anonymous"
          src={video.url}
          className={`w-full h-48 object-cover rounded-lg transition-all duration-300 ${
            !video.isFree ? 'filter blur-sm brightness-50 group-hover:brightness-100' : ''
          }`}
        />
        {!video.isFree && (
          <div className="absolute inset-0 flex items-center justify-center">
            <IoLockClosedOutline className="text-white text-4xl group-hover:hidden" />
            <IoLockOpenOutline className="text-white text-4xl hidden group-hover:block" />
          </div>
        )}
        <div className="absolute bottom-2 left-4">
          <p className="text-white text-md font-[400]">{formatDuration(video.duration)}</p>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="text-lg text-white font-semibold">
          {truncateText(video.name, 75)}
        </h2>
      </div>
    </div>
  );
};

export default VideoCard;