'use client';
import { Home } from '@/components/icons/home';
import { Users } from '@/components/icons/users';
import { useQueryString } from '@/hooks';
import { cn } from '@/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Renders the sidebar navigation with 'Home' and 'Users' tabs.
 * Manages active tab state based on the URL query parameter 'tab'.
 * Defaults to the 'home' tab if the 'tab' parameter is missing or invalid.
 * Handles tab navigation by updating the URL with the selected tab.
 */
export function SidebarNav(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParams, createQueryString } = useQueryString();

  useEffect(() => {
    const tabs = ['home', 'users'];
    if (!searchParams.get('tab') || !tabs.includes(searchParams.get('tab')!)) {
      router.push(`${pathname}?${createQueryString('tab', 'home')}`);
    }
  }, [createQueryString, pathname, router, searchParams]);

  const handleTabNavigation = (tab: string) => {
    router.push(`${pathname}?${createQueryString('tab', tab)}`);
  };

  return (
    <nav className='mt-8'>
      <ul className='text-lg space-y-5'>
        <li>
          <button
            onClick={() => handleTabNavigation('home')}
            className={cn('flex items-center gap-6 transition-colors duration-300', {
              'text-gray-400': searchParams.get('tab') !== 'home',
              'text-primary': searchParams.get('tab') === 'home',
            })}
          >
            <Home width={28} height={28} />
            Inicio
          </button>
        </li>
        <li>
          <button
            onClick={() => handleTabNavigation('users')}
            className={cn('flex items-center gap-6 transition-colors duration-300', {
              'text-gray-400': searchParams.get('tab') !== 'users',
              'text-primary': searchParams.get('tab') === 'users',
            })}
          >
            <Users width={28} height={28} />
            Usuarios
          </button>
        </li>
      </ul>
    </nav>
  );
}
