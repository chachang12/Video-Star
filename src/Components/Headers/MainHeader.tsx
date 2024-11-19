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

  return (
    <>
      <section className="flex flex-row justify-between items-center">
        <VideoStarLogo width={75} fill="#F1DEC0"/>
        <IoBagOutline size={65} color="#F1DEC0" onClick={toggleCartSummary} className="cursor-pointer" />
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