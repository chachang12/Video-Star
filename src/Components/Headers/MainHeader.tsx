import { VideoStarLogo } from "../../assets/Icons"; 
import { IoBagOutline } from "react-icons/io5";
import React, { useState } from 'react';
import CartSummaryMenu from '../Menus/CartSummaryMenu';
import { useVideoContext } from '../../Context/VideoContext';

const MainHeader: React.FC = () => {
  const { videos, handleRemoveFromCart, handlePurchase } = useVideoContext();
  const [isCartSummaryOpen, setIsCartSummaryOpen] = useState(false);

  const toggleCartSummary = () => {
    setIsCartSummaryOpen(prevState => !prevState);
  };

  const cartItemCount = videos.filter(video => video.isInCart).length;

  return (
    <>
      <section className="flex flex-row justify-between items-center relative">
        <VideoStarLogo width={75} fill="#F1DEC0"/>
        <div className="relative">
          <IoBagOutline size={65} color="#F1DEC0" onClick={toggleCartSummary} className="cursor-pointer" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-[#91BA92] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cartItemCount}
            </span>
          )}
        </div>
      </section>
      {isCartSummaryOpen && (
        <CartSummaryMenu
          videos={videos.filter(video => video.isInCart)}
          onClose={toggleCartSummary}
          onRemoveFromCart={handleRemoveFromCart}
          onPurchase={handlePurchase}
        />
      )}
    </>
  );
}

export default MainHeader;