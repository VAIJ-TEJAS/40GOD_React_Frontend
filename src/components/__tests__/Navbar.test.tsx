import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../Navbar'

describe('NavBar', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    )
  }

  it('should render navbar with logo', () => {
    renderNavbar()
    const logo = screen.getByAltText('40.G.O.D')
    expect(logo).toBeInTheDocument()
  })

  it('should show login link when user is not logged in', () => {
    localStorage.removeItem('token')
    renderNavbar()
    const loginLink = screen.getByText('LOGIN')
    expect(loginLink).toBeInTheDocument()
  })

  it('should show logout button when user is logged in', () => {
    localStorage.setItem('token', 'test-token')
    renderNavbar()
    const logoutButton = screen.getByText('LOGOUT')
    expect(logoutButton).toBeInTheDocument()
  })

  it('should show bag link', () => {
    renderNavbar()
    const bagLink = screen.getByText('BAG')
    expect(bagLink).toBeInTheDocument()
  })

  it('should show account link when user is logged in', () => {
    localStorage.setItem('token', 'test-token')
    renderNavbar()
    const accountLink = screen.getByText('ACCN')
    expect(accountLink).toBeInTheDocument()
  })

  it('should toggle dropdown menu on mobile', () => {
    renderNavbar()
    const logo = screen.getAllByAltText('40.G.O.D')[0]
    fireEvent.click(logo)
    
    // Check if dropdown content appears
    expect(screen.getByText('Shop')).toBeInTheDocument()
  })

  it('should handle logout correctly', () => {
    localStorage.setItem('token', 'test-token')
    const originalLocation = window.location
    
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
      writable: true,
    })

    renderNavbar()
    const logoutButton = screen.getByText('LOGOUT')
    fireEvent.click(logoutButton)

    expect(localStorage.getItem('token')).toBeNull()
    
    window.location = originalLocation
  })

  it('should close dropdown when clicking outside', () => {
    renderNavbar()
    const logo = screen.getAllByAltText('40.G.O.D')[0]
    fireEvent.click(logo)
    
    expect(screen.getByText('Shop')).toBeInTheDocument()
    
    fireEvent.click(logo)
    // Dropdown should close
  })

  it('should navigate to login page from mobile menu', () => {
    localStorage.removeItem('token')
    renderNavbar()
    
    // Open mobile menu
    const logo = screen.getAllByAltText('40.G.O.D')[0]
    fireEvent.click(logo)
    
    const loginItem = screen.getByText('Login')
    fireEvent.click(loginItem)
    
    expect(window.location.href).toBe('/login')
  })

  it('should navigate to account page from mobile menu when logged in', () => {
    localStorage.setItem('token', 'test-token')
    renderNavbar()
    
    // Open mobile menu
    const logo = screen.getAllByAltText('40.G.O.D')[0]
    fireEvent.click(logo)
    
    const accountItem = screen.getByText('Account')
    fireEvent.click(accountItem)
    
    expect(window.location.href).toBe('/account')
  })

  it('should toggle shop dropdown in mobile menu', () => {
    renderNavbar()
    const logo = screen.getAllByAltText('40.G.O.D')[0]
    fireEvent.click(logo)
    
    const shopItem = screen.getByText('Shop')
    fireEvent.click(shopItem)
    
    // T-Shirt should appear
    expect(screen.getByText('T-Shirt')).toBeInTheDocument()
  })

  it('should navigate to t-shirt page from desktop dropdown', () => {
    renderNavbar()
    const logo = screen.getAllByAltText('40.G.O.D')[0]
    fireEvent.click(logo)
    
    const tshirtLink = screen.getByText('T-Shirt')
    expect(tshirtLink).toBeInTheDocument()
  })
})

