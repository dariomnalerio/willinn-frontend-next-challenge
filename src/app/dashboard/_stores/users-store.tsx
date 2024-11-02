import { createContext, useContext, useState } from 'react';
import { User } from '../_types';

type UserContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  return <UserContext.Provider value={{ users, setUsers }}>{children}</UserContext.Provider>;
}

export function useUsers(): UserContextType {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}
