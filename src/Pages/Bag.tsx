import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/Button.css';
import { Link } from 'react-router-dom';

interface ImageData {
  tagName: string;
  id: number;
  url: string;
  name: string;
}

interface BagProps {
  bagItems?: ImageData[];
}

const Bag: React.FC<BagProps> = ({ bagItems = [] }) => {

  const [itemCounts, setItemCounts] = useState<{ [key: number]: number }>({});


  const handleIncrement = (itemId: number) => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1,
    }));
  };


  const handleDecrement = (itemId: number) => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [itemId]: Math.max((prevCounts[itemId] || 0) - 1, 0),
    }));
  };




  return (
    <div className="flex flex-col">
      <div className="flex item-center justify-center mt-40">
        <h1>Bag</h1>
        {bagItems.length === 0 ? (
          <p>Your bag is empty.</p>
        ) : (
          <div>
            {bagItems.map((item, index) => (
              <div className="flex" key={index}>
                <div className="w-full mr-4">
                  <div className="grid grid-cols-4 grid-rows-1 gap-4 mt-40">
                    <div className="bg-gray-300 p-4 text-center">
                      <img src={item.url} alt={`Image ${item.id}`} />
                    </div>
                    <div className="bg-gray-300 p-4 text-center"><p>{item.name}</p></div>
                    <div className="bg-gray-300 p-4 text-center"><p>color</p></div>
                    <div className="bg-gray-300 p-4 text-center">
                      <button onClick={() => handleDecrement(item.id)}>-</button>
                      <span className="mx-2">{itemCounts[item.id] || 0}</span>
                      <button onClick={() => handleIncrement(item.id)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {bagItems.length > 0 && (
          <div>
            <div className="w-full mt-40  mr-4">
              <div className="bg-gray-300 p-6 text-center">
                {bagItems.map((item, index) => (
                  <div className="flex" key={index}>
                    <div className="grid grid-cols-4 grid-rows-1 gap-4 ">
                      <div className="text-center"><p>{item.name}</p></div>
                      <div className="text-center"><p>color</p></div>
                      <div className="text-center">
                        <button onClick={() => handleDecrement(item.id)}>-</button>
                        <span className="mx-2">{itemCounts[item.id] || 0}</span>
                        <button onClick={() => handleIncrement(item.id)}>+</button>
                      </div>
                      <div className="text-center"><p>Amount</p></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 grid-rows-1 gap-4 border border-black">
                <h1>Total</h1><div></div><>quantity</> <h1>Amount</h1>
              </div>
              <div className="flex item-center justify-center mt-4">
                <Link to="/checkout">
                  <button className="button my-text pl-40 pr-40">Checkout</button>
                </Link>              </div>
            </div>
          </div>
        )}
      </div>
      <NavLink to="/">
        <div className="flex item-center justify-center m-4">
          <button className="button my-text">Continue Shopping</button>
        </div>
      </NavLink>
    </div>
  );
};

export default Bag;
