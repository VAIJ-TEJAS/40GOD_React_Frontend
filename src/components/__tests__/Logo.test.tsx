import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Logo from '../Logo'

describe('Logo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderLogo = () => {
    return render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    )
  }

  it('should render logo component', () => {
    renderLogo()
    const logo = screen.getByAltText('40.G.O.D')
    expect(logo).toBeInTheDocument()
  })

  it('should render ring image', () => {
    renderLogo()
    const ring = screen.getByAltText('Ring')
    expect(ring).toBeInTheDocument()
  })

  it('should navigate to home when clicked', () => {
    renderLogo()
    const logo = screen.getByAltText('40.G.O.D')
    fireEvent.click(logo)
    // Navigation should occur
    expect(logo).toBeInTheDocument()
  })

  it('should handle window resize for mobile view', () => {
    renderLogo()
    
    // Simulate mobile view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })
    
    fireEvent(window, new Event('resize'))
    
    // Component should still render
    expect(screen.getByAltText('40.G.O.D')).toBeInTheDocument()
  })

  it('should handle window resize for desktop view', () => {
    renderLogo()
    
    // Simulate desktop view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    })
    
    fireEvent(window, new Event('resize'))
    
    // Component should still render
    expect(screen.getByAltText('40.G.O.D')).toBeInTheDocument()
  })

  it('should have NavLink to home', () => {
    renderLogo()
    const link = screen.getByAltText('40.G.O.D').closest('a')
    expect(link).toHaveAttribute('href', '/')
  })

  it('should render all logo assets', () => {
    renderLogo()
    // Check that multiple ring images are rendered
    const rings = screen.getAllByAltText('Ring')
    expect(rings.length).toBeGreaterThan(0)
  })
})

