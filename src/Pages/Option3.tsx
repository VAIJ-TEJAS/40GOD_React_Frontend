import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import bg2 from './../assets/background/b10.jpeg';
import bg from '../assets/background/Backgroud.jpeg';
import { Product } from '../types/productType'; 
import axios from 'axios'
const option3: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://13.235.104.232/product/');
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
    <div className="fixed inset-0 bg-black">
      <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-75" />
    </div>
    <div className="w-full  inset-0 bg-black ">
        <img src={bg2} alt='bg' className="w-full h-screen object-cover  filter brightness-75" />
      </div>
    <div className="mt-40 p-24">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      {newData.map((product) => (
<div key={product.id}>
  {product.colors && product.colors.length > 0 && (
    <div key={product.colors[0].id}>
             {product.colors[0].image_product && product.colors[0].image_product[0] && (

          <div
          key={product.colors[0].image_product[0].id}
            className="relative flex flex-col items-center justify-center transition-transform duration-300 transform"
            onMouseEnter={() => product.colors && product.colors[0] && product.colors[0].image_product && product.colors[0].image_product[0] && setHoveredId(product.colors[0].image_product[0].id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ transform: hoveredId === product.colors[0].image_product[0].id ? 'scale(1.05)' : 'scale(1)' }}
            >
            <Link to={`/Option3/${product.id}`}>
            <img
              src={product.colors[0].image_product[0].image}
              alt={`Image ${product.colors[0].image_product[0].id}`}
              className="object-cover w-full rounded-lg"
            />
            </Link>
            <p className={`text-center my-text py-2 px-4 ${hoveredId !== product.colors[0].image_product[0].id && 'invisible'}`}>
              Name: {product.name}
              <br />
              Price: {product.price}
            </p>
          </div>
        )}
      )
    </div>
  )}
</div>
))}



      </div>
    </div>
  </div>
  );
};

export default option3;
