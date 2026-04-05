import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock the components for pipeline testing
jest.mock('../components/Navbar', () => {
  return function MockNavbar() {
    return (
      <nav data-testid="navbar">
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button onClick={() => window.location.href = '/bag'}>Bag</button>
        <button onClick={() => window.location.href = '/account'}>Account</button>
      </nav>
    );
  };
});

jest.mock('../components/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">© 2024 40GOD</footer>;
  };
});

jest.mock('../Pages/Home', () => {
  return function MockHome() {
    return (
      <div data-testid="home">
        <h1>Welcome to 40GOD</h1>
        <button onClick={() => window.location.href = '/t-shirt'}>Shop Now</button>
      </div>
    );
  };
});

jest.mock('../Pages/Login', () => {
  return function MockLogin() {
    return (
      <div data-testid="login">
        <h2>Login</h2>
        <form>
          <input placeholder="Email" />
          <input placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
});

jest.mock('../Pages/Bag', () => {
  return function MockBag() {
    return (
      <div data-testid="bag">
        <h2>Shopping Bag</h2>
        <div>Item 1 - $99.99</div>
        <div>Item 2 - $49.99</div>
        <div>Total: $149.98</div>
        <button onClick={() => window.location.href = '/checkout'}>Checkout</button>
      </div>
    );
  };
});

jest.mock('../Pages/Checkout', () => {
  return function MockCheckout() {
    return (
      <div data-testid="checkout">
        <h2>Checkout</h2>
        <form>
          <input placeholder="Shipping Address" />
          <input placeholder="Payment Method" />
          <button type="submit">Place Order</button>
        </form>
      </div>
    );
  };
});

jest.mock('../Pages/Account', () => {
  return function MockAccount() {
    return (
      <div data-testid="account">
        <h2>My Account</h2>
        <div>Name: John Doe</div>
        <div>Email: john@example.com</div>
        <button>View Order History</button>
        <button>Update Profile</button>
      </div>
    );
  };
});

jest.mock('../Pages/TshirtPage', () => {
  return function MockTshirtPage() {
    return (
      <div data-testid="tshirt-page">
        <h2>T-Shirts</h2>
        <div className="product-grid">
          <div className="product" onClick={() => window.location.href = '/new/1'}>
            <img src="/tshirt1.jpg" alt="T-Shirt 1" />
            <h3>Classic Tee</h3>
            <p>$29.99</p>
          </div>
          <div className="product" onClick={() => window.location.href = '/new/2'}>
            <img src="/tshirt2.jpg" alt="T-Shirt 2" />
            <h3>Premium Tee</h3>
            <p>$39.99</p>
          </div>
        </div>
      </div>
    );
  };
});

jest.mock('../Pages/TshirtDetails', () => {
  return function MockTshirtDetails() {
    return (
      <div data-testid="tshirt-details">
        <h2>Product Details</h2>
        <img src="/tshirt-detail.jpg" alt="Product" />
        <h3>Classic Tee</h3>
        <p>Description: High quality cotton t-shirt</p>
        <p>Price: $29.99</p>
        <button>Add to Bag</button>
        <button onClick={() => window.history.back()}>Back</button>
      </div>
    );
  };
});

// Mock other pages
jest.mock('../Pages/history', () => {
  return function MockHistory() {
    return <div data-testid="history">Order History Page</div>;
  };
});

jest.mock('../Pages/Terms', () => {
  return function MockTerms() {
    return <div data-testid="terms">Terms and Conditions</div>;
  };
});

jest.mock('../Pages/PrivacyPolicy', () => {
  return function MockPrivacyPolicy() {
    return <div data-testid="privacy">Privacy Policy</div>;
  };
});

jest.mock('../Pages/General', () => {
  return function MockGeneral() {
    return <div data-testid="general">General Information</div>;
  };
});

jest.mock('../Pages/Contact', () => {
  return function MockContact() {
    return <div data-testid="contact">Contact Us</div>;
  };
});

describe('App Component Pipeline Tests', () => {
  const renderAppWithRouter = (initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    );
  };

  test('complete user journey from home to checkout', async () => {
    // Start at home page
    const { container } = renderAppWithRouter(['/']);
    
    // Verify home page
    expect(screen.getByTestId('home')).toBeInTheDocument();
    expect(screen.getByText('Welcome to 40GOD')).toBeInTheDocument();
    
    // Navigate to t-shirt page
    fireEvent.click(screen.getByText('Shop Now'));
    await waitFor(() => {
      expect(screen.getByTestId('tshirt-page')).toBeInTheDocument();
    });
    
    // Verify t-shirt page
    expect(screen.getByText('T-Shirts')).toBeInTheDocument();
    expect(screen.getByText('Classic Tee')).toBeInTheDocument();
    expect(screen.getByText('Premium Tee')).toBeInTheDocument();
    
    // Click on first product
    fireEvent.click(screen.getByText('Classic Tee'));
    await waitFor(() => {
      expect(screen.getByTestId('tshirt-details')).toBeInTheDocument();
    });
    
    // Verify product details
    expect(screen.getByText('Product Details')).toBeInTheDocument();
    expect(screen.getByText('High quality cotton t-shirt')).toBeInTheDocument();
    
    // Add to bag
    fireEvent.click(screen.getByText('Add to Bag'));
    
    // Navigate to bag
    fireEvent.click(screen.getByText('Bag'));
    await waitFor(() => {
      expect(screen.getByTestId('bag')).toBeInTheDocument();
    });
    
    // Verify bag contents
    expect(screen.getByText('Shopping Bag')).toBeInTheDocument();
    expect(screen.getByText('Total: $149.98')).toBeInTheDocument();
    
    // Proceed to checkout
    fireEvent.click(screen.getByText('Checkout'));
    await waitFor(() => {
      expect(screen.getByTestId('checkout')).toBeInTheDocument();
    });
    
    // Verify checkout page
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Shipping Address')).toBeInTheDocument();
  });

  test('user login and account access workflow', async () => {
    // Start at login page
    renderAppWithRouter(['/login']);
    
    // Verify login page
    expect(screen.getByTestId('login')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    
    // Fill login form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    
    // Submit login
    fireEvent.click(screen.getByText('Login'));
    
    // Navigate to account (simulating successful login)
    fireEvent.click(screen.getByText('Account'));
    await waitFor(() => {
      expect(screen.getByTestId('account')).toBeInTheDocument();
    });
    
    // Verify account page
    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
  });

  test('navigation workflow through all main pages', async () => {
    const { container } = renderAppWithRouter(['/']);
    
    // Test navigation to each main page
    const pages = [
      { name: 'Home', selector: 'home', path: '/' },
      { name: 'T-Shirts', selector: 'tshirt-page', path: '/t-shirt' },
      { name: 'Bag', selector: 'bag', path: '/bag' },
      { name: 'Account', selector: 'account', path: '/account' },
      { name: 'Login', selector: 'login', path: '/login' },
      { name: 'Checkout', selector: 'checkout', path: '/checkout' },
      { name: 'History', selector: 'history', path: '/history' },
    ];
    
    for (const page of pages) {
      // Navigate to page
      window.location.href = page.path;
      
      // Re-render with new route
      const { rerender } = render(
        <MemoryRouter initialEntries={[page.path]}>
          <App />
        </MemoryRouter>
      );
      
      // Verify page content
      await waitFor(() => {
        expect(screen.getByTestId(page.selector)).toBeInTheDocument();
      });
    }
  });

  test('product browsing and filtering workflow', async () => {
    // Start at t-shirt page
    renderAppWithRouter(['/t-shirt']);
    
    // Verify product grid
    expect(screen.getByTestId('tshirt-page')).toBeInTheDocument();
    expect(screen.getByText('Classic Tee')).toBeInTheDocument();
    expect(screen.getByText('Premium Tee')).toBeInTheDocument();
    
    // Click on different products
    const products = screen.getAllByText(/Tee/);
    expect(products.length).toBeGreaterThan(0);
    
    // Click first product
    fireEvent.click(products[0]);
    await waitFor(() => {
      expect(screen.getByTestId('tshirt-details')).toBeInTheDocument();
    });
    
    // Verify product details and go back
    fireEvent.click(screen.getByText('Back'));
    
    // Should return to product listing
    await waitFor(() => {
      expect(screen.getByTestId('tshirt-page')).toBeInTheDocument();
    });
  });

  test('responsive layout and component integration', async () => {
    const { container } = renderAppWithRouter(['/']);
    
    // Verify layout structure
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('home')).toBeInTheDocument();
    
    // Verify CSS classes
    const appDiv = container.querySelector('.my-text');
    expect(appDiv).toHaveClass('min-h-screen', 'flex', 'flex-col');
    
    // Verify component hierarchy
    expect(appDiv).toContainElement(screen.getByTestId('navbar'));
    expect(appDiv).toContainElement(screen.getByTestId('footer'));
    
    // Test responsive behavior
    const flexGrowDiv = container.querySelector('.flex-grow');
    expect(flexGrowDiv).toBeInTheDocument();
  });

  test('error handling and edge cases', async () => {
    // Test unknown route
    renderAppWithRouter(['/unknown-route']);
    
    // Should not crash and show default components
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    
    // Test route with parameters
    renderAppWithRouter(['/new/123']);
    expect(screen.getByTestId('tshirt-details')).toBeInTheDocument();
    
    // Test route with different parameter
    renderAppWithRouter(['/new/456']);
    expect(screen.getByTestId('tshirt-details')).toBeInTheDocument();
  });

  test('state management across routes', async () => {
    // Test that components maintain proper state during navigation
    const { container } = renderAppWithRouter(['/']);
    
    // Navigate to different pages and verify state
    const routes = ['/t-shirt', '/bag', '/account', '/login'];
    
    for (const route of routes) {
      render(
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      );
      
      // Verify navbar and footer are always present
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      
      // Verify route-specific content
      await waitFor(() => {
        expect(container.querySelector('.flex-grow')).toBeInTheDocument();
      });
    }
  });

  test('accessibility and user interaction', async () => {
    const { container } = renderAppWithRouter(['/']);
    
    // Test keyboard navigation
    const homeButton = screen.getByText('Shop Now');
    homeButton.focus();
    expect(homeButton).toHaveFocus();
    
    // Test click interactions
    fireEvent.click(homeButton);
    
    // Test form interactions on login page
    renderAppWithRouter(['/login']);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    fireEvent.focus(emailInput);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
    
    fireEvent.focus(passwordInput);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });
});
