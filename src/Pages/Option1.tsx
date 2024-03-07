import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import bg2 from './../assets/background/b4.jpeg';
import bg from '../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg';
import { Product } from '../types/productType'; 
import axios from 'axios'
const Option1: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://13.235.104.232/product/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const newData: Product[] = products.filter((product: Product) =>
  product.tags?.some(tag => tag.text === "New")
);


  const newLocal = <div className="flex flex-col relative w-screen ">
    <div className="fixed inset-0 bg-black opacity-20 w-screen">
      <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover opacity-70 filter brightness-75" />
    </div>
    <div className="w-full  inset-0 bg-black ">
      <img src={bg2} alt='bg' className="w-screen h-auto object-cover filter brightness-75" />
    </div>
    <div className="mt-40 p-24 w-screen">
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
                    <Link to={`/Option1/${product.id}`}>
                      <img
                        src={color.image_product[0].image}
                        alt={`Image ${color.image_product[0].id}`}
                        className="object-cover w-full rounded-lg" />
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
  </div>;
  return (
    newLocal
  );
};

export default Option1;
