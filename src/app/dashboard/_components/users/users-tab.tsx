'use client';
import { useEffect, useState } from 'react';
import { User } from '../../_types';
import { Table } from './table';
import { SearchBar } from '@/components/search-bar';
import { UserEditingProvider, useUsers } from '../../_stores/users-store';
import { UserActions } from './user-actions';
import { Skeleton } from './skeleton';

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
    <div>
      <h1 className='pt-12 md:mt-0 ml-4 md:ml-0 text-2xl font-semibold'>Usuarios</h1>
      <div className='flex flex-wrap items-center justify-center md:justify-normal gap-9'>
        <UserEditingProvider>
          <div className='w-full md:max-w-[500px] lg:max-w-[665px] md:h-[650px] md:bg-white md:rounded-3xl md:shadow mt-5 md:mt-12 py-3 overflow-y-hidden'>
            {isLoading && <Skeleton />}
            {!isLoading && (
              <>
                {/* Table section */}
                <div className='flex justify-between items-center px-6 border-b pb-3'>
                  <span className='text-lg font-medium'>Usuarios</span>
                  <SearchBar items={usersProp} onSearch={handleSearch} searchFields={['name']} placeholder='Buscar' />
                </div>
                <Table />
              </>
            )}
          </div>
          <UserActions />
        </UserEditingProvider>
      </div>
    </div>
  );
}
