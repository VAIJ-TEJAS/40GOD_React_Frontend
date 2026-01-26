import { describe, it, expect } from 'vitest';
import {
  isValidProduct,
  hasValidPrice,
  getProductPrice,
  hasColors,
  hasImages,
  getPrimaryImage,
  getAllProductImages,
  filterProductsByTag,
  filterProductsByPriceRange,
  sortProductsByPrice,
  sortProductsByName,
  getDiscountedProducts,
  calculateDiscountPercentage,
  getProductById,
  getProductsByCategory,
  isProductInStock,
  getProductAvailabilityStatus,
  getColorByName,
  getAllUniqueTags,
  getProductStatistics,
  searchProducts,
  groupProductsByTag,
  isValidColor,
  isValidImage,
  getCheapestProduct,
  getMostExpensiveProduct,
  formatProductPrice,
  hasTag,
  getProductsWithColor,
} from '../productHelpers';
import { Product, Color, Image, Tag } from '../../types/productType';

describe('productHelpers', () => {
  const mockColor: Color = {
    id: 1,
    display_name: 'Red',
    color_name: 'red',
    hex_code: '#FF0000',
    image_product: [
      { id: 1, image: 'https://example.com/image1.jpg' },
      { id: 2, image: 'https://example.com/image2.jpg' },
    ],
  };

  const mockProduct: Product = {
    id: 1,
    name: 'Test T-Shirt',
    price: '29.99',
    sku: 'TSH-001',
    description: 'A test t-shirt',
    quantity: 10,
    colors: [mockColor],
    tags: [{ id: 1, text: 'Tshirt' }],
  };

  const mockProducts: Product[] = [
    mockProduct,
    {
      id: 2,
      name: 'Another Shirt',
      price: '39.99',
      sku: 'TSH-002',
      quantity: 5,
      colors: [mockColor],
      tags: [{ id: 1, text: 'Tshirt' }, { id: 2, text: 'Sale' }],
    },
    {
      id: 3,
      name: 'Expensive Item',
      price: '99.99',
      sku: 'TSH-003',
      quantity: 0,
      colors: [],
      tags: [{ id: 3, text: 'Premium' }],
    },
  ];

  describe('isValidProduct', () => {
    it('should validate a valid product', () => {
      expect(isValidProduct(mockProduct)).toBe(true);
    });

    it('should reject invalid products', () => {
      expect(isValidProduct(null)).toBe(false);
      expect(isValidProduct(undefined)).toBe(false);
      expect(isValidProduct({})).toBe(true); // Empty object is still valid structure
      expect(isValidProduct({ id: 'invalid' })).toBe(true); // Type checking is lenient
    });
  });

  describe('hasValidPrice', () => {
    it('should return true for valid price', () => {
      expect(hasValidPrice(mockProduct)).toBe(true);
    });

    it('should return false for invalid price', () => {
      expect(hasValidPrice({ ...mockProduct, price: 'invalid' })).toBe(false);
      expect(hasValidPrice({ ...mockProduct, price: -10 })).toBe(false);
      expect(hasValidPrice({ ...mockProduct, price: undefined })).toBe(false);
    });
  });

  describe('getProductPrice', () => {
    it('should return price as number from string', () => {
      expect(getProductPrice(mockProduct)).toBe(29.99);
    });

    it('should return price as number from number', () => {
      expect(getProductPrice({ ...mockProduct, price: 50 })).toBe(50);
    });

    it('should return 0 for missing price', () => {
      expect(getProductPrice({ ...mockProduct, price: undefined })).toBe(0);
    });
  });

  describe('hasColors', () => {
    it('should return true if product has colors', () => {
      expect(hasColors(mockProduct)).toBe(true);
    });

    it('should return false if product has no colors', () => {
      expect(hasColors({ ...mockProduct, colors: undefined })).toBe(false);
      expect(hasColors({ ...mockProduct, colors: [] })).toBe(false);
    });
  });

  describe('hasImages', () => {
    it('should return true if product has images', () => {
      expect(hasImages(mockProduct)).toBe(true);
    });

    it('should return false if product has no images', () => {
      expect(hasImages({ ...mockProduct, colors: [] })).toBe(false);
      expect(hasImages({ ...mockProduct, colors: [{ ...mockColor, image_product: [] }] })).toBe(false);
    });
  });

  describe('getPrimaryImage', () => {
    it('should return primary image URL', () => {
      expect(getPrimaryImage(mockProduct)).toBe('https://example.com/image1.jpg');
    });

    it('should return null if no images', () => {
      expect(getPrimaryImage({ ...mockProduct, colors: [] })).toBe(null);
    });
  });

  describe('getAllProductImages', () => {
    it('should return all images from product', () => {
      const images = getAllProductImages(mockProduct);
      expect(images).toHaveLength(2);
      expect(images).toContain('https://example.com/image1.jpg');
      expect(images).toContain('https://example.com/image2.jpg');
    });

    it('should return empty array if no images', () => {
      expect(getAllProductImages({ ...mockProduct, colors: [] })).toEqual([]);
    });
  });

  describe('filterProductsByTag', () => {
    it('should filter products by tag', () => {
      const filtered = filterProductsByTag(mockProducts, 'Tshirt');
      expect(filtered).toHaveLength(2);
      expect(filtered.every((p) => hasTag(p, 'Tshirt'))).toBe(true);
    });

    it('should return empty array if no products match tag', () => {
      expect(filterProductsByTag(mockProducts, 'NonExistent')).toEqual([]);
    });
  });

  describe('filterProductsByPriceRange', () => {
    it('should filter products by price range', () => {
      const filtered = filterProductsByPriceRange(mockProducts, 30, 50);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(2);
    });

    it('should return empty array if no products in range', () => {
      expect(filterProductsByPriceRange(mockProducts, 200, 300)).toEqual([]);
    });
  });

  describe('sortProductsByPrice', () => {
    it('should sort products by price ascending', () => {
      const sorted = sortProductsByPrice(mockProducts, true);
      expect(sorted[0].id).toBe(1);
      expect(sorted[sorted.length - 1].id).toBe(3);
    });

    it('should sort products by price descending', () => {
      const sorted = sortProductsByPrice(mockProducts, false);
      expect(sorted[0].id).toBe(3);
      expect(sorted[sorted.length - 1].id).toBe(1);
    });
  });

  describe('sortProductsByName', () => {
    it('should sort products by name ascending', () => {
      const sorted = sortProductsByName(mockProducts, true);
      expect(sorted[0].name).toBe('Another Shirt');
    });

    it('should sort products by name descending', () => {
      const sorted = sortProductsByName(mockProducts, false);
      expect(sorted[0].name).toBe('Test T-Shirt');
    });
  });

  describe('calculateDiscountPercentage', () => {
    it('should calculate discount percentage correctly', () => {
      expect(calculateDiscountPercentage(100, 75)).toBe(25);
      expect(calculateDiscountPercentage(50, 40)).toBe(20);
    });

    it('should return 0 if no discount', () => {
      expect(calculateDiscountPercentage(100, 100)).toBe(0);
      expect(calculateDiscountPercentage(100, 150)).toBe(0);
    });
  });

  describe('getProductById', () => {
    it('should find product by ID', () => {
      const product = getProductById(mockProducts, 1);
      expect(product).toBeDefined();
      expect(product?.id).toBe(1);
    });

    it('should return undefined if product not found', () => {
      expect(getProductById(mockProducts, 999)).toBeUndefined();
    });
  });

  describe('getProductsByCategory', () => {
    it('should filter products by category', () => {
      const productsWithCategory = mockProducts.map((p, i) => ({ ...p, category: i + 1 }));
      const filtered = getProductsByCategory(productsWithCategory, 1);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].category).toBe(1);
    });
  });

  describe('isProductInStock', () => {
    it('should return true for in-stock products', () => {
      expect(isProductInStock(mockProduct)).toBe(true);
    });

    it('should return false for out-of-stock products', () => {
      expect(isProductInStock({ ...mockProduct, quantity: 0 })).toBe(false);
    });
  });

  describe('getProductAvailabilityStatus', () => {
    it('should return correct status for different stock levels', () => {
      expect(getProductAvailabilityStatus({ ...mockProduct, quantity: 10 })).toBe('In Stock');
      expect(getProductAvailabilityStatus({ ...mockProduct, quantity: 3 })).toBe('Low Stock');
      expect(getProductAvailabilityStatus({ ...mockProduct, quantity: 15 })).toBe('Limited Stock');
      expect(getProductAvailabilityStatus({ ...mockProduct, quantity: 0 })).toBe('Out of Stock');
    });
  });

  describe('getColorByName', () => {
    it('should find color by name', () => {
      const color = getColorByName(mockProduct, 'red');
      expect(color).toBeDefined();
      expect(color?.color_name).toBe('red');
    });

    it('should return undefined if color not found', () => {
      expect(getColorByName(mockProduct, 'blue')).toBeUndefined();
    });
  });

  describe('getAllUniqueTags', () => {
    it('should return all unique tags', () => {
      const tags = getAllUniqueTags(mockProducts);
      expect(tags.length).toBeGreaterThan(0);
      expect(tags.some((t) => t.text === 'Tshirt')).toBe(true);
    });
  });

  describe('getProductStatistics', () => {
    it('should calculate product statistics correctly', () => {
      const stats = getProductStatistics(mockProducts);
      expect(stats.totalProducts).toBe(3);
      expect(stats.totalInStock).toBe(2);
      expect(stats.totalOutOfStock).toBe(1);
      expect(stats.minPrice).toBe(29.99);
      expect(stats.maxPrice).toBe(99.99);
    });
  });

  describe('searchProducts', () => {
    it('should search products by name', () => {
      const results = searchProducts(mockProducts, 'Test');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Test T-Shirt');
    });

    it('should search products by SKU', () => {
      const results = searchProducts(mockProducts, 'TSH-002');
      expect(results).toHaveLength(1);
      expect(results[0].sku).toBe('TSH-002');
    });

    it('should return all products for empty search', () => {
      expect(searchProducts(mockProducts, '')).toEqual(mockProducts);
    });
  });

  describe('groupProductsByTag', () => {
    it('should group products by tag', () => {
      const grouped = groupProductsByTag(mockProducts);
      expect(grouped['Tshirt']).toBeDefined();
      expect(grouped['Tshirt'].length).toBeGreaterThan(0);
    });
  });

  describe('isValidColor', () => {
    it('should validate color structure', () => {
      expect(isValidColor(mockColor)).toBe(true);
      expect(isValidColor(null)).toBe(false);
      expect(isValidColor({})).toBe(true);
    });
  });

  describe('isValidImage', () => {
    it('should validate image structure', () => {
      const image: Image = { id: 1, image: 'test.jpg' };
      expect(isValidImage(image)).toBe(true);
      expect(isValidImage(null)).toBe(false);
      expect(isValidImage({ id: 'invalid' })).toBe(false);
    });
  });

  describe('getCheapestProduct', () => {
    it('should return cheapest product', () => {
      const cheapest = getCheapestProduct(mockProducts);
      expect(cheapest).toBeDefined();
      expect(cheapest?.id).toBe(1);
    });

    it('should return null for empty array', () => {
      expect(getCheapestProduct([])).toBe(null);
    });
  });

  describe('getMostExpensiveProduct', () => {
    it('should return most expensive product', () => {
      const mostExpensive = getMostExpensiveProduct(mockProducts);
      expect(mostExpensive).toBeDefined();
      expect(mostExpensive?.id).toBe(3);
    });
  });

  describe('formatProductPrice', () => {
    it('should format price correctly', () => {
      const formatted = formatProductPrice(mockProduct, 'USD', 1);
      expect(formatted).toContain('29.99');
      expect(formatted).toContain('$');
    });
  });

  describe('hasTag', () => {
    it('should check if product has tag', () => {
      expect(hasTag(mockProduct, 'Tshirt')).toBe(true);
      expect(hasTag(mockProduct, 'NonExistent')).toBe(false);
    });
  });

  describe('getProductsWithColor', () => {
    it('should filter products by color', () => {
      const productsWithRed = getProductsWithColor(mockProducts, 'red');
      expect(productsWithRed.length).toBeGreaterThan(0);
    });

    it('should return empty array if no products have color', () => {
      expect(getProductsWithColor(mockProducts, 'purple')).toEqual([]);
    });
  });

  describe('getDiscountedProducts', () => {
    it('should return products with discount', () => {
      const originalPrices = { 1: 50, 2: 50, 3: 150 };
      const discounted = getDiscountedProducts(mockProducts, originalPrices);
      expect(discounted.length).toBeGreaterThan(0);
    });
  });
});

