import React, { useEffect } from 'react';
import MainHeader from "./Components/Headers/MainHeader";
import RecommendedSection from "./Sections/RecommendedSection";
import CatalogueSection from "./Sections/CatalogueSection";
import TheaterMode from "./Components/TheaterMode";
import { fetchVideos } from './Utils/api';
import { VideoProvider, useVideoContext } from './Context/VideoContext';

const App: React.FC = () => {
  const { videos, setVideos, selectedVideo, setSelectedVideo } = useVideoContext();

  useEffect(() => {
    // Gets videos from the API and sets the state
    const getVideos = async () => {
      const fetchedVideos = await fetchVideos();
      setVideos(fetchedVideos);
    };
    getVideos();
  }, [setVideos]);

  return (
    <div className="font-inter p-4 flex-col space-y-4">
      <MainHeader />
      <section className='mt-4'>
        {selectedVideo && (
          <TheaterMode
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </section>
      <section className=''>
        <RecommendedSection onVideoSelect={setSelectedVideo} />
      </section>
      <section>
        <CatalogueSection onVideoSelect={setSelectedVideo} />
      </section>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <VideoProvider>
    <App />
  </VideoProvider>
);

export default AppWrapper;