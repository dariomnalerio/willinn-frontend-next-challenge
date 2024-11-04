'use client';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye } from '@/components/icons/eye';
import { EyeOff } from '@/components/icons/eye-off';
import { CustomLink } from '@/components/ui/custom-link';
import { validateLoginData } from '../_validators/login';
import { handleLogin } from '@/app/actions/auth/login';
import { Loading } from '@/components/icons/loading';

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [requestError, setRequestError] = React.useState('');
  const formRef = React.useRef<HTMLFormElement>(null);

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setRequestError('');
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const email = (formRef.current.elements.namedItem('email') as HTMLInputElement).value;
      const password = (formRef.current.elements.namedItem('password') as HTMLInputElement).value;

      const { success, error } = validateLoginData({ email, password });

      if (!success) {
        clearErrors();
        setEmailError(error.get('email') || '');
        setPasswordError(error.get('password') || '');
      } else {
        clearErrors();
        setIsPending(true);
        const response = await handleLogin({ email, password });
        if (response && !response.success) {
          setRequestError(response.error);
        }
        setIsPending(false);
      }
    }
  };

  return (
    <form className='flex flex-col content-center gap-5 p-9' ref={formRef} onSubmit={handleOnSubmit}>
      <h1 className='text-2xl p-1 text-center text-balance font-medium mb-4'>Inicia sesión</h1>

      <div className='flex flex-col gap-1 max-w-[460px]'>
        <Label htmlFor='email'>E-mail</Label>
        <Input type='email' name='email' id='email' placeholder='Introduce tu e-mail' />
        <span className='text-primary text-sm h-1'>{emailError}</span>
      </div>
      <div className='flex flex-col gap-1 max-w-[460px]'>
        <Label htmlFor='password'>Contraseña</Label>
        <div className='relative'>
          <Input
            className='w-full pr-9'
            name='password'
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
        <span className='text-primary text-sm h-1'>{passwordError}</span>
      </div>

      <div>
        <Button variant='primary' type='submit' className='w-full' disabled={isPending}>
          <span>Ingresar</span>
          {isPending && <Loading width={24} height={24} className='ml-2 animate-spin' />}
        </Button>
        <span className='text-primary text-sm h-1'>{requestError}</span>
      </div>

      <div className='self-end -mt-3'>
        <CustomLink variant='link' href='/forgot-password'>
          Olvidaste la Contraseña?
        </CustomLink>
      </div>
    </form>
  );
}
