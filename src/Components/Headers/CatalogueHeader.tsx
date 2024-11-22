import React, { useState } from 'react';
import { CiSearch, CiFilter } from "react-icons/ci";
import { BsSortDown } from "react-icons/bs";
import FilterMenu from '../Menus/FilterMenu';
import SortMenu from '../Menus/SortMenu';
import SearchMenu from '../Menus/SearchMenu';

interface CatalogueHeaderProps {
  onFilter: (filters: { showFree: boolean | null, minDuration: string, maxDuration: string, showFavorited: boolean }) => void;
  onSort: (sortBy: string) => void;
  onSearch: (searchTerm: string) => void;
}

const CatalogueHeader: React.FC<CatalogueHeaderProps> = ({ onFilter, onSort, onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ showFree: boolean | null, minDuration: string, maxDuration: string, showFavorited: boolean }>({ showFree: null, minDuration: '', maxDuration: '', showFavorited: false });
  const [sortBy, setSortBy] = useState<string>('');

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
  };

  const handleFilter = (newFilters: { showFree: boolean | null, minDuration: string, maxDuration: string, showFavorited: boolean }) => {
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);
    onSort(sortOption);
  };

  return (
    <div className='flex flex-row items-center justify-between'>
      <h1 className='text-[#91BA92] font-[600] text-xl mb-2'>
        Catalogue
      </h1>
      <div className='flex flex-row gap-1'>
        <button onClick={toggleSearch}>
          <CiSearch size={35} color='white'/>
        </button>
        <button onClick={toggleFilter}>
          <CiFilter size={35} color='white'/>
        </button>
        <button onClick={toggleSort}>
          <BsSortDown size={35} color='white'/>
        </button>
      </div>

      {isSearchOpen && (
        <SearchMenu searchTerm={searchTerm} onSearch={handleSearch} onClose={toggleSearch} />
      )}
      {isFilterOpen && (
        <FilterMenu filters={filters} onFilter={handleFilter} onClose={toggleFilter} />
      )}
      {isSortOpen && (
        <SortMenu sortBy={sortBy} onSort={handleSort} onClose={toggleSort} />
      )}
    </div>
  );
};

export default CatalogueHeader;