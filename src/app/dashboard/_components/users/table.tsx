import { cn } from '@/utils';
import ActionCell from './action-cell';
import { useUsers } from '../../_stores/users-store';

export function Table(): JSX.Element {
  const { users } = useUsers();
  return (
    <table className='w-full my-3'>
      <thead>
        <tr className='border-b border-gray-200'>
          <th className='text-lg font-medium text-gray-700 px-6 py-3 text-left'>Nombre</th>
          <th className='text-lg font-medium text-gray-700 px-6 py-3 text-left'>Correo</th>
          <th className='text-lg font-medium text-gray-700 px-6 py-3 text-right'></th>
        </tr>
      </thead>
      <tbody>
        {users && users.length > 0 && (
          <>
            {/* TODO: add pagination. For now the first 8 users are shown in order not to overflow the ui and keep the same design */}
            {users.slice(0, 8).map((user, idx) => (
              <tr key={user.id + idx} className='h-14 border-b border-gray-200 hover:bg-gray-50'>
                <td
                  className={cn('pl-6 text-[#718EBF]', {
                    'line-through': !user.isActive,
                  })}
                >
                  {user.name}
                </td>
                <td
                  className={cn('pl-6 text-[#718EBF]', {
                    'line-through': !user.isActive,
                  })}
                >
                  {user.email}
                </td>
                <td>
                  <ActionCell user={user} />
                </td>
              </tr>
            ))}
          </>
        )}
        {users && users.length === 0 && (
          <tr>
            <td colSpan={3} className='text-center text-balance py-8 text-lg text-gray-500'>
              <span>No se encontraron usuarios</span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
