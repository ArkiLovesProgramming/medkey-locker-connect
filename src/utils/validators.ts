/**
 * Validation Utilities
 * Common validation functions for the application
 */

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' };
  }
  
  if (!isValidEmail(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  return { valid: true };
};

// Phone number validation
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

export const validatePhone = (phone: string): { valid: boolean; error?: string } => {
  if (!phone || phone.trim().length === 0) {
    return { valid: false, error: 'Phone number is required' };
  }
  
  if (!isValidPhone(phone)) {
    return { valid: false, error: 'Invalid phone number' };
  }
  
  return { valid: true };
};

// Prescription number validation
export const isValidRxNumber = (rxNumber: string): boolean => {
  // Accept formats like: RX123456, 123456, #123456, etc.
  const rxRegex = /^(RX|Rx|#)?\d{6,10}(-\d{2})?$/i;
  return rxRegex.test(rxNumber.trim());
};

export const validateRxNumber = (rxNumber: string): { valid: boolean; error?: string } => {
  if (!rxNumber || rxNumber.trim().length === 0) {
    return { valid: false, error: 'Prescription number is required' };
  }
  
  if (!isValidRxNumber(rxNumber)) {
    return { valid: false, error: 'Invalid prescription number format' };
  }
  
  return { valid: true };
};

// Order number validation
export const isValidOrderNumber = (orderNumber: string): boolean => {
  // Accept formats like: 29384-B, ORD-12345, etc.
  const orderRegex = /^[A-Z]{0,3}-?\d{4,8}(-[A-Z])?$/i;
  return orderRegex.test(orderNumber.trim());
};

export const validateOrderNumber = (orderNumber: string): { valid: boolean; error?: string } => {
  if (!orderNumber || orderNumber.trim().length === 0) {
    return { valid: false, error: 'Order number is required' };
  }
  
  if (!isValidOrderNumber(orderNumber)) {
    return { valid: false, error: 'Invalid order number format' };
  }
  
  return { valid: true };
};

// Insurance member ID validation
export const isValidMemberId = (memberId: string): boolean => {
  // Most insurance IDs are alphanumeric, 6-20 characters
  const memberIdRegex = /^[A-Z0-9]{6,20}$/i;
  return memberIdRegex.test(memberId.trim());
};

export const validateMemberId = (memberId: string): { valid: boolean; error?: string } => {
  if (!memberId || memberId.trim().length === 0) {
    return { valid: false, error: 'Member ID is required' };
  }
  
  if (!isValidMemberId(memberId)) {
    return { valid: false, error: 'Invalid member ID format' };
  }
  
  return { valid: true };
};

// Name validation
export const isValidName = (name: string, minLength: number = 2, maxLength: number = 50): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength && /^[a-zA-Z\s'-]+$/.test(trimmed);
};

export const validateName = (
  name: string,
  fieldName: string = 'Name',
  minLength: number = 2,
  maxLength: number = 50
): { valid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: `${fieldName} is required` };
  }
  
  if (!isValidName(name, minLength, maxLength)) {
    if (name.trim().length < minLength) {
      return { valid: false, error: `${fieldName} must be at least ${minLength} characters` };
    }
    if (name.trim().length > maxLength) {
      return { valid: false, error: `${fieldName} must be less than ${maxLength} characters` };
    }
    return { valid: false, error: `${fieldName} contains invalid characters` };
  }
  
  return { valid: true };
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (!password || password.length === 0) {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (!isValidPassword(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    };
  }
  
  return { valid: true };
};

// Date validation
export const isValidDate = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(dateObj.getTime());
};

export const validateDate = (
  date: string | Date,
  fieldName: string = 'Date',
  options?: { minDate?: Date; maxDate?: Date; required?: boolean }
): { valid: boolean; error?: string } => {
  const { minDate, maxDate, required = true } = options || {};
  
  if (!date || !isValidDate(date)) {
    return { valid: !required, error: required ? `${fieldName} is required` : undefined };
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (minDate && dateObj < minDate) {
    return { valid: false, error: `${fieldName} must be after ${minDate.toLocaleDateString()}` };
  }
  
  if (maxDate && dateObj > maxDate) {
    return { valid: false, error: `${fieldName} must be before ${maxDate.toLocaleDateString()}` };
  }
  
  return { valid: true };
};

// Date of birth validation
export const validateDateOfBirth = (dob: string | Date): { valid: boolean; error?: string } => {
  if (!dob || !isValidDate(dob)) {
    return { valid: false, error: 'Date of birth is required' };
  }
  
  const dobDate = typeof dob === 'string' ? new Date(dob) : dob;
  const now = new Date();
  const age = now.getFullYear() - dobDate.getFullYear();
  
  if (age < 0 || age > 120) {
    return { valid: false, error: 'Invalid date of birth' };
  }
  
  if (age < 13) {
    return { valid: false, error: 'User must be at least 13 years old' };
  }
  
  if (dobDate > now) {
    return { valid: false, error: 'Date of birth cannot be in the future' };
  }
  
  return { valid: true };
};

// Quantity validation
export const isValidQuantity = (quantity: number | string, min: number = 1, max: number = 9999): boolean => {
  const num = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
  return !isNaN(num) && num >= min && num <= max;
};

export const validateQuantity = (
  quantity: number | string,
  fieldName: string = 'Quantity',
  min: number = 1,
  max: number = 9999
): { valid: boolean; error?: string } => {
  if (quantity === undefined || quantity === null || quantity === '') {
    return { valid: false, error: `${fieldName} is required` };
  }
  
  if (!isValidQuantity(quantity, min, max)) {
    const num = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
    if (isNaN(num)) {
      return { valid: false, error: `${fieldName} must be a number` };
    }
    if (num < min) {
      return { valid: false, error: `${fieldName} must be at least ${min}` };
    }
    if (num > max) {
      return { valid: false, error: `${fieldName} must be at most ${max}` };
    }
  }
  
  return { valid: true };
};

// Medication dosage validation
export const validateDosage = (dosage: string): { valid: boolean; error?: string } => {
  if (!dosage || dosage.trim().length === 0) {
    return { valid: false, error: 'Dosage is required' };
  }
  
  if (dosage.trim().length < 2) {
    return { valid: false, error: 'Dosage is too short' };
  }
  
  return { valid: true };
};

// Address validation
export const validateAddress = (address: {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!address.street || address.street.trim().length === 0) {
    errors.street = 'Street address is required';
  }
  
  if (!address.city || address.city.trim().length === 0) {
    errors.city = 'City is required';
  }
  
  if (!address.state || address.state.trim().length === 0) {
    errors.state = 'State is required';
  }
  
  if (!address.zip || !/^\d{5}(-\d{4})?$/.test(address.zip)) {
    errors.zip = 'Valid ZIP code is required';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

// NPI (National Provider Identifier) validation
export const isValidNPI = (npi: string): boolean => {
  // NPI is a 10-digit number
  const npiRegex = /^\d{10}$/;
  return npiRegex.test(npi.replace(/-/g, ''));
};

export const validateNPI = (npi: string): { valid: boolean; error?: string } => {
  if (!npi || npi.trim().length === 0) {
    return { valid: false, error: 'NPI is required' };
  }
  
  if (!isValidNPI(npi)) {
    return { valid: false, error: 'Invalid NPI format (must be 10 digits)' };
  }
  
  return { valid: true };
};

// General purpose validator composer
export const composeValidators = (
  ...validators: Array<(value: any) => { valid: boolean; error?: string }>
) => {
  return (value: any): { valid: boolean; error?: string } => {
    for (const validator of validators) {
      const result = validator(value);
      if (!result.valid) {
        return result;
      }
    }
    return { valid: true };
  };
};
