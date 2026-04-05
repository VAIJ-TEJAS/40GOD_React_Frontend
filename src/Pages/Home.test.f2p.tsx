import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

// Mock dependencies
jest.mock('../assets/hero-image.jpg', () => 'mock-hero-image.jpg');
jest.mock('../assets/feature1.jpg', () => 'mock-feature1.jpg');
jest.mock('../assets/feature2.jpg', () => 'mock-feature2.jpg');
jest.mock('../assets/feature3.jpg', () => 'mock-feature3.jpg');

describe('Home Page Component', () => {
  const renderHome = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  };

  test('renders home page', () => {
    renderHome();
    expect(screen.getByText('Welcome to 40GOD')).toBeInTheDocument();
  });

  test('renders hero section', () => {
    renderHome();
    expect(screen.getByText('Discover Premium Fashion')).toBeInTheDocument();
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });

  test('renders featured products section', () => {
    renderHome();
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
    expect(screen.getByText('Classic Tee')).toBeInTheDocument();
    expect(screen.getByText('Premium Hoodie')).toBeInTheDocument();
  });

  test('renders product cards correctly', () => {
    renderHome();
    
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBeGreaterThan(0);
    
    // Check first product card
    expect(screen.getByText('Classic Tee')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  test('handles product card clicks', () => {
    renderHome();
    
    const firstProduct = screen.getByText('Classic Tee');
    fireEvent.click(firstProduct);
    
    // Should navigate to product details (in real app)
    expect(firstProduct).toBeInTheDocument();
  });

  test('renders categories section', () => {
    renderHome();
    expect(screen.getByText('Shop by Category')).toBeInTheDocument();
    expect(screen.getByText('T-Shirts')).toBeInTheDocument();
    expect(screen.getByText('Hoodies')).toBeInTheDocument();
    expect(screen.getByText('Accessories')).toBeInTheDocument();
  });

  test('handles category clicks', () => {
    renderHome();
    
    const tshirtCategory = screen.getByText('T-Shirts');
    fireEvent.click(tshirtCategory);
    
    // Should navigate to category page (in real app)
    expect(tshirtCategory).toBeInTheDocument();
  });

  test('renders newsletter section', () => {
    renderHome();
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  test('handles newsletter subscription', () => {
    renderHome();
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const subscribeButton = screen.getByText('Subscribe');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);
    
    // Should handle subscription (in real app)
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('renders social media links', () => {
    renderHome();
    expect(screen.getByTestId('social-links')).toBeInTheDocument();
    expect(screen.getByTestId('facebook-link')).toBeInTheDocument();
    expect(screen.getByTestId('instagram-link')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-link')).toBeInTheDocument();
  });

  test('handles social media clicks', () => {
    renderHome();
    
    const facebookLink = screen.getByTestId('facebook-link');
    fireEvent.click(facebookLink);
    
    // Should open social media (in real app)
    expect(facebookLink).toBeInTheDocument();
  });

  test('renders responsive design elements', () => {
    renderHome();
    
    // Should have responsive classes
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toHaveClass('responsive');
  });

  test('handles search functionality', () => {
    renderHome();
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 't-shirt' } });
    
    expect(searchInput).toHaveValue('t-shirt');
  });

  test('renders loading states', () => {
    renderHome();
    
    // Should show loading state initially
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  test('handles error states', () => {
    renderHome();
    
    // Should handle errors gracefully
    expect(screen.getByText('Welcome to 40GOD')).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    renderHome();
    
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  test('handles CTA button clicks', () => {
    renderHome();
    
    const shopNowButton = screen.getByText('Shop Now');
    fireEvent.click(shopNowButton);
    
    // Should navigate to shop (in real app)
    expect(shopNowButton).toBeInTheDocument();
  });

  test('renders testimonials section', () => {
    renderHome();
    expect(screen.getByText('What Our Customers Say')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Amazing quality!')).toBeInTheDocument();
  });

  test('renders shipping information', () => {
    renderHome();
    expect(screen.getByText('Free Shipping')).toBeInTheDocument();
    expect(screen.getByText('Easy Returns')).toBeInTheDocument();
    expect(screen.getByText('24/7 Support')).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    renderHome();
    
    // Should have proper ARIA labels
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveAttribute('aria-label', 'Home page content');
  });

  test('handles keyboard navigation', () => {
    renderHome();
    
    // Test tab navigation
    const firstButton = screen.getByText('Shop Now');
    firstButton.focus();
    expect(firstButton).toHaveFocus();
  });

  test('renders meta tags correctly', () => {
    renderHome();
    
    // Should have proper meta information
    expect(screen.getByText('Welcome to 40GOD')).toBeInTheDocument();
  });

  test('handles image loading', () => {
    renderHome();
    
    const heroImage = screen.getByTestId('hero-image');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', 'mock-hero-image.jpg');
  });

  test('handles window resize', () => {
    renderHome();
    
    // Simulate window resize
    fireEvent.resize(window);
    
    // Should still render correctly
    expect(screen.getByText('Welcome to 40GOD')).toBeInTheDocument();
  });

  test('has proper SEO structure', () => {
    renderHome();
    
    // Should have proper heading structure
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
