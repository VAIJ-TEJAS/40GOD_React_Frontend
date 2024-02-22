import React from 'react';

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

const History: React.FC<CheckoutProps> = ({ checkoutItems }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
    <div className="w-full p-8 bg-white rounded-lg shadow-lg">
      <div className=" mb-8">
        <h1 className="text-3xl font-bold">History</h1>
      </div>
      {checkoutItems.map(item => (
        <div className="flex " key={item.id}>
          <div className="w-full ">
            <div className="grid grid-cols-4 grid-rows-1 gap-4">
              <div className="bg-gray-300 p-4 flex items-center justify-center">
                <img src={item.url} alt={`Image ${item.id}`} className="max-h-24 max-w-full" />
              </div>
              <div className="bg-gray-300 p-4 text-center flex items-center justify-center">{item.name}</div>
              <div className="bg-gray-300 p-4 text-center flex items-center justify-center">Color</div>
              <div className="bg-gray-300 p-4 text-center flex items-center justify-center">Color</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  
  );
};

export default History;
