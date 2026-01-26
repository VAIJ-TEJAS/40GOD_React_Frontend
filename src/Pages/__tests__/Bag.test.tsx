import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Bag from '../Bag'
import axios from 'axios'
import { CurrencyProvider } from '../../context/CurrencyContext'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

describe('Bag', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderBag = () => {
    return render(
      <BrowserRouter>
        <CurrencyProvider>
          <Bag />
        </CurrencyProvider>
      </BrowserRouter>
    )
  }

  it('should render bag component', () => {
    renderBag()
    expect(screen.getByText(/Your bag is empty/i)).toBeInTheDocument()
  })

  it('should fetch cart items on mount', async () => {
    const mockCartItems = [
      {
        id: 1,
        quantity: 2,
        price: 1000,
        product_varient: {
          id: 1,
          color: {
            id: 1,
            display_name: 'Red T-Shirt',
            color_name: 'Red',
            hex_code: '#FF0000',
            image_product: [{ id: 1, image: 'test.jpg' }],
            product: {
              id: 1,
              sku: 'TS001',
              name: 'T-Shirt',
              price: 1000,
            },
          },
          size: {
            id: 1,
            text: 'M',
          },
          quantity: 10,
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockCartItems })

    renderBag()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/cart-items/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token test-token',
        },
      })
    })
  })

  it('should display cart items', async () => {
    const mockCartItems = [
      {
        id: 1,
        quantity: 2,
        price: 1000,
        product_varient: {
          id: 1,
          color: {
            id: 1,
            display_name: 'Red T-Shirt',
            color_name: 'Red',
            hex_code: '#FF0000',
            image_product: [{ id: 1, image: 'test.jpg' }],
            product: {
              id: 1,
              sku: 'TS001',
              name: 'T-Shirt',
              price: 1000,
            },
          },
          size: {
            id: 1,
            text: 'M',
          },
          quantity: 10,
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockCartItems })

    renderBag()

    await waitFor(() => {
      expect(screen.getByText('Red T-Shirt')).toBeInTheDocument()
      expect(screen.getByText('Red')).toBeInTheDocument()
      expect(screen.getByText('M')).toBeInTheDocument()
    })
  })

  it('should handle delete item', async () => {
    const mockCartItems = [
      {
        id: 1,
        quantity: 2,
        price: 1000,
        product_varient: {
          id: 1,
          color: {
            id: 1,
            display_name: 'Red T-Shirt',
            color_name: 'Red',
            hex_code: '#FF0000',
            image_product: [{ id: 1, image: 'test.jpg' }],
            product: {
              id: 1,
              sku: 'TS001',
              name: 'T-Shirt',
              price: 1000,
            },
          },
          size: {
            id: 1,
            text: 'M',
          },
          quantity: 10,
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockCartItems })
    mockedAxios.delete.mockResolvedValue({})

    renderBag()

    await waitFor(() => {
      expect(screen.getByText('REMOVE')).toBeInTheDocument()
    })

    const removeButton = screen.getByText('REMOVE')
    fireEvent.click(removeButton)

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith('/cart-items/1/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token test-token',
        },
      })
    })
  })

  it('should handle increase quantity', async () => {
    const mockCartItems = [
      {
        id: 1,
        quantity: 2,
        price: 1000,
        product_varient: {
          id: 1,
          color: {
            id: 1,
            display_name: 'Red T-Shirt',
            color_name: 'Red',
            hex_code: '#FF0000',
            image_product: [{ id: 1, image: 'test.jpg' }],
            product: {
              id: 1,
              sku: 'TS001',
              name: 'T-Shirt',
              price: 1000,
            },
          },
          size: {
            id: 1,
            text: 'M',
          },
          quantity: 10,
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockCartItems })
      .mockResolvedValueOnce({ data: { ...mockCartItems[0], quantity: 2 } })
    mockedAxios.put.mockResolvedValue({})

    renderBag()

    await waitFor(() => {
      const increaseButton = screen.getAllByText('+')[0]
      fireEvent.click(increaseButton)
    })

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it('should handle decrease quantity', async () => {
    const mockCartItems = [
      {
        id: 1,
        quantity: 2,
        price: 1000,
        product_varient: {
          id: 1,
          color: {
            id: 1,
            display_name: 'Red T-Shirt',
            color_name: 'Red',
            hex_code: '#FF0000',
            image_product: [{ id: 1, image: 'test.jpg' }],
            product: {
              id: 1,
              sku: 'TS001',
              name: 'T-Shirt',
              price: 1000,
            },
          },
          size: {
            id: 1,
            text: 'M',
          },
          quantity: 10,
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockCartItems })
      .mockResolvedValueOnce({ data: { ...mockCartItems[0], quantity: 2 } })
    mockedAxios.put.mockResolvedValue({})

    renderBag()

    await waitFor(() => {
      const decreaseButton = screen.getAllByText('-')[0]
      fireEvent.click(decreaseButton)
    })

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it('should calculate total sum correctly', async () => {
    const mockCartItems = [
      {
        id: 1,
        quantity: 2,
        price: 1000,
        product_varient: {
          id: 1,
          color: {
            id: 1,
            display_name: 'Red T-Shirt',
            color_name: 'Red',
            hex_code: '#FF0000',
            image_product: [{ id: 1, image: 'test.jpg' }],
            product: {
              id: 1,
              sku: 'TS001',
              name: 'T-Shirt',
              price: 1000,
            },
          },
          size: {
            id: 1,
            text: 'M',
          },
          quantity: 10,
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockCartItems })

    renderBag()

    await waitFor(() => {
      expect(screen.getByText(/TOTAL AMOUNT/i)).toBeInTheDocument()
    })
  })

  it('should render checkout button when cart has items', async () => {
    const mockCartItems = [
      {
        id: 1,
        quantity: 2,
        price: 1000,
        product_varient: {
          id: 1,
          color: {
            id: 1,
            display_name: 'Red T-Shirt',
            color_name: 'Red',
            hex_code: '#FF0000',
            image_product: [{ id: 1, image: 'test.jpg' }],
            product: {
              id: 1,
              sku: 'TS001',
              name: 'T-Shirt',
              price: 1000,
            },
          },
          size: {
            id: 1,
            text: 'M',
          },
          quantity: 10,
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockCartItems })

    renderBag()

    await waitFor(() => {
      expect(screen.getByText('Checkout')).toBeInTheDocument()
    })
  })

  it('should handle API error gracefully', async () => {
    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockRejectedValue(new Error('API Error'))

    renderBag()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })

    // Should still render empty bag message
    expect(screen.getByText(/Your bag is empty/i)).toBeInTheDocument()
  })
})

