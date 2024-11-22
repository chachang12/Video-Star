import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

interface FilterMenuProps {
  filters: { showFree: boolean | null, minDuration: string, maxDuration: string, showFavorited: boolean };
  onFilter: (filters: { showFree: boolean | null, minDuration: string, maxDuration: string, showFavorited: boolean }) => void;
  onClose: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ filters, onFilter, onClose }) => {
  const { showFree, minDuration, maxDuration, showFavorited } = filters;

  const handleShowFreeChange = (value: boolean | null) => {
    onFilter({ showFree: value, minDuration, maxDuration, showFavorited });
  };

  const handleMinDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilter({ showFree, minDuration: value, maxDuration, showFavorited });
  };

  const handleMaxDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilter({ showFree, minDuration, maxDuration: value, showFavorited });
  };

  const handleShowFavoritedChange = () => {
    onFilter({ showFree, minDuration, maxDuration, showFavorited: !showFavorited });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="p-4 bg-[#525E76] rounded-xl w-96 relative text-white">
        <div className='flex flex-row items-center justify-between mb-4'>
          <h2 className="text-3xl font-medium">Filter Videos</h2>
          <button className="" onClick={onClose}>
            <IoCloseOutline size={40} color='white'/>
          </button>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-2xl font-light">Free</label>
            <input
              type="checkbox"
              checked={showFree === true}
              className='w-6 h-6'
              onChange={() => handleShowFreeChange(showFree === true ? null : true)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-2xl font-light">Paid</label>
            <input
              type="checkbox"
              checked={showFree === false}
              className='w-6 h-6'
              onChange={() => handleShowFreeChange(showFree === false ? null : false)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-2xl font-light">Favorited</label>
            <input
              type="checkbox"
              checked={showFavorited}
              className='w-6 h-6'
              onChange={handleShowFavoritedChange}
            />
          </div>
          <h2 className='text-2xl font-light mb-1'>
            Duration
          </h2>
          <div className='flex flex-row gap-2 items-center text-black'>
            <div className="">
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={minDuration}
                onChange={handleMinDurationChange}
              />
            </div>
            <div className="">
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={maxDuration}
                onChange={handleMaxDurationChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;