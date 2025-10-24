import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import bg from "../assets/background/Backgroud.jpeg";
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
  total_price: string;
  shipment: any;
  payment: any;
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
        console.log("response", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col relative min-h-screen">
      <div className="fixed inset-0">
        <img
          src={bg}
          alt="bg"
          className="absolute inset-0 w-screen h-full object-cover filter brightness-50"
        />
      </div>

      <div className="mb-8 mt-60 z-20 p-4 flex justify-center items-center">
        <h1 className="text-2xl text-white font-bold">HISTORY</h1>
      </div>

      <div className="relative z-10 min-h-screen  px-4 py-12 sm:px-8">
        {orders.length > 0 ? (
          <div className="mx-auto">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 text-white"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/20 pb-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-300">
                      Placed on {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "PL"
                          ? "bg-yellow-500 text-black"
                          : order.status === "CM"
                          ? "bg-green-500 text-black"
                          : "bg-gray-500"
                      }`}
                    >
                      {order.status === "PL" ? "Placed" : order.status}
                    </span>
                  </div>
                </div>

                {/* Shipment & Payment */}
                {order.shipment && (
                  <div className="mb-4 grid sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-1 text-yellow-400">
                        Shipping To
                      </h3>
                      <p className="text-sm text-gray-300">
                        {order.shipment.address_details.name}
                      </p>
                      <p className="text-sm text-gray-300">
                        {order.shipment.address_details.street_address}
                      </p>
                      <p className="text-sm text-gray-300">
                        {order.shipment.address_details.city},{" "}
                        {order.shipment.address_details.state}{" "}
                        {order.shipment.address_details.postal_code}
                      </p>
                      <p className="text-sm text-gray-300">
                        {order.shipment.address_details.country}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        📞 {order.shipment.address_details.phone_number}
                      </p>
                    </div>
                    {order.payment && (
                      <div>
                        <h3 className="font-semibold mb-1 text-yellow-400">
                          Payment Info
                        </h3>
                        <p className="text-sm text-gray-300">
                          Method: {order.payment.method}
                        </p>
                        <p className="text-sm text-gray-300">
                          Amount: ₹{order.payment.amount}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Paid on{" "}
                          {new Date(order.payment.date).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Products */}
                <div>
                  <h3 className="font-semibold mb-3 text-yellow-400">
                    Items Ordered
                  </h3>
                  <div className="divide-y divide-white/10">
                    {order.order_items.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center py-3"
                      >
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl border border-white/10">
                          <img
                            src={item.cart_item.color.image_product[0]?.image}
                            alt={item.cart_item.color.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="sm:ml-4 flex-1 mt-3 sm:mt-0">
                          <h4 className="font-semibold text-lg">
                            {item.cart_item.color.product.name}
                          </h4>
                          <p className="text-sm text-gray-300">
                            SKU: {item.cart_item.color.product.sku}
                          </p>
                          <p className="text-sm text-gray-300">
                            Color:{" "}
                            <span
                              className="inline-block w-4 h-4 rounded-full border border-gray-400 ml-1"
                              style={{
                                backgroundColor: item.cart_item.color.hex_code,
                              }}
                            ></span>{" "}
                            {item.cart_item.color.display_name}
                          </p>
                          <p className="text-sm text-gray-300">
                            Size: {item.cart_item.size.text}
                          </p>
                          <p className="text-sm text-gray-300">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="mt-3 sm:mt-0 sm:ml-auto text-right">
                          <p className="text-lg font-bold">
                            ₹
                            {(
                              parseFloat(item.cart_item.color.product.price) *
                              item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-white/20 mt-4 pt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-300">Total</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    ₹{order.total_price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-300 text-lg mt-20">
            No orders found in history.
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
