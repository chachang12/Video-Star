import React, { useEffect, useState } from 'react';
import CatalogueHeader from '../Components/Headers/CatalogueHeader';
import { Video } from './../Models/Video';
import VideoCard from '../Components/Cards/VideoCard';
import { filterByDuration, filterByPaidStatus, filterByName, filterByFavoritedStatus } from '../Lib/FilteringFunctions';
import { sortByTitle, sortByLength, sortByPaidStatus } from '../Lib/SortingFunctions';

interface CatalogueSectionProps {
  onVideoSelect: (video: Video) => void;
  favoritedVideos: Video[];
  videos: Video[];
}

const CatalogueSection: React.FC<CatalogueSectionProps> = ({ onVideoSelect, favoritedVideos, videos }) => {
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
      filtered = filterByFavoritedStatus(filtered, favoritedVideos);
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
    <div>
      <section className='mb-2'>
        <CatalogueHeader onFilter={handleFilter} onSort={handleSort} onSearch={handleSearch} />
      </section>
      
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : filteredVideos.length === 0 ? (
        <div className="text-center text-white">No videos available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} onVideoSelect={onVideoSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogueSection;