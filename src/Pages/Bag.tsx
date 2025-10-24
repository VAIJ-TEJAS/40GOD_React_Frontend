import { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import bg from "../assets/background/Backgroud.jpeg";
import "../App.css";
interface productData {
  id: number;
  sku: string;
  name: string;
  price: number;
}

interface ColorData {
  id: number;
  display_name: string;
  color_name: string;
  hex_code: string;
  image_product: { id: number; image: string }[];
  product: productData;
}

interface SizeData {
  id: number;
  text: string;
}

interface ProductVariant {
  id: number;
  color: ColorData;
  size: SizeData;
  quantity: number;
}

interface CartItem {
  id: number;
  product_varient: ProductVariant;
  quantity: number;
  price: number;
}

function Bag() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      axios
        .get<CartItem[]>("/cart-items/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          console.log("Cart Items:", response.data);
          setCartItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, []);

  const handleDelete = (itemId: number) => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      axios
        .delete(`/cart-items/${itemId}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          console.log("Item deleted:", itemId);
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== itemId)
          );
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };

  const updateCartItemQuantity = (itemId: number, quantityDelta: number) => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`/cart-items/${itemId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const currentItem = response.data;
          const currentQuantity = currentItem.quantity;

          let newQuantity = currentQuantity + quantityDelta;
          newQuantity = Math.max(newQuantity, 1);

          axios
            .put(
              `/cart-items/${itemId}/`,
              {
                quantity: newQuantity,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${token}`,
                },
              }
            )
            .then(() => {
              console.log("Quantity updated for item:", itemId);
              fetchCartItems(); // Assuming fetchCartItems is defined elsewhere
            })
            .catch((error) => {
              console.error("Error updating quantity:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching current quantity:", error);
        });
    }
  };

  const handleIncreaseQuantity = (itemId: number) => {
    updateCartItemQuantity(itemId, 1);
  };

  const handleDecreaseQuantity = (itemId: number) => {
    updateCartItemQuantity(itemId, -1);
  };

  const fetchCartItems = () => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      axios
        .get<CartItem[]>("/cart-items/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          console.log("Cart Items:", response.data);
          setCartItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    }
  };
  const totalSum = cartItems.reduce((accumulator, item) => {
    if (
      item.product_varient &&
      item.product_varient.color &&
      item.product_varient.color.product
    ) {
      const price = item.product_varient.color.product.price * item.quantity;
      return accumulator + price;
    }
    return accumulator;
  }, 0);
  
  return (
    <div className="flex flex-col gap-2 text-xl text-gray-300 font-semibold">
      <div className="fixed inset-0">
        <img
          src={bg}
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center z-10 mt-60 p-4">
        {cartItems.length === 0 ? (
          <p className="my-text text-center">Your bag is empty.</p>
        ) : (
          <div className="w-full ">
            {cartItems.map((item) => (
              <div
                className="flex flex-col sm:flex-row w-full bg-gray-600 bg-opacity-50 rounded-lg my-1 p-4"
                key={item.id}
              >
                <div className="w-full">
                  <div className="grid sm:grid-cols-4 grid-cols-1 items-center gap-4 sm:gap-0">
                    <div className="">
                      {item.product_varient?.color?.image_product?.[0]
                        ?.image && (
                        <img
                          src={
                            item.product_varient.color.image_product[0].image
                          }
                          alt={item.product_varient.color.display_name}
                          className="mx-auto max-w-60"
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="m-1">
                      {item.product_varient?.color?.display_name}
                      </p>
                      <p className="m-1">
                        <span className="text-base font-normal">Colour:</span> {item.product_varient?.color?.color_name}
                      </p>
                      <p className="m-1">
                      <span className="text-base font-normal">Size:</span> {item.product_varient?.size?.text}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center space-x-4">
                        <button
                          className="text-black font-bold w-10 h-10 rounded-full bg-white"
                          onClick={() => handleIncreaseQuantity(item.id)}
                        >
                          +
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          className="text-black font-bold w-10 h-10 rounded-full bg-white"
                          onClick={() => handleDecreaseQuantity(item.id)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button className="border-2 border-red-400 hover:cursor-pointer hover:text-red-400 p-1 rounded-lg" onClick={() => handleDelete(item.id)}>
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="w-full bg-gray-600 bg-opacity-50 rounded-lg">
            <div className="p-6 text-center">
              {cartItems.map((item) => (
                <div
                  className="flex flex-col sm:flex-row justify-center mb-4"
                  key={item.id}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                    <div className="text-center">
                      <p>{item.product_varient?.color?.color_name}</p>
                    </div>
                    <div className="text-center">
                      <p>{item.product_varient?.size?.text}</p>
                    </div>
                    <div className="text-center">
                      <p><span className="text-base font-normal">Quantity:</span>: {item.quantity}</p>
                    </div>
                    <div className="text-center">
                      <p>
                      <span className="text-base font-normal">Price:</span>:{" "}
                        {item.product_varient?.color?.product?.price *
                          item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 p-4">
              <h1 className="text-center sm:text-2xl text-xl font-bold my-text">
                TOTAL AMOUNT: {totalSum}
              </h1>
              <div className="flex justify-center mt-4">
                <Link to="/checkout">
                  <button className="button my-text px-12 py-2">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="z-30 flex justify-center mb-16">
        <NavLink to="/">
          <button className="button">Continue Shopping</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Bag;
