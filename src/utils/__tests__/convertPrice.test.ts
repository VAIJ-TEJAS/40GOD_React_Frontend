import { describe, it, expect } from 'vitest'
import { convertPrice } from '../convertPrice'

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

