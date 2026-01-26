/**
 * Order Helper Utilities
 * Provides utility functions for order processing, validation, and formatting
 */

export interface OrderItem {
  quantity: number;
  cart_item: {
    color: {
      id: number;
      color_name: string;
      display_name: string;
      hex_code: string;
      image_product: { id: number; image: string }[];
      product: {
        id: number;
        name: string;
        price: string;
        sku: string;
      };
    };
    product: {
      id: number;
      name: string;
      price: string;
      sku: string;
    };
    quantity: number;
    size: {
      id: number;
      text: string;
    };
  };
}

export interface Order {
  id: number;
  status: string;
  date: string;
  total_price: string;
  order_items: OrderItem[];
  shipment: any;
  payment: any;
}

/**
 * Calculate total items in an order
 */
export const calculateOrderItemCount = (order: Order): number => {
  return order.order_items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get order status display text
 */
export const getOrderStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    PL: 'Placed',
    CM: 'Completed',
    SH: 'Shipped',
    DL: 'Delivered',
    CN: 'Cancelled',
  };
  return statusMap[status] || status;
};

/**
 * Get order status color class
 */
export const getOrderStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    PL: 'bg-yellow-500 text-black',
    CM: 'bg-green-500 text-black',
    SH: 'bg-blue-500 text-black',
    DL: 'bg-green-600 text-white',
    CN: 'bg-red-500 text-white',
  };
  return colorMap[status] || 'bg-gray-500';
};

/**
 * Format order date for display
 */
export const formatOrderDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    return dateString;
  }
};

/**
 * Calculate total price for order items
 */
export const calculateOrderItemsTotal = (order: Order, rate: number = 1): number => {
  return order.order_items.reduce((total, item) => {
    const itemPrice = parseFloat(item.cart_item.color.product.price) * item.quantity;
    return total + itemPrice * rate;
  }, 0);
};

/**
 * Check if order has shipment information
 */
export const hasShipmentInfo = (order: Order): boolean => {
  return order.shipment !== null && order.shipment !== undefined;
};

/**
 * Check if order has payment information
 */
export const hasPaymentInfo = (order: Order): boolean => {
  return order.payment !== null && order.payment !== undefined;
};

/**
 * Get shipment address as formatted string
 */
export const formatShipmentAddress = (order: Order): string => {
  if (!hasShipmentInfo(order)) {
    return 'No shipping address available';
  }

  const addr = order.shipment.address_details;
  return `${addr.street_address}, ${addr.city}, ${addr.state} ${addr.postal_code}, ${addr.country}`;
};

/**
 * Validate order data structure
 */
export const validateOrder = (order: any): order is Order => {
  return (
    order &&
    typeof order.id === 'number' &&
    typeof order.status === 'string' &&
    typeof order.date === 'string' &&
    typeof order.total_price === 'string' &&
    Array.isArray(order.order_items)
  );
};

/**
 * Sort orders by date (newest first)
 */
export const sortOrdersByDate = (orders: Order[], ascending: boolean = false): Order[] => {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Filter orders by status
 */
export const filterOrdersByStatus = (orders: Order[], status: string): Order[] => {
  return orders.filter((order) => order.status === status);
};

/**
 * Get order summary statistics
 */
export const getOrderStatistics = (orders: Order[]) => {
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, order) => sum + calculateOrderItemCount(order), 0);
  const totalValue = orders.reduce(
    (sum, order) => sum + parseFloat(order.total_price),
    0
  );
  const statusCounts = orders.reduce((counts, order) => {
    counts[order.status] = (counts[order.status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return {
    totalOrders,
    totalItems,
    totalValue,
    statusCounts,
  };
};

/**
 * Check if order is recent (within last 30 days)
 */
export const isRecentOrder = (order: Order): boolean => {
  const orderDate = new Date(order.date);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return orderDate >= thirtyDaysAgo;
};

/**
 * Get orders grouped by status
 */
export const groupOrdersByStatus = (orders: Order[]): Record<string, Order[]> => {
  return orders.reduce((groups, order) => {
    const status = order.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(order);
    return groups;
  }, {} as Record<string, Order[]>);
};

