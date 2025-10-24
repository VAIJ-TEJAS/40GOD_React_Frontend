/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import ShippingInfo from "../components/ShippingInfo";
import bg from "../assets/background/Backgroud.jpeg";
import axios, { AxiosResponse } from "axios";
import { RazorpayOptions } from "../types/razorpay";

interface ColorData {
  product: any;
  id: number;
  display_name: string;
  color_name: string;
  hex_code: string;
  image_product: { id: number; image: string }[];
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
}

interface AddressBookEntry {
  id: number;
  name: string;
  phone_number: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

const Checkout: React.FC = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      axios
        .get<AddressBookEntry[]>("/address-book/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then((response: AxiosResponse<AddressBookEntry[]>) => {
          console.log("Address Book:", response.data);

          if (response.data.length > 0) {
            setSelectedAddressId(response.data[0].id); // Select the first address entry by default
          }
        })
        .catch((error) => {
          console.error("Error fetching address book entries:", error);
        });
    }
  }, []);

  console.log(selectedAddressId);

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

  const postCartItems = async () => {
    try {
      const BASE_URL = "";
      const token = localStorage.getItem("token");

      // Preparing the data payload for the POST request
      const data = {
        address_id: selectedAddressId,
      };

      // Axios request configuration, including the headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };

      // Performing the POST request using Axios
      const orderResponse = await axios.get(
        `${BASE_URL}/order/calculate_order/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const { order_id, razorpay_key_id } = orderResponse.data;

      const options: RazorpayOptions = {
        key: razorpay_key_id,
        currency: "INR",
        name: "40.G.O.D",
        description: "",
        image: "logo1.png",
        order_id: order_id,
        handler: function (response: any) {
          console.log(response);
          axios.post(`${BASE_URL}/order/create_order/`, data, config);
          // Handle payment success
          window.location.href = "/history";
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
        },
        prefill: {
          // "name": "Gaurav Kumar",
          // "email": "gaurav.kumar@example.com",
          // "contact": "9999999999"
        },
        notes: {},
        theme: {
          color: "#f4dcab",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      // Performing the POST request using Axios
      // const response = await axios.post(`${BASE_URL}/order/create_order/`, data, config);

      // The response data is directly accessible
      // console.log('Response:', response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(
    "product_variants",
    cartItems.map((item) => item.product_varient.id)
  );
  console.log(
    "quantyties",
    cartItems.map((item) => item.quantity)
  );
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
    <div className="flex flex-col relative justify-center items-center">
      <div className="fixed inset-0">
        <img
          src={bg}
          alt="bg"
          className="absolute inset-0 w-screen h-full object-cover  filter brightness-50"
        />
      </div>
      <div className="mt-36 sm:mt-60 z-10 p-4 flex flex-col gap-4 max-w-3xl">
        <div className="w-full">
          <h1 className="text-xl font-semibold text-white text-center">CHECKOUT</h1>
        </div>
        <div className="flex flex-col gap-4">
          <ShippingInfo signUpData={null} />
          <div>
            <div className="text-white">
              <h2 className="text-lg font-semibold">
                TOTAL AMOUNT TO PAY : {totalSum}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={postCartItems}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
