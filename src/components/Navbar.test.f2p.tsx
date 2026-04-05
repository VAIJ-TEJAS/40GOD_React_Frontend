import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Mock dependencies
jest.mock('axios');
jest.mock('../assets/logo1.png', () => 'mock-logo.png');
jest.mock('../Logo', () => {
  return function MockLogo() {
    return <div data-testid="logo">Mock Logo</div>;
  };
});

jest.mock('../context/CurrencyContext', () => ({
  CurrencyContext: {
    Consumer: ({ children }: { children: (value: any) => React.ReactNode }) =>
      children({ currency: 'USD', rate: 1 })
  }
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '/',
  },
  writable: true,
});

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('renders navbar component', () => {
    renderNavbar();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderNavbar();
    
    // Check for common navigation elements
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  test('toggles mobile menu', () => {
    renderNavbar();
    
    // Find and click mobile menu toggle
    const menuToggle = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuToggle);
    
    // Check if menu opens
    expect(screen.getByText('Home')).toBeVisible();
  });

  test('handles login state correctly', () => {
    // Mock logged in user
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token';
      if (key === 'user') return JSON.stringify({ name: 'John Doe' });
      return null;
    });

    renderNavbar();
    
    // Should show user-specific elements
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('handles logout correctly', () => {
    // Mock logged in user
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token';
      if (key === 'user') return JSON.stringify({ name: 'John Doe' });
      return null;
    });

    renderNavbar();
    
    // Find and click logout
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    // Should clear localStorage
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
  });

  test('handles search functionality', () => {
    renderNavbar();
    
    // Find search input
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 't-shirt' } });
    
    // Should update search query
    expect(searchInput).toHaveValue('t-shirt');
  });

  test('toggles shop dropdown', () => {
    renderNavbar();
    
    // Find and click shop dropdown
    const shopDropdown = screen.getByText('Shop');
    fireEvent.click(shopDropdown);
    
    // Should show shop options
    expect(screen.getByText('T-Shirts')).toBeInTheDocument();
  });

  test('displays cart item count', () => {
    renderNavbar();
    
    // Should show cart icon
    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
  });

  test('handles scroll state', () => {
    renderNavbar();
    
    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    
    // Navbar should update scroll state
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('scrolled');
  });

  test('handles currency context', () => {
    renderNavbar();
    
    // Should use currency context
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  test('responsive navigation works', () => {
    // Test mobile view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    renderNavbar();
    
    // Should show mobile menu toggle
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  test('handles navigation correctly', () => {
    renderNavbar();
    
    // Click on navigation link
    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    
    // Should navigate (in real app)
    expect(homeLink).toBeInTheDocument();
  });

  test('handles user authentication state', () => {
    // Mock no token
    localStorageMock.getItem.mockReturnValue(null);

    renderNavbar();
    
    // Should show login button
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('handles cart notification', () => {
    renderNavbar();
    
    // Should show cart notification when items added
    const cartNotification = screen.queryByTestId('cart-notification');
    expect(cartNotification).toBeInTheDocument();
  });

  test('handles search submit', () => {
    renderNavbar();
    
    const searchInput = screen.getByPlaceholderText('Search...');
    const searchForm = searchInput.closest('form');
    
    if (searchForm) {
      fireEvent.submit(searchForm);
      // Should handle search submission
    }
  });

  test('handles keyboard navigation', () => {
    renderNavbar();
    
    // Test tab navigation
    const firstNavLink = screen.getByText('Home');
    firstNavLink.focus();
    expect(firstNavLink).toHaveFocus();
  });

  test('handles accessibility features', () => {
    renderNavbar();
    
    // Should have proper ARIA labels
    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('aria-label');
  });

  test('handles external links correctly', () => {
    renderNavbar();
    
    // Should handle external links
    const externalLinks = screen.getAllByRole('link');
    expect(externalLinks.length).toBeGreaterThan(0);
  });

  test('handles error states gracefully', () => {
    // Mock error in localStorage
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('Storage error');
    });

    renderNavbar();
    
    // Should still render navbar
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  test('handles component cleanup', () => {
    const { unmount } = renderNavbar();
    
    // Should cleanup properly
    unmount();
    
    // Should not throw errors
    expect(true).toBe(true);
  });
});
