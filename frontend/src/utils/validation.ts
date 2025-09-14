// frontend/src/utils/validation.ts
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
const NAME_REGEX = /^[a-zA-Z\s]{2,}$/;

export const validateEmail = (email: string): ValidationError | null => {
  if (!email) {
    return { field: 'email', message: 'Email is required' };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { field: 'email', message: 'Please enter a valid email address' };
  }
  return null;
};

export const validatePassword = (password: string): ValidationError | null => {
  if (!password) {
    return { field: 'password', message: 'Password is required' };
  }
  if (password.length < 10) {
    return {
      field: 'password',
      message: 'Password must be at least 10 characters long',
    };
  }
  if (!PASSWORD_REGEX.test(password)) {
    return {
      field: 'password',
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    };
  }
  return null;
};

export const validateName = (name: string): ValidationError | null => {
  if (!name) {
    return { field: 'name', message: 'Name is required' };
  }
  if (!NAME_REGEX.test(name)) {
    return {
      field: 'name',
      message: 'Name must contain only letters and spaces, and be at least 2 characters long',
    };
  }
  return null;
};

export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const errors: ValidationError[] = [];
  
  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateRegisterForm = (
  email: string,
  password: string,
  name: string
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);
  
  const nameError = validateName(name);
  if (nameError) errors.push(nameError);
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};