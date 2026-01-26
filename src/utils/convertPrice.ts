export const convertPrice = (priceInINR: number, rate: number, currency: string) => {
    const converted = priceInINR * rate;
    return `${currency} ${converted.toFixed(2)}`;
  };

/**
 * Format price with currency symbol
 */
export const formatPriceWithSymbol = (price: number, currency: string): string => {
  const symbolMap: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    JPY: '¥',
  };
  
  const symbol = symbolMap[currency] || currency;
  return `${symbol}${price.toFixed(2)}`;
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice <= 0) return 0;
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
};

/**
 * Calculate tax amount
 */
export const calculateTax = (price: number, taxRate: number): number => {
  return price * (taxRate / 100);
};

/**
 * Calculate final price with tax
 */
export const calculatePriceWithTax = (price: number, taxRate: number): number => {
  return price + calculateTax(price, taxRate);
};

/**
 * Format large numbers with commas
 */
export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Parse price string to number
 */
export const parsePrice = (priceString: string): number => {
  const cleaned = priceString.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
};

/**
 * Validate price is positive
 */
export const isValidPrice = (price: number): boolean => {
  return price >= 0 && isFinite(price);
};

/**
 * Round price to specified decimal places
 */
export const roundPrice = (price: number, decimals: number = 2): number => {
  return Math.round(price * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Calculate total from array of prices
 */
export const calculateTotal = (prices: number[]): number => {
  return prices.reduce((sum, price) => sum + price, 0);
};

/**
 * Calculate average price
 */
export const calculateAveragePrice = (prices: number[]): number => {
  if (prices.length === 0) return 0;
  return calculateTotal(prices) / prices.length;
};
  