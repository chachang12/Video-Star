import React, { useEffect, useState } from 'react';
import CatalogueHeader from '../Components/Headers/CatalogueHeader';
import { Video } from './../Models/Video';
import VideoCard from '../Components/Cards/VideoCard';
import { filterByDuration, filterByPaidStatus, filterByName, filterByFavoritedStatus } from '../Lib/FilteringFunctions';
import { sortByTitle, sortByLength, sortByPaidStatus } from '../Lib/SortingFunctions';
import { useVideoContext } from '../Context/VideoContext';

const CatalogueSection: React.FC<{ onVideoSelect: (video: Video) => void }> = ({ onVideoSelect }) => {
  const { videos } = useVideoContext();
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilteredVideos(videos);
    setLoading(false);
  }, [videos]);

  const handleFilter = (filters: { showFree: boolean | null, minDuration: string, maxDuration: string, showFavorited: boolean }) => {
    let filtered = videos;

    if (filters.showFree !== null) {
      filtered = filterByPaidStatus(filtered, filters.showFree);
    }

    if (filters.minDuration && filters.maxDuration) {
      filtered = filterByDuration(filtered, filters.minDuration, filters.maxDuration);
    }

    if (filters.showFavorited) {
      filtered = filterByFavoritedStatus(filtered);
    }

    setFilteredVideos(filtered);
  };

  const handleSort = (sortBy: string) => {
    let sorted = [...filteredVideos];

    if (sortBy === 'title') {
      sorted = sortByTitle(sorted);
    } else if (sortBy === 'length') {
      sorted = sortByLength(sorted);
    } else if (sortBy === 'paidStatus') {
      sorted = sortByPaidStatus(sorted);
    }

    setFilteredVideos(sorted);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = filterByName(videos, searchTerm);
    setFilteredVideos(filtered);
  };

  return (
    <div className='flex flex-col'>
      <section className='mb-2'>
        <CatalogueHeader onFilter={handleFilter} onSort={handleSort} onSearch={handleSearch} />
      </section>
      <section className='flex flex-row flex-wrap gap-6 w-full justify-between '>
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} onVideoSelect={onVideoSelect} />
          ))
        )}
      </section>
    </div>
  );
};

export default CatalogueSection;