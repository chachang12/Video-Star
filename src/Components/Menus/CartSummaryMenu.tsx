import React from 'react';
import { User } from '../../Models/User';
import { IoCloseOutline } from "react-icons/io5";
import { Video } from '../../Models/Video';

interface CartSummaryMenuProps {
  user: User;
  onClose: () => void;
  onRemoveFromCart: (video: Video) => void;
  onPurchase: () => void;
}

const CartSummaryMenu: React.FC<CartSummaryMenuProps> = ({ user, onClose, onRemoveFromCart, onPurchase }) => {
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
          {user.cartVideos.length === 0 ? (
            <p>No videos in cart</p>
          ) : (
            user.cartVideos.map(video => (
              <div key={video.id} className="flex justify-between">
                <span>{video.name}</span>
                <span>${video.price}</span>
                <button onClick={() => onRemoveFromCart(video)}>Remove</button>
              </div>
            ))
          )}
        </div>
        {user.cartVideos.length > 0 && (
          <button onClick={onPurchase} className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Purchase</button>
        )}
      </div>
    </div>
  );
};

export default CartSummaryMenu;