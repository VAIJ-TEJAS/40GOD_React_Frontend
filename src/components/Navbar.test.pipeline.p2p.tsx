import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
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

describe('Navbar Component Pipeline Tests', () => {
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

  test('complete user authentication workflow', async () => {
    const user = userEvent.setup();
    
    // Initial state - not logged in
    localStorageMock.getItem.mockReturnValue(null);
    renderNavbar();
    
    // Should show login button
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    
    // Simulate successful login
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token';
      if (key === 'user') return JSON.stringify({ name: 'John Doe', email: 'john@example.com' });
      return null;
    });
    
    // Re-render to simulate login state change
    const { rerender } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // Should show user info and logout
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    
    // Test logout workflow
    await user.click(screen.getByText('Logout'));
    
    // Should clear localStorage and redirect
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    expect(window.location.href).toBe('/');
  });

  test('complete shopping cart workflow', async () => {
    const user = userEvent.setup();
    
    // Mock logged in user
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token';
      if (key === 'user') return JSON.stringify({ name: 'John Doe' });
      return null;
    });
    
    renderNavbar();
    
    // Initial cart state
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    
    // Simulate adding items to cart
    const cartUpdateEvent = new CustomEvent('cartUpdate', { detail: { count: 3 } });
    window.dispatchEvent(cartUpdateEvent);
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
    });
    
    // Click on cart to view bag
    await user.click(screen.getByTestId('cart-icon'));
    
    // Should navigate to bag page (in real app)
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
  });

  test('complete search workflow', async () => {
    const user = userEvent.setup();
    
    renderNavbar();
    
    // Open search
    const searchButton = screen.getByTestId('search-toggle');
    await user.click(searchButton);
    
    // Search input should be visible
    const searchInput = screen.getByPlaceholderText('Search products...');
    expect(searchInput).toBeInTheDocument();
    
    // Type search query
    await user.type(searchInput, 't-shirt');
    expect(searchInput).toHaveValue('t-shirt');
    
    // Submit search
    const searchForm = searchInput.closest('form');
    if (searchForm) {
      await user.click(screen.getByTestId('search-submit'));
      
      // Should trigger search (in real app)
      expect(searchInput).toHaveValue('t-shirt');
    }
    
    // Clear search
    await user.click(screen.getByTestId('search-clear'));
    expect(searchInput).toHaveValue('');
  });

  test('complete navigation workflow', async () => {
    const user = userEvent.setup();
    
    renderNavbar();
    
    // Test main navigation
    const homeLink = screen.getByText('Home');
    await user.click(homeLink);
    
    // Test shop dropdown
    const shopDropdown = screen.getByText('Shop');
    await user.click(shopDropdown);
    
    // Should show shop categories
    expect(screen.getByText('T-Shirts')).toBeInTheDocument();
    expect(screen.getByText('Hoodies')).toBeInTheDocument();
    expect(screen.getByText('Accessories')).toBeInTheDocument();
    
    // Navigate to specific category
    await user.click(screen.getByText('T-Shirts'));
    
    // Should close dropdown and navigate
    expect(screen.queryByText('Hoodies')).not.toBeInTheDocument();
    
    // Test account navigation for logged in user
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token';
      if (key === 'user') return JSON.stringify({ name: 'John Doe' });
      return null;
    });
    
    const { rerender } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    const accountLink = screen.getByText('Account');
    await user.click(accountLink);
    
    // Should navigate to account page (in real app)
    expect(accountLink).toBeInTheDocument();
  });

  test('complete mobile navigation workflow', async () => {
    const user = userEvent.setup();
    
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    renderNavbar();
    
    // Should show mobile menu toggle
    const menuToggle = screen.getByTestId('mobile-menu-toggle');
    expect(menuToggle).toBeInTheDocument();
    
    // Open mobile menu
    await user.click(menuToggle);
    
    // Should show mobile navigation
    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('Shop')).toBeVisible();
    expect(screen.getByText('Account')).toBeVisible();
    
    // Navigate through mobile menu
    await user.click(screen.getByText('Shop'));
    
    // Should show shop categories in mobile
    expect(screen.getByText('T-Shirts')).toBeVisible();
    
    // Close mobile menu
    await user.click(menuToggle);
    
    // Should hide mobile navigation
    expect(screen.queryByText('T-Shirts')).not.toBeVisible();
  });

  test('complete currency switching workflow', async () => {
    const user = userEvent.setup();
    
    renderNavbar();
    
    // Should show current currency
    expect(screen.getByText('USD')).toBeInTheDocument();
    
    // Open currency dropdown
    const currencyDropdown = screen.getByTestId('currency-dropdown');
    await user.click(currencyDropdown);
    
    // Should show currency options
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('GBP')).toBeInTheDocument();
    
    // Switch to EUR
    await user.click(screen.getByText('EUR'));
    
    // Should update currency display
    await waitFor(() => {
      expect(screen.getByText('EUR')).toBeInTheDocument();
    });
  });

  test('complete responsive behavior workflow', async () => {
    const user = userEvent.setup();
    
    // Test desktop view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
    
    renderNavbar();
    
    // Should show desktop navigation
    expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-menu-toggle')).not.toBeInTheDocument();
    
    // Switch to mobile view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    // Trigger resize
    window.dispatchEvent(new Event('resize'));
    
    await waitFor(() => {
      expect(screen.getByTestId('mobile-menu-toggle')).toBeInTheDocument();
      expect(screen.queryByTestId('desktop-nav')).not.toBeInTheDocument();
    });
  });

  test('complete scroll behavior workflow', async () => {
    renderNavbar();
    
    // Initial state - not scrolled
    const navbar = screen.getByRole('navigation');
    expect(navbar).not.toHaveClass('scrolled');
    
    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    
    await waitFor(() => {
      expect(navbar).toHaveClass('scrolled');
    });
    
    // Scroll back to top
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    
    await waitFor(() => {
      expect(navbar).not.toHaveClass('scrolled');
    });
  });

  test('complete error handling workflow', async () => {
    const user = userEvent.setup();
    
    // Mock localStorage error
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    
    renderNavbar();
    
    // Should still render navbar
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    
    // Should handle navigation gracefully
    const homeLink = screen.getByText('Home');
    await user.click(homeLink);
    
    // Should not crash
    expect(homeLink).toBeInTheDocument();
  });

  test('complete accessibility workflow', async () => {
    const user = userEvent.setup();
    
    renderNavbar();
    
    // Test keyboard navigation
    await user.tab();
    expect(screen.getByText('Home')).toHaveFocus();
    
    await user.tab();
    expect(screen.getByText('Shop')).toHaveFocus();
    
    // Test Enter key activation
    await user.keyboard('{Enter}');
    
    // Should activate focused element
    expect(screen.getByText('Shop')).toBeInTheDocument();
    
    // Test Escape key to close dropdowns
    const shopDropdown = screen.getByText('Shop');
    await user.click(shopDropdown);
    
    expect(screen.getByText('T-Shirts')).toBeVisible();
    
    await user.keyboard('{Escape}');
    
    await waitFor(() => {
      expect(screen.queryByText('T-Shirts')).not.toBeVisible();
    });
    
    // Test ARIA labels
    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('aria-label', 'Main navigation');
    
    // Test button accessibility
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });

  test('complete performance workflow', async () => {
    const startTime = performance.now();
    
    renderNavbar();
    
    const renderTime = performance.now() - startTime;
    
    // Should render quickly
    expect(renderTime).toBeLessThan(100);
    
    // Test interaction performance
    const interactionStart = performance.now();
    
    const user = userEvent.setup();
    await user.click(screen.getByText('Shop'));
    
    const interactionTime = performance.now() - interactionStart;
    
    // Should respond quickly to interactions
    expect(interactionTime).toBeLessThan(50);
  });

  test('complete integration workflow', async () => {
    const user = userEvent.setup();
    
    // Mock complete user session
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token';
      if (key === 'user') return JSON.stringify({ name: 'John Doe', email: 'john@example.com' });
      return null;
    });
    
    renderNavbar();
    
    // Test full user journey
    // 1. User searches for products
    const searchButton = screen.getByTestId('search-toggle');
    await user.click(searchButton);
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    await user.type(searchInput, 't-shirt');
    
    // 2. User navigates to shop
    await user.click(screen.getByText('Shop'));
    await user.click(screen.getByText('T-Shirts'));
    
    // 3. User checks cart
    await user.click(screen.getByTestId('cart-icon'));
    
    // 4. User accesses account
    await user.click(screen.getByText('Account'));
    
    // 5. User logs out
    await user.click(screen.getByText('Logout'));
    
    // Should complete full workflow without errors
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
  });
});
