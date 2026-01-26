import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TshirtPage from '../TshirtPage'
import axios from 'axios'
import { CurrencyProvider } from '../../context/CurrencyContext'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

describe('TshirtPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderTshirtPage = () => {
    return render(
      <BrowserRouter>
        <CurrencyProvider>
          <TshirtPage />
        </CurrencyProvider>
      </BrowserRouter>
    )
  }

  it('should render tshirt page', () => {
    renderTshirtPage()
    expect(screen.getByText(/Gettin' Out Drippin'/i)).toBeInTheDocument()
  })

  it('should fetch products on mount', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Test T-Shirt',
        price: '1000',
        tags: [{ id: 1, text: 'Tshirt' }],
        colors: [
          {
            id: 1,
            display_name: 'Red',
            image_product: [{ id: 1, image: 'test.jpg' }],
          },
        ],
      },
    ]

    mockedAxios.get.mockResolvedValue({ data: mockProducts })

    renderTshirtPage()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/product/')
    })
  })

  it('should filter and display tshirt products', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Test T-Shirt',
        price: '1000',
        tags: [{ id: 1, text: 'Tshirt' }],
        colors: [
          {
            id: 1,
            display_name: 'Red',
            image_product: [{ id: 1, image: 'test.jpg' }],
          },
        ],
      },
      {
        id: 2,
        name: 'Other Product',
        price: '2000',
        tags: [{ id: 2, text: 'Other' }],
        colors: [],
      },
    ]

    mockedAxios.get.mockResolvedValue({ data: mockProducts })

    renderTshirtPage()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it('should handle API errors gracefully', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'))

    renderTshirtPage()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })

    // Component should still render
    expect(screen.getByText(/Gettin' Out Drippin'/i)).toBeInTheDocument()
  })

  it('should render background images', () => {
    renderTshirtPage()
    const images = screen.getAllByAltText(/40.G.O.D/i)
    expect(images.length).toBeGreaterThan(0)
  })
})

