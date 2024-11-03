import { emailRegex } from "@/utils";
import { EditUser, RequiredField, ValidatorReturnType } from "../_types";

export function validateEditUser(user: Partial<EditUser>): ValidatorReturnType<EditUser> {
  const errors = new Map<keyof EditUser, string>();

  const requiredFields: RequiredField<Partial<EditUser>>[] = [
    { key: 'firstName', message: 'El nombre es requerido', isValid: (value) => Boolean(value) },
    { key: 'lastName', message: 'El apellido es requerido', isValid: (value) => Boolean(value) },
    { key: 'email', message: 'Ingresa un e-mail válido', isValid: (value) => emailRegex.test(value as string) },
  ]

  requiredFields.forEach(({ key, message, isValid }) => {
    const value = user[key];
    if (!isValid(value)) {
      errors.set(key, message);
    }
  })

  return errors.size > 0 ? { success: false, error: errors } : { success: true, error: null, }
}