import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

interface SortMenuProps {
  onSort: (sortBy: string) => void;
  onClose: () => void;
}

const SortMenu: React.FC<SortMenuProps> = ({ onSort, onClose }) => {
  const [sortBy, setSortBy] = useState<string>('');

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSort(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="p-4 bg-[#525E76] rounded-xl w-96 relative text-white">
        <div className='flex flex-row items-center justify-between mb-4'>
          <h2 className="text-3xl font-medium">Sort Videos</h2>
          <button className="" onClick={onClose}>
            <IoCloseOutline size={40} color='white'/>
          </button>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-2xl font-light">Title</label>
            <input
              type="radio"
              name="sort"
              checked={sortBy === 'title'}
              className='w-6 h-6'
              onChange={() => handleSortChange('title')}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-2xl font-light">Length</label>
            <input
              type="radio"
              name="sort"
              checked={sortBy === 'length'}
              className='w-6 h-6'
              onChange={() => handleSortChange('length')}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-2xl font-light">Paid/Unpaid</label>
            <input
              type="radio"
              name="sort"
              checked={sortBy === 'paidStatus'}
              className='w-6 h-6'
              onChange={() => handleSortChange('paidStatus')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortMenu;