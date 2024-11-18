import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

interface SearchMenuProps {
  onSearch: (searchTerm: string) => void;
  onClose: () => void;
}

const SearchMenu: React.FC<SearchMenuProps> = ({ onSearch, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="p-4 bg-[#525E76] rounded-xl w-96 relative text-white">
        <div className='flex flex-row items-center justify-between mb-4'>
          <h2 className="text-3xl font-medium">Search Videos</h2>
          <button className="" onClick={onClose}>
            <IoCloseOutline size={40} color='white'/>
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name"
            className="w-full p-2 bg-[#525E76] border border-white rounded text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;