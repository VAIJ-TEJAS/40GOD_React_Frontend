import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SignUpPage from '../SignUp'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

// Mock useNavigate
const mockNavigate = vi.fn()
const mockOnClose = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('SignUpPage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    mockNavigate.mockClear()
    mockOnClose.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderSignUp = () => {
    return render(
      <BrowserRouter>
        <SignUpPage onClose={mockOnClose} />
      </BrowserRouter>
    )
  }

  it('should render signup form', () => {
    renderSignUp()
    expect(screen.getByText('USERNAME')).toBeInTheDocument()
    expect(screen.getByText('PASSWORD')).toBeInTheDocument()
    expect(screen.getByText('FIRST NAME')).toBeInTheDocument()
    expect(screen.getByText('LAST NAME')).toBeInTheDocument()
    expect(screen.getByText('EMAIL')).toBeInTheDocument()
  })

  it('should handle form input changes', () => {
    renderSignUp()
    const usernameInput = screen.getByLabelText('USERNAME')
    const passwordInput = screen.getByLabelText('PASSWORD')
    const firstNameInput = screen.getByLabelText('FIRST NAME')
    const lastNameInput = screen.getByLabelText('LAST NAME')
    const emailInput = screen.getByLabelText('EMAIL')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass123' } })
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })

    expect(usernameInput).toHaveValue('testuser')
    expect(passwordInput).toHaveValue('testpass123')
    expect(firstNameInput).toHaveValue('John')
    expect(lastNameInput).toHaveValue('Doe')
    expect(emailInput).toHaveValue('john@example.com')
  })

  it('should handle successful signup with token', async () => {
    const mockResponse = {
      data: {
        token: 'test-token',
        user: { id: 1, username: 'testuser' },
      },
    }

    mockedAxios.post.mockResolvedValue(mockResponse)
    vi.useFakeTimers()

    renderSignUp()

    const usernameInput = screen.getByLabelText('USERNAME')
    const passwordInput = screen.getByLabelText('PASSWORD')
    const firstNameInput = screen.getByLabelText('FIRST NAME')
    const lastNameInput = screen.getByLabelText('LAST NAME')
    const emailInput = screen.getByLabelText('EMAIL')
    const submitButton = screen.getByText('SIGN UP')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass123' } })
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/signup/',
        expect.objectContaining({
          username: 'testuser',
          password: 'testpass123',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    })

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('test-token')
    })

    vi.advanceTimersByTime(1500)
    expect(mockNavigate).toHaveBeenCalledWith('/Account', expect.any(Object))
    expect(mockOnClose).toHaveBeenCalled()

    vi.useRealTimers()
  })

  it('should handle signup without token', async () => {
    const mockResponse = {
      data: {
        user: { id: 1, username: 'testuser' },
      },
    }

    mockedAxios.post.mockResolvedValue(mockResponse)
    vi.useFakeTimers()

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled()
    })

    vi.advanceTimersByTime(1500)
    expect(mockOnClose).toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalledWith('/Account', expect.any(Object))

    vi.useRealTimers()
  })

  it('should display success message on successful signup', async () => {
    const mockResponse = {
      data: {
        token: 'test-token',
      },
    }

    mockedAxios.post.mockResolvedValue(mockResponse)

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Signup successful!')).toBeInTheDocument()
    })
  })

  it('should handle 404 error', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 404,
        data: { message: 'Not found' },
      },
    })

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/API endpoint not found/i)
      ).toBeInTheDocument()
    })
  })

  it('should handle 400 validation error with object', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 400,
        data: {
          username: 'Username already exists',
          email: 'Email is invalid',
        },
      },
    })

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Validation error/i)).toBeInTheDocument()
    })
  })

  it('should handle 400 validation error with string', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 400,
        data: 'Invalid form data',
      },
    })

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Invalid form data')).toBeInTheDocument()
    })
  })

  it('should handle network error', async () => {
    mockedAxios.post.mockRejectedValue({
      request: {},
    })

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/No response from server/i)
      ).toBeInTheDocument()
    })
  })

  it('should handle generic error', async () => {
    mockedAxios.post.mockRejectedValue({
      message: 'Network Error',
    })

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument()
    })
  })

  it('should handle unexpected error', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Unexpected error'))

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/An unexpected error occurred/i)
      ).toBeInTheDocument()
    })
  })

  it('should show loading state during submission', async () => {
    mockedAxios.post.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    )

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    expect(screen.getByText('SIGNING UP...')).toBeInTheDocument()
  })

  it('should handle empty response', async () => {
    mockedAxios.post.mockResolvedValue({ data: null })

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/Signup completed but received an empty response/i)
      ).toBeInTheDocument()
    })
  })

  it('should disable submit button when loading', async () => {
    mockedAxios.post.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    )

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled()
  })

  it('should clear error message on new submission', async () => {
    mockedAxios.post
      .mockRejectedValueOnce({
        response: { status: 400, data: 'Error' },
      })
      .mockResolvedValueOnce({ data: { token: 'test-token' } })

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument()
    })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText(/Error/i)).not.toBeInTheDocument()
    })
  })

  it('should handle form submission via form submit event', async () => {
    const mockResponse = {
      data: {
        token: 'test-token',
      },
    }

    mockedAxios.post.mockResolvedValue(mockResponse)

    renderSignUp()

    const form = document.querySelector('form')
    if (form) {
      fireEvent.submit(form)
    } else {
      const submitButton = screen.getByText('SIGN UP')
      fireEvent.click(submitButton)
    }

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled()
    })
  })

  it('should validate required fields', () => {
    renderSignUp()

    const inputs = screen.getAllByRole('textbox')
    inputs.forEach((input) => {
      expect(input).toBeRequired()
    })

    const passwordInput = screen.getByLabelText('PASSWORD')
    expect(passwordInput).toBeRequired()
  })

  it('should handle email input type', () => {
    renderSignUp()

    const emailInput = screen.getByLabelText('EMAIL')
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('should handle password input type', () => {
    renderSignUp()

    const passwordInput = screen.getByLabelText('PASSWORD')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should display error message in red container', async () => {
    mockedAxios.post.mockRejectedValue({
      response: { status: 400, data: 'Error message' },
    })

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      const errorDiv = screen.getByText(/Error message/i).closest('div')
      expect(errorDiv).toHaveClass('bg-red-100', 'text-red-700')
    })
  })

  it('should display success message in green container', async () => {
    const mockResponse = {
      data: {
        token: 'test-token',
      },
    }

    mockedAxios.post.mockResolvedValue(mockResponse)

    renderSignUp()

    const submitButton = screen.getByText('SIGN UP')
    fireEvent.click(submitButton)

    await waitFor(() => {
      const successDiv = screen.getByText(/Signup successful/i).closest('div')
      expect(successDiv).toHaveClass('bg-green-100', 'text-green-700')
    })
  })
})

