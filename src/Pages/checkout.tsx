import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg2 from './../assets/background/b2.jpeg'
import bg from '../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg';

interface ImageData {
  id: number;
  url: string;
  name: string;
  tagName?: string;
  quantity?: number;
}

interface CheckoutProps {
  checkoutItems: ImageData[];
}

const Checkout: React.FC<CheckoutProps> = ({ checkoutItems }) => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(() => {
    const quantitiesMap: { [key: number]: number } = {};
    checkoutItems.forEach(item => {
      if (item.quantity !== undefined) {
        quantitiesMap[item.id] = item.quantity;
      }
    });
    return quantitiesMap;
  });

  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleIncrement = (id: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 0) - 1, 0),
    }));
  };

  const totalQuantity = Object.values(quantities).reduce((acc, val) => acc + val, 0);
  const totalAmount = checkoutItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="fixed inset-0 bg-black opacity-20">
        <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
      </div>
      <div className="w-full max-w-md  p-8 mt-16 rounded-lg ">
        <div className="relative z-10 p-8 bg-white rounded-lg shadow-lg">
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg shadow-lg">
            <img src={bg2} alt='bg' className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-center">Checkout</h1>
          {checkoutItems.length === 0 ? (
            <p className="text-center">Your checkout is empty.</p>
          ) : (
            <>
              {checkoutItems.map(item => (
                <div className="border-b-2 border-black py-4 flex items-center justify-between" key={item.id}>
                  <div className="flex items-center">
                    <img src={item.url} alt="img" className="w-16 h-auto mr-4 shadow-md" />
                    <div>
                      <p>{item.name}</p>
                      <p className="text-gray-500">color</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDecrement(item.id)}>-</button>
                    <span className="mx-2">{quantities[item.id]}</span>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => handleIncrement(item.id)}>+</button>
                  </div>
                  <div>
                    <p>{quantities[item.id]}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-between border-t-2 border-black py-4">
                <div className="text-xl">Total</div>
                <div className="text-xl">{totalQuantity}</div>
                <div className="text-xl">{totalAmount}</div>
              </div>
              <div className="mt-4 text-center">
                <button className="button my-text pl-4 pr-4 ml-4" onClick={() => {
                  navigate('/checkout');
                  alert('Checked out successfully!');
                }}>CheckOut</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>




  );
};

export default Checkout;
