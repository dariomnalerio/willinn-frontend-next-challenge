
/**
 * Represents a user in the system.
 */
export type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  password: string;
}

export type EditUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export type ValidatorReturnType<K> = { success: true, error: null } | { success: false, error: Map<keyof K, string> };
export type RequiredField<K> = { key: keyof K; message: string, isValid: <T>(value: T) => boolean }