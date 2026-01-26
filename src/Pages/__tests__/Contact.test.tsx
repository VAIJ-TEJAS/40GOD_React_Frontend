import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactUs from '../Contact'

describe('ContactUs', () => {
  it('should render contact page', () => {
    render(<ContactUs />)
    expect(screen.getByText('GET IN TOUCH')).toBeInTheDocument()
  })

  it('should display contact email', () => {
    render(<ContactUs />)
    expect(screen.getByText('contact@40god.com')).toBeInTheDocument()
  })

  it('should display location', () => {
    render(<ContactUs />)
    expect(screen.getByText('Pune')).toBeInTheDocument()
  })

  it('should display follow us section', () => {
    render(<ContactUs />)
    expect(screen.getByText('FOLLOW US')).toBeInTheDocument()
  })

  it('should display FAQs section', () => {
    render(<ContactUs />)
    expect(screen.getByText('FAQs')).toBeInTheDocument()
  })

  it('should display FAQ questions', () => {
    render(<ContactUs />)
    expect(screen.getByText(/What is your return policy/i)).toBeInTheDocument()
    expect(screen.getByText(/How long does shipping take/i)).toBeInTheDocument()
    expect(screen.getByText(/Do you ship internationally/i)).toBeInTheDocument()
    expect(screen.getByText(/How can I track my order/i)).toBeInTheDocument()
  })

  it('should render background image', () => {
    render(<ContactUs />)
    const image = screen.getByAltText('40.G.O.D rose background')
    expect(image).toBeInTheDocument()
  })
})

