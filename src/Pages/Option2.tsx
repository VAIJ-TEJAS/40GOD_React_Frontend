import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../assets/data.json'; // Assuming data is imported correctly
import bg2 from './../assets/background/b2.jpeg';
import bg from '../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg';

interface ImageData {
  tagName?: string; 
  id: number;
  url: string;
  name: string;
}


const Option1: React.FC = () => {
  const newData = data.filter((item: ImageData) => item.tagName === "dripped") as ImageData[];
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="flex flex-col relative">


    <div className="fixed inset-0 bg-black opacity-20">
      <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
    </div>
    <div className="w-full  inset-0 bg-black opacity-50">
      <img src={bg2} alt='bg' className="w-full h-auto object-cover opacity-70 filter brightness-75" />
    </div>
    <div className="flex justify-center items-center min-h-screen">

      <div className=" mt-20  grid grid-cols-2 gap-20 ">
          {newData.map((item) => (
          <div
          key={item.id}
          className="flex flex-col  relative"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{ width: '25rem', height: 'auto' }}
        >
              <Link to={`/Option1/${item.id}`}>
              <div
                  className={`shadow-lg m-4 rounded-lg transition-all duration-300 ${hoveredId === item.id ? 'shadow-xl' : ''}`}
                  style={{
                    transform: hoveredId === item.id ? 'scale(1.1)' : 'scale(1)',
                    width: '100%',
                    height: 'auto',
                    position: 'relative',
                  }}
                >
              <img
                    src={item.url}
                    alt={`Image ${item.id}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                    }}
                  /></div>
              </Link>
              {hoveredId === item.id && (
                <p className="text-center my-text mt-2  py-1 px-2 transition-opacity duration-300 ease-in-out pb-8">
                  Name: {item.name}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Option1;
