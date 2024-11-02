'use client';
import { useEffect, useState } from 'react';
import { User } from '../../_types';
import { Table } from './table';
import { SearchBar } from '@/components/search-bar';
import { UserEditingProvider, useUsers } from '../../_stores/users-store';

export function UsersTab({ users: usersProp }: { users: User[] }): JSX.Element {
  const { setUsers } = useUsers();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUsers(usersProp);
    setIsLoading(false);
  }, [setUsers, usersProp]);

  const handleSearch = (results: User[]) => {
    setUsers(results);
  };
  return (
    <>
      <h1 className='text-2xl font-semibold'>Usuarios</h1>
      <div className='w-[598px] h-[606px] bg-white rounded-3xl shadow mt-12 py-3 overflow-y-hidden'>
        {/* TODO: loading skeleton */}
        {isLoading && <div className='flex justify-center items-center h-full'>Cargando...</div>}
        {!isLoading && (
          <>
            {/* Table section */}
            <div className=' flex justify-between items-center px-8 border-b pb-3'>
              <span className='text-lg font-medium'>Usuarios</span>
              <SearchBar items={usersProp} onSearch={handleSearch} searchFields={['name']} placeholder='Buscar' />
            </div>
            <UserEditingProvider>
              <Table />
            </UserEditingProvider>
          </>
        )}
      </div>
    </>
  );
}
