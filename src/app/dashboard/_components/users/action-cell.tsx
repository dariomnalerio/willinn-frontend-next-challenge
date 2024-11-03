'use client';

import { OptionsHorizontal } from '@/components/icons/options-horizontal';
import { User } from '../../_types';
import { cn } from '@/utils';
import { TrashCan } from '@/components/icons/trash-can';
import { Edit } from '@/components/icons/edit';
import { useUsersEditing } from '../../_stores/users-store';

export default function ActionCell({ user }: { user: User }): JSX.Element {
  const { dispatch, isActionActive, isEditing } = useUsersEditing();

  const handleIsActive = () => {
    dispatch({ type: 'TOGGLE_ACTION_ACTIVE', id: user.id });
  };

  const handleIsEditing = () => {
    dispatch({ type: 'TOGGLE_EDITING', id: user.id });
  };

  return (
    <div className='md:pr-3 flex justify-end'>
      <div
        className={cn(
          'bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-500 overflow-hidden ease-in-out h-9',
          {
            'w-24': isActionActive(user.id),
            'w-9': !isActionActive(user.id),
          },
        )}
      >
        {!isActionActive(user.id) && (
          <button
            className='w-full h-full flex justify-center items-center'
            onClick={handleIsActive}
            aria-label='Realizar acción'
          >
            <OptionsHorizontal width={24} height={24} />
          </button>
        )}
        {isActionActive(user.id) && (
          <div className='h-full w-full flex items-center justify-between px-3'>
            <button aria-label='Eliminar usuario' className='p-1 rounded-full'>
              <TrashCan width={24} height={24} className='text-primary hover:scale-110 duration-300 ease-in-out' />
            </button>
            <button
              onClick={handleIsEditing}
              aria-label='Editar usuario'
              className={cn('p-1 rounded-full transition-all duration-300 ease-in-out', {
                'bg-gray-400/60': isEditing(user.id),
              })}
            >
              <Edit width={24} height={24} className='hover:scale-110 duration-300 ease-in-out' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
