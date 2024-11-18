import { VideoStarLogo } from "../../assets/Icons"; 
import { IoBagOutline } from "react-icons/io5";
import React from 'react';

interface MainHeaderProps {
  onCartClick: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ onCartClick }) => {
  return (
    <>
      <section className="flex flex-row justify-between items-center">
        <VideoStarLogo width={75} fill="#F1DEC0"/>
        <IoBagOutline size={65} color="#F1DEC0" onClick={onCartClick} className="cursor-pointer" />
      </section>
    </>
  );
}

export default MainHeader;