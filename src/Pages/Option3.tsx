import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import bg2 from './../assets/background/b5.jpg';
import bg from '../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg';
import { Product } from '../types/productType'; 
import axios from 'axios'
const option3: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://13.235.104.232:8000/product/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const newData: Product[] = products

  return (
    <div className="flex flex-col relative">
      <div className="fixed inset-0 bg-black opacity-20">
        <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
      </div>
      <div className="w-full inset-0 bg-black opacity-60" style={{ filter: 'grayscale(100%)' }}>
        <img src={bg2} alt='bg' className="w-full h-auto object-cover opacity-60 filter brightness-75" />
      </div>
      <div className="mt-40 p-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {newData.map((product: Product) => (
            <div key={product.id}>
              {product.colors && product.colors.map((color) => (
                <div key={color.id}>
                  {color.image_product?.[0] && ( 
                    <div
                      key={color.image_product[0].id}
                      className="relative flex flex-col items-center justify-center transition-transform duration-300 transform"
                      onMouseEnter={() => setHoveredId(color.image_product?.[0]?.id ?? null)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ transform: hoveredId === color.image_product[0].id ? 'scale(1.05)' : 'scale(1)' }}
                    >
                      <Link to={`/option3/${product.id}`}>
                        <img
                          src={color.image_product[0].image}
                          alt={`Image ${color.image_product[0].id}`}
                          className="object-cover w-full rounded-lg"
                        />
                      </Link>
                      <p className={`text-center my-text py-2 px-4 ${hoveredId !== color.image_product[0].id && 'invisible'}`}>
                        Name: {product.name}
                        <br />
                        Price: {product.price}
                      </p>
                    </div>

                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default option3;
