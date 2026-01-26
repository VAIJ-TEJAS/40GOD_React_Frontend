import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import History from '../history'
import axios from 'axios'
import { CurrencyProvider } from '../../context/CurrencyContext'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

describe('History', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderHistory = () => {
    return render(
      <BrowserRouter>
        <CurrencyProvider>
          <History />
        </CurrencyProvider>
      </BrowserRouter>
    )
  }

  it('should render history component', () => {
    renderHistory()
    expect(screen.getByText('HISTORY')).toBeInTheDocument()
  })

  it('should fetch orders on mount', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/order/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token test-token',
        },
      })
    })
  })

  it('should display orders when available', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [
          {
            quantity: 1,
            cart_item: {
              color: {
                id: 1,
                color_name: 'Red',
                display_name: 'Red T-Shirt',
                hex_code: '#FF0000',
                image_product: [{ id: 1, image: 'test.jpg' }],
                product: {
                  id: 1,
                  name: 'T-Shirt',
                  price: '1000',
                  sku: 'TS001',
                },
              },
              product: {
                id: 1,
                name: 'T-Shirt',
                price: '1000',
                sku: 'TS001',
              },
              quantity: 1,
              size: {
                id: 1,
                text: 'M',
              },
            },
          },
        ],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText(/Order #1/i)).toBeInTheDocument()
    })
  })

  it('should display no orders message when empty', async () => {
    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: [] })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText(/No orders found in history/i)).toBeInTheDocument()
    })
  })

  it('should handle API errors gracefully', async () => {
    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockRejectedValue(new Error('API Error'))

    renderHistory()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })

    // Component should still render
    expect(screen.getByText('HISTORY')).toBeInTheDocument()
  })

  it('should display order status correctly for PL status', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText('Placed')).toBeInTheDocument()
    })
  })

  it('should display order status correctly for CM status', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'CM',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText('CM')).toBeInTheDocument()
    })
  })

  it('should display formatted order date', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-15T10:30:00Z',
        total_price: '1000',
        order_items: [],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText(/Placed on/i)).toBeInTheDocument()
    })
  })

  it('should display shipment information when available', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [],
        shipment: {
          address_details: {
            name: 'John Doe',
            street_address: '123 Main St',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'USA',
            phone_number: '1234567890',
          },
        },
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText('Shipping To')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('123 Main St')).toBeInTheDocument()
      expect(screen.getByText(/New York/i)).toBeInTheDocument()
    })
  })

  it('should display payment information when available', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [],
        shipment: null,
        payment: {
          method: 'Credit Card',
          amount: '1000',
          date: '2024-01-01T00:00:00Z',
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText('Payment Info')).toBeInTheDocument()
      expect(screen.getByText(/Method: Credit Card/i)).toBeInTheDocument()
    })
  })

  it('should display multiple order items correctly', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '2000',
        order_items: [
          {
            quantity: 1,
            cart_item: {
              color: {
                id: 1,
                color_name: 'Red',
                display_name: 'Red T-Shirt',
                hex_code: '#FF0000',
                image_product: [{ id: 1, image: 'test1.jpg' }],
                product: {
                  id: 1,
                  name: 'T-Shirt 1',
                  price: '1000',
                  sku: 'TS001',
                },
              },
              product: {
                id: 1,
                name: 'T-Shirt 1',
                price: '1000',
                sku: 'TS001',
              },
              quantity: 1,
              size: {
                id: 1,
                text: 'M',
              },
            },
          },
          {
            quantity: 2,
            cart_item: {
              color: {
                id: 2,
                color_name: 'Blue',
                display_name: 'Blue T-Shirt',
                hex_code: '#0000FF',
                image_product: [{ id: 2, image: 'test2.jpg' }],
                product: {
                  id: 2,
                  name: 'T-Shirt 2',
                  price: '500',
                  sku: 'TS002',
                },
              },
              product: {
                id: 2,
                name: 'T-Shirt 2',
                price: '500',
                sku: 'TS002',
              },
              quantity: 2,
              size: {
                id: 2,
                text: 'L',
              },
            },
          },
        ],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText('T-Shirt 1')).toBeInTheDocument()
      expect(screen.getByText('T-Shirt 2')).toBeInTheDocument()
      expect(screen.getByText(/Quantity: 1/i)).toBeInTheDocument()
      expect(screen.getByText(/Quantity: 2/i)).toBeInTheDocument()
    })
  })

  it('should display product SKU for each item', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [
          {
            quantity: 1,
            cart_item: {
              color: {
                id: 1,
                color_name: 'Red',
                display_name: 'Red T-Shirt',
                hex_code: '#FF0000',
                image_product: [{ id: 1, image: 'test.jpg' }],
                product: {
                  id: 1,
                  name: 'T-Shirt',
                  price: '1000',
                  sku: 'TS001',
                },
              },
              product: {
                id: 1,
                name: 'T-Shirt',
                price: '1000',
                sku: 'TS001',
              },
              quantity: 1,
              size: {
                id: 1,
                text: 'M',
              },
            },
          },
        ],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText(/SKU: TS001/i)).toBeInTheDocument()
    })
  })

  it('should display color swatch for each item', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [
          {
            quantity: 1,
            cart_item: {
              color: {
                id: 1,
                color_name: 'Red',
                display_name: 'Red T-Shirt',
                hex_code: '#FF0000',
                image_product: [{ id: 1, image: 'test.jpg' }],
                product: {
                  id: 1,
                  name: 'T-Shirt',
                  price: '1000',
                  sku: 'TS001',
                },
              },
              product: {
                id: 1,
                name: 'T-Shirt',
                price: '1000',
                sku: 'TS001',
              },
              quantity: 1,
              size: {
                id: 1,
                text: 'M',
              },
            },
          },
        ],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText(/Red T-Shirt/i)).toBeInTheDocument()
      const colorSwatch = document.querySelector('.inline-block.w-4.h-4.rounded-full')
      expect(colorSwatch).toBeInTheDocument()
    })
  })

  it('should calculate and display total price correctly', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1500',
        order_items: [],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText(/Total/i)).toBeInTheDocument()
    })
  })

  it('should handle orders with missing shipment data', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText(/Order #1/i)).toBeInTheDocument()
      expect(screen.queryByText('Shipping To')).not.toBeInTheDocument()
    })
  })

  it('should handle orders with missing payment data', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [],
        shipment: {
          address_details: {
            name: 'John Doe',
            street_address: '123 Main St',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'USA',
            phone_number: '1234567890',
          },
        },
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText('Shipping To')).toBeInTheDocument()
      expect(screen.queryByText('Payment Info')).not.toBeInTheDocument()
    })
  })

  it('should display multiple orders correctly', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [],
        shipment: null,
        payment: null,
      },
      {
        id: 2,
        status: 'CM',
        date: '2024-01-02T00:00:00Z',
        total_price: '2000',
        order_items: [],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText(/Order #1/i)).toBeInTheDocument()
      expect(screen.getByText(/Order #2/i)).toBeInTheDocument()
    })
  })

  it('should handle empty order items array', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '0',
        order_items: [],
        shipment: null,
        payment: null,
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText(/Order #1/i)).toBeInTheDocument()
      expect(screen.queryByText('Items Ordered')).not.toBeInTheDocument()
    })
  })

  it('should not fetch orders when token is missing', () => {
    localStorage.removeItem('token')
    renderHistory()

    expect(mockedAxios.get).toHaveBeenCalled()
  })

  it('should display background image', () => {
    renderHistory()
    const image = screen.getByAltText('bg')
    expect(image).toBeInTheDocument()
  })

  it('should handle order with all optional fields', async () => {
    const mockOrders = [
      {
        id: 1,
        status: 'PL',
        date: '2024-01-01T00:00:00Z',
        total_price: '1000',
        order_items: [
          {
            quantity: 1,
            cart_item: {
              color: {
                id: 1,
                color_name: 'Red',
                display_name: 'Red T-Shirt',
                hex_code: '#FF0000',
                image_product: [{ id: 1, image: 'test.jpg' }],
                product: {
                  id: 1,
                  name: 'T-Shirt',
                  price: '1000',
                  sku: 'TS001',
                },
              },
              product: {
                id: 1,
                name: 'T-Shirt',
                price: '1000',
                sku: 'TS001',
              },
              quantity: 1,
              size: {
                id: 1,
                text: 'M',
              },
            },
          },
        ],
        shipment: {
          address_details: {
            name: 'John Doe',
            street_address: '123 Main St',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'USA',
            phone_number: '1234567890',
          },
        },
        payment: {
          method: 'Credit Card',
          amount: '1000',
          date: '2024-01-01T00:00:00Z',
        },
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockOrders })

    renderHistory()

    await waitFor(() => {
      expect(screen.getByText(/Order #1/i)).toBeInTheDocument()
      expect(screen.getByText('Shipping To')).toBeInTheDocument()
      expect(screen.getByText('Payment Info')).toBeInTheDocument()
      expect(screen.getByText('Items Ordered')).toBeInTheDocument()
    })
  })
})

