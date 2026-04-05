import { validateEmail, validatePassword, validateRequired, validatePhone } from '../validationHelpers';

describe('Validation Helpers', () => {
  describe('validateEmail', () => {
    test('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
      expect(validateEmail('user123@test-domain.com')).toBe(true);
    });

    test('rejects invalid email addresses', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test.example.com')).toBe(false);
      expect(validateEmail('test@.com')).toBe(false);
      expect(validateEmail('test@example.')).toBe(false);
    });

    test('handles edge cases', () => {
      expect(validateEmail('a@b.c')).toBe(true);
      expect(validateEmail('very.long.email.address@very.long.domain.name.com')).toBe(true);
      expect(validateEmail('test@example.c')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('validates strong passwords', () => {
      expect(validatePassword('StrongPass123!')).toBe(true);
      expect(validatePassword('MySecure@Pwd456')).toBe(true);
      expect(validatePassword('Complex$Pass789')).toBe(true);
    });

    test('rejects weak passwords', () => {
      expect(validatePassword('')).toBe(false);
      expect(validatePassword('weak')).toBe(false);
      expect(validatePassword('123456')).toBe(false);
      expect(validatePassword('password')).toBe(false);
      expect(validatePassword('PASSWORD')).toBe(false);
      expect(validatePassword('Password')).toBe(false);
      expect(validatePassword('Password1')).toBe(false);
      expect(validatePassword('Pass!')).toBe(false);
    });

    test('validates password requirements', () => {
      // Test minimum length
      expect(validatePassword('Ab1!')).toBe(false);
      expect(validatePassword('Abcdef1!')).toBe(true);
      
      // Test uppercase requirement
      expect(validatePassword('abcdef1!')).toBe(false);
      
      // Test lowercase requirement
      expect(validatePassword('ABCDEF1!')).toBe(false);
      
      // Test number requirement
      expect(validatePassword('Abcdefgh!')).toBe(false);
      
      // Test special character requirement
      expect(validatePassword('Abcdef123')).toBe(false);
    });
  });

  describe('validateRequired', () => {
    test('validates required fields', () => {
      expect(validateRequired('some value')).toBe(true);
      expect(validateRequired('0')).toBe(true);
      expect(validateRequired('false')).toBe(true);
    });

    test('rejects empty required fields', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired(null as any)).toBe(false);
      expect(validateRequired(undefined as any)).toBe(false);
      expect(validateRequired('   ')).toBe(false);
      expect(validateRequired('\t\n')).toBe(false);
    });

    test('handles different data types', () => {
      expect(validateRequired(0)).toBe(true);
      expect(validateRequired(false)).toBe(true);
      expect(validateRequired([])).toBe(true);
      expect(validateRequired({})).toBe(true);
    });
  });

  describe('validatePhone', () => {
    test('validates correct phone numbers', () => {
      expect(validatePhone('+1234567890')).toBe(true);
      expect(validatePhone('(123) 456-7890')).toBe(true);
      expect(validatePhone('123.456.7890')).toBe(true);
      expect(validatePhone('123-456-7890')).toBe(true);
      expect(validatePhone('1234567890')).toBe(true);
    });

    test('rejects invalid phone numbers', () => {
      expect(validatePhone('')).toBe(false);
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('abcdefghij')).toBe(false);
      expect(validatePhone('123-456-789')).toBe(false);
      expect(validatePhone('(123)456-7890')).toBe(false);
    });

    test('handles international formats', () => {
      expect(validatePhone('+1 (123) 456-7890')).toBe(true);
      expect(validatePhone('+44 20 7946 0958')).toBe(true);
      expect(validatePhone('+91 98765 43210')).toBe(true);
    });
  });

  describe('combined validation', () => {
    test('validates multiple fields correctly', () => {
      const formData = {
        email: 'test@example.com',
        password: 'StrongPass123!',
        phone: '+1234567890',
        name: 'John Doe'
      };

      expect(validateEmail(formData.email)).toBe(true);
      expect(validatePassword(formData.password)).toBe(true);
      expect(validatePhone(formData.phone)).toBe(true);
      expect(validateRequired(formData.name)).toBe(true);
    });

    test('identifies validation errors', () => {
      const formData = {
        email: 'invalid-email',
        password: 'weak',
        phone: '123',
        name: ''
      };

      expect(validateEmail(formData.email)).toBe(false);
      expect(validatePassword(formData.password)).toBe(false);
      expect(validatePhone(formData.phone)).toBe(false);
      expect(validateRequired(formData.name)).toBe(false);
    });
  });

  describe('edge cases and error handling', () => {
    test('handles null and undefined inputs', () => {
      expect(validateEmail(null as any)).toBe(false);
      expect(validateEmail(undefined as any)).toBe(false);
      expect(validatePassword(null as any)).toBe(false);
      expect(validatePassword(undefined as any)).toBe(false);
      expect(validateRequired(null as any)).toBe(false);
      expect(validateRequired(undefined as any)).toBe(false);
      expect(validatePhone(null as any)).toBe(false);
      expect(validatePhone(undefined as any)).toBe(false);
    });

    test('handles non-string inputs', () => {
      expect(validateEmail(123 as any)).toBe(false);
      expect(validatePassword(123 as any)).toBe(false);
      expect(validatePhone(123 as any)).toBe(false);
      expect(validateRequired(123)).toBe(true);
    });

    test('handles very long inputs', () => {
      const longString = 'a'.repeat(1000);
      expect(validateEmail(longString + '@example.com')).toBe(true);
      expect(validatePassword(longString + '1A!')).toBe(true);
      expect(validatePhone('+1' + '2'.repeat(20))).toBe(true);
    });
  });
});
