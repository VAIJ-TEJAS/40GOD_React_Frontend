import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  validateURL,
  validateCreditCard,
  validatePassword,
  validateName,
  validatePostalCode,
  validateDate,
  validateFutureDate,
  validatePastDate,
  validateAge,
  validateRequired,
  validateLength,
  validateNumberRange,
  validatePositiveNumber,
  validateNonNegativeNumber,
  validateInteger,
  validateAlphanumeric,
  validateUsername,
  validateFormData,
  sanitizeString,
  validateAndSanitizeEmail,
  validateCreditCardLuhn,
  validateCVV,
  validateExpirationDate,
  getValidationErrorMessage,
  validateNonEmptyArray,
  validateObjectKeys,
  validateFileSize,
  validateFileType,
} from '../validationHelpers';

describe('validationHelpers', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(null as any)).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should validate correct phone numbers', () => {
      expect(validatePhone('123-456-7890')).toBe(true);
      expect(validatePhone('(123) 456-7890')).toBe(true);
      expect(validatePhone('+1 123 456 7890')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('abc')).toBe(false);
      expect(validatePhone('')).toBe(false);
    });
  });

  describe('validateURL', () => {
    it('should validate correct URLs', () => {
      expect(validateURL('https://example.com')).toBe(true);
      expect(validateURL('http://www.example.com')).toBe(true);
      expect(validateURL('example.com')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validateURL('not a url')).toBe(false);
      expect(validateURL('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const result = validatePassword('StrongPass123!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should check for uppercase letters', () => {
      const result = validatePassword('lowercase123');
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should check for lowercase letters', () => {
      const result = validatePassword('UPPERCASE123');
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should check for numbers', () => {
      const result = validatePassword('NoNumbers');
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should check minimum length', () => {
      const result = validatePassword('Short1', { minLength: 10 });
      expect(result.errors).toContain('Password must be at least 10 characters long');
    });
  });

  describe('validateName', () => {
    it('should validate correct names', () => {
      expect(validateName('John Doe')).toBe(true);
      expect(validateName("O'Brien")).toBe(true);
      expect(validateName('Mary-Jane')).toBe(true);
    });

    it('should reject invalid names', () => {
      expect(validateName('J')).toBe(false);
      expect(validateName('123')).toBe(false);
      expect(validateName('')).toBe(false);
    });
  });

  describe('validatePostalCode', () => {
    it('should validate US postal codes', () => {
      expect(validatePostalCode('12345', 'US')).toBe(true);
      expect(validatePostalCode('12345-6789', 'US')).toBe(true);
    });

    it('should validate Indian postal codes', () => {
      expect(validatePostalCode('123456', 'IN')).toBe(true);
    });

    it('should reject invalid postal codes', () => {
      expect(validatePostalCode('123', 'US')).toBe(false);
      expect(validatePostalCode('abc', 'IN')).toBe(false);
    });
  });

  describe('validateDate', () => {
    it('should validate correct dates', () => {
      expect(validateDate('2024-01-01')).toBe(true);
      expect(validateDate('2024-12-31')).toBe(true);
    });

    it('should reject invalid dates', () => {
      expect(validateDate('invalid')).toBe(false);
      expect(validateDate('2024-13-01')).toBe(false);
    });
  });

  describe('validateFutureDate', () => {
    it('should validate future dates', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      expect(validateFutureDate(futureDate.toISOString())).toBe(true);
    });

    it('should reject past dates', () => {
      const pastDate = new Date('2020-01-01');
      expect(validateFutureDate(pastDate.toISOString())).toBe(false);
    });
  });

  describe('validateAge', () => {
    it('should validate age requirements', () => {
      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - 25);
      expect(validateAge(birthDate.toISOString(), 18)).toBe(true);
    });

    it('should reject underage', () => {
      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - 15);
      expect(validateAge(birthDate.toISOString(), 18)).toBe(false);
    });
  });

  describe('validateRequired', () => {
    it('should validate required fields', () => {
      expect(validateRequired('value')).toBe(true);
      expect(validateRequired(123)).toBe(true);
      expect(validateRequired([1, 2, 3])).toBe(true);
    });

    it('should reject empty values', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired(null)).toBe(false);
      expect(validateRequired(undefined)).toBe(false);
      expect(validateRequired([])).toBe(false);
    });
  });

  describe('validateLength', () => {
    it('should validate string length', () => {
      expect(validateLength('test', 2, 10)).toBe(true);
      expect(validateLength('test', 4, 4)).toBe(true);
    });

    it('should reject strings outside range', () => {
      expect(validateLength('t', 2, 10)).toBe(false);
      expect(validateLength('too long string', 2, 5)).toBe(false);
    });
  });

  describe('validateNumberRange', () => {
    it('should validate numbers in range', () => {
      expect(validateNumberRange(5, 1, 10)).toBe(true);
      expect(validateNumberRange(1, 1, 10)).toBe(true);
      expect(validateNumberRange(10, 1, 10)).toBe(true);
    });

    it('should reject numbers outside range', () => {
      expect(validateNumberRange(0, 1, 10)).toBe(false);
      expect(validateNumberRange(11, 1, 10)).toBe(false);
    });
  });

  describe('validatePositiveNumber', () => {
    it('should validate positive numbers', () => {
      expect(validatePositiveNumber(1)).toBe(true);
      expect(validatePositiveNumber(100)).toBe(true);
    });

    it('should reject non-positive numbers', () => {
      expect(validatePositiveNumber(0)).toBe(false);
      expect(validatePositiveNumber(-1)).toBe(false);
    });
  });

  describe('validateInteger', () => {
    it('should validate integers', () => {
      expect(validateInteger(1)).toBe(true);
      expect(validateInteger(0)).toBe(true);
      expect(validateInteger(-5)).toBe(true);
    });

    it('should reject non-integers', () => {
      expect(validateInteger(1.5)).toBe(false);
      expect(validateInteger(0.1)).toBe(false);
    });
  });

  describe('validateUsername', () => {
    it('should validate correct usernames', () => {
      expect(validateUsername('user123')).toBe(true);
      expect(validateUsername('user_name')).toBe(true);
      expect(validateUsername('user-name')).toBe(true);
    });

    it('should reject invalid usernames', () => {
      expect(validateUsername('ab')).toBe(false);
      expect(validateUsername('too_long_username_here')).toBe(false);
      expect(validateUsername('user@name')).toBe(false);
    });
  });

  describe('validateFormData', () => {
    it('should validate form data correctly', () => {
      const data = { email: 'test@example.com', name: 'John' };
      const rules = {
        email: validateEmail,
        name: validateName,
      };
      const result = validateFormData(data, rules);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should return errors for invalid data', () => {
      const data = { email: 'invalid', name: '' };
      const rules = {
        email: validateEmail,
        name: validateName,
      };
      const result = validateFormData(data, rules);
      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThan(0);
    });
  });

  describe('sanitizeString', () => {
    it('should sanitize dangerous strings', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).not.toContain('<script>');
      expect(sanitizeString('javascript:alert("xss")')).not.toContain('javascript:');
    });

    it('should handle empty strings', () => {
      expect(sanitizeString('')).toBe('');
      expect(sanitizeString(null as any)).toBe('');
    });
  });

  describe('validateCreditCardLuhn', () => {
    it('should validate correct card numbers using Luhn algorithm', () => {
      // Valid test card number
      expect(validateCreditCardLuhn('4532015112830366')).toBe(true);
    });

    it('should reject invalid card numbers', () => {
      expect(validateCreditCardLuhn('1234567890123456')).toBe(false);
      expect(validateCreditCardLuhn('invalid')).toBe(false);
    });
  });

  describe('validateCVV', () => {
    it('should validate CVV codes', () => {
      expect(validateCVV('123')).toBe(true);
      expect(validateCVV('1234')).toBe(true);
    });

    it('should reject invalid CVV codes', () => {
      expect(validateCVV('12')).toBe(false);
      expect(validateCVV('12345')).toBe(false);
      expect(validateCVV('abc')).toBe(false);
    });
  });

  describe('validateExpirationDate', () => {
    it('should validate future expiration dates', () => {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 6);
      const month = String(futureDate.getMonth() + 1).padStart(2, '0');
      const year = String(futureDate.getFullYear()).slice(-2);
      expect(validateExpirationDate(`${month}/${year}`)).toBe(true);
    });

    it('should reject past expiration dates', () => {
      expect(validateExpirationDate('01/20')).toBe(false);
    });
  });

  describe('validateNonEmptyArray', () => {
    it('should validate non-empty arrays', () => {
      expect(validateNonEmptyArray([1, 2, 3])).toBe(true);
      expect(validateNonEmptyArray(['a'])).toBe(true);
    });

    it('should reject empty arrays', () => {
      expect(validateNonEmptyArray([])).toBe(false);
    });
  });

  describe('validateObjectKeys', () => {
    it('should validate object has required keys', () => {
      const obj = { name: 'John', email: 'test@example.com' };
      expect(validateObjectKeys(obj, ['name', 'email'])).toBe(true);
    });

    it('should reject objects missing required keys', () => {
      const obj = { name: 'John' };
      expect(validateObjectKeys(obj, ['name', 'email'])).toBe(false);
    });
  });

  describe('validateFileSize', () => {
    it('should validate file sizes', () => {
      const oneMB = 1024 * 1024;
      expect(validateFileSize(oneMB, 5)).toBe(true);
    });

    it('should reject files exceeding max size', () => {
      const tenMB = 10 * 1024 * 1024;
      expect(validateFileSize(tenMB, 5)).toBe(false);
    });
  });

  describe('validateFileType', () => {
    it('should validate file types', () => {
      expect(validateFileType('image.jpg', ['jpg', 'png'])).toBe(true);
      expect(validateFileType('document.pdf', ['pdf', 'doc'])).toBe(true);
    });

    it('should reject invalid file types', () => {
      expect(validateFileType('image.exe', ['jpg', 'png'])).toBe(false);
    });
  });
});

