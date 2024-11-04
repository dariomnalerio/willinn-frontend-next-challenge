import { RequiredField, ValidatorReturnType } from '@/types';
import { LoginData } from '../_types';
import { emailRegex } from '@/utils';

export function validateLoginData(data: LoginData): ValidatorReturnType<LoginData> {
  const errors = new Map<keyof LoginData, string>();

  const requiredFields: RequiredField<LoginData>[] = [
    { key: 'email', message: 'Ingresa un e-mail válido', isValid: (value) => emailRegex.test(value as string) },
    { key: 'password', message: 'La contraseña es requerida', isValid: (value) => Boolean(value) },
  ];

  requiredFields.forEach(({ key, message, isValid }) => {
    const value = data[key];
    if (!isValid(value)) {
      errors.set(key, message);
    }
  });

  return errors.size > 0 ? { success: false, error: errors } : { success: true, error: null };
}
