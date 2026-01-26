import { describe, it, expect } from 'vitest'
import {
  calculateCartTotal,
  calculateTotalItems,
  getUniqueProductsCount,
  isCartEmpty,
  findCartItemById,
  itemExistsInCart,
  getCartItemByVariant,
  calculateItemSubtotal,
  isValidCartItem,
  validateCartItems,
  getCartSummary,
  filterCartItemsByColor,
  filterCartItemsBySize,
  groupCartItemsByProduct,
  getMostExpensiveItem,
  getCheapestItem,
  calculateAverageItemPrice,
  getLowStockItems,
  hasLowStockItems,
  sortCartItemsByPrice,
  getItemsWithQuantity,
  calculateSavings,
  getCartStatistics,
  CartItem,
} from '../cartHelpers'

describe('cartHelpers', () => {
  const mockCartItem: CartItem = {
    id: 1,
    quantity: 2,
    price: 1000,
    product_varient: {
      id: 1,
      color: {
        id: 1,
        display_name: 'Red T-Shirt',
        color_name: 'Red',
        hex_code: '#FF0000',
        image_product: [{ id: 1, image: 'test.jpg' }],
        product: {
          id: 1,
          name: 'T-Shirt',
          price: 500,
          sku: 'TS001',
        },
      },
      size: {
        id: 1,
        text: 'M',
      },
      quantity: 10,
    },
  }

  const mockCartItem2: CartItem = {
    id: 2,
    quantity: 1,
    price: 2000,
    product_varient: {
      id: 2,
      color: {
        id: 2,
        display_name: 'Blue T-Shirt',
        color_name: 'Blue',
        hex_code: '#0000FF',
        image_product: [{ id: 2, image: 'test2.jpg' }],
        product: {
          id: 2,
          name: 'T-Shirt 2',
          price: 2000,
          sku: 'TS002',
        },
      },
      size: {
        id: 2,
        text: 'L',
      },
      quantity: 3,
    },
  }

  describe('calculateCartTotal', () => {
    it('should calculate total correctly', () => {
      expect(calculateCartTotal([mockCartItem], 1)).toBe(1000)
    })

    it('should apply rate correctly', () => {
      expect(calculateCartTotal([mockCartItem], 0.5)).toBe(500)
    })

    it('should handle multiple items', () => {
      expect(calculateCartTotal([mockCartItem, mockCartItem2], 1)).toBe(3000)
    })

    it('should return 0 for empty cart', () => {
      expect(calculateCartTotal([], 1)).toBe(0)
    })
  })

  describe('calculateTotalItems', () => {
    it('should calculate total items correctly', () => {
      expect(calculateTotalItems([mockCartItem, mockCartItem2])).toBe(3)
    })

    it('should return 0 for empty cart', () => {
      expect(calculateTotalItems([])).toBe(0)
    })
  })

  describe('getUniqueProductsCount', () => {
    it('should count unique products', () => {
      expect(getUniqueProductsCount([mockCartItem, mockCartItem2])).toBe(2)
    })

    it('should handle duplicate products', () => {
      const duplicateItem = { ...mockCartItem, id: 3 }
      expect(getUniqueProductsCount([mockCartItem, duplicateItem])).toBe(1)
    })
  })

  describe('isCartEmpty', () => {
    it('should return true for empty cart', () => {
      expect(isCartEmpty([])).toBe(true)
    })

    it('should return false for non-empty cart', () => {
      expect(isCartEmpty([mockCartItem])).toBe(false)
    })
  })

  describe('findCartItemById', () => {
    it('should find item by id', () => {
      expect(findCartItemById([mockCartItem, mockCartItem2], 1)).toEqual(mockCartItem)
    })

    it('should return undefined if not found', () => {
      expect(findCartItemById([mockCartItem], 999)).toBeUndefined()
    })
  })

  describe('itemExistsInCart', () => {
    it('should return true if item exists', () => {
      expect(itemExistsInCart([mockCartItem], 1)).toBe(true)
    })

    it('should return false if item does not exist', () => {
      expect(itemExistsInCart([mockCartItem], 999)).toBe(false)
    })
  })

  describe('getCartItemByVariant', () => {
    it('should get item by variant id', () => {
      expect(getCartItemByVariant([mockCartItem], 1)).toEqual(mockCartItem)
    })

    it('should return undefined if not found', () => {
      expect(getCartItemByVariant([mockCartItem], 999)).toBeUndefined()
    })
  })

  describe('calculateItemSubtotal', () => {
    it('should calculate subtotal correctly', () => {
      expect(calculateItemSubtotal(mockCartItem, 1)).toBe(1000)
    })

    it('should apply rate correctly', () => {
      expect(calculateItemSubtotal(mockCartItem, 0.5)).toBe(500)
    })
  })

  describe('isValidCartItem', () => {
    it('should validate correct cart item', () => {
      expect(isValidCartItem(mockCartItem)).toBe(true)
    })

    it('should reject invalid cart item', () => {
      expect(isValidCartItem({})).toBe(false)
      expect(isValidCartItem(null)).toBe(false)
    })
  })

  describe('validateCartItems', () => {
    it('should validate all items', () => {
      expect(validateCartItems([mockCartItem, mockCartItem2])).toBe(true)
    })

    it('should return false for invalid items', () => {
      expect(validateCartItems([mockCartItem, {}])).toBe(false)
    })
  })

  describe('getCartSummary', () => {
    it('should return correct summary', () => {
      const summary = getCartSummary([mockCartItem, mockCartItem2], 1)
      expect(summary.totalItems).toBe(3)
      expect(summary.uniqueProducts).toBe(2)
      expect(summary.totalPrice).toBe(3000)
      expect(summary.isEmpty).toBe(false)
    })
  })

  describe('filterCartItemsByColor', () => {
    it('should filter by color', () => {
      const filtered = filterCartItemsByColor([mockCartItem, mockCartItem2], 'Red')
      expect(filtered.length).toBe(1)
      expect(filtered[0]).toEqual(mockCartItem)
    })
  })

  describe('filterCartItemsBySize', () => {
    it('should filter by size', () => {
      const filtered = filterCartItemsBySize([mockCartItem, mockCartItem2], 'M')
      expect(filtered.length).toBe(1)
      expect(filtered[0]).toEqual(mockCartItem)
    })
  })

  describe('groupCartItemsByProduct', () => {
    it('should group items by product', () => {
      const grouped = groupCartItemsByProduct([mockCartItem, mockCartItem2])
      expect(grouped[1].length).toBe(1)
      expect(grouped[2].length).toBe(1)
    })
  })

  describe('getMostExpensiveItem', () => {
    it('should return most expensive item', () => {
      expect(getMostExpensiveItem([mockCartItem, mockCartItem2], 1)).toEqual(mockCartItem2)
    })

    it('should return null for empty cart', () => {
      expect(getMostExpensiveItem([], 1)).toBeNull()
    })
  })

  describe('getCheapestItem', () => {
    it('should return cheapest item', () => {
      expect(getCheapestItem([mockCartItem, mockCartItem2], 1)).toEqual(mockCartItem)
    })

    it('should return null for empty cart', () => {
      expect(getCheapestItem([], 1)).toBeNull()
    })
  })

  describe('calculateAverageItemPrice', () => {
    it('should calculate average correctly', () => {
      expect(calculateAverageItemPrice([mockCartItem, mockCartItem2], 1)).toBe(1000)
    })

    it('should return 0 for empty cart', () => {
      expect(calculateAverageItemPrice([], 1)).toBe(0)
    })
  })

  describe('getLowStockItems', () => {
    it('should return low stock items', () => {
      const lowStockItem = {
        ...mockCartItem,
        product_varient: { ...mockCartItem.product_varient, quantity: 3 },
      }
      const items = getLowStockItems([lowStockItem, mockCartItem2], 5)
      expect(items.length).toBe(1)
    })
  })

  describe('hasLowStockItems', () => {
    it('should return true if low stock items exist', () => {
      const lowStockItem = {
        ...mockCartItem,
        product_varient: { ...mockCartItem.product_varient, quantity: 3 },
      }
      expect(hasLowStockItems([lowStockItem], 5)).toBe(true)
    })

    it('should return false if no low stock items', () => {
      expect(hasLowStockItems([mockCartItem], 5)).toBe(false)
    })
  })

  describe('sortCartItemsByPrice', () => {
    it('should sort ascending by default', () => {
      const sorted = sortCartItemsByPrice([mockCartItem2, mockCartItem], 1, true)
      expect(sorted[0].id).toBe(1)
      expect(sorted[1].id).toBe(2)
    })

    it('should sort descending when specified', () => {
      const sorted = sortCartItemsByPrice([mockCartItem, mockCartItem2], 1, false)
      expect(sorted[0].id).toBe(2)
      expect(sorted[1].id).toBe(1)
    })
  })

  describe('getItemsWithQuantity', () => {
    it('should filter by quantity', () => {
      const items = getItemsWithQuantity([mockCartItem, mockCartItem2], 2)
      expect(items.length).toBe(1)
      expect(items[0]).toEqual(mockCartItem)
    })
  })

  describe('calculateSavings', () => {
    it('should calculate savings correctly', () => {
      expect(calculateSavings([mockCartItem], 10, 1)).toBe(100)
    })
  })

  describe('getCartStatistics', () => {
    it('should return comprehensive statistics', () => {
      const stats = getCartStatistics([mockCartItem, mockCartItem2], 1)
      expect(stats.totalItems).toBe(3)
      expect(stats.uniqueProducts).toBe(2)
      expect(stats.totalPrice).toBe(3000)
      expect(stats.mostExpensive).toEqual(mockCartItem2)
      expect(stats.cheapest).toEqual(mockCartItem)
    })
  })
})

