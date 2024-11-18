import React, { useState, useEffect } from 'react';
import MainHeader from "./Components/Headers/MainHeader";
import RecommendedSection from "./Sections/RecommendedSection";
import CatalogueSection from "./Sections/CatalogueSection";
import TheaterMode from "./Components/TheaterMode";
import CartSummaryMenu from "./Components/Menus/CartSummaryMenu";
import { Video } from './Models/Video';
import { User } from './Models/User';
import { fetchVideos } from './Utils/api';
import { favoriteVideo, addToCart, removeFromCart, purchaseVideos } from './Lib/UserFunctions';

const initialUser: User = {
  purchasedVideos: [],
  favoritedVideos: [],
  cartVideos: [],
};

function App() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [user, setUser] = useState<User>(initialUser);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isCartSummaryOpen, setIsCartSummaryOpen] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      const fetchedVideos = await fetchVideos();
      setVideos(fetchedVideos);
    };
    getVideos();
  }, []);

  const handleFavorite = (video: Video) => {
    setUser(favoriteVideo(user, video));
  };

  const handleAddToCart = (video: Video) => {
    setUser(addToCart(user, video));
  };

  const handleRemoveFromCart = (video: Video) => {
    setUser(removeFromCart(user, video));
  };

  const handlePurchase = () => {
    const { user: updatedUser, updatedVideos } = purchaseVideos(user, videos);
    setUser(updatedUser);
    setVideos(updatedVideos);
    console.log('User after purchase:', updatedUser);
    console.log('Videos after purchase:', updatedVideos);
  };

  const isVideoFavorited = (video: Video) => {
    return user.favoritedVideos.some(favVideo => favVideo.id === video.id);
  };

  const toggleCartSummary = () => {
    setIsCartSummaryOpen(!isCartSummaryOpen);
  };

  return (
    <>
      <div className="font-inter p-4 flex-col space-y-4">
        <MainHeader onCartClick={toggleCartSummary} />
        <section className='mt-4'>
          {selectedVideo && (
            <TheaterMode
              video={selectedVideo}
              onClose={() => setSelectedVideo(null)}
              onFavorite={handleFavorite}
              onAddToCart={handleAddToCart}
              isFavorited={isVideoFavorited(selectedVideo)}
            />
          )}
        </section>
        <section className=''>
          <RecommendedSection onVideoSelect={setSelectedVideo} videos={videos} />
        </section>
        <section>
          <CatalogueSection onVideoSelect={setSelectedVideo} favoritedVideos={user.favoritedVideos} videos={videos} />
        </section>
        {isCartSummaryOpen && (
          <CartSummaryMenu
            user={user}
            onClose={toggleCartSummary}
            onRemoveFromCart={handleRemoveFromCart}
            onPurchase={handlePurchase}
          />
        )}
      </div>
    </>
  );
}

export default App;