'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { useUsers, useUsersEditing } from '../../_stores/users-store';
import { validateEditUser } from '../../_validators/edit-user';
import { editUser } from '@/app/actions/users/edit-user';
import { Loading } from '@/components/icons/loading';

export default function EditUser(): JSX.Element {
  const { users } = useUsers();
  const {
    state: { editingUserId },
    dispatch,
  } = useUsersEditing();
  const user = users.find((user) => user.id === editingUserId);
  const [fn, ln] = user?.name.split(' ') || [];
  const [firstName, setFirstName] = useState(fn);
  const [lastName, setLastName] = useState(ln);
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  // errors
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [requestError, setRequestError] = useState('');

  const clearErrors = () => {
    setEmailError('');
    setFirstNameError('');
    setLastNameError('');
    setPasswordError('');
    setRequestError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, error } = validateEditUser({ firstName, lastName, email, password });
    if (!success) {
      clearErrors();
      setFirstNameError(error.get('firstName') || '');
      setLastNameError(error.get('lastName') || '');
      setEmailError(error.get('email') || '');
      setPasswordError(error.get('password') || '');
    } else {
      clearErrors();
      setIsPending(true);
      const { success, error } = await editUser({ firstName, lastName, email, password, id: user!.id });
      setIsPending(false);
      if (!success) {
        setRequestError(error);
        return;
      }

      dispatch({ type: 'TOGGLE_ACTION_ACTIVE', id: user!.id });
    }
  };

  return (
    <div className='max-w-[300px] md:max-w-[413px] md:w-[413px] h-[650px] md:bg-white md:rounded-3xl md:shadow md:mt-12 py-6 px-10 overflow-y-hidden'>
      <h2 className='text-2xl font-semibold'>Editar usuario</h2>

      {!user && (
        <div className='text-center pt-4'>
          <p className='text-lg'>Selecciona un usuario para editar</p>
        </div>
      )}

      {user && (
        <form className='pt-4 flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='firstName'>Nombre</Label>
            <Input
              id='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type='text'
              placeholder='Introduce el nombre'
              autoComplete='off'
              className='h-9 md:h-[52px]'
            />
            <span className='text-primary text-sm h-1'>{firstNameError}</span>
          </div>

          <div className='flex flex-col gap-1'>
            <Label htmlFor='lastName'>Apellido</Label>
            <Input
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              placeholder='Introduce el appellido'
              autoComplete='off'
              className='h-9 md:h-[52px]'
            />
            <span className='text-primary text-sm h-1'>{lastNameError}</span>
          </div>

          <div className='flex flex-col gap-1 pt-10'>
            <Label htmlFor='email'>E-mail</Label>
            <Input
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              placeholder='Introduce tu E-mail'
              autoComplete='off'
              className='h-9 md:h-[52px]'
            />
            <span className='text-primary text-sm h-1'>{emailError}</span>
          </div>

          <div className='flex flex-col gap-1'>
            <Label htmlFor='password'>Contraseña</Label>
            <Input
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Introduce tu nueva contraseña'
              autoComplete='off'
              className='h-9 md:h-[52px]'
            />
            <span className='text-primary text-sm h-1'>{passwordError}</span>
          </div>

          <div>
            <Button variant='secondary' className='h-12  md:h-[52px] mt-[52px] w-full' disabled={isPending}>
              <span>Guardar</span>
              {isPending && <Loading width={24} height={24} className='ml-2 animate-spin' />}
            </Button>
            <span className='text-primary text-sm h-1'>{requestError}</span>
          </div>
        </form>
      )}
    </div>
  );
}
