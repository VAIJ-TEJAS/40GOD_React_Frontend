import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

interface BagProps {
  bagItems?: CartItem[];
}

const Bag: React.FC<BagProps> = ({ bagItems = [] }) => {
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
          // Update cart items after deletion
          setCartItems(cartItems.filter(item => item.id !== itemId));
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    }
  };
  
  
  

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          {item.product_varient && item.product_varient.color && (
            <img src={item.product_varient.color.image_product[0].image} alt={item.product_varient.color.display_name} />
          )}
          <p>Color: {item.product_varient && item.product_varient.color && item.product_varient.color.display_name}</p>
          <p>Color Name: {item.product_varient && item.product_varient.color && item.product_varient.color.color_name}</p>
          <p>Hex Code: {item.product_varient && item.product_varient.color && item.product_varient.color.hex_code}</p>
          <p>Size: {item.product_varient && item.product_varient.size && item.product_varient.size.text}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Bag;
