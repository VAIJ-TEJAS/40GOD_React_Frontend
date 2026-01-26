/**
 * Cart Helper Utilities
 * Provides utility functions for cart operations, calculations, and validations
 */

export interface CartItem {
  id: number;
  product_varient: {
    id: number;
    color: {
      id: number;
      display_name: string;
      color_name: string;
      hex_code: string;
      image_product: { id: number; image: string }[];
      product: {
        id: number;
        name: string;
        price: number;
        sku: string;
      };
    };
    size: {
      id: number;
      text: string;
    };
    quantity: number;
  };
  quantity: number;
  price: number;
}

/**
 * Calculate total price of all cart items
 */
export const calculateCartTotal = (
  cartItems: CartItem[],
  rate: number = 1
): number => {
  return cartItems.reduce((total, item) => {
    if (
      item.product_varient &&
      item.product_varient.color &&
      item.product_varient.color.product
    ) {
      const itemPrice = item.product_varient.color.product.price * item.quantity;
      return total + itemPrice * rate;
    }
    return total;
  }, 0);
};

/**
 * Calculate total number of items in cart
 */
export const calculateTotalItems = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get unique products count in cart
 */
export const getUniqueProductsCount = (cartItems: CartItem[]): number => {
  const uniqueProductIds = new Set(
    cartItems.map((item) => item.product_varient?.color?.product?.id).filter(Boolean)
  );
  return uniqueProductIds.size;
};

/**
 * Check if cart is empty
 */
export const isCartEmpty = (cartItems: CartItem[]): boolean => {
  return cartItems.length === 0;
};

/**
 * Find cart item by ID
 */
export const findCartItemById = (
  cartItems: CartItem[],
  itemId: number
): CartItem | undefined => {
  return cartItems.find((item) => item.id === itemId);
};

/**
 * Check if item exists in cart
 */
export const itemExistsInCart = (
  cartItems: CartItem[],
  productVariantId: number
): boolean => {
  return cartItems.some(
    (item) => item.product_varient?.id === productVariantId
  );
};

/**
 * Get cart item by product variant ID
 */
export const getCartItemByVariant = (
  cartItems: CartItem[],
  productVariantId: number
): CartItem | undefined => {
  return cartItems.find(
    (item) => item.product_varient?.id === productVariantId
  );
};

/**
 * Calculate item subtotal
 */
export const calculateItemSubtotal = (
  item: CartItem,
  rate: number = 1
): number => {
  if (
    item.product_varient &&
    item.product_varient.color &&
    item.product_varient.color.product
  ) {
    return item.product_varient.color.product.price * item.quantity * rate;
  }
  return 0;
};

/**
 * Validate cart item structure
 */
export const isValidCartItem = (item: any): item is CartItem => {
  return (
    item &&
    typeof item.id === 'number' &&
    typeof item.quantity === 'number' &&
    item.product_varient &&
    item.product_varient.color &&
    item.product_varient.color.product
  );
};

/**
 * Validate all cart items
 */
export const validateCartItems = (cartItems: any[]): boolean => {
  return cartItems.every((item) => isValidCartItem(item));
};

/**
 * Get cart summary
 */
export const getCartSummary = (
  cartItems: CartItem[],
  rate: number = 1
): {
  totalItems: number;
  uniqueProducts: number;
  totalPrice: number;
  isEmpty: boolean;
} => {
  return {
    totalItems: calculateTotalItems(cartItems),
    uniqueProducts: getUniqueProductsCount(cartItems),
    totalPrice: calculateCartTotal(cartItems, rate),
    isEmpty: isCartEmpty(cartItems),
  };
};

/**
 * Filter cart items by color
 */
export const filterCartItemsByColor = (
  cartItems: CartItem[],
  colorName: string
): CartItem[] => {
  return cartItems.filter(
    (item) => item.product_varient?.color?.color_name === colorName
  );
};

/**
 * Filter cart items by size
 */
export const filterCartItemsBySize = (
  cartItems: CartItem[],
  size: string
): CartItem[] => {
  return cartItems.filter(
    (item) => item.product_varient?.size?.text === size
  );
};

/**
 * Group cart items by product
 */
export const groupCartItemsByProduct = (
  cartItems: CartItem[]
): Record<number, CartItem[]> => {
  return cartItems.reduce((groups, item) => {
    const productId = item.product_varient?.color?.product?.id;
    if (productId) {
      if (!groups[productId]) {
        groups[productId] = [];
      }
      groups[productId].push(item);
    }
    return groups;
  }, {} as Record<number, CartItem[]>);
};

/**
 * Get most expensive item in cart
 */
export const getMostExpensiveItem = (
  cartItems: CartItem[],
  rate: number = 1
): CartItem | null => {
  if (cartItems.length === 0) return null;

  return cartItems.reduce((mostExpensive, item) => {
    const itemPrice = calculateItemSubtotal(item, rate);
    const mostExpensivePrice = calculateItemSubtotal(mostExpensive, rate);
    return itemPrice > mostExpensivePrice ? item : mostExpensive;
  });
};

/**
 * Get cheapest item in cart
 */
export const getCheapestItem = (
  cartItems: CartItem[],
  rate: number = 1
): CartItem | null => {
  if (cartItems.length === 0) return null;

  return cartItems.reduce((cheapest, item) => {
    const itemPrice = calculateItemSubtotal(item, rate);
    const cheapestPrice = calculateItemSubtotal(cheapest, rate);
    return itemPrice < cheapestPrice ? item : cheapest;
  });
};

/**
 * Calculate average item price
 */
export const calculateAverageItemPrice = (
  cartItems: CartItem[],
  rate: number = 1
): number => {
  if (cartItems.length === 0) return 0;

  const totalPrice = calculateCartTotal(cartItems, rate);
  const totalItems = calculateTotalItems(cartItems);
  return totalItems > 0 ? totalPrice / totalItems : 0;
};

/**
 * Get items with low stock (quantity <= threshold)
 */
export const getLowStockItems = (
  cartItems: CartItem[],
  threshold: number = 5
): CartItem[] => {
  return cartItems.filter(
    (item) => item.product_varient?.quantity <= threshold
  );
};

/**
 * Check if cart has low stock items
 */
export const hasLowStockItems = (
  cartItems: CartItem[],
  threshold: number = 5
): boolean => {
  return getLowStockItems(cartItems, threshold).length > 0;
};

/**
 * Sort cart items by price (ascending)
 */
export const sortCartItemsByPrice = (
  cartItems: CartItem[],
  rate: number = 1,
  ascending: boolean = true
): CartItem[] => {
  return [...cartItems].sort((a, b) => {
    const priceA = calculateItemSubtotal(a, rate);
    const priceB = calculateItemSubtotal(b, rate);
    return ascending ? priceA - priceB : priceB - priceA;
  });
};

/**
 * Get cart items with specific quantity
 */
export const getItemsWithQuantity = (
  cartItems: CartItem[],
  quantity: number
): CartItem[] => {
  return cartItems.filter((item) => item.quantity === quantity);
};

/**
 * Calculate savings if discount applied
 */
export const calculateSavings = (
  cartItems: CartItem[],
  discountPercentage: number,
  rate: number = 1
): number => {
  const total = calculateCartTotal(cartItems, rate);
  return total * (discountPercentage / 100);
};

/**
 * Get cart items statistics
 */
export const getCartStatistics = (
  cartItems: CartItem[],
  rate: number = 1
): {
  totalItems: number;
  uniqueProducts: number;
  totalPrice: number;
  averagePrice: number;
  mostExpensive: CartItem | null;
  cheapest: CartItem | null;
  lowStockCount: number;
} => {
  return {
    totalItems: calculateTotalItems(cartItems),
    uniqueProducts: getUniqueProductsCount(cartItems),
    totalPrice: calculateCartTotal(cartItems, rate),
    averagePrice: calculateAverageItemPrice(cartItems, rate),
    mostExpensive: getMostExpensiveItem(cartItems, rate),
    cheapest: getCheapestItem(cartItems, rate),
    lowStockCount: getLowStockItems(cartItems).length,
  };
};

