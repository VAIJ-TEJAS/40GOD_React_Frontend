import { describe, it, expect } from 'vitest'
import {
  calculateOrderItemCount,
  getOrderStatusText,
  getOrderStatusColor,
  formatOrderDate,
  calculateOrderItemsTotal,
  hasShipmentInfo,
  hasPaymentInfo,
  formatShipmentAddress,
  validateOrder,
  sortOrdersByDate,
  filterOrdersByStatus,
  getOrderStatistics,
  isRecentOrder,
  groupOrdersByStatus,
  Order,
} from '../orderHelpers'

describe('orderHelpers', () => {
  const mockOrder: Order = {
    id: 1,
    status: 'PL',
    date: '2024-01-15T10:30:00Z',
    total_price: '1500',
    order_items: [
      {
        quantity: 2,
        cart_item: {
          color: {
            id: 1,
            color_name: 'Red',
            display_name: 'Red T-Shirt',
            hex_code: '#FF0000',
            image_product: [{ id: 1, image: 'test.jpg' }],
            product: {
              id: 1,
              name: 'T-Shirt',
              price: '500',
              sku: 'TS001',
            },
          },
          product: {
            id: 1,
            name: 'T-Shirt',
            price: '500',
            sku: 'TS001',
          },
          quantity: 2,
          size: {
            id: 1,
            text: 'M',
          },
        },
      },
      {
        quantity: 1,
        cart_item: {
          color: {
            id: 2,
            color_name: 'Blue',
            display_name: 'Blue T-Shirt',
            hex_code: '#0000FF',
            image_product: [{ id: 2, image: 'test2.jpg' }],
            product: {
              id: 2,
              name: 'T-Shirt 2',
              price: '500',
              sku: 'TS002',
            },
          },
          product: {
            id: 2,
            name: 'T-Shirt 2',
            price: '500',
            sku: 'TS002',
          },
          quantity: 1,
          size: {
            id: 2,
            text: 'L',
          },
        },
      },
    ],
    shipment: {
      address_details: {
        name: 'John Doe',
        street_address: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'USA',
        phone_number: '1234567890',
      },
    },
    payment: {
      method: 'Credit Card',
      amount: '1500',
      date: '2024-01-15T10:30:00Z',
    },
  }

  describe('calculateOrderItemCount', () => {
    it('should calculate total item count correctly', () => {
      expect(calculateOrderItemCount(mockOrder)).toBe(3)
    })

    it('should return 0 for order with no items', () => {
      const emptyOrder: Order = { ...mockOrder, order_items: [] }
      expect(calculateOrderItemCount(emptyOrder)).toBe(0)
    })
  })

  describe('getOrderStatusText', () => {
    it('should return correct status text for PL', () => {
      expect(getOrderStatusText('PL')).toBe('Placed')
    })

    it('should return correct status text for CM', () => {
      expect(getOrderStatusText('CM')).toBe('Completed')
    })

    it('should return correct status text for SH', () => {
      expect(getOrderStatusText('SH')).toBe('Shipped')
    })

    it('should return correct status text for DL', () => {
      expect(getOrderStatusText('DL')).toBe('Delivered')
    })

    it('should return correct status text for CN', () => {
      expect(getOrderStatusText('CN')).toBe('Cancelled')
    })

    it('should return status as-is for unknown status', () => {
      expect(getOrderStatusText('UNKNOWN')).toBe('UNKNOWN')
    })
  })

  describe('getOrderStatusColor', () => {
    it('should return correct color for PL', () => {
      expect(getOrderStatusColor('PL')).toBe('bg-yellow-500 text-black')
    })

    it('should return correct color for CM', () => {
      expect(getOrderStatusColor('CM')).toBe('bg-green-500 text-black')
    })

    it('should return default color for unknown status', () => {
      expect(getOrderStatusColor('UNKNOWN')).toBe('bg-gray-500')
    })
  })

  describe('formatOrderDate', () => {
    it('should format date correctly', () => {
      const formatted = formatOrderDate('2024-01-15T10:30:00Z')
      expect(formatted).toContain('2024')
      expect(formatted).toContain('January')
    })

    it('should handle invalid date gracefully', () => {
      const formatted = formatOrderDate('invalid-date')
      expect(formatted).toBe('invalid-date')
    })
  })

  describe('calculateOrderItemsTotal', () => {
    it('should calculate total correctly', () => {
      expect(calculateOrderItemsTotal(mockOrder, 1)).toBe(1500)
    })

    it('should apply rate correctly', () => {
      expect(calculateOrderItemsTotal(mockOrder, 0.5)).toBe(750)
    })
  })

  describe('hasShipmentInfo', () => {
    it('should return true when shipment exists', () => {
      expect(hasShipmentInfo(mockOrder)).toBe(true)
    })

    it('should return false when shipment is null', () => {
      const orderWithoutShipment: Order = { ...mockOrder, shipment: null }
      expect(hasShipmentInfo(orderWithoutShipment)).toBe(false)
    })
  })

  describe('hasPaymentInfo', () => {
    it('should return true when payment exists', () => {
      expect(hasPaymentInfo(mockOrder)).toBe(true)
    })

    it('should return false when payment is null', () => {
      const orderWithoutPayment: Order = { ...mockOrder, payment: null }
      expect(hasPaymentInfo(orderWithoutPayment)).toBe(false)
    })
  })

  describe('formatShipmentAddress', () => {
    it('should format address correctly', () => {
      const address = formatShipmentAddress(mockOrder)
      expect(address).toContain('123 Main St')
      expect(address).toContain('New York')
      expect(address).toContain('NY')
      expect(address).toContain('10001')
      expect(address).toContain('USA')
    })

    it('should return message when no shipment info', () => {
      const orderWithoutShipment: Order = { ...mockOrder, shipment: null }
      expect(formatShipmentAddress(orderWithoutShipment)).toBe('No shipping address available')
    })
  })

  describe('validateOrder', () => {
    it('should validate correct order structure', () => {
      expect(validateOrder(mockOrder)).toBe(true)
    })

    it('should reject invalid order structure', () => {
      expect(validateOrder({})).toBe(false)
      expect(validateOrder(null)).toBe(false)
      expect(validateOrder({ id: 1 })).toBe(false)
    })
  })

  describe('sortOrdersByDate', () => {
    it('should sort orders by date descending by default', () => {
      const orders: Order[] = [
        { ...mockOrder, id: 1, date: '2024-01-01T00:00:00Z' },
        { ...mockOrder, id: 2, date: '2024-01-15T00:00:00Z' },
        { ...mockOrder, id: 3, date: '2024-01-10T00:00:00Z' },
      ]

      const sorted = sortOrdersByDate(orders)
      expect(sorted[0].id).toBe(2)
      expect(sorted[1].id).toBe(3)
      expect(sorted[2].id).toBe(1)
    })

    it('should sort orders by date ascending when specified', () => {
      const orders: Order[] = [
        { ...mockOrder, id: 1, date: '2024-01-01T00:00:00Z' },
        { ...mockOrder, id: 2, date: '2024-01-15T00:00:00Z' },
      ]

      const sorted = sortOrdersByDate(orders, true)
      expect(sorted[0].id).toBe(1)
      expect(sorted[1].id).toBe(2)
    })
  })

  describe('filterOrdersByStatus', () => {
    it('should filter orders by status', () => {
      const orders: Order[] = [
        { ...mockOrder, id: 1, status: 'PL' },
        { ...mockOrder, id: 2, status: 'CM' },
        { ...mockOrder, id: 3, status: 'PL' },
      ]

      const filtered = filterOrdersByStatus(orders, 'PL')
      expect(filtered.length).toBe(2)
      expect(filtered.every((o) => o.status === 'PL')).toBe(true)
    })
  })

  describe('getOrderStatistics', () => {
    it('should calculate statistics correctly', () => {
      const orders: Order[] = [
        { ...mockOrder, id: 1, status: 'PL' },
        { ...mockOrder, id: 2, status: 'CM' },
        { ...mockOrder, id: 3, status: 'PL' },
      ]

      const stats = getOrderStatistics(orders)
      expect(stats.totalOrders).toBe(3)
      expect(stats.totalItems).toBe(9)
      expect(stats.statusCounts.PL).toBe(2)
      expect(stats.statusCounts.CM).toBe(1)
    })
  })

  describe('isRecentOrder', () => {
    it('should return true for recent order', () => {
      const recentOrder: Order = {
        ...mockOrder,
        date: new Date().toISOString(),
      }
      expect(isRecentOrder(recentOrder)).toBe(true)
    })

    it('should return false for old order', () => {
      const oldOrder: Order = {
        ...mockOrder,
        date: '2020-01-01T00:00:00Z',
      }
      expect(isRecentOrder(oldOrder)).toBe(false)
    })
  })

  describe('groupOrdersByStatus', () => {
    it('should group orders by status', () => {
      const orders: Order[] = [
        { ...mockOrder, id: 1, status: 'PL' },
        { ...mockOrder, id: 2, status: 'CM' },
        { ...mockOrder, id: 3, status: 'PL' },
      ]

      const grouped = groupOrdersByStatus(orders)
      expect(grouped.PL.length).toBe(2)
      expect(grouped.CM.length).toBe(1)
    })
  })
})

