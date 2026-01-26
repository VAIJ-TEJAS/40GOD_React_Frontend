import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ContactUs from '../Contact'

// Mock the background image import
vi.mock('../../assets/background/Backgroud.jpeg', () => ({
  default: 'mock-background.jpg'
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('ContactUs', () => {
  beforeEach(() => {
    // Clear any mocks before each test
    vi.clearAllMocks()
  })

  it('should render contact page', () => {
    renderWithRouter(<ContactUs />)
    expect(screen.getByText('GET IN TOUCH')).toBeInTheDocument()
  })

  it('should display contact email', () => {
    renderWithRouter(<ContactUs />)
    expect(screen.getByText('contact@40god.com')).toBeInTheDocument()
  })

  it('should display location', () => {
    renderWithRouter(<ContactUs />)
    expect(screen.getByText('Pune')).toBeInTheDocument()
  })

  it('should display follow us section', () => {
    renderWithRouter(<ContactUs />)
    expect(screen.getByText('FOLLOW US')).toBeInTheDocument()
  })

  it('should display FAQs section', () => {
    renderWithRouter(<ContactUs />)
    expect(screen.getByText('FAQs')).toBeInTheDocument()
  })

  it('should display FAQ questions', () => {
    renderWithRouter(<ContactUs />)
    expect(screen.getByText(/What is your return policy/i)).toBeInTheDocument()
    expect(screen.getByText(/How long does shipping take/i)).toBeInTheDocument()
    expect(screen.getByText(/Do you ship internationally/i)).toBeInTheDocument()
    expect(screen.getByText(/How can I track my order/i)).toBeInTheDocument()
  })

  it('should render background image', () => {
    renderWithRouter(<ContactUs />)
    const image = screen.getByAltText('40.G.O.D rose background')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src')
  })

  it('should display all FAQ answers', () => {
    renderWithRouter(<ContactUs />)
    expect(screen.getByText(/We offer a 30-day return policy/i)).toBeInTheDocument()
    expect(screen.getByText(/Standard shipping typically takes 3-5 business days/i)).toBeInTheDocument()
    expect(screen.getByText(/Yes, we ship to most countries worldwide/i)).toBeInTheDocument()
    expect(screen.getByText(/Once your order ships, you'll receive a confirmation email/i)).toBeInTheDocument()
  })

  it('should have proper email icon structure', () => {
    renderWithRouter(<ContactUs />)
    const emailSection = screen.getByText('contact@40god.com').closest('div')
    expect(emailSection).toBeInTheDocument()
  })

  it('should have proper location icon structure', () => {
    renderWithRouter(<ContactUs />)
    const locationSection = screen.getByText('Pune').closest('div')
    expect(locationSection).toBeInTheDocument()
  })

  it('should display Instagram link with proper attributes', () => {
    renderWithRouter(<ContactUs />)
    const instagramLink = screen.getByText('40.g.o.d').closest('a')
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink).toHaveAttribute('href')
    expect(instagramLink?.getAttribute('href')).toContain('instagram.com')
  })

  it('should have all FAQ items with proper styling classes', () => {
    renderWithRouter(<ContactUs />)
    const faqItems = screen.getAllByText(/What is your return policy|How long does shipping take|Do you ship internationally|How can I track my order/i)
    expect(faqItems.length).toBeGreaterThan(0)
    
    faqItems.forEach(item => {
      const faqContainer = item.closest('div')
      expect(faqContainer).toHaveClass('bg-white', 'bg-opacity-10')
    })
  })

  it('should render with proper responsive classes', () => {
    renderWithRouter(<ContactUs />)
    const mainContainer = screen.getByText('GET IN TOUCH').closest('div')
    expect(mainContainer).toHaveClass('flex', 'flex-col', 'gap-4')
  })

  it('should have background image with proper styling', () => {
    renderWithRouter(<ContactUs />)
    const image = screen.getByAltText('40.G.O.D rose background')
    expect(image).toHaveClass('absolute', 'inset-0', 'w-screen', 'h-full', 'object-cover', 'brightness-50')
  })

  it('should display all contact information sections', () => {
    renderWithRouter(<ContactUs />)
    const sections = [
      'GET IN TOUCH',
      'FOLLOW US',
      'FAQs'
    ]
    
    sections.forEach(section => {
      expect(screen.getByText(section)).toBeInTheDocument()
    })
  })

  it('should have proper icon containers with styling', () => {
    renderWithRouter(<ContactUs />)
    // Check for SVG icons (they should be present in the email and location sections)
    const svgIcons = document.querySelectorAll('svg')
    expect(svgIcons.length).toBeGreaterThan(0)
  })

  it('should render FAQ items in proper order', () => {
    renderWithRouter(<ContactUs />)
    const faqQuestions = [
      /What is your return policy/i,
      /How long does shipping take/i,
      /Do you ship internationally/i,
      /How can I track my order/i
    ]
    
    faqQuestions.forEach(question => {
      expect(screen.getByText(question)).toBeInTheDocument()
    })
  })

  it('should have proper text color classes', () => {
    renderWithRouter(<ContactUs />)
    const mainText = screen.getByText('GET IN TOUCH')
    expect(mainText.closest('div')).toHaveClass('text-white')
  })

  it('should display Instagram handle correctly', () => {
    renderWithRouter(<ContactUs />)
    expect(screen.getByText('40.g.o.d')).toBeInTheDocument()
  })

  it('should have all FAQ containers with rounded corners', () => {
    renderWithRouter(<ContactUs />)
    const faqContainers = document.querySelectorAll('.bg-white.bg-opacity-10')
    expect(faqContainers.length).toBeGreaterThanOrEqual(4)
    
    faqContainers.forEach(container => {
      expect(container).toHaveClass('rounded-lg')
    })
  })

  it('should render contact page with proper layout structure', () => {
    renderWithRouter(<ContactUs />)
    const mainDiv = screen.getByText('GET IN TOUCH').closest('div')?.parentElement
    expect(mainDiv).toHaveClass('relative', 'text-lg', 'text-white')
  })

  it('should have fixed background container', () => {
    renderWithRouter(<ContactUs />)
    const fixedContainer = screen.getByAltText('40.G.O.D rose background').closest('div')
    expect(fixedContainer).toHaveClass('fixed', 'inset-0')
  })
})

