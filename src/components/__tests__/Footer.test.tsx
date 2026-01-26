import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

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
})

