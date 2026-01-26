import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FortyGodTerms from '../Terms'

// Mock analytics helpers
vi.mock('../../utils/analyticsHelpers', () => ({
  trackPageView: vi.fn(),
  trackEvent: vi.fn(),
  getOrCreateSessionId: vi.fn(() => 'test-session-id'),
}))

// Mock background image
vi.mock('../../assets/background/Backgroud.jpeg', () => ({
  default: 'mock-background.jpg',
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('FortyGodTerms', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.matchMedia for responsive features
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('should render terms page', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText('Terms and Conditions')).toBeInTheDocument()
  })

  it('should display last revised date', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/Last Revised on March 1/i)).toBeInTheDocument()
  })

  it('should display table of contents', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText('TABLE OF CONTENTS')).toBeInTheDocument()
  })

  it('should display main sections', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/WHO MAY USE THE SERVICES/i)).toBeInTheDocument()
    expect(screen.getByText(/USER ACCOUNTS/i)).toBeInTheDocument()
    expect(screen.getByText(/ORDERS FOR PRODUCTS/i)).toBeInTheDocument()
  })

  it('should render background image', () => {
    renderWithRouter(<FortyGodTerms />)
    const image = screen.getByAltText('bg')
    expect(image).toBeInTheDocument()
    expect(image).toHaveClass('absolute', 'inset-0', 'w-screen', 'h-full', 'object-cover', 'brightness-50')
  })

  it('should display all major section headings', () => {
    renderWithRouter(<FortyGodTerms />)
    const sections = [
      'WHO MAY USE THE SERVICES',
      'USER ACCOUNTS',
      'ORDERS FOR PRODUCTS',
      'LOCATION OF OUR PRIVACY POLICY',
      'RIGHTS WE GRANT YOU',
      'OWNERSHIP AND CONTENT',
      'THIRD PARTY SERVICES AND MATERIALS',
    ]
    sections.forEach(section => {
      expect(screen.getByText(new RegExp(section, 'i'))).toBeInTheDocument()
    })
  })

  it('should display subsection headings', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/Creating and Safeguarding your Account/i)).toBeInTheDocument()
    expect(screen.getByText(/Payment/i)).toBeInTheDocument()
    expect(screen.getByText(/Promotional Codes/i)).toBeInTheDocument()
    expect(screen.getByText(/Product Information/i)).toBeInTheDocument()
  })

  it('should display privacy policy link', () => {
    renderWithRouter(<FortyGodTerms />)
    const privacyLink = screen.getByText(/40god\.in\/privacy/i)
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink.closest('a')).toHaveAttribute('href', 'https://40god.in/privacy')
    expect(privacyLink.closest('a')).toHaveAttribute('target', '_blank')
  })

  it('should display disclosure link', () => {
    renderWithRouter(<FortyGodTerms />)
    const disclosureLink = screen.getByText(/40god\.in\/disclosure/i)
    expect(disclosureLink).toBeInTheDocument()
    expect(disclosureLink.closest('a')).toHaveAttribute('href', 'https://40god.in/disclosure')
  })

  it('should display license grant section', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/License Grant/i)).toBeInTheDocument()
  })

  it('should display restrictions section', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/Restrictions On Your Use of the Services/i)).toBeInTheDocument()
  })

  it('should display restriction list items', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/download, modify, copy, distribute/i)).toBeInTheDocument()
    expect(screen.getByText(/duplicate, decompile, reverse engineer/i)).toBeInTheDocument()
  })

  it('should display ownership section content', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/Ownership of the Services/i)).toBeInTheDocument()
    expect(screen.getByText(/Ownership of Trademarks/i)).toBeInTheDocument()
    expect(screen.getByText(/Ownership of Feedback/i)).toBeInTheDocument()
  })

  it('should display third party services section', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/Use of Third Party Materials/i)).toBeInTheDocument()
  })

  it('should have proper responsive classes', () => {
    renderWithRouter(<FortyGodTerms />)
    const mainContainer = screen.getByText('Terms and Conditions').closest('div')
    expect(mainContainer?.parentElement).toHaveClass('flex', 'flex-col', 'relative')
  })

  it('should have proper text styling', () => {
    renderWithRouter(<FortyGodTerms />)
    const title = screen.getByText('Terms and Conditions')
    expect(title).toHaveClass('text-2xl', 'font-bold')
  })

  it('should display terms introduction text', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/These Terms and Conditions/i)).toBeInTheDocument()
    expect(screen.getByText(/40god\.in/i)).toBeInTheDocument()
    expect(screen.getByText(/40\.GOD LLC/i)).toBeInTheDocument()
  })

  it('should display arbitration clause notice', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/Section 9 contains an arbitration clause/i)).toBeInTheDocument()
    expect(screen.getByText(/binding individual arbitration/i)).toBeInTheDocument()
  })

  it('should display age requirement information', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/13 years of age or older/i)).toBeInTheDocument()
    expect(screen.getByText(/Children under the age of 13/i)).toBeInTheDocument()
  })

  it('should display account creation information', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/create an account/i)).toBeInTheDocument()
    expect(screen.getByText(/privacy40god\.in/i)).toBeInTheDocument()
  })

  it('should display payment information', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/credit card or other payment information/i)).toBeInTheDocument()
    expect(screen.getByText(/India\. Dollars/i)).toBeInTheDocument()
  })

  it('should display promotional codes information', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/promotional codes, referral codes/i)).toBeInTheDocument()
    expect(screen.getByText(/may expire prior to your use/i)).toBeInTheDocument()
  })

  it('should display product information disclaimer', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/We try to be as accurate/i)).toBeInTheDocument()
    expect(screen.getByText(/not as described on the Services/i)).toBeInTheDocument()
  })

  it('should have proper link attributes for external links', () => {
    renderWithRouter(<FortyGodTerms />)
    const externalLinks = screen.getAllByRole('link')
    externalLinks.forEach(link => {
      if (link.getAttribute('href')?.startsWith('http')) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })
  })

  it('should display FTC link', () => {
    renderWithRouter(<FortyGodTerms />)
    const ftcLink = screen.getByText(/www\.ftc\.gov/i)
    expect(ftcLink).toBeInTheDocument()
    expect(ftcLink.closest('a')).toHaveAttribute('href', 'https://www.ftc.gov')
  })

  it('should have proper section structure', () => {
    renderWithRouter(<FortyGodTerms />)
    const sections = document.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(0)
    sections.forEach(section => {
      expect(section).toHaveClass('mb-8')
    })
  })

  it('should display proper heading hierarchy', () => {
    renderWithRouter(<FortyGodTerms />)
    const h2Elements = screen.getAllByRole('heading', { level: 2 })
    expect(h2Elements.length).toBeGreaterThan(0)
  })

  it('should have proper spacing and padding', () => {
    renderWithRouter(<FortyGodTerms />)
    const contentDiv = screen.getByText('Terms and Conditions').closest('div')?.parentElement
    expect(contentDiv).toHaveClass('mt-60', 'sm:p-8', 'z-10')
  })

  it('should display all restriction list items', () => {
    renderWithRouter(<FortyGodTerms />)
    const restrictionItems = [
      /download, modify, copy/i,
      /duplicate, decompile/i,
      /use, reproduce or remove/i,
      /use automation software/i,
      /exploit the Services/i,
      /access or use the Services in any manner/i,
      /attempt to gain unauthorized access/i,
      /circumvent, remove, alter/i,
      /use any robot, spider/i,
      /introduce any viruses/i,
      /use the Services for illegal/i,
      /access or use the Services in any way/i,
    ]
    restrictionItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('should handle search functionality if implemented', () => {
    renderWithRouter(<FortyGodTerms />)
    // Test search input if it exists
    const searchInput = screen.queryByPlaceholderText(/search/i)
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'payment' } })
      expect(searchInput).toHaveValue('payment')
    }
  })

  it('should have proper background image styling', () => {
    renderWithRouter(<FortyGodTerms />)
    const bgImage = screen.getByAltText('bg')
    expect(bgImage).toHaveClass('fixed', 'inset-0')
    expect(bgImage.parentElement).toHaveClass('fixed', 'inset-0')
  })

  it('should display proper text content structure', () => {
    renderWithRouter(<FortyGodTerms />)
    const paragraphs = screen.getByText(/These Terms and Conditions/i).closest('div')?.querySelectorAll('p')
    expect(paragraphs?.length).toBeGreaterThan(0)
  })

  it('should have accessible structure', () => {
    renderWithRouter(<FortyGodTerms />)
    const mainHeading = screen.getByText('Terms and Conditions')
    expect(mainHeading.tagName).toBe('H1')
  })

  it('should display terms acceptance notice', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/By accessing and\/or using the Services/i)).toBeInTheDocument()
    expect(screen.getByText(/you are agreeing to these Terms/i)).toBeInTheDocument()
  })

  it('should display entity representation clause', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/If you use the Services on behalf of a company/i)).toBeInTheDocument()
    expect(screen.getByText(/authorized representative of the entity/i)).toBeInTheDocument()
  })

  it('should have proper z-index layering', () => {
    renderWithRouter(<FortyGodTerms />)
    const contentDiv = screen.getByText('Terms and Conditions').closest('div')?.parentElement
    expect(contentDiv).toHaveClass('z-10')
  })

  it('should display all payment method information', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/Payment can be made by credit card/i)).toBeInTheDocument()
    expect(screen.getByText(/Orders will not be processed until payment/i)).toBeInTheDocument()
  })

  it('should display promotional code restrictions', () => {
    renderWithRouter(<FortyGodTerms />)
    expect(screen.getByText(/must be used in a lawful manner/i)).toBeInTheDocument()
    expect(screen.getByText(/may not be duplicated, sold or transferred/i)).toBeInTheDocument()
    expect(screen.getByText(/not valid for cash/i)).toBeInTheDocument()
  })
})

