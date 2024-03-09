/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import ShippingInfo from './shippingInfo';
import bg from '../assets/background/Backgroud.jpeg';
import b4 from '../assets/background/b4.jpeg';
import axios, { AxiosResponse } from 'axios';
import { RazorpayOptions } from '../types/razorpay';

interface ColorData {
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

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      axios
        .get<AddressBookEntry[]>('/address-book/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        })
        .then((response: AxiosResponse<AddressBookEntry[]>) => {
          console.log('Address Book:', response.data);

          if (response.data.length > 0) {
            setSelectedAddressId(response.data[0].id); // Select the first address entry by default
          }
        })
        .catch((error) => {
          console.error('Error fetching address book entries:', error);
        });
    }
  }, []);

  console.log(selectedAddressId)

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      axios
        .get<CartItem[]>('/cart-items/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          console.log('Cart Items:', response.data);
          setCartItems(response.data);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, []);

  const postCartItems = async () => {
    try {
      const BASE_URL = '';
      const token = localStorage.getItem('token');

      // Preparing the data payload for the POST request
      const data = {
        address_id: selectedAddressId
      };

      // Axios request configuration, including the headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      };

      // Performing the POST request using Axios
      const orderResponse = await axios.get(`${BASE_URL}/order/calculate_order/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });

      const { order_id, razorpay_key_id } = orderResponse.data;

      const options:RazorpayOptions = {
        "key": razorpay_key_id,
        "currency": "INR",
        "name": "40.G.O.D",
        "description": "",
        "image": "logo1.png",
        "order_id": order_id,
        "handler": function (response: any) {

          console.log(response);
          axios.post(`${BASE_URL}/order/create_order/`, data, config);
          // Handle payment success
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
        },
        "prefill": {
          // "name": "Gaurav Kumar",
          // "email": "gaurav.kumar@example.com",
          // "contact": "9999999999"
        },
        "notes": {},
        "theme": {
          "color": "#f4dcab"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open()

      // Performing the POST request using Axios
      // const response = await axios.post(`${BASE_URL}/order/create_order/`, data, config);

      // The response data is directly accessible
      // console.log('Response:', response.data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log('product_variants', cartItems.map((item) => (item.product_varient.id)))
  console.log('quantyties', cartItems.map((item) => (item.quantity)))

  return (
    <div className="flex flex-col min-h-screen relative h-full justify-center items-center"> {/* Added px-4 for padding on the left and right */}
      <div className="fixed inset-0 bg-black">
        <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-75" />
      </div>
      <div className='mt-36  relative z-10'>
        <div className="my-8 w-full mt-28">
          <h1 className="text-2xl font-semibold">Checkout</h1>
        </div>
        <div className="grid grid-cols-1 mt-10 md:grid-cols-2  gap-4">


          <ShippingInfo signUpData={null} />


          <div className="p-4 rounded-lg shadow-md" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Items</h2>

              {cartItems.map((item) => (
                <div className="border-b-2 border-black py-4 flex items-center justify-between relative" key={item.id} >
                  <div className="flex items-center" >
                    {item.product_varient &&
                      item.product_varient.color &&
                      item.product_varient.color.image_product &&
                      item.product_varient.color.image_product[0] && (
                        <img
                          src={
                            item.product_varient.color.image_product[0].image
                          }
                          alt={item.product_varient.color.display_name}
                          className='w-16'
                        />
                      )}
                    <div>
                      <p>  Color Name:{' '}
                        {item.product_varient &&
                          item.product_varient.color &&
                          item.product_varient.color.color_name}</p>
                      <p className="text-gray-500">Navy blue</p>
                    </div>
                    <div className='ml-9'>

                      <p className="text-gray-500">Description about jeans</p>
                    </div>
                    <div className='ml-9'>
                      <p>size:M</p>
                      <p className="text-gray-500">{item.quantity}</p>
                    </div>
                    <div className='ml-9'>
                      <p>Amount to be paid</p>
                      <p className="text-gray-500">10000</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 m-4 rounded" onClick={postCartItems}>
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
