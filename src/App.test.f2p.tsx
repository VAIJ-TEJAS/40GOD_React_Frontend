import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock the components to isolate App testing
jest.mock('../components/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Mock Navbar</div>;
  };
});

jest.mock('../components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Mock Footer</div>;
  };
});

jest.mock('../Pages/Home', () => {
  return function MockHome() {
    return <div data-testid="home">Mock Home</div>;
  };
});

jest.mock('../Pages/Login', () => {
  return function MockLogin() {
    return <div data-testid="login">Mock Login</div>;
  };
});

jest.mock('../Pages/Account', () => {
  return function MockAccount() {
    return <div data-testid="account">Mock Account</div>;
  };
});

jest.mock('../Pages/TshirtPage', () => {
  return function MockTshirtPage() {
    return <div data-testid="tshirt-page">Mock TshirtPage</div>;
  };
});

jest.mock('../Pages/TshirtDetails', () => {
  return function MockTshirtDetails() {
    return <div data-testid="tshirt-details">Mock TshirtDetails</div>;
  };
});

jest.mock('../Pages/Bag', () => {
  return function MockBag() {
    return <div data-testid="bag">Mock Bag</div>;
  };
});

jest.mock('../Pages/Checkout', () => {
  return function MockCheckout() {
    return <div data-testid="checkout">Mock Checkout</div>;
  };
});

jest.mock('../Pages/history', () => {
  return function MockHistory() {
    return <div data-testid="history">Mock History</div>;
  };
});

jest.mock('../Pages/Terms', () => {
  return function MockTerms() {
    return <div data-testid="terms">Mock Terms</div>;
  };
});

jest.mock('../Pages/PrivacyPolicy', () => {
  return function MockPrivacyPolicy() {
    return <div data-testid="privacy">Mock PrivacyPolicy</div>;
  };
});

jest.mock('../Pages/General', () => {
  return function MockGeneral() {
    return <div data-testid="general">Mock General</div>;
  };
});

jest.mock('../Pages/Contact', () => {
  return function MockContact() {
    return <div data-testid="contact">Mock Contact</div>;
  };
});

describe('App Component', () => {
  const renderAppWithRouter = (initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    );
  };

  test('renders navbar component', () => {
    renderAppWithRouter();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders footer component', () => {
    renderAppWithRouter();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders home page on root route', () => {
    renderAppWithRouter(['/']);
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  test('renders login page on login route', () => {
    renderAppWithRouter(['/login']);
    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  test('renders account page on account route', () => {
    renderAppWithRouter(['/account']);
    expect(screen.getByTestId('account')).toBeInTheDocument();
  });

  test('renders tshirt page on t-shirt route', () => {
    renderAppWithRouter(['/t-shirt']);
    expect(screen.getByTestId('tshirt-page')).toBeInTheDocument();
  });

  test('renders tshirt details page on new route with id', () => {
    renderAppWithRouter(['/new/123']);
    expect(screen.getByTestId('tshirt-details')).toBeInTheDocument();
  });

  test('renders bag page on bag route', () => {
    renderAppWithRouter(['/bag']);
    expect(screen.getByTestId('bag')).toBeInTheDocument();
  });

  test('renders checkout page on checkout route', () => {
    renderAppWithRouter(['/checkout']);
    expect(screen.getByTestId('checkout')).toBeInTheDocument();
  });

  test('renders history page on history route', () => {
    renderAppWithRouter(['/history']);
    expect(screen.getByTestId('history')).toBeInTheDocument();
  });

  test('renders terms page on terms route', () => {
    renderAppWithRouter(['/terms']);
    expect(screen.getByTestId('terms')).toBeInTheDocument();
  });

  test('renders privacy policy page on privacy route', () => {
    renderAppWithRouter(['/privacy']);
    expect(screen.getByTestId('privacy')).toBeInTheDocument();
  });

  test('renders general page on general route', () => {
    renderAppWithRouter(['/general']);
    expect(screen.getByTestId('general')).toBeInTheDocument();
  });

  test('renders contact page on contact route', () => {
    renderAppWithRouter(['/contact']);
    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = renderAppWithRouter();
    const appDiv = container.querySelector('.my-text');
    expect(appDiv).toBeInTheDocument();
    expect(appDiv).toHaveClass('min-h-screen', 'flex', 'flex-col');
  });

  test('has proper structure with router', () => {
    const { container } = renderAppWithRouter();
    
    // Check that main structure exists
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    
    // Check that the flex-grow div exists for main content
    const flexGrowDiv = container.querySelector('.flex-grow');
    expect(flexGrowDiv).toBeInTheDocument();
  });

  test('handles unknown routes gracefully', () => {
    renderAppWithRouter(['/unknown-route']);
    // Should not crash, but might show home page or 404
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('maintains component hierarchy', () => {
    const { container } = renderAppWithRouter();
    
    // Check that components are in correct order
    const appDiv = container.querySelector('.my-text');
    const navbar = screen.getByTestId('navbar');
    const footer = screen.getByTestId('footer');
    
    expect(appDiv).toContainElement(navbar);
    expect(appDiv).toContainElement(footer);
  });
});
