import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ShippingInfo from '../ShippingInfo'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

describe('ShippingInfo', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderShippingInfo = () => {
    return render(
      <BrowserRouter>
        <ShippingInfo signUpData={null} />
      </BrowserRouter>
    )
  }

  it('should render shipping info component', () => {
    renderShippingInfo()
    expect(screen.getByText('SELECT ADDRESS')).toBeInTheDocument()
  })

  it('should fetch address book entries on mount', async () => {
    const mockAddresses = [
      {
        id: 1,
        name: 'John Doe',
        phone_number: '1234567890',
        street_address: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'USA',
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockAddresses })

    renderShippingInfo()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/address-book/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token test-token',
        },
      })
    })
  })

  it('should display address book entries', async () => {
    const mockAddresses = [
      {
        id: 1,
        name: 'John Doe',
        phone_number: '1234567890',
        street_address: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'USA',
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockAddresses })

    renderShippingInfo()

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText(/1234567890/)).toBeInTheDocument()
      expect(screen.getByText(/123 Main St/)).toBeInTheDocument()
    })
  })

  it('should select first address by default', async () => {
    const mockAddresses = [
      {
        id: 1,
        name: 'John Doe',
        phone_number: '1234567890',
        street_address: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'USA',
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockAddresses })

    renderShippingInfo()

    await waitFor(() => {
      const radio = screen.getByRole('radio')
      expect(radio).toBeChecked()
    })
  })

  it('should handle address selection', async () => {
    const mockAddresses = [
      {
        id: 1,
        name: 'John Doe',
        phone_number: '1234567890',
        street_address: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'USA',
      },
      {
        id: 2,
        name: 'Jane Smith',
        phone_number: '0987654321',
        street_address: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        postal_code: '90001',
        country: 'USA',
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockAddresses })

    renderShippingInfo()

    await waitFor(() => {
      const radios = screen.getAllByRole('radio')
      expect(radios[0]).toBeChecked()
      
      // Click second radio
      fireEvent.click(radios[1])
      expect(radios[1]).toBeChecked()
    })
  })

  it('should render add new address button', () => {
    renderShippingInfo()
    const button = screen.getByText('ADD NEW ADDRESS')
    expect(button).toBeInTheDocument()
  })

  it('should handle API error gracefully', async () => {
    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockRejectedValue(new Error('API Error'))

    renderShippingInfo()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })

    // Component should still render
    expect(screen.getByText('SELECT ADDRESS')).toBeInTheDocument()
  })

  it('should not fetch addresses when no token', () => {
    localStorage.removeItem('token')
    renderShippingInfo()

    expect(mockedAxios.get).not.toHaveBeenCalled()
  })

  it('should display all address fields', async () => {
    const mockAddresses = [
      {
        id: 1,
        name: 'John Doe',
        phone_number: '1234567890',
        street_address: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'USA',
      },
    ]

    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: mockAddresses })

    renderShippingInfo()

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText(/New York/)).toBeInTheDocument()
      expect(screen.getByText(/NY/)).toBeInTheDocument()
      expect(screen.getByText(/10001/)).toBeInTheDocument()
      expect(screen.getByText(/USA/)).toBeInTheDocument()
    })
  })
})

