/**
 * Validation Helper Utilities
 * Provides comprehensive validation functions for forms, data, and user inputs
 */

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone number validation regex (supports various formats)
 */
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

/**
 * URL validation regex
 */
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

/**
 * Credit card validation regex (basic pattern)
 */
const CREDIT_CARD_REGEX = /^[0-9]{13,19}$/;

/**
 * Validate email address
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Validate phone number
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  return PHONE_REGEX.test(phone.trim());
};

/**
 * Validate URL
 */
export const validateURL = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  return URL_REGEX.test(url.trim());
};

/**
 * Validate credit card number
 */
export const validateCreditCard = (cardNumber: string): boolean => {
  if (!cardNumber || typeof cardNumber !== 'string') return false;
  const cleaned = cardNumber.replace(/\s+/g, '');
  return CREDIT_CARD_REGEX.test(cleaned);
};

/**
 * Validate password strength
 */
export const validatePassword = (
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}
): { isValid: boolean; errors: string[] } => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false,
  } = options;

  const errors: string[] = [];

  if (!password || typeof password !== 'string') {
    return { isValid: false, errors: ['Password is required'] };
  }

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate name (letters, spaces, hyphens, apostrophes)
 */
export const validateName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 2;
};

/**
 * Validate postal/ZIP code
 */
export const validatePostalCode = (code: string, country?: string): boolean => {
  if (!code || typeof code !== 'string') return false;

  const patterns: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
    CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
    IN: /^\d{6}$/,
    DEFAULT: /^[A-Z0-9\s-]{3,10}$/i,
  };

  const pattern = country ? patterns[country.toUpperCase()] || patterns.DEFAULT : patterns.DEFAULT;
  return pattern.test(code.trim());
};

/**
 * Validate date string
 */
export const validateDate = (dateString: string): boolean => {
  if (!dateString || typeof dateString !== 'string') return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Validate date is in the future
 */
export const validateFutureDate = (dateString: string): boolean => {
  if (!validateDate(dateString)) return false;
  const date = new Date(dateString);
  return date > new Date();
};

/**
 * Validate date is in the past
 */
export const validatePastDate = (dateString: string): boolean => {
  if (!validateDate(dateString)) return false;
  const date = new Date(dateString);
  return date < new Date();
};

/**
 * Validate age (must be at least minAge years old)
 */
export const validateAge = (birthDate: string, minAge: number = 18): boolean => {
  if (!validateDate(birthDate)) return false;
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= minAge;
  }
  
  return age >= minAge;
};

/**
 * Validate required field
 */
export const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
};

/**
 * Validate string length
 */
export const validateLength = (
  value: string,
  min?: number,
  max?: number
): boolean => {
  if (!value || typeof value !== 'string') return false;
  const length = value.trim().length;
  
  if (min !== undefined && length < min) return false;
  if (max !== undefined && length > max) return false;
  
  return true;
};

/**
 * Validate number range
 */
export const validateNumberRange = (
  value: number,
  min?: number,
  max?: number
): boolean => {
  if (typeof value !== 'number' || isNaN(value)) return false;
  
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  
  return true;
};

/**
 * Validate positive number
 */
export const validatePositiveNumber = (value: number): boolean => {
  return typeof value === 'number' && !isNaN(value) && value > 0;
};

/**
 * Validate non-negative number
 */
export const validateNonNegativeNumber = (value: number): boolean => {
  return typeof value === 'number' && !isNaN(value) && value >= 0;
};

/**
 * Validate integer
 */
export const validateInteger = (value: number): boolean => {
  return typeof value === 'number' && !isNaN(value) && Number.isInteger(value);
};

/**
 * Validate alphanumeric string
 */
export const validateAlphanumeric = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return /^[a-zA-Z0-9]+$/.test(value);
};

/**
 * Validate username (alphanumeric, underscores, hyphens, 3-20 chars)
 */
export const validateUsername = (username: string): boolean => {
  if (!username || typeof username !== 'string') return false;
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * Validate form data object
 */
export const validateFormData = (
  data: Record<string, any>,
  rules: Record<string, (value: any) => boolean>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach((field) => {
    const validator = rules[field];
    const value = data[field];
    
    if (!validator(value)) {
      errors[field] = `Invalid ${field}`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Sanitize string input (remove dangerous characters)
 */
export const sanitizeString = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
};

/**
 * Validate and sanitize email
 */
export const validateAndSanitizeEmail = (email: string): {
  isValid: boolean;
  sanitized: string;
} => {
  const sanitized = email.trim().toLowerCase();
  return {
    isValid: validateEmail(sanitized),
    sanitized,
  };
};

/**
 * Validate credit card using Luhn algorithm
 */
export const validateCreditCardLuhn = (cardNumber: string): boolean => {
  if (!cardNumber || typeof cardNumber !== 'string') return false;
  
  const cleaned = cardNumber.replace(/\s+/g, '');
  if (!/^\d+$/.test(cleaned)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Validate CVV code
 */
export const validateCVV = (cvv: string): boolean => {
  if (!cvv || typeof cvv !== 'string') return false;
  return /^\d{3,4}$/.test(cvv.trim());
};

/**
 * Validate expiration date (MM/YY format)
 */
export const validateExpirationDate = (date: string): boolean => {
  if (!date || typeof date !== 'string') return false;
  
  const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
  if (!regex.test(date.trim())) return false;
  
  const [month, year] = date.split('/');
  const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
  const today = new Date();
  
  return expDate >= today;
};

/**
 * Get validation error message
 */
export const getValidationErrorMessage = (
  field: string,
  value: any,
  validators: Array<(val: any) => boolean>
): string | null => {
  for (const validator of validators) {
    if (!validator(value)) {
      return `${field} is invalid`;
    }
  }
  return null;
};

/**
 * Validate array is not empty
 */
export const validateNonEmptyArray = (arr: any[]): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * Validate object has required keys
 */
export const validateObjectKeys = (
  obj: Record<string, any>,
  requiredKeys: string[]
): boolean => {
  if (!obj || typeof obj !== 'object') return false;
  return requiredKeys.every((key) => key in obj);
};

/**
 * Validate file size (in bytes)
 */
export const validateFileSize = (
  fileSize: number,
  maxSizeInMB: number
): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return fileSize <= maxSizeInBytes;
};

/**
 * Validate file type
 */
export const validateFileType = (
  fileName: string,
  allowedTypes: string[]
): boolean => {
  if (!fileName || typeof fileName !== 'string') return false;
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
};

