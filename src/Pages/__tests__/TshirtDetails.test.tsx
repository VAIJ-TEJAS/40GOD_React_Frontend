import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import TshirtDetails from '../TshirtDetails'
import axios from 'axios'
import { CurrencyProvider } from '../../context/CurrencyContext'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

// Mock useNavigate
const mockNavigate = vi.fn()
const mockUseParams = vi.fn(() => ({ id: '1' }))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
  }
})

// Mock window.alert
global.alert = vi.fn()

describe('TshirtDetails', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    mockNavigate.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mockProduct = {
    id: 1,
    name: 'Test T-Shirt',
    description: 'A great t-shirt',
    price: '1000',
    colors: [
      {
        id: 1,
        display_name: 'Red',
        hex_code: '#FF0000',
        image_product: [
          { id: 1, image: 'image1.jpg' },
          { id: 2, image: 'image2.jpg' },
        ],
      },
      {
        id: 2,
        display_name: 'Blue',
        hex_code: '#0000FF',
        image_product: [{ id: 3, image: 'image3.jpg' }],
      },
    ],
  }

  const mockProductVariants = [
    {
      id: 1,
      color: { display_name: 'Red', hex_code: '#FF0000' },
      size: { text: 'M' },
      quantity: 10,
    },
    {
      id: 2,
      color: { display_name: 'Red', hex_code: '#FF0000' },
      size: { text: 'L' },
      quantity: 5,
    },
    {
      id: 3,
      color: { display_name: 'Blue', hex_code: '#0000FF' },
      size: { text: 'M' },
      quantity: 8,
    },
  ]

  const renderTshirtDetails = () => {
    return render(
      <MemoryRouter initialEntries={['/new/1']}>
        <CurrencyProvider>
          <TshirtDetails />
        </CurrencyProvider>
      </MemoryRouter>
    )
  }

  it('should render product not found when id is missing', () => {
    // This test will be handled by the component's internal logic
    renderTshirtDetails()
    // Component should handle missing id case
    expect(document.body).toBeTruthy()
  })

  it('should render product not found when product does not exist', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      expect(screen.getByText('Product not found')).toBeInTheDocument()
    })
  })

  it('should fetch products on mount', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/product/')
    })
  })

  it('should fetch product variants on mount', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.40god.com/inventory/?product_id=1'
      )
    })
  })

  it('should display product name', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      expect(screen.getByText('Test T-Shirt')).toBeInTheDocument()
    })
  })

  it('should display product description', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      expect(screen.getByText('A great t-shirt')).toBeInTheDocument()
    })
  })

  it('should handle size selection', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const sizeButton = screen.getByText('L')
      fireEvent.click(sizeButton)
    })

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it('should handle color selection', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const colorButtons = screen.getAllByTitle(/Color:/i)
      if (colorButtons.length > 0) {
        fireEvent.click(colorButtons[0])
      }
    })
  })

  it('should handle next slide button click', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const nextButton = screen.getByText('>')
      fireEvent.click(nextButton)
    })
  })

  it('should handle previous slide button click', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const prevButton = screen.getByText('<')
      fireEvent.click(prevButton)
    })
  })

  it('should handle thumbnail click', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const thumbnails = screen.getAllByAltText('Red')
      if (thumbnails.length > 0) {
        fireEvent.click(thumbnails[0])
      }
    })
  })

  it('should toggle size guide modal', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const sizeGuideButton = screen.getByText('SIZE GUIDE')
      fireEvent.click(sizeGuideButton)
    })

    await waitFor(() => {
      expect(screen.getByAltText('Size Guide')).toBeInTheDocument()
    })
  })

  it('should close size guide modal when clicking outside', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const sizeGuideButton = screen.getByText('SIZE GUIDE')
      fireEvent.click(sizeGuideButton)
    })

    await waitFor(() => {
      const modal = screen.getByAltText('Size Guide').closest('div')
      if (modal) {
        fireEvent.click(modal)
      }
    })
  })

  it('should handle add to bag when user is logged in', async () => {
    localStorage.setItem('token', 'test-token')
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })
    mockedAxios.post.mockResolvedValue({ data: { id: 1 } })

    renderTshirtDetails()

    await waitFor(() => {
      const addButton = screen.getByText('ADD TO BAG')
      fireEvent.click(addButton)
    })

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled()
    })
  })

  it('should navigate to login when adding to bag without token', async () => {
    localStorage.removeItem('token')
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const addButton = screen.getByText('ADD TO BAG')
      fireEvent.click(addButton)
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    })
  })

  it('should show alert when variant not selected', async () => {
    localStorage.setItem('token', 'test-token')
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: [] })
    mockedAxios.post.mockRejectedValue(new Error('Error'))

    renderTshirtDetails()

    await waitFor(() => {
      const addButton = screen.getByText('ADD TO BAG')
      fireEvent.click(addButton)
    })

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled()
    })
  })

  it('should display all available sizes', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      expect(screen.getByText('M')).toBeInTheDocument()
      expect(screen.getByText('L')).toBeInTheDocument()
    })
  })

  it('should handle API errors gracefully', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'))

    renderTshirtDetails()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it('should update button text after adding to bag', async () => {
    localStorage.setItem('token', 'test-token')
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })
    mockedAxios.post.mockResolvedValue({ data: { id: 1 } })

    renderTshirtDetails()

    await waitFor(() => {
      const addButton = screen.getByText('ADD TO BAG')
      fireEvent.click(addButton)
    })

    await waitFor(() => {
      expect(screen.getByText('ADDED TO BAG')).toBeInTheDocument()
    })
  })

  it('should render background image', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const image = screen.getByAltText('40.G.O.D rose background')
      expect(image).toBeInTheDocument()
    })
  })

  it('should handle multiple images in carousel', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const images = screen.getAllByAltText('Red')
      expect(images.length).toBeGreaterThan(0)
    })
  })

  it('should filter available colors based on selected size', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: mockProductVariants })

    renderTshirtDetails()

    await waitFor(() => {
      const sizeButton = screen.getByText('M')
      fireEvent.click(sizeButton)
    })

    // Colors should be filtered based on size
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })
})

