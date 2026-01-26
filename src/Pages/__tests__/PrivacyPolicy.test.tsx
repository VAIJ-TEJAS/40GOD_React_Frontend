import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import privacyPolicy from '../PrivacyPolicy'

describe('privacyPolicy', () => {
  it('should render privacy policy page', () => {
    render(<privacyPolicy />)
    expect(screen.getByText(/Last Revised on March 1/i)).toBeInTheDocument()
  })

  it('should display privacy policy content', () => {
    render(<privacyPolicy />)
    expect(screen.getByText(/40.G.O.D LLC/i)).toBeInTheDocument()
  })

  it('should display main sections', () => {
    render(<privacyPolicy />)
    expect(screen.getByText(/UPDATING THIS PRIVACY POLICY/i)).toBeInTheDocument()
    expect(screen.getByText(/COMPANY'S COLLECTION AND USE OF INFORMATION/i)).toBeInTheDocument()
  })

  it('should render background image', () => {
    render(<privacyPolicy />)
    const image = screen.getByAltText('bg')
    expect(image).toBeInTheDocument()
  })
})

