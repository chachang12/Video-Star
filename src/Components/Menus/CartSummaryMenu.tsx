import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { Video } from '../../Models/Video';

interface CartSummaryMenuProps {
  videos: Video[];
  onClose: () => void;
  onRemoveFromCart: (video: Video) => void;
  onPurchase: () => void;
}

const CartSummaryMenu: React.FC<CartSummaryMenuProps> = ({ videos, onClose, onRemoveFromCart, onPurchase }) => {
  const cartVideos = videos.filter(video => video.isInCart);

  const totalPrice = cartVideos.reduce((total, video) => total + video.price, 0);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="p-4 bg-[#525E76] rounded-xl w-96 relative text-white">
        <div className='flex flex-row items-center justify-between mb-4'>
          <h2 className="text-3xl font-medium">Cart Summary</h2>
          <button className="" onClick={onClose}>
            <IoCloseOutline size={40} color='white'/>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {cartVideos.length === 0 ? (
            <p>No videos in cart</p>
          ) : (
            cartVideos.map(video => (
              <div key={video.id} className="flex justify-between">
                <span>{video.name}</span>
                <span>${video.price.toFixed(2)}</span>
                <button onClick={() => onRemoveFromCart(video)}>Remove</button>
              </div>
            ))
          )}
        </div>
        {cartVideos.length > 0 && (
          <>
            <div className="flex justify-between mt-4">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={onPurchase} className="mt-4 bg-[#91BA92] text-white py-2 px-4 rounded">Purchase</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSummaryMenu;