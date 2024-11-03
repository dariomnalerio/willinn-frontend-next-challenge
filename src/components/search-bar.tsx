'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import { MagnifyingGlass } from './icons/magnifying-glass';

type SearchBarProps<T> = {
  items: T[];
  placeholder: string;
  onSearch: (results: T[]) => void;
  searchFields: (keyof T)[];
};

/**
 * A generic search bar component that filters a list of items based on a search term.
 *
 * @example
 * ```tsx
 * const items = [
 *   { name: 'Apple', category: 'Fruit' },
 *   { name: 'Carrot', category: 'Vegetable' },
 * ];
 *
 * function handleSearch(filteredItems) {
 *   console.log(filteredItems);
 * }
 *
 * <SearchBar
 *   items={items}
 *   placeholder="Search..."
 *   onSearch={handleSearch}
 *   searchFields={['name', 'category']}
 * />
 * ```
 */
export function SearchBar<T>({ items, placeholder, onSearch, searchFields }: SearchBarProps<T>): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const prevFilteredItems = useRef<T[]>(items);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const results = items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });

    /* 
    TODO: change this to a deep comparison, which is more efficient and reliant
    Stringified objects sometimes have their keys and values in different orders, which can cause false negatives
   */
    const areResultsDifferent = JSON.stringify(results) !== JSON.stringify(prevFilteredItems.current);

    if (areResultsDifferent) {
      setFilteredItems(results);
      prevFilteredItems.current = results;
    }
  }, [items, searchFields, searchTerm, onSearch]);

  useEffect(() => {
    onSearch(filteredItems);
  }, [filteredItems, onSearch]);

  return (
    <div className='relative'>
      <Input
        type='text'
        autoComplete='off'
        className='border-background/90 ring-none bg-background rounded-full h-10 pl-10 max-w-[150px] md:max-w-[255px]'
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <MagnifyingGlass
        width={20}
        height={20}
        className='absolute top-1/2 transform -translate-y-1/2 left-3 text-[hsla(218, 38%, 60%, 1)]'
      />
    </div>
  );
}
