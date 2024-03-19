import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bg2 from './../assets/background/b9.jpeg';
import bg from '../assets/background/Backgroud.jpeg';
import { Product } from '../types/productType';
import axios from 'axios'
import '../css/blur.css'
const Option1: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/product/');
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


  
  return (
  <div className=" relative">
    <div className="fixed inset-0 bg-black">
      <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-75" />
    </div>

    <div className="relative w-full h-screen sm:h-[300vh] " >
    <img src={bg2} alt='bg' className="absolute inset-0 w-full h-full object-cover filter brightness-75" />
    <div className="absolute inset-x-0 mt-80 flex flex-col justify-center items-center">
    <p className="text-white  font-bold got-text text-3xl lg:text-9xl ">Getting Out Drippin</p>
</div>
</div>


    <div className="mt-20 sm:mt-40 p-24">

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
                    <Link to={`/Option1/${product.id}`}>
                      <img
                        src={product.colors[0].image_product[0].image}
                        alt={`Image ${product.colors[0].image_product[0].id}`}
                        className="object-cover blur w-full rounded-lg"
                      />
                      <p className='drop-shadow-text got-text '>Dropping Soon </p>

                    </Link>
                    <p className={`text-center my-text blur py-2 px-4 ${hoveredId !== product.colors[0].image_product[0].id && 'invisible'}`}>
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

export default Option1;
