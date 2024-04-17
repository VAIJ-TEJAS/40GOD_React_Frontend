import React, { useEffect, useState } from "react";
import "../App.css"
import axios from "axios";
import bg from '../assets/background/Backgroud.jpeg';
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
  quantity: number;
  cart_item: {
    color: Color;
    product: Product;
    quantity: number;
    size: Size;
  };
}

interface Order {
  status: string;
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
    <div className="flex flex-col relative min-h-screen">
    <div className="fixed inset-0 bg-black">
      <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover filter brightness-75" />
    </div>  
  
    <div className="mb-8 mt-60 z-20  ml-5">
      <h1 className="text-3xl font-bold my-text">History</h1>
    </div>    
  
    <div className=" gap-4 p-8 flex  rounded-lg z-10 shadow-lg my-text font-semibold text-lg text-gray-700">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="grid sm:grid-cols-7 gap-4  ">
             <div>
            <ul>
              {order.order_items.map((item, index) => (
                <li key={index}>
                  <img
                    src={item.cart_item.color.image_product[0].image}
                    alt={`Image ${index}`}
                    className="max-h-24 max-w-full"
                  />
                </li>
              ))}
            </ul>
            </div>
            <div>
            <p>Date: {order.date}</p>
         
            </div>
            <div>
            <p>Status: {order.status}</p>
            </div>
            <div>
            <ul>
              {order.order_items.map((item, index) => (
                <li key={index}>
                  <p>Product: {item.cart_item.color.product.name}</p>
                 
                </li>
              ))}
            </ul>
            </div>
            <div>
            <ul>
              {order.order_items.map((item, index) => (
                <li key={index}>
                  <p>Color: {item.cart_item.color.display_name}</p>
                  <p>Size: {item.cart_item.size.text}</p>
                </li>
              ))}
            </ul></div>
            
            <div>
            <ul>
              {order.order_items.map((item, index) => (
                <li key={index}>
                  <p>Quantity: {item.quantity}</p>
               
                 
                </li>
              ))}
            </ul></div>
            <div>
            <ul>
              {order.order_items.map((item, index) => (
                <li key={index}>
                 
                  <p>Price: {item.cart_item.color.product.price * item.quantity}</p>
                 
                </li>
              ))}
            </ul></div>
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
