'use client';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye } from '@/components/icons/eye';
import { EyeOff } from '@/components/icons/eye-off';
import { CustomLink } from '@/components/ui/custom-link';

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form className='flex flex-col content-center gap-5 p-9' onSubmit={handleOnSubmit}>
      <h1 className='text-2xl p-1 text-center text-balance font-medium mb-4'>Inicia sesión</h1>

      <div className='flex flex-col gap-1 max-w-[460px]'>
        <Label htmlFor='email'>E-mail</Label>
        <Input type='email' id='email' placeholder='Introduce tu e-mail' />
      </div>
      <div className='flex flex-col gap-1 max-w-[460px]'>
        <Label htmlFor='password'>Contraseña</Label>
        <div className='relative'>
          <Input
            className='w-full pr-9'
            type={showPassword ? 'text' : 'password'}
            id='password'
            autoComplete='off'
            placeholder='Introduce tu contraseña'
          />
          <button
            type='button'
            onClick={handlePasswordVisibility}
            className='absolute inset-y-0 right-3 flex items-center text-[#949CA9]'
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword && <EyeOff width={19} height={19} />}
            {!showPassword && <Eye width={19} height={19} />}
          </button>
        </div>
      </div>
      <Button variant='primary' type='submit'>
        Ingresar
      </Button>
      <div className='self-end -mt-3'>
        <CustomLink variant='link' href='/forgot-password'>
          Olvidaste la Contraseña?
        </CustomLink>
      </div>
    </form>
  );
}
