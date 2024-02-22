import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../assets/data.json'; // Assuming data is imported correctly
import bg2 from './../assets/background/b2.jpeg';

interface ImageData {
  tagName?: string;
  id: number;
  url: string;
  name: string;
}


const Option1: React.FC = () => {
  const newData = data.filter((item: ImageData) => item.tagName === "new") as ImageData[];
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div>
      <div className="w-full justify-center items-center relative">
        <div className=" inset-0 bg-black opacity-50">
          <img src={bg2} alt='bg' className="w-full h-auto object-cover opacity-70 filter brightness-75" />
        </div>
      </div>
      <div className="justify-center items-center mt-40 p-24 ">
        <div className="grid grid-cols-2 gap-20">
          {newData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center relative"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ width: '25rem', height: 'auto' }}
            >
              <Link to={`/Option1/${item.id}`}>
                <div
                  className={`shadow-lg rounded-lg transition-all duration-300 ${hoveredId === item.id ? 'shadow-xl' : ''}`}
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
                  />
                  {hoveredId === item.id && (
                    <p
                      className="absolute inset-x-0 bottom-0 text-center my-text py-1 px-2 bg-white bg-opacity-90"
                      style={{ transition: 'opacity 0.3s', opacity: 1 }}
                    >
                      Name: {item.name}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Option1;
