'use client';

import { OptionsHorizontal } from '@/components/icons/options-horizontal';
import { User } from '../../_types';
import { useState } from 'react';
import { cn } from '@/utils';
import { TrashCan } from '@/components/icons/trash-can';
import { Edit } from '@/components/icons/edit';

export default function ActionCell({ user }: { user: User }): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  const handleIsActive = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className='w-24 flex justify-end'>
      <div
        className={cn(
          'bg-gray-100 hover:bg-gray-200 cursor-pointer flex justify-center items-center rounded-full overflow-hidden transition-all duration-500 ease-in-out h-9',
          {
            'w-24': isActive,
            'w-9': !isActive,
          },
        )}
        onClick={handleIsActive}
      >
        {!isActive && <OptionsHorizontal width={24} height={24} />}
        {isActive && (
          <div className='flex items-center w-full justify-between px-3'>
            <TrashCan width={24} height={24} className='text-red-600 hover:scale-110 duration-300 ease-in-out' />
            <Edit width={24} height={24} className='hover:scale-110 duration-300 ease-in-out' />
          </div>
        )}
      </div>
    </div>
  );
}
