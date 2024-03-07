import { useParams } from 'react-router-dom';
import './../css/Button.css';
import bg from "../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg";
import color from "../assets/logo.png";
import { Product } from '../types/productType';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

interface ImageDetailsProps {
  addToBag: (item: Product) => void;
  checkoutItems: Product[];
}

const ImageDetails: React.FC<ImageDetailsProps> = () => {




  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

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

  const { id } = useParams<{ id?: string }>() ?? {}; // Destructuring with nullish coalescing operator

  if (!id) {
    return <div>No ID provided</div>;
  }

  const product = products.find(product => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const imageDetails = products.find(item => item?.id?.toString() === id) || null;
 
  console.log('Image Details:', imageDetails);
  const handleAddToBag = async () => {
    try {
      const token = localStorage.getItem('token');
      const imageDetails = products.find(item => item?.id?.toString() === id);

      if (!imageDetails) {
        console.error("Image details not found.");
        return;
      }

      if (!imageDetails.colors || imageDetails.colors.length === 0) {
        console.error("No colors found for this product.");
        return;
      }

      const firstColor = imageDetails.colors[0];

      if (!firstColor || !firstColor.image_product || firstColor.image_product.length === 0) {
        console.error("No image product found for the first color.");
        return;
      }

      const imageProduct = firstColor.image_product[0];

      if (!imageProduct || !imageProduct.image) {
        console.error("Image product or image URL not found for the first color.");
        return;
      }

     
      const productWithQuantity = {
        product_varient: product.id,
        quantity: 1
      };

      const response = await fetch('https://13.235.104.232/cart-items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(productWithQuantity)
      });

      if (!response.ok) {
        throw new Error('Failed to add item to bag');
      }

      const data = await response.json();
      console.log('Added to bag:', data);
    } catch (error) {
      console.error('Error adding item to bag:', error);
    }
  };







  return (
    <div className="flex flex-col relative  ">
      <div className="fixed  inset-0 bg-black opacity-20">
        <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
      </div>
      <div className=" mt-60 sm:p-8  z-10 ">
        {imageDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-20 w-screen">
            <div className="flex items-center justify-center">
              <div>
                {product.colors?.map(color => (
                  <div key={color.id}>
                    {color.image_product && color.image_product.length > 0 && color.image_product[0]?.image && (
                      <img src={color.image_product[0].image} alt={color.display_name} />
                    )}
                  </div>
                ))}

              </div>
            </div>
            <div className='max-w-screen  '>
            <div className="font-bold my-text max-w-screen  sm:ml-5 mt-12  " >
              <h1 className="text-2xl mb-4">Name : {product.name}</h1>
              <div>
                {product.colors?.map(color => (
                  <div key={color.id}>
                    <h3>Color : {color.display_name}</h3>
                  </div>
                ))}

              </div>
              <div className="flex w-screen gap-2">
                <button
                  className={`w-10 h-8 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${selectedSize === 'S' ? 'bg-green-500' : ''}`}
                  onClick={() => handleSizeClick('S')}
                >
                  S
                </button>
                <button
                  className={`w-10 h-8 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${selectedSize === 'M' ? 'bg-green-500' : ''}`}
                  onClick={() => handleSizeClick('M')}
                >
                  M
                </button>  <button
                  className={`w-10 h-8 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${selectedSize === 'L' ? 'bg-green-500' : ''}`}
                  onClick={() => handleSizeClick('L')}
                >
                  L
                </button>  <button
                  className={`w-10 h-8 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${selectedSize === 'XL' ? 'bg-green-500' : ''}`}
                  onClick={() => handleSizeClick('XL')}
                >
                  XL
                </button>
              </div>
              <div className="flex gap-2 mt-4 mb-4 w-screen">
                <button
                  className={`w-10 text-center rounded-full bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${selectedColor === 'red' ? 'bg-red-800' : ''}`}
                  onClick={() => handleColorClick('red')}
                >
                  <img src={color} alt='image' />
                </button>
                <button
                  className={`w-10 text-center rounded-full bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${selectedColor === 'green' ? 'bg-green-800' : ''}`}
                  onClick={() => handleColorClick('green')}
                >
                  <img src={color} alt='image' />
                </button>
              </div>
              <div className="w-screen sm:w-68" >
                <ul className="list-disc">
                  <li> {product.description}.</li>
                </ul>
                <p className='font-semibold my-text mt-4 sm:w-1/2'>{product.price}</p>
                <p className='font-semibold my-text mt-4 sm:w-1/2'>{product.category}</p>
              </div>
              <div className=" sm:inline-block mt-4">
                <button className="button my-text" onClick={handleAddToBag}>Add to Bag</button>
              </div>
            </div></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageDetails;
