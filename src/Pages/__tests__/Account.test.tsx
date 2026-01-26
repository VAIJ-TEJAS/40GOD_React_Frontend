import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Account from '../Account'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

describe('Account', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderAccount = () => {
    return render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    )
  }

  it('should render account component', () => {
    renderAccount()
    expect(screen.getByText('Shipping Information')).toBeInTheDocument()
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

    renderAccount()

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

    renderAccount()

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
    })
  })

  it('should handle add address button click', () => {
    renderAccount()
    const addButton = screen.getByRole('button', { name: /\+/i })
    fireEvent.click(addButton)

    expect(screen.getByText('New Shipping Information')).toBeInTheDocument()
  })

  it('should handle form submission', async () => {
    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockResolvedValue({ data: [] })
    mockedAxios.post.mockResolvedValue({ data: { id: 1 } })

    renderAccount()

    const addButton = screen.getByRole('button', { name: /\+/i })
    fireEvent.click(addButton)

    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText('Name')
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    })

    const submitButton = screen.getByRole('button', { name: /check/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled()
    })
  })

  it('should handle delete address', async () => {
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
    mockedAxios.delete.mockResolvedValue({})

    renderAccount()

    await waitFor(() => {
      const deleteButton = screen.getByText('Delete')
      fireEvent.click(deleteButton)
    })

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith('/address-book/1/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token test-token',
        },
      })
    })
  })

  it('should handle logout', () => {
    localStorage.setItem('token', 'test-token')
    const originalLocation = window.location

    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
      writable: true,
    })

    renderAccount()
    const logoutButton = screen.getByText('LOGOUT')
    fireEvent.click(logoutButton)

    expect(localStorage.getItem('token')).toBeNull()

    window.location = originalLocation
  })

  it('should handle API errors gracefully', async () => {
    localStorage.setItem('token', 'test-token')
    mockedAxios.get.mockRejectedValue(new Error('API Error'))

    renderAccount()

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })

    // Component should still render
    expect(screen.getByText('Shipping Information')).toBeInTheDocument()
  })
})

