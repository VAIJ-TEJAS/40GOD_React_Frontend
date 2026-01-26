import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../Home'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

describe('Home', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should render home component', () => {
    render(<Home />)
    const backgroundImage = screen.getByAltText('40.G.O.D rose background')
    expect(backgroundImage).toBeInTheDocument()
  })

  it('should set authorization header from localStorage token', () => {
    localStorage.setItem('token', 'test-token')
    render(<Home />)
    
    expect(mockedAxios.defaults.headers.common['Authorization']).toBe('Bearer test-token')
  })

  it('should handle missing token', () => {
    localStorage.removeItem('token')
    render(<Home />)
    
    expect(mockedAxios.defaults.headers.common['Authorization']).toBe('Bearer null')
  })

  it('should render background image with correct classes', () => {
    render(<Home />)
    const image = screen.getByAltText('40.G.O.D rose background')
    expect(image).toHaveClass('absolute', 'w-screen', 'h-full', 'object-cover')
  })
})

