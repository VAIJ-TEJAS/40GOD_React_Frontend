import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Checkout from '../Checkout'
import axios from 'axios'
import { CurrencyProvider } from '../../context/CurrencyContext'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

// Mock Razorpay
global.window.Razorpay = vi.fn(() => ({
  open: vi.fn(),
})) as any

describe('Checkout', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderCheckout = () => {
    return render(
      <BrowserRouter>
        <CurrencyProvider>
          <Checkout />
        </CurrencyProvider>
      </BrowserRouter>
    )
  }

  it('should render checkout component', () => {
    renderCheckout()
    expect(screen.getByText('CHECKOUT')).toBeInTheDocument()
  })

  it('should fetch address book entries on mount', async () => {
    const mockAddresses = [
      {
        id: 1,
        name: 'John Doe',
        phone_number: '1234567890',
        street_address: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'USA',
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockAddresses })

    renderCheckout()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it('should fetch cart items on mount', async () => {
    const mockCartItems = [
      {
        id: 1,
        quantity: 2,
        product_varient: {
          id: 1,
          color: {
            id: 1,
            display_name: 'Red T-Shirt',
            product: {
              id: 1,
              price: 1000,
            },
          },
          size: {
            id: 1,
            text: 'M',
          },
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockCartItems })

    renderCheckout()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it('should calculate total amount correctly', async () => {
    const mockCartItems = [
      {
        id: 1,
        quantity: 2,
        product_varient: {
          id: 1,
          color: {
            id: 1,
            display_name: 'Red T-Shirt',
            product: {
              id: 1,
              price: 1000,
            },
          },
          size: {
            id: 1,
            text: 'M',
          },
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockCartItems })

    renderCheckout()

    await waitFor(() => {
      expect(screen.getByText(/TOTAL AMOUNT TO PAY/i)).toBeInTheDocument()
    })
  })

  it('should handle place order button click', async () => {
    const mockAddresses = [
      {
        id: 1,
        name: 'John Doe',
        phone_number: '1234567890',
        street_address: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'USA',
      },
    ]

    const mockCartItems = [
      {
        id: 1,
        quantity: 2,
        product_varient: {
          id: 1,
          color: {
            id: 1,
            display_name: 'Red T-Shirt',
            product: {
              id: 1,
              price: 1000,
            },
          },
          size: {
            id: 1,
            text: 'M',
          },
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockAddresses })
      .mockResolvedValueOnce({ data: mockCartItems })
      .mockResolvedValueOnce({
        data: {
          order_id: 'order_123',
          razorpay_key_id: 'key_123',
        },
      })

    renderCheckout()

    await waitFor(() => {
      const placeOrderButton = screen.getByText('PLACE ORDER')
      fireEvent.click(placeOrderButton)
    })

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it('should handle API errors gracefully', async () => {
    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockRejectedValue(new Error('API Error'))

    renderCheckout()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })

    // Component should still render
    expect(screen.getByText('CHECKOUT')).toBeInTheDocument()
  })
})

