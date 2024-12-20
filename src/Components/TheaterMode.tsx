import React from 'react';
import { Video } from '../Models/Video';
import { IoHeartOutline, IoHeart, IoCloseOutline } from "react-icons/io5";
import { formatDuration, bytesToMb } from '../Lib/FormatingFunctions';
import { useVideoContext } from '../Context/VideoContext';

interface TheaterModeProps {
  video: Video;
  onClose: () => void;
}

const TheaterMode: React.FC<TheaterModeProps> = ({ video, onClose }) => {
  const { handleFavorite, handleAddToCart } = useVideoContext();

  const handleFullscreenChange = (event: Event) => {
    const videoElement = event.target as HTMLVideoElement;
    if (document.fullscreenElement) {
      videoElement.style.border = 'none';
      videoElement.style.borderRadius = '0';
    } else {
      videoElement.style.border = '';
      videoElement.style.borderRadius = '';
    }
  };

  console.log('Video in TheaterMode:', video);

  return (
    <div className="w-full flex items-center justify-center mb-4 rounded-lg">
      <div className="rounded-3xl flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 relative border border-2 border-white rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
          <video
            src={video.url}
            controls={video.isFree || video.isPurchased}
            crossOrigin='anonymous'
            className={`w-full h-full object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none ${!video.isFree && !video.isPurchased ? 'filter blur-sm' : ''}`}
            onLoadedMetadata={(event) => {
              const videoElement = event.target as HTMLVideoElement;
              videoElement.onfullscreenchange = handleFullscreenChange;
            }}
          />
          {!video.isFree && !video.isPurchased && !video.isInCart && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button onClick={() => handleAddToCart(video)} className="text-white py-2 px-4 rounded-full outline outline-2 outline-white">Add to Cart</button>
            </div>
          )}
        </div>
        <div className="bg-[#525E76] w-full lg:w-1/4 p-4 text-white rounded-b-3xl lg:rounded-r-3xl lg:rounded-b-none border border-2 border-white flex flex-col justify-between">
          <div>
            <div className='flex items-center lg:items-start justify-between mb-2'>
              <h2 className="lg:text-2xl lg:font-bold font-medium">{video.name}</h2>
              <button onClick={onClose} className="text-black text-2xl"><IoCloseOutline color='white' size={40} /></button>
            </div>
            <div className='border border-1 border-white mb-2'></div>
            <div className='flex-col space-y-1'>
                <p className="">{video.isFree ? 'Free' : 'Paid'}</p>
                <p className="">Duration: {formatDuration(video.duration)}</p>
                <p className="">Size: {bytesToMb(video.size)} Mb</p>
                <p className="">Price: ${video.price}</p>
            </div>
          </div>
          {video.isFree && (
            <button onClick={() => handleFavorite(video)} className="flex items-center rounded-full mt-4 lg:mt-0">
              {video.isFavorited ? (
                <IoHeart size={40} className="text-2xl mr-2" />
              ) : (
                <IoHeartOutline size={40} className="text-2xl mr-2" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TheaterMode;