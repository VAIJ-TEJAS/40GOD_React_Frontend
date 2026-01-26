import { describe, it, expect } from 'vitest'
import {
  convertPrice,
  formatPriceWithSymbol,
  calculateDiscount,
  calculateTax,
  calculatePriceWithTax,
  formatNumberWithCommas,
  parsePrice,
  isValidPrice,
  roundPrice,
  calculateTotal,
  calculateAveragePrice,
} from '../convertPrice'

describe('convertPrice', () => {
  it('should convert INR price to USD correctly', () => {
    const priceInINR = 1000
    const rate = 0.012 // 1 INR = 0.012 USD
    const currency = 'USD'
    const result = convertPrice(priceInINR, rate, currency)
    expect(result).toBe('USD 12.00')
  })

  it('should convert INR price to EUR correctly', () => {
    const priceInINR = 1000
    const rate = 0.011 // 1 INR = 0.011 EUR
    const currency = 'EUR'
    const result = convertPrice(priceInINR, rate, currency)
    expect(result).toBe('EUR 11.00')
  })

  it('should handle INR with rate 1 correctly', () => {
    const priceInINR = 1000
    const rate = 1
    const currency = 'INR'
    const result = convertPrice(priceInINR, rate, currency)
    expect(result).toBe('INR 1000.00')
  })

  it('should format decimal prices correctly', () => {
    const priceInINR = 999.99
    const rate = 0.012
    const currency = 'USD'
    const result = convertPrice(priceInINR, rate, currency)
    expect(result).toBe('USD 12.00')
  })

  it('should handle zero price', () => {
    const priceInINR = 0
    const rate = 0.012
    const currency = 'USD'
    const result = convertPrice(priceInINR, rate, currency)
    expect(result).toBe('USD 0.00')
  })

  it('should handle very small prices', () => {
    const priceInINR = 1
    const rate = 0.012
    const currency = 'USD'
    const result = convertPrice(priceInINR, rate, currency)
    expect(result).toBe('USD 0.01')
  })

  it('should handle large prices', () => {
    const priceInINR = 100000
    const rate = 0.012
    const currency = 'USD'
    const result = convertPrice(priceInINR, rate, currency)
    expect(result).toBe('USD 1200.00')
  })

  it('should handle GBP currency', () => {
    const priceInINR = 1000
    const rate = 0.0095
    const currency = 'GBP'
    const result = convertPrice(priceInINR, rate, currency)
    expect(result).toBe('GBP 9.50')
  })

  it('should handle JPY currency', () => {
    const priceInINR = 1000
    const rate = 1.5
    const currency = 'JPY'
    const result = convertPrice(priceInINR, rate, currency)
    expect(result).toBe('JPY 1500.00')
  })

  it('should round to 2 decimal places correctly', () => {
    const priceInINR = 100
    const rate = 0.012345
    const currency = 'USD'
    const result = convertPrice(priceInINR, rate, currency)
    expect(result).toBe('USD 1.23')
  })
})

describe('formatPriceWithSymbol', () => {
  it('should format USD price with $ symbol', () => {
    const result = formatPriceWithSymbol(100, 'USD')
    expect(result).toBe('$100.00')
  })

  it('should format EUR price with € symbol', () => {
    const result = formatPriceWithSymbol(100, 'EUR')
    expect(result).toBe('€100.00')
  })

  it('should format GBP price with £ symbol', () => {
    const result = formatPriceWithSymbol(100, 'GBP')
    expect(result).toBe('£100.00')
  })

  it('should format INR price with ₹ symbol', () => {
    const result = formatPriceWithSymbol(100, 'INR')
    expect(result).toBe('₹100.00')
  })

  it('should use currency code for unknown currencies', () => {
    const result = formatPriceWithSymbol(100, 'XYZ')
    expect(result).toBe('XYZ100.00')
  })
})

describe('calculateDiscount', () => {
  it('should calculate discount percentage correctly', () => {
    expect(calculateDiscount(1000, 800)).toBe(20)
  })

  it('should return 0 for zero original price', () => {
    expect(calculateDiscount(0, 800)).toBe(0)
  })

  it('should handle negative prices', () => {
    expect(calculateDiscount(-100, 50)).toBeGreaterThan(0)
  })
})

describe('calculateTax', () => {
  it('should calculate tax correctly', () => {
    expect(calculateTax(100, 10)).toBe(10)
  })

  it('should handle zero tax rate', () => {
    expect(calculateTax(100, 0)).toBe(0)
  })
})

describe('calculatePriceWithTax', () => {
  it('should calculate price with tax correctly', () => {
    expect(calculatePriceWithTax(100, 10)).toBe(110)
  })

  it('should handle zero tax', () => {
    expect(calculatePriceWithTax(100, 0)).toBe(100)
  })
})

describe('formatNumberWithCommas', () => {
  it('should format large numbers with commas', () => {
    expect(formatNumberWithCommas(1000000)).toBe('1,000,000')
  })

  it('should format small numbers', () => {
    expect(formatNumberWithCommas(100)).toBe('100')
  })
})

describe('parsePrice', () => {
  it('should parse price string correctly', () => {
    expect(parsePrice('$100.50')).toBe(100.5)
  })

  it('should handle invalid strings', () => {
    expect(parsePrice('invalid')).toBe(0)
  })
})

describe('isValidPrice', () => {
  it('should validate positive prices', () => {
    expect(isValidPrice(100)).toBe(true)
  })

  it('should validate zero price', () => {
    expect(isValidPrice(0)).toBe(true)
  })

  it('should reject negative prices', () => {
    expect(isValidPrice(-100)).toBe(false)
  })

  it('should reject infinite values', () => {
    expect(isValidPrice(Infinity)).toBe(false)
  })
})

describe('roundPrice', () => {
  it('should round to 2 decimal places by default', () => {
    expect(roundPrice(100.456)).toBe(100.46)
  })

  it('should round to specified decimal places', () => {
    expect(roundPrice(100.456, 1)).toBe(100.5)
  })
})

describe('calculateTotal', () => {
  it('should calculate total from array', () => {
    expect(calculateTotal([100, 200, 300])).toBe(600)
  })

  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })
})

describe('calculateAveragePrice', () => {
  it('should calculate average correctly', () => {
    expect(calculateAveragePrice([100, 200, 300])).toBe(200)
  })

  it('should return 0 for empty array', () => {
    expect(calculateAveragePrice([])).toBe(0)
  })
})

