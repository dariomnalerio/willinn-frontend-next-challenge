'use client';

import { useUsersEditing } from '../../_stores/users-store';
import AddUser from './add-user';
import EditUser from './edit-user';

export function UserActions(): JSX.Element {
  const { state } = useUsersEditing();
  const isEditingUser = state.editingUserId !== null;

  return (
    <>
      {isEditingUser && <EditUser />}
      {!isEditingUser && <AddUser />}
    </>
  );
}
