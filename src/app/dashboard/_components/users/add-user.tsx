import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState, useRef } from 'react';
import { validateCreateUser } from '../../_validators/create-user';
import { Input } from '@/components/ui/input';
import { createUser } from '@/app/actions/users/create-user';
import { Loading } from '@/components/icons/loading';

export default function AddUser() {
  const [isActive, setIsActive] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [isActiveError, setIsActiveError] = useState('');
  const [requestError, setRequestError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleIsActive = (state: boolean) => {
    setIsActive(state);
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setFirstNameError('');
    setLastNameError('');
    setIsActiveError('');
    setRequestError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const email = (formRef.current.elements.namedItem('email') as HTMLInputElement).value;
      const firstName = (formRef.current.elements.namedItem('firstName') as HTMLInputElement).value;
      const lastName = (formRef.current.elements.namedItem('lastName') as HTMLInputElement).value;
      const password = (formRef.current.elements.namedItem('password') as HTMLInputElement).value;

      const { success, error } = validateCreateUser({ email, firstName, lastName, password, isActive });
      if (!success) {
        clearErrors();
        setEmailError(error.get('email') || '');
        setFirstNameError(error.get('firstName') || '');
        setLastNameError(error.get('lastName') || '');
        setPasswordError(error.get('password') || '');
        setIsActiveError(error.get('isActive') || '');
      } else {
        clearErrors();
        setIsPending(true);
        const { error, success } = await createUser({ email, firstName, lastName, password, isActive });
        setIsPending(false);
        if (!success) {
          setRequestError(error);
          return;
        }
        formRef.current.reset();
      }
    }
  };

  return (
    <div className='max-w-[300px] md:max-w-[413px] md:w-[413px] h-[650px] md:bg-white md:rounded-3xl md:shadow md:mt-12 py-6 px-10 overflow-y-hidden'>
      <h2 className='text-2xl font-semibold'>Agregar usuario</h2>

      <form className='pt-4 flex flex-col gap-4' ref={formRef} onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='firstName'>Nombre</Label>
          <Input
            id='firstName'
            name='firstName'
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
            name='lastName'
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
            name='email'
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
            name='password'
            type='password'
            placeholder='Introduce tu contraseña'
            autoComplete='off'
            className='h-9 md:h-[52px]'
          />
          <span className='text-primary text-sm h-1'>{passwordError}</span>
        </div>

        <div className='flex items-center gap-1 pt-2'>
          <span className='font-medium'>Activar</span>
          <Switch initialState={isActive} onChange={handleIsActive} />
          <span className='text-primary text-sm h-1'>{isActiveError}</span>
        </div>

        <div>
          <Button variant='secondary' className='h-12 md:h-[52px] w-full' disabled={isPending}>
            <span>Guardar</span>
            {isPending && <Loading width={24} height={24} className='ml-2 animate-spin' />}
          </Button>
          <span className='text-primary text-sm h-1'>{requestError}</span>
        </div>
      </form>
    </div>
  );
}
