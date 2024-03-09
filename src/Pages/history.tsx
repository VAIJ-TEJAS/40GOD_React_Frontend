import React, { useEffect, useState } from "react";
import axios from "axios";

interface Color {
  product: any;
  color_name: string;
  display_name: string;
  hex_code: string;
  id: number;
  image_product: { id: number; image: string }[];
}

interface Product {
  id: number;
  name: string;
  price: string;
  sku: string;
}

interface Size {
  id: number;
  text: string;
}

interface OrderItem {
  cart_item: {
    color: Color;
    product: Product;
    quantity: number;
    size: Size;
  };
}

interface Order {
  date: string;
  id: number;
  order_items: OrderItem[];
}

const History: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const BASE_URL = "";
  const token: string | null = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/order/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        setOrders(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">History</h1>
        </div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id}>
              <p>Date: {order.date}</p>
              <ul>
                {order.order_items.map((item, index) => (
                  <li key={index}>
                    <p>Product: {item.cart_item.color.product.name}</p>
                    <p>Quantity: {item.cart_item.quantity}</p>
                    <p>Color: {item.cart_item.color.display_name}</p>
                    <p>Price: {item.cart_item.color.product.price}</p>
                    <p>Size: {item.cart_item.size.text}</p>
                    <img
                      src={item.cart_item.color.image_product[0].image}
                      alt={`Image ${index}`}
                      className="max-h-24 max-w-full"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No items in history.</p>
        )}
      </div>
    </div>
  );
};

export default History;
