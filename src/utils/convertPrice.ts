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

/**
 * Calculate percentage change between two prices
 */
export const calculatePriceChange = (oldPrice: number, newPrice: number): number => {
  if (oldPrice === 0) return 0;
  return ((newPrice - oldPrice) / oldPrice) * 100;
};

/**
 * Format price with thousand separators
 */
export const formatPriceWithSeparators = (price: number, currency: string = 'INR'): string => {
  const formatted = price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${currency} ${formatted}`;
};

/**
 * Calculate compound interest
 */
export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  time: number,
  compoundingFrequency: number = 12
): number => {
  return principal * Math.pow(1 + rate / (100 * compoundingFrequency), compoundingFrequency * time);
};

/**
 * Calculate simple interest
 */
export const calculateSimpleInterest = (
  principal: number,
  rate: number,
  time: number
): number => {
  return (principal * rate * time) / 100;
};

/**
 * Calculate EMI (Equated Monthly Installment)
 */
export const calculateEMI = (
  principal: number,
  annualRate: number,
  tenureMonths: number
): number => {
  const monthlyRate = annualRate / (12 * 100);
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return emi;
};

/**
 * Calculate price after applying multiple discounts
 */
export const calculatePriceAfterDiscounts = (
  originalPrice: number,
  discounts: number[]
): number => {
  let finalPrice = originalPrice;
  discounts.forEach(discount => {
    finalPrice = finalPrice * (1 - discount / 100);
  });
  return finalPrice;
};

/**
 * Calculate markup percentage
 */
export const calculateMarkup = (cost: number, sellingPrice: number): number => {
  if (cost === 0) return 0;
  return ((sellingPrice - cost) / cost) * 100;
};

/**
 * Calculate margin percentage
 */
export const calculateMargin = (cost: number, sellingPrice: number): number => {
  if (sellingPrice === 0) return 0;
  return ((sellingPrice - cost) / sellingPrice) * 100;
};

/**
 * Convert price between currencies (simplified)
 */
export const convertBetweenCurrencies = (
  amount: number,
  fromRate: number,
  toRate: number
): number => {
  // Convert to base currency first, then to target currency
  const baseAmount = amount / fromRate;
  return baseAmount * toRate;
};

/**
 * Calculate price per unit
 */
export const calculatePricePerUnit = (totalPrice: number, quantity: number): number => {
  if (quantity === 0) return 0;
  return totalPrice / quantity;
};

/**
 * Calculate bulk discount
 */
export const calculateBulkDiscount = (
  unitPrice: number,
  quantity: number,
  discountTiers: Array<{ minQuantity: number; discountPercent: number }>
): number => {
  let applicableDiscount = 0;
  
  // Sort tiers by minQuantity descending
  const sortedTiers = [...discountTiers].sort((a, b) => b.minQuantity - a.minQuantity);
  
  for (const tier of sortedTiers) {
    if (quantity >= tier.minQuantity) {
      applicableDiscount = tier.discountPercent;
      break;
    }
  }
  
  const totalPrice = unitPrice * quantity;
  return totalPrice * (1 - applicableDiscount / 100);
};

/**
 * Format currency with symbol based on locale
 */
export const formatCurrencyByLocale = (
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Parse currency string to number
 */
export const parseCurrencyString = (currencyString: string): number => {
  // Remove currency symbols and spaces, then parse
  const cleaned = currencyString.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
};

/**
 * Calculate price with VAT/GST
 */
export const calculatePriceWithVAT = (price: number, vatRate: number): number => {
  return price * (1 + vatRate / 100);
};

/**
 * Calculate price without VAT/GST (reverse calculation)
 */
export const calculatePriceWithoutVAT = (priceWithVAT: number, vatRate: number): number => {
  return priceWithVAT / (1 + vatRate / 100);
};

/**
 * Compare two prices and return comparison result
 */
export const comparePrices = (price1: number, price2: number): {
  difference: number;
  percentageDifference: number;
  isPrice1Higher: boolean;
} => {
  const difference = price1 - price2;
  const percentageDifference = price2 !== 0 ? (difference / price2) * 100 : 0;
  
  return {
    difference,
    percentageDifference,
    isPrice1Higher: difference > 0,
  };
};
  