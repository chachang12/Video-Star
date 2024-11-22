import React from 'react';
import { Video } from '../../Models/Video';
import { CiTrash } from "react-icons/ci";


interface CartCardProps {
  video: Video;
  onRemoveFromCart: (video: Video) => void;
}

const CartCard: React.FC<CartCardProps> = ({ video, onRemoveFromCart }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 py-2">
      <div className="flex items-center w-full md:w-auto">
        <video
          src={video.url}
          crossOrigin='anonymous'
          className="hidden md:block w-24 h-24 object-cover rounded-lg"
          controls={false}
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white">{video.name}</h3>
          <p className="text-md text-white">${video.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex flex-col items-end mt-2 md:mt-0">
        <button
          onClick={() => onRemoveFromCart(video)}
          className=""
        >
          <CiTrash size={30}/>
        </button>
      </div>
    </div>
  );
};

export default CartCard;