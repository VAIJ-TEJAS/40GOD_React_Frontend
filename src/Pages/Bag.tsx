import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import bg from '../assets/background/Backgroud.jpeg';
import "../App.css"
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
  product:productData
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
  price:number
}

function Bag() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const handleDelete = (itemId: number) => {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      axios
        .delete(`/cart-items/${itemId}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          console.log('Item deleted:', itemId);
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== itemId)
          );
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    }
  };

  const updateCartItemQuantity = (itemId:number, quantityDelta:number) => {
    const token = localStorage.getItem('token');
  
    if (token) {
      axios.get(`/cart-items/${itemId}/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      })
      .then(response => {
        const currentItem = response.data;
        const currentQuantity = currentItem.quantity;
  
        let newQuantity = currentQuantity + quantityDelta;
        newQuantity = Math.max(newQuantity, 1);
  
       
  
        axios.put(`/cart-items/${itemId}/`, {
          quantity: newQuantity,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        })
        .then(() => {
          console.log('Quantity updated for item:', itemId);
          fetchCartItems(); // Assuming fetchCartItems is defined elsewhere
        })
        .catch(error => {
          console.error('Error updating quantity:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching current quantity:', error);
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
  };
  const totalSum = cartItems.reduce((accumulator, item) => {
    if (item.product_varient && item.product_varient.color && item.product_varient.color.product) {
        const price = item.product_varient.color.product.price * item.quantity;
        return accumulator + price;
    }
    return accumulator;
}, 0);
  return (
<div className="flex flex-col h-[90vh] text-xl text-gray-300 font-semibold">
<div className="fixed inset-0 bg-black">
    <img src={bg} alt="bg" className="absolute inset-0 w-full h-full object-cover filter brightness-50" />
  </div>

  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center z-10 mt-60 px-4">
    {cartItems.length === 0 ? (
      <p className="my-text text-center">Your bag is empty.</p>
    ) : (
      <div className="w-full">
        {cartItems.map((item) => (
          <div className="flex flex-col sm:flex-row w-full mb-12" key={item.id}>
            <div className="w-full sm:mr-4">
              <div className="grid sm:grid-cols-5 grid-cols-1 gap-4">
                <div className="sm:p-4 text-center my-text">
                  {item.product_varient?.color?.image_product?.[0]?.image && (
                    <img
                      src={item.product_varient.color.image_product[0].image}
                      alt={item.product_varient.color.display_name}
                      className="mx-auto max-w-[100px]"
                    />
                  )}
                </div>
                <div className="sm:p-4 text-center my-text">
                  <p className="m-2">Name: {item.product_varient?.color?.display_name}</p>
                  <p className="m-2">Colour: {item.product_varient?.color?.color_name}</p>
                  <p className="m-2">Size: {item.product_varient?.size?.text}</p>
                </div>
                <div className="sm:p-4 flex flex-col items-center justify-center space-y-2">
                  <p className="my-text">Quantity:</p>
                  <div className="flex items-center space-x-4">
                    <button className="text-black font-bold p-2 rounded-full bg-white" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                    <p>{item.quantity}</p>
                    <button className="text-black font-bold p-2 rounded-full bg-white" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  </div>
                </div>
                <div className="sm:p-4 flex items-center justify-center my-text">
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {cartItems.length > 0 && (
      <div className="w-full sm:mt-10 mt-16">
        <div className="my-text p-6 text-center">
          {cartItems.map((item) => (
            <div className="flex flex-col sm:flex-row justify-center mb-4" key={item.id}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                <div className="text-center">
                  <p>{item.product_varient?.color?.color_name}</p>
                </div>
                <div className="text-center">
                  <p>{item.product_varient?.size?.text}</p>
                </div>
                <div className="text-center">
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="text-center">
                  <p>Price: {item.product_varient?.color?.product?.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4">
          <h1 className="text-center sm:text-2xl text-xl font-bold my-text">Total Estimated Amount: {totalSum}</h1>
          <div className="flex justify-center mt-4">
            <Link to="/checkout">
              <button className="button my-text px-12 py-2">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    )}
  </div>

  <div className=" z-[22] sm:50  flex justify-center  mt-4">  
    <NavLink to="/">
      <button className="button my-text">Continue Shopping</button>
    </NavLink>
  </div>
</div>

  );
}

export default Bag;
