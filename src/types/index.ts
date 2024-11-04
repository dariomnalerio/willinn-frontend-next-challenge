export type ValidatorReturnType<K> = { success: true; error: null } | { success: false; error: Map<keyof K, string> };
export type RequiredField<K> = { key: keyof K; message: string; isValid: <T>(value: T) => boolean };
export type ApiReturnType = { success: true; data: any; error: null } | { success: false; data: null; error: string };
