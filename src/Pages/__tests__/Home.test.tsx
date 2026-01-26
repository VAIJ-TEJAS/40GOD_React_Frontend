import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'
import axios from 'axios'
import { CurrencyContext } from '../../context/CurrencyContext'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

// Mock productHelpers
vi.mock('../../utils/productHelpers', () => ({
  getProductStatistics: vi.fn(() => ({
    totalProducts: 10,
    totalInStock: 8,
    totalOutOfStock: 2,
    averagePrice: 50.5,
    minPrice: 20,
    maxPrice: 100,
    totalTags: 3,
  })),
  filterProductsByTag: vi.fn((products) => products.filter((p: any) => p.tags?.some((t: any) => t.text === 'Tshirt'))),
  sortProductsByPrice: vi.fn((products) => [...products].sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price))),
  getCheapestProduct: vi.fn((products) => products[0] || null),
  getMostExpensiveProduct: vi.fn((products) => products[products.length - 1] || null),
}))

// Mock convertPrice
vi.mock('../../utils/convertPrice', () => ({
  convertPrice: vi.fn((price, rate, currency) => `${currency} ${(price * rate).toFixed(2)}`),
}))

// Mock background image
vi.mock('../../assets/background/Backgroud.jpeg', () => ({
  default: 'mock-background.jpg',
}))

const mockCurrencyContext = {
  currency: 'USD',
  rate: 1.2,
}

const mockProducts = [
  {
    id: 1,
    name: 'Test T-Shirt 1',
    price: '29.99',
    sku: 'TSH-001',
    colors: [
      {
        id: 1,
        image_product: [{ id: 1, image: 'https://example.com/image1.jpg' }],
      },
    ],
    tags: [{ id: 1, text: 'Tshirt' }],
  },
  {
    id: 2,
    name: 'Test T-Shirt 2',
    price: '39.99',
    sku: 'TSH-002',
    colors: [
      {
        id: 2,
        image_product: [{ id: 2, image: 'https://example.com/image2.jpg' }],
      },
    ],
    tags: [{ id: 1, text: 'Tshirt' }],
  },
]

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <CurrencyContext.Provider value={mockCurrencyContext}>
        {component}
      </CurrencyContext.Provider>
    </BrowserRouter>
  )
}

describe('Home', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    mockedAxios.get.mockResolvedValue({ data: mockProducts })
    mockedAxios.defaults = { headers: { common: {} } }
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  it('should render home component', () => {
    renderWithProviders(<Home />)
    const backgroundImage = screen.getByAltText('40.G.O.D rose background')
    expect(backgroundImage).toBeInTheDocument()
  })

  it('should set authorization header from localStorage token', () => {
    localStorage.setItem('token', 'test-token')
    renderWithProviders(<Home />)
    
    expect(mockedAxios.defaults.headers.common['Authorization']).toBe('Bearer test-token')
  })

  it('should handle missing token', () => {
    localStorage.removeItem('token')
    renderWithProviders(<Home />)
    
    expect(mockedAxios.defaults.headers.common['Authorization']).toBe('Bearer null')
  })

  it('should render background image with correct classes', () => {
    renderWithProviders(<Home />)
    const image = screen.getByAltText('40.G.O.D rose background')
    expect(image).toHaveClass('absolute', 'w-screen', 'h-full', 'object-cover', 'brightness-50')
  })

  it('should display hero section with title and subtitle', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText("Welcome to 40.G.O.D")).toBeInTheDocument()
      expect(screen.getByText("Gettin' Out Drippin'")).toBeInTheDocument()
    })
  })

  it('should display shop now and contact us buttons', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Shop Now')).toBeInTheDocument()
      expect(screen.getByText('Contact Us')).toBeInTheDocument()
    })
  })

  it('should fetch and display products', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/product/')
    })
  })

  it('should display loading state initially', () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {})) // Never resolves
    renderWithProviders(<Home />)
    
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('should display error message on fetch failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'))
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to load products/i)).toBeInTheDocument()
    })
  })

  it('should display featured products carousel when products are loaded', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Featured Products')).toBeInTheDocument()
    })
  })

  it('should display statistics section when products are loaded', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Total Products')).toBeInTheDocument()
      expect(screen.getByText('In Stock')).toBeInTheDocument()
      expect(screen.getByText('Avg Price')).toBeInTheDocument()
      expect(screen.getByText('Categories')).toBeInTheDocument()
    })
  })

  it('should display price range section', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Price Range')).toBeInTheDocument()
      expect(screen.getByText('Starting from')).toBeInTheDocument()
      expect(screen.getByText('Up to')).toBeInTheDocument()
    })
  })

  it('should handle carousel navigation', async () => {
    vi.useFakeTimers()
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Featured Products')).toBeInTheDocument()
    })
    
    const nextButton = screen.getByLabelText('Next slide')
    expect(nextButton).toBeInTheDocument()
    
    fireEvent.click(nextButton)
    
    vi.useRealTimers()
  })

  it('should handle carousel previous button', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      const prevButton = screen.getByLabelText('Previous slide')
      expect(prevButton).toBeInTheDocument()
    })
  })

  it('should display slide indicators', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      const indicators = screen.getAllByLabelText(/Go to slide/i)
      expect(indicators.length).toBeGreaterThan(0)
    })
  })

  it('should handle slide indicator clicks', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      const indicators = screen.getAllByLabelText(/Go to slide/i)
      if (indicators.length > 0) {
        fireEvent.click(indicators[0])
      }
    })
  })

  it('should display product statistics correctly', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      const stats = screen.getByText('10')
      expect(stats).toBeInTheDocument()
    })
  })

  it('should render with proper layout structure', () => {
    renderWithProviders(<Home />)
    const mainContainer = screen.getByAltText('40.G.O.D rose background').parentElement
    expect(mainContainer).toHaveClass('relative', 'min-h-screen')
  })

  it('should have proper z-index layering', () => {
    renderWithProviders(<Home />)
    const contentDiv = screen.getByText('Welcome to 40.G.O.D').closest('div')
    expect(contentDiv?.parentElement).toHaveClass('relative', 'z-10')
  })

  it('should display currency converted prices', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      // Prices should be displayed with currency conversion
      const priceElements = screen.getAllByText(/USD|INR|EUR/i)
      expect(priceElements.length).toBeGreaterThan(0)
    })
  })

  it('should handle empty products array gracefully', async () => {
    mockedAxios.get.mockResolvedValue({ data: [] })
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      // Should not crash, just not show featured products
      expect(screen.getByText('Welcome to 40.G.O.D')).toBeInTheDocument()
    })
  })

  it('should auto-rotate carousel slides', async () => {
    vi.useFakeTimers()
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Featured Products')).toBeInTheDocument()
    })
    
    // Fast-forward time to trigger auto-rotation
    vi.advanceTimersByTime(5000)
    
    vi.useRealTimers()
  })

  it('should have responsive design classes', () => {
    renderWithProviders(<Home />)
    const heroTitle = screen.getByText("Welcome to 40.G.O.D")
    expect(heroTitle).toHaveClass('text-4xl', 'sm:text-6xl', 'lg:text-8xl')
  })

  it('should display view details button for products', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      const viewDetailsButtons = screen.getAllByText('View Details')
      expect(viewDetailsButtons.length).toBeGreaterThan(0)
    })
  })

  it('should handle product click navigation', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      const productLinks = screen.getAllByText('View Details')
      if (productLinks.length > 0) {
        expect(productLinks[0].closest('a')).toHaveAttribute('href')
      }
    })
  })
})

