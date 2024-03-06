import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import bg from '../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg'
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


function Bag() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('http://13.235.104.232:8000/cart-items/', {
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
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .delete(`http://13.235.104.232:8000/cart-items/${itemId}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          console.log('Item deleted:', itemId);
          setCartItems(cartItems.filter(item => item.id !== itemId));
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    }
  };




  return (


    <div className="flex flex-col min-h-screen relative h-full justify-center items-center">
      <div className="fixed z-5 inset-0 bg-black opacity-20">
        <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
      </div>
      <div className="flex h-full z-10 item-center justify-center mt-40">
        {cartItems.length === 0 ? (
          <p>Your bag is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div className="flex" key={item.id}>
                <div className="w-full mr-4">
                  <div className="grid grid-cols-5 grid-rows-1 gap-4 mt-40">
                    <div className=" p-4 text-center">
                      {item.product_varient && item.product_varient.color && item.product_varient.color.image_product &&
                        item.product_varient.color.image_product[0] &&
                        <img src={item.product_varient.color.image_product[0].image} alt={item.product_varient.color.display_name} />}
                    </div>
                    <div className=" p-4 text-center"><p>Color Name: {item.product_varient && item.product_varient.color && item.product_varient.color.color_name}</p><p>{item.product_varient && item.product_varient.color && item.product_varient.color.hex_code}</p></div>
                    <div className=" p-4 text-center space-x-4"><p>Size: {item.product_varient && item.product_varient.size && item.product_varient.size.text}  Color: {item.product_varient && item.product_varient.color && item.product_varient.color.display_name}</p></div>
                    <div className=" p-4 text-center">
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div>
            <div className="w-full mt-40  mr-4">
              <div className="bg-gray-300 p-6 text-center">
                {cartItems.map((item) => (
                  <div className="flex" key={item.id}>
                    <div className="grid grid-cols-5 grid-rows-1 gap-4 ">
                      <div className="text-center"><p>{item.product_varient && item.product_varient.color && item.product_varient.color.color_name} {item.quantity}</p></div>
                      <div className="text-center"><p> {item.product_varient && item.product_varient.size && item.product_varient.size.text}</p></div>

                      <div className="text-center"><p>Navy blue</p></div>
                      <div className="text-center">
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-center"><p>amt:10000</p></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 grid-rows-1 gap-4 border border-black">
                <h1>Total</h1><div></div><>1</> <h1>10000</h1>
              </div>
              <div className="flex item-center justify-center mt-4">
                <Link to="/checkout">
                  <button className="button my-text pl-40 pr-40">Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className=" item-center z-10 justify-center m-4 ">
        <NavLink to="/">
          <button className="button my-text">Continue Shopping</button>
        </NavLink>
      </div>
    </div>

















  );
}

export default Bag;
