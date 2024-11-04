import { emailRegex, passwordRegex } from '@/utils';
import { CreateUser } from '../_types';
import { ValidatorReturnType, RequiredField } from '@/types';

export function validateCreateUser(user: CreateUser): ValidatorReturnType<CreateUser> {
  const errors = new Map<keyof CreateUser, string>();

  const requiredFields: RequiredField<CreateUser>[] = [
    { key: 'firstName', message: 'El nombre es requerido', isValid: (value) => Boolean(value) },
    { key: 'lastName', message: 'El apellido es requerido', isValid: (value) => Boolean(value) },
    { key: 'email', message: 'Ingresa un e-mail válido', isValid: (value) => emailRegex.test(value as string) },
    {
      key: 'password',
      message: 'Ingresa una contraseña válida',
      isValid: (value) => passwordRegex.test(value as string),
    },
    { key: 'isActive', message: 'Campo requerido', isValid: (value) => typeof value === 'boolean' },
  ];

  requiredFields.forEach(({ key, message, isValid }) => {
    const value = user[key];
    if (!isValid(value)) {
      errors.set(key, message);
    }
  });

  return errors.size > 0 ? { success: false, error: errors } : { success: true, error: null };
}
