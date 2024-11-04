
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