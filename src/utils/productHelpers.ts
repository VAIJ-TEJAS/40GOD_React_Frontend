/**
 * Product Helper Utilities
 * Provides utility functions for product operations, validation, filtering, and calculations
 */

import { Product, Color, Image, Tag } from '../types/productType';

/**
 * Validate product structure
 */
export const isValidProduct = (product: any): product is Product => {
  return (
    product &&
    typeof product === 'object' &&
    (product.id === undefined || typeof product.id === 'number') &&
    (product.name === undefined || typeof product.name === 'string') &&
    (product.price === undefined || typeof product.price === 'string' || typeof product.price === 'number') &&
    (product.sku === undefined || typeof product.sku === 'string')
  );
};

/**
 * Check if product has valid price
 */
export const hasValidPrice = (product: Product): boolean => {
  if (!product.price) return false;
  const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
  return !isNaN(price) && price >= 0;
};

/**
 * Get product price as number
 */
export const getProductPrice = (product: Product): number => {
  if (!product.price) return 0;
  return typeof product.price === 'string' ? parseFloat(product.price) : product.price;
};

/**
 * Check if product has colors
 */
export const hasColors = (product: Product): boolean => {
  return Array.isArray(product.colors) && product.colors.length > 0;
};

/**
 * Check if product has images
 */
export const hasImages = (product: Product): boolean => {
  if (!hasColors(product)) return false;
  return product.colors!.some((color) => 
    Array.isArray(color.image_product) && color.image_product.length > 0
  );
};

/**
 * Get primary image URL from product
 */
export const getPrimaryImage = (product: Product): string | null => {
  if (!hasColors(product)) return null;
  
  const firstColor = product.colors![0];
  if (firstColor.image_product && firstColor.image_product.length > 0) {
    return firstColor.image_product[0].image;
  }
  
  return null;
};

/**
 * Get all images from product
 */
export const getAllProductImages = (product: Product): string[] => {
  if (!hasColors(product)) return [];
  
  const images: string[] = [];
  product.colors!.forEach((color) => {
    if (color.image_product && color.image_product.length > 0) {
      color.image_product.forEach((img) => {
        images.push(img.image);
      });
    }
  });
  
  return images;
};

/**
 * Filter products by tag
 */
export const filterProductsByTag = (products: Product[], tagText: string): Product[] => {
  return products.filter((product) =>
    product.tags?.some((tag) => tag.text === tagText)
  );
};

/**
 * Filter products by price range
 */
export const filterProductsByPriceRange = (
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] => {
  return products.filter((product) => {
    const price = getProductPrice(product);
    return price >= minPrice && price <= maxPrice;
  });
};

/**
 * Sort products by price
 */
export const sortProductsByPrice = (
  products: Product[],
  ascending: boolean = true
): Product[] => {
  return [...products].sort((a, b) => {
    const priceA = getProductPrice(a);
    const priceB = getProductPrice(b);
    return ascending ? priceA - priceB : priceB - priceA;
  });
};

/**
 * Sort products by name
 */
export const sortProductsByName = (
  products: Product[],
  ascending: boolean = true
): Product[] => {
  return [...products].sort((a, b) => {
    const nameA = (a.name || '').toLowerCase();
    const nameB = (b.name || '').toLowerCase();
    if (ascending) {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });
};

/**
 * Get products with discount (if price is lower than original)
 */
export const getDiscountedProducts = (
  products: Product[],
  originalPrices: Record<number, number>
): Product[] => {
  return products.filter((product) => {
    if (!product.id) return false;
    const currentPrice = getProductPrice(product);
    const originalPrice = originalPrices[product.id];
    return originalPrice && currentPrice < originalPrice;
  });
};

/**
 * Calculate discount percentage
 */
export const calculateDiscountPercentage = (
  originalPrice: number,
  currentPrice: number
): number => {
  if (originalPrice <= 0 || currentPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Get product by ID
 */
export const getProductById = (
  products: Product[],
  productId: number
): Product | undefined => {
  return products.find((product) => product.id === productId);
};

/**
 * Get products by category
 */
export const getProductsByCategory = (
  products: Product[],
  categoryId: number
): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

/**
 * Check if product is in stock
 */
export const isProductInStock = (product: Product): boolean => {
  if (product.quantity !== undefined) {
    return product.quantity > 0;
  }
  
  // Check if any color variant has quantity
  if (hasColors(product)) {
    return product.colors!.some((color) => {
      // Assuming color might have quantity info
      return true; // Default to true if we can't determine
    });
  }
  
  return true; // Default to in stock if we can't determine
};

/**
 * Get product availability status
 */
export const getProductAvailabilityStatus = (product: Product): string => {
  if (!isProductInStock(product)) {
    return 'Out of Stock';
  }
  
  const quantity = product.quantity;
  if (quantity !== undefined) {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 5) return 'Low Stock';
    if (quantity < 20) return 'Limited Stock';
  }
  
  return 'In Stock';
};

/**
 * Get color by name
 */
export const getColorByName = (
  product: Product,
  colorName: string
): Color | undefined => {
  if (!hasColors(product)) return undefined;
  return product.colors!.find((color) => color.color_name === colorName);
};

/**
 * Get all unique tags from products
 */
export const getAllUniqueTags = (products: Product[]): Tag[] => {
  const tagMap = new Map<number, Tag>();
  
  products.forEach((product) => {
    if (product.tags && Array.isArray(product.tags)) {
      product.tags.forEach((tag) => {
        if (tag.id !== undefined) {
          tagMap.set(tag.id, tag);
        }
      });
    }
  });
  
  return Array.from(tagMap.values());
};

/**
 * Get product statistics
 */
export const getProductStatistics = (products: Product[]): {
  totalProducts: number;
  totalInStock: number;
  totalOutOfStock: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  totalTags: number;
} => {
  const validProducts = products.filter((p) => hasValidPrice(p));
  const prices = validProducts.map((p) => getProductPrice(p));
  
  return {
    totalProducts: products.length,
    totalInStock: products.filter(isProductInStock).length,
    totalOutOfStock: products.filter((p) => !isProductInStock(p)).length,
    averagePrice: prices.length > 0 
      ? prices.reduce((sum, price) => sum + price, 0) / prices.length 
      : 0,
    minPrice: prices.length > 0 ? Math.min(...prices) : 0,
    maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
    totalTags: getAllUniqueTags(products).length,
  };
};

/**
 * Search products by name or description
 */
export const searchProducts = (
  products: Product[],
  searchTerm: string
): Product[] => {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return products;
  
  return products.filter((product) => {
    const nameMatch = product.name?.toLowerCase().includes(term);
    const descMatch = product.description?.toLowerCase().includes(term);
    const skuMatch = product.sku?.toLowerCase().includes(term);
    
    return nameMatch || descMatch || skuMatch;
  });
};

/**
 * Group products by tag
 */
export const groupProductsByTag = (
  products: Product[]
): Record<string, Product[]> => {
  const grouped: Record<string, Product[]> = {};
  
  products.forEach((product) => {
    if (product.tags && Array.isArray(product.tags)) {
      product.tags.forEach((tag) => {
        const tagText = tag.text || 'Untagged';
        if (!grouped[tagText]) {
          grouped[tagText] = [];
        }
        grouped[tagText].push(product);
      });
    } else {
      if (!grouped['Untagged']) {
        grouped['Untagged'] = [];
      }
      grouped['Untagged'].push(product);
    }
  });
  
  return grouped;
};

/**
 * Validate product color structure
 */
export const isValidColor = (color: any): color is Color => {
  return (
    color &&
    typeof color === 'object' &&
    (color.id === undefined || typeof color.id === 'number') &&
    (color.color_name === undefined || typeof color.color_name === 'string')
  );
};

/**
 * Validate product image structure
 */
export const isValidImage = (image: any): image is Image => {
  return (
    image &&
    typeof image === 'object' &&
    typeof image.id === 'number' &&
    typeof image.image === 'string'
  );
};

/**
 * Get cheapest product
 */
export const getCheapestProduct = (products: Product[]): Product | null => {
  if (products.length === 0) return null;
  
  const validProducts = products.filter(hasValidPrice);
  if (validProducts.length === 0) return null;
  
  return validProducts.reduce((cheapest, product) => {
    const cheapestPrice = getProductPrice(cheapest);
    const productPrice = getProductPrice(product);
    return productPrice < cheapestPrice ? product : cheapest;
  });
};

/**
 * Get most expensive product
 */
export const getMostExpensiveProduct = (products: Product[]): Product | null => {
  if (products.length === 0) return null;
  
  const validProducts = products.filter(hasValidPrice);
  if (validProducts.length === 0) return null;
  
  return validProducts.reduce((mostExpensive, product) => {
    const mostExpensivePrice = getProductPrice(mostExpensive);
    const productPrice = getProductPrice(product);
    return productPrice > mostExpensivePrice ? product : mostExpensive;
  });
};

/**
 * Format product price for display
 */
export const formatProductPrice = (
  product: Product,
  currency: string = 'INR',
  rate: number = 1
): string => {
  const price = getProductPrice(product) * rate;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(price);
};

/**
 * Check if product has specific tag
 */
export const hasTag = (product: Product, tagText: string): boolean => {
  return product.tags?.some((tag) => tag.text === tagText) || false;
};

/**
 * Get products with specific color
 */
export const getProductsWithColor = (
  products: Product[],
  colorName: string
): Product[] => {
  return products.filter((product) => {
    if (!hasColors(product)) return false;
    return product.colors!.some((color) => color.color_name === colorName);
  });
};

