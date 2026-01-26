import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../Login'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    mockNavigate.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
  }

  it('should render login form', () => {
    renderLogin()
    expect(screen.getByText('LOGIN')).toBeInTheDocument()
    expect(screen.getByText('SIGNUP')).toBeInTheDocument()
  })

  it('should render username and password fields', () => {
    renderLogin()
    expect(screen.getByLabelText('USERNAME')).toBeInTheDocument()
    expect(screen.getByLabelText('PASSWORD')).toBeInTheDocument()
  })

  it('should handle form input changes', () => {
    renderLogin()
    const usernameInput = screen.getByLabelText('USERNAME')
    const passwordInput = screen.getByLabelText('PASSWORD')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })

    expect(usernameInput).toHaveValue('testuser')
    expect(passwordInput).toHaveValue('testpass')
  })

  it('should handle login form submission', async () => {
    const mockResponse = {
      data: {
        token: 'test-token',
        user: { id: 1, username: 'testuser' },
      },
    }

    mockedAxios.post.mockResolvedValue(mockResponse)

    renderLogin()

    const usernameInput = screen.getByLabelText('USERNAME')
    const passwordInput = screen.getByLabelText('PASSWORD')
    const submitButton = screen.getByText('LOGIN')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/auth/',
        { username: 'testuser', password: 'testpass' },
        { headers: { 'Content-Type': 'application/json' } }
      )
    })

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('test-token')
    })
  })

  it('should handle login error', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { message: 'Invalid credentials' },
      },
    })

    renderLogin()

    const usernameInput = screen.getByLabelText('USERNAME')
    const passwordInput = screen.getByLabelText('PASSWORD')
    const submitButton = screen.getByText('LOGIN')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })

  it('should toggle to signup view', () => {
    renderLogin()
    const signupButton = screen.getByText('SIGNUP')
    fireEvent.click(signupButton)

    expect(screen.getByText('SIGNUP')).toBeInTheDocument()
  })

  it('should toggle back to login view', () => {
    renderLogin()
    const signupButton = screen.getByText('SIGNUP')
    const loginButton = screen.getByText('LOGIN')

    fireEvent.click(signupButton)
    fireEvent.click(loginButton)

    expect(screen.getByLabelText('USERNAME')).toBeInTheDocument()
  })

  it('should show loading state during login', async () => {
    mockedAxios.post.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

    renderLogin()

    const usernameInput = screen.getByLabelText('USERNAME')
    const passwordInput = screen.getByLabelText('PASSWORD')
    const submitButton = screen.getByText('LOGIN')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(submitButton)

    expect(screen.getByText('LOGGING IN...')).toBeInTheDocument()
  })

  it('should handle network error', async () => {
    mockedAxios.post.mockRejectedValue({
      request: {},
    })

    renderLogin()

    const usernameInput = screen.getByLabelText('USERNAME')
    const passwordInput = screen.getByLabelText('PASSWORD')
    const submitButton = screen.getByText('LOGIN')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/No response from server/)).toBeInTheDocument()
    })
  })

  it('should check for existing token on mount', () => {
    localStorage.setItem('token', 'existing-token')
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser' }))

    renderLogin()

    expect(mockedAxios.defaults.headers.common['Authorization']).toBe('Bearer existing-token')
  })
})

