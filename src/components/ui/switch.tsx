'use client';

import { cn } from '@/utils';
import { useState } from 'react';

type SwitchProps = {
  initialState: boolean;
  onChange: (state: boolean) => void;
};

export const Switch: React.FC<SwitchProps> = ({ initialState = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange(newState);
  };

  return (
    <label className='relative inline-flex items-center cursor-pointer'>
      <input type='checkbox' checked={isChecked} onChange={handleToggle} className='sr-only peer' />
      <div className='w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-green-500  transition-all duration-500'></div>
      <div
        className={cn('absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-500', {
          'transform translate-x-5': isChecked,
        })}
      ></div>
    </label>
  );
};
