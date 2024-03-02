import { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../assets/data.json';
import bg from '../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg';

interface ImageData {
  id: number;
  url: string;
  name?: string;
  tagName?: string;
  quantity?: number;
  price?: number;
}

export const Home = () => {
  const newData = data.filter((item: ImageData) => item.tagName === "new").slice(0, 4) as ImageData[];

  // Explicitly specify the type of state and state updater function
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="flex flex-col relative">
      <div className="fixed inset-0 bg-black opacity-20">
        <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
      </div>
      <div className="mt-40 p-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {newData.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col items-center justify-center transition-transform duration-300 transform"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ transform: hoveredId === item.id ? 'scale(1.05)' : 'scale(1)' }}
            >
              <Link to={`/Option1/${item.id}`}>
                <img
                  src={item.url}
                  alt={`Image ${item.id}`}
                 
                  className="object-cover w-full rounded-lg"
                />
              </Link>
              <p className={`text-center my-text py-2 px-4 ${hoveredId !== item.id && 'invisible'}`}>
                Name: {item.name}
                <br/>
                Price:   {item.price}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
   
  );
};
