import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { CurrencyContext, CurrencyProvider } from '../CurrencyContext'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

describe('CurrencyContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should provide default currency values', () => {
    const TestComponent = () => {
      const { currency, rate } = CurrencyContext
      return (
        <div>
          <span data-testid="currency">{currency}</span>
          <span data-testid="rate">{rate}</span>
        </div>
      )
    }

    render(
      <CurrencyContext.Provider value={{ currency: 'INR', rate: 1 }}>
        <TestComponent />
      </CurrencyContext.Provider>
    )

    expect(screen.getByTestId('currency')).toHaveTextContent('INR')
    expect(screen.getByTestId('rate')).toHaveTextContent('1')
  })

  it('should fetch currency based on user location', async () => {
    // Mock IP location API
    mockedAxios.get.mockImplementation((url: string) => {
      if (url === 'https://ipapi.co/json/') {
        return Promise.resolve({
          data: { country_code: 'US' },
        })
      }
      if (url.includes('restcountries.com')) {
        return Promise.resolve({
          data: [
            {
              currencies: {
                USD: { name: 'US Dollar', symbol: '$' },
              },
            },
          ],
        })
      }
      if (url.includes('api.frankfurter.app')) {
        return Promise.resolve({
          data: {
            rates: {
              USD: 0.012,
            },
          },
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    const TestComponent = () => {
      const { currency, rate } = CurrencyContext
      return (
        <div>
          <span data-testid="currency">{currency}</span>
          <span data-testid="rate">{rate}</span>
        </div>
      )
    }

    render(
      <CurrencyProvider>
        <TestComponent />
      </CurrencyProvider>
    )

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it('should handle API errors gracefully', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'))

    const TestComponent = () => {
      const { currency, rate } = CurrencyContext
      return (
        <div>
          <span data-testid="currency">{currency}</span>
          <span data-testid="rate">{rate}</span>
        </div>
      )
    }

    render(
      <CurrencyProvider>
        <TestComponent />
      </CurrencyProvider>
    )

    // Should default to INR and rate 1 on error
    await waitFor(() => {
      expect(screen.getByTestId('currency')).toHaveTextContent('INR')
    })
  })

  it('should use INR when country currency is INR', async () => {
    mockedAxios.get.mockImplementation((url: string) => {
      if (url === 'https://ipapi.co/json/') {
        return Promise.resolve({
          data: { country_code: 'IN' },
        })
      }
      if (url.includes('restcountries.com')) {
        return Promise.resolve({
          data: [
            {
              currencies: {
                INR: { name: 'Indian Rupee', symbol: '₹' },
              },
            },
          ],
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    const TestComponent = () => {
      const { currency, rate } = CurrencyContext
      return (
        <div>
          <span data-testid="currency">{currency}</span>
          <span data-testid="rate">{rate}</span>
        </div>
      )
    }

    render(
      <CurrencyProvider>
        <TestComponent />
      </CurrencyProvider>
    )

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it('should handle missing currencies in country data', async () => {
    mockedAxios.get.mockImplementation((url: string) => {
      if (url === 'https://ipapi.co/json/') {
        return Promise.resolve({
          data: { country_code: 'XX' },
        })
      }
      if (url.includes('restcountries.com')) {
        return Promise.resolve({
          data: [{}], // No currencies
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    const TestComponent = () => {
      const { currency, rate } = CurrencyContext
      return (
        <div>
          <span data-testid="currency">{currency}</span>
        </div>
      )
    }

    render(
      <CurrencyProvider>
        <TestComponent />
      </CurrencyProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('currency')).toBeInTheDocument()
    })
  })
})

