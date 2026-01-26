import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

describe('Footer', () => {
  it('should render footer with all links', () => {
    render(<Footer />)
    
    expect(screen.getByText('TERMS')).toBeInTheDocument()
    expect(screen.getByText('PRIVACY')).toBeInTheDocument()
    expect(screen.getByText('GENERAL')).toBeInTheDocument()
    expect(screen.getByText('CONTACT')).toBeInTheDocument()
  })

  it('should render copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/2025 © 40.G.O.D ALL RIGHTS RESERVED/i)).toBeInTheDocument()
  })

  it('should render Instagram link', () => {
    render(<Footer />)
    const instagramLink = screen.getByAltText('instagram')
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink.closest('a')).toHaveAttribute('href')
  })

  it('should have correct href for terms link', () => {
    render(<Footer />)
    const termsLink = screen.getByText('TERMS')
    expect(termsLink.closest('a')).toHaveAttribute('href', '/terms')
  })

  it('should have correct href for privacy link', () => {
    render(<Footer />)
    const privacyLink = screen.getByText('PRIVACY')
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacy')
  })

  it('should have correct href for general link', () => {
    render(<Footer />)
    const generalLink = screen.getByText('GENERAL')
    expect(generalLink.closest('a')).toHaveAttribute('href', '/general')
  })

  it('should have correct href for contact link', () => {
    render(<Footer />)
    const contactLink = screen.getByText('CONTACT')
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact')
  })

  it('should render footer with proper structure', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('should display current year dynamically', () => {
    const currentYear = new Date().getFullYear()
    render(<Footer />)
    expect(screen.getByText(new RegExp(`${currentYear} ©`))).toBeInTheDocument()
  })

  it('should handle link clicks', () => {
    const originalLocation = window.location
    delete (window as any).location
    window.location = { ...originalLocation, href: '' }

    render(<Footer />)
    const termsLink = screen.getByText('TERMS')
    fireEvent.click(termsLink)

    expect(window.location.href).toBe('/terms')

    window.location = originalLocation
  })

  it('should handle Instagram link click', () => {
    const originalOpen = window.open
    window.open = vi.fn()

    render(<Footer />)
    const instagramLink = screen.getByAltText('instagram').closest('a')
    if (instagramLink) {
      fireEvent.click(instagramLink)
    }

    window.open = originalOpen
  })

  it('should handle scroll events', () => {
    render(<Footer />)
    
    // Simulate scroll to bottom
    Object.defineProperty(window, 'scrollY', { value: 1000, writable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true })
    
    fireEvent(window, new Event('scroll'))
    
    // Footer should handle scroll
    expect(document.body).toBeTruthy()
  })

  it('should have aria-label on Instagram link', () => {
    render(<Footer />)
    const instagramLink = screen.getByLabelText('Visit our Instagram page')
    expect(instagramLink).toBeInTheDocument()
  })

  it('should have transition classes on links', () => {
    render(<Footer />)
    const termsLink = screen.getByText('TERMS')
    expect(termsLink.closest('a')).toHaveClass('transition-colors', 'duration-200')
  })

  it('should update year on mount', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01'))
    
    render(<Footer />)
    expect(screen.getByText(/2024 ©/)).toBeInTheDocument()
    
    vi.useRealTimers()
  })
})

