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
})

