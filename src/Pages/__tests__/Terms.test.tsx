import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FortyGodTerms from '../Terms'

describe('FortyGodTerms', () => {
  it('should render terms page', () => {
    render(<FortyGodTerms />)
    expect(screen.getByText('Terms and Conditions')).toBeInTheDocument()
  })

  it('should display last revised date', () => {
    render(<FortyGodTerms />)
    expect(screen.getByText(/Last Revised on March 1/i)).toBeInTheDocument()
  })

  it('should display table of contents', () => {
    render(<FortyGodTerms />)
    expect(screen.getByText('TABLE OF CONTENTS')).toBeInTheDocument()
  })

  it('should display main sections', () => {
    render(<FortyGodTerms />)
    expect(screen.getByText(/WHO MAY USE THE SERVICES/i)).toBeInTheDocument()
    expect(screen.getByText(/USER ACCOUNTS/i)).toBeInTheDocument()
    expect(screen.getByText(/ORDERS FOR PRODUCTS/i)).toBeInTheDocument()
  })

  it('should render background image', () => {
    render(<FortyGodTerms />)
    const image = screen.getByAltText('bg')
    expect(image).toBeInTheDocument()
  })
})

