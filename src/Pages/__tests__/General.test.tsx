import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import General from '../General'

describe('General', () => {
  it('should render general page', () => {
    render(<General />)
    expect(screen.getByText('GENERAL INFORMATION')).toBeInTheDocument()
  })

  it('should display shipping information', () => {
    render(<General />)
    expect(screen.getByText(/Shipping and Delivery/i)).toBeInTheDocument()
  })

  it('should display main sections', () => {
    render(<General />)
    expect(screen.getByText(/WHO MAY USE THE SERVICES/i)).toBeInTheDocument()
  })

  it('should render background image', () => {
    render(<General />)
    const image = screen.getByAltText('bg')
    expect(image).toBeInTheDocument()
  })
})

