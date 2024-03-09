import { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  quantity: number;
  id: number;
  product_varient: {
    color: {
      display_name: string;
      image_product: any;
      product: any;
      color_name: string;
    };
    image_product: {
      id: number;
      image: string;
    }[];
    product: {
      name: string;
      price: string;
    };
    quantity: number;
    size: {
      text: string;
    };
  };
  user: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

interface HistoryProps {
  historyItems: CartItem[];
}

const History: React.FC<HistoryProps> = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const BASE_URL = 'https://13.235.104.232';
  const token: string | null = localStorage.getItem('token');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/order/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        });
        setCartItems(response.data);
        console.log('response', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCartItems();
  }, []);

  

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">History</h1>
        </div>
        {cartItems && cartItems.length > 0 ? (
  cartItems.map(item => (
    <div className="flex" key={item.id}>
      <div className="w-full">
        <div className="grid grid-cols-4 grid-rows-1 gap-4">
          <div className="bg-gray-300 p-4 flex items-center justify-center">
          
              <img src={item.product_varient.color.image_product[0].image} alt={`Image ${item.id}`} className="max-h-24 max-w-full" />
         
          </div>
          <div className="bg-gray-300 p-4 text-center flex items-center justify-center">
            { item.product_varient.color.display_name}
          </div>
          <div className="bg-gray-300 p-10 text-center items-center justify-center">
            <p>Quantity-{item.quantity}</p>
            <p>{item.product_varient.color && item.product_varient.color.color_name}</p>
          </div>
          <div className="bg-gray-300 p-4 text-center flex items-center justify-center">
            <p>Price-{ item.product_varient.color.product.price}</p>
          </div>
        </div>

      </div>
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
