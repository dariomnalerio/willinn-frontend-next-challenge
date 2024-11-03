import { createContext, useContext, useReducer, useState } from 'react';
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

// User Editing Store
type UserEditingState = {
  activeUserId: number | null;
  editingUserId: number | null;
};

type UserEditingAction = { type: 'TOGGLE_ACTION_ACTIVE'; id: number } | { type: 'TOGGLE_EDITING'; id: number };

const userEditingReducer = (state: UserEditingState, action: UserEditingAction): UserEditingState => {
  switch (action.type) {
    case 'TOGGLE_ACTION_ACTIVE':
      return {
        ...state,
        activeUserId: state.activeUserId === action.id ? null : action.id,
        editingUserId: null,
      };
    case 'TOGGLE_EDITING':
      if (state.activeUserId !== action.id) {
        return state;
      }
      return {
        ...state,
        editingUserId: state.editingUserId === action.id ? null : action.id,
      };
    default:
      return state;
  }
};

type UserEditingContextType = {
  state: UserEditingState;
  dispatch: React.Dispatch<UserEditingAction>;
  isEditing: (id: number) => boolean;
  isActionActive: (id: number) => boolean;
};

const UserEditingContext = createContext<UserEditingContextType | undefined>(undefined);
export function UserEditingProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(userEditingReducer, { activeUserId: null, editingUserId: null });

  const isEditing = (id: number) => state.editingUserId === id;
  const isActionActive = (id: number) => state.activeUserId === id;

  return (
    <UserEditingContext.Provider value={{ state, dispatch, isEditing, isActionActive }}>
      {children}
    </UserEditingContext.Provider>
  );
}
export function useUsersEditing(): UserEditingContextType {
  const context = useContext(UserEditingContext);

  if (!context) {
    throw new Error('useUsersEditing must be used within a UserEditingProvider');
  }
  return context;
}
