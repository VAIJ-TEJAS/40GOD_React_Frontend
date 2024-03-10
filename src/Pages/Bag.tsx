import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import bg from '../assets/background/Backgroud.jpeg';
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
    <div className="flex flex-col relative min-h-screen">
     <div className="fixed inset-0 bg-black">
        <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-75" />
      </div>
      <div className="sm:flex h-full  z-10 item-center justify-center mt-60">
        {cartItems.length === 0 ? (
          <p>Your bag is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div className="flex" key={item.id}>
                <div className="w-full mr-4">
                  <div className="grid sm:grid-cols-5 grid-rows-1 sm:gap-4 mt-40">
                    <div className="sm:p-4 text-center">
                      {item.product_varient &&
                        item.product_varient.color &&
                        item.product_varient.color.image_product &&
                        item.product_varient.color.image_product[0] && (
                          <img
                            src={
                              item.product_varient.color.image_product[0].image
                            }
                            alt={item.product_varient.color.display_name}
                          />
                        )}
                    </div>
                    <div className="sm:p-4 text-center">
                      <p>
                        Color Name:{' '}
                        {item.product_varient &&
                          item.product_varient.color &&
                          item.product_varient.color.color_name}
                          
                      </p>
                      
                      <p>
                        {item.product_varient &&
                          item.product_varient.color &&
                          item.product_varient.color.hex_code}
                      </p>
                    </div>
                    <div className="sm:p-4 text-center sm:space-x-4">
                      <p>
                        Size:{' '}
                        {item.product_varient &&
                          item.product_varient.size &&
                          item.product_varient.size.text}{' '}
                        Color:{' '}
                        {item.product_varient &&
                          item.product_varient.color &&
                          item.product_varient.color.display_name}
                          <p>Quantity: </p>
                      </p>
                      <div className='flex items-center justify-center sm:mr-4'>
                      <button className='bg-gray-900 hover:bg-white border border-gray-300 shadow-xl m-4  text-white hover:text-black p-2 rounded-full' onClick={() => handleIncreaseQuantity(item.id)}>
                     +
                      </button>
                      <p>{item.quantity}</p> 
                      <button className='bg-gray-900 hover:bg-white border border-gray-300 shadow-xl m-4 mr-8 text-white hover:text-black p-2 rounded-full' onClick={() => handleDecreaseQuantity(item.id)}>
                       -
                      </button>
                      </div>
                    </div>
                    <div className="sm:p-4 text-center">
                      <button onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                     
                     
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div>
            <div className="sm:w-full mt-40 sm:mr-4">
              <div className="bg-gray-300 p-6 text-center">
                {cartItems.map((item) => (
                  <div className="flex" key={item.id}>
                    <div className="grid grid-cols-5 grid-rows-1 gap-4">
                      <div className="text-center">
                        <p>
                          {item.product_varient &&
                            item.product_varient.color &&
                            item.product_varient.color.color_name}{' '}
                          {item.quantity}
                        </p>
                      </div>
                      <div className="text-center">
                        <p>
                          {' '}
                          {item.product_varient &&
                            item.product_varient.size &&
                            item.product_varient.size.text}
                        </p>
                      </div>
                      <div className="text-center">
                        <p>Navy blue</p>
                      </div>
                      <div className="text-center">
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-center">
                        <p>Price:  {item.product_varient &&
                          item.product_varient.color &&
                          item.product_varient.color.product.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <>
              <div className="grid grid-cols-2 grid-rows-1 sm:gap-64 border border-black">
                <h1>Total</h1>
           
                <>
                 
                  <h1>  {totalSum}
                  </h1>
                </>
              </div>
              <div className="flex item-center justify-center mt-4">
                <Link to="/checkout">
                  <button className="button my-text pl-40 pr-40">
                    Checkout
                  </button>
                </Link>
              </div>
           
            </>  
            </div></div>
        )}
      </div>
      <div className="flex item-center z-10 justify-center m-4">
        <NavLink to="/">
          <button className="button my-text ">Continue Shopping</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Bag;
