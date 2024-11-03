import { emailRegex } from "@/utils";
import { CreateUser, RequiredField, ValidatorReturnType } from "../_types";



export function validateCreateUser(user: CreateUser): ValidatorReturnType<CreateUser> {

  const errors = new Map<keyof CreateUser, string>();

  const requiredFields: RequiredField<CreateUser>[] = [
    { key: 'firstName', message: 'El nombre es requerido', isValid: (value) => Boolean(value) },
    { key: 'lastName', message: 'El apellido es requerido', isValid: (value) => Boolean(value) },
    { key: 'email', message: 'Ingresa un e-mail válido', isValid: (value) => emailRegex.test(value as string) },
    { key: 'password', message: 'La contraseña es requerida', isValid: (value) => Boolean(value) },
    { key: 'isActive', message: 'Campo requerido', isValid: (value) => typeof value === 'boolean' }
  ]

  requiredFields.forEach(({ key, message, isValid }) => {
    const value = user[key];
    if (!isValid(value)) {
      errors.set(key, message);
    }
  })

  return errors.size > 0 ? { success: false, error: errors } : { success: true, error: null, }
}