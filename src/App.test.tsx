import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CurrencyProvider } from './context/CurrencyContext'

describe('App', () => {
  it('should render app component', () => {
    render(
      <BrowserRouter>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </BrowserRouter>
    )

    // Check if main app structure is rendered
    const appElement = document.querySelector('.min-h-screen')
    expect(appElement).toBeInTheDocument()
  })

  it('should render navbar', () => {
    render(
      <BrowserRouter>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </BrowserRouter>
    )

    // Navbar should be rendered (check for logo or nav elements)
    const navbar = document.querySelector('nav')
    expect(navbar).toBeInTheDocument()
  })

  it('should render footer', () => {
    render(
      <BrowserRouter>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </BrowserRouter>
    )

    // Footer should be rendered
    const footer = document.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('should render routes', () => {
    render(
      <BrowserRouter>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </BrowserRouter>
    )

    // Routes container should exist
    const routesContainer = document.querySelector('.flex-grow')
    expect(routesContainer).toBeInTheDocument()
  })

  it('should have correct app structure', () => {
    render(
      <BrowserRouter>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </BrowserRouter>
    )

    // Check for main container classes
    const mainContainer = document.querySelector('.my-text.min-h-screen.flex.flex-col')
    expect(mainContainer).toBeInTheDocument()
  })
})

