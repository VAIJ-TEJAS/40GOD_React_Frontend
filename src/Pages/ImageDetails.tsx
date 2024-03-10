import { useParams } from 'react-router-dom';
import './../css/Button.css';
import bg from "../assets/background/Backgroud.jpeg";
import color0 from "../assets/logo.png";
import { Product } from '../types/productType';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Login from './Modal';

interface ImageDetailsProps {
  addToBag: (item: Product) => void;
  checkoutItems: Product[];
}

const ImageDetails: React.FC<ImageDetailsProps> = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  setIsModalOpen(false);
  document.body.style.overflow = 'auto';
};


  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      (prevSlide + 1) % (product?.colors?.[0]?.image_product?.length ?? 1)
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0
        ? (product?.colors?.[0]?.image_product?.length ?? 1) - 1
        : prevSlide - 1
    );
  };

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color: number) => {
    setSelectedColor(color);
  };

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

      const response = await axios.post('/cart-items/', productWithQuantity, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
  
      console.log('Added to bag:', response.data);
      setIsAdded(true);

    } catch (error) {
      setIsModalOpen(true);

      console.error('Error adding item to bag:', error);
      

    }
  };







  return (
    <div className="flex flex-col   ">
      <div className="fixed inset-0 bg-black">
        <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full  object-cover  filter brightness-75" />
      </div>
      <div className=" mt-60 sm:p-8  z-10 ">
        {imageDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-20">
            <div className="flex items-center justify-center">

               
              
      <div className="carousel">
      <button className="prev" onClick={prevSlide}>
        &lt;
      </button>
      <div className="carousel-inner">
        {product.colors?.[selectedColor]?.image_product?.map((imageData, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={imageData.image} alt={product.colors?.[selectedColor]?.display_name} />
          </div>
        ))}
      </div>
      <button className="next" onClick={nextSlide}>
        &gt;
      </button>      
              </div>

            </div>
            <div className=''>
            <div className="font-bold my-text sm:ml-5 mt-12  " >
              <h1 className="text-2xl mb-4">Name : {product.name}</h1>
              <div>
                {product.colors?.map(color => (
                  <div key={color.id}>
                    <h3>Color : {color.display_name}</h3>
                  </div>
                ))}

              </div>
              <div className="flex gap-2">
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
              <div className="flex gap-2 mt-4 mb-4 ">
              {product.colors?.map((color, index) => (
                  <div key={color.id}>
                     <button
                 style={{ backgroundColor:`${color.hex_code}`}}
                  className={`w-10 h-10 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${selectedSize === 'M' ? 'bg-green-500' : ''}`}
                  onClick={() => handleColorClick(index)}
                >
                 <img src={color0} alt='image' />

                </button>
                  </div>
                ))}
              </div>
              <div >
                <ul className="list-disc">
                  <li> {product.description}.</li>
                </ul>
                <p className='font-semibold my-text mt-4 '>{product.price}</p>
                <p className='font-semibold my-text mt-4 '>{product.category}</p>
              </div>
              <div className=" sm:inline-block mt-4">
              <button className={`bg-black shadow-3xl  text-white my-text hover:bg-white hover:text-black p-2 rounded-lg  ${isAdded ? 'added' : ''}`} onClick={handleAddToBag}>
      {isAdded ? 'Added to Bag' : 'Add to Bag'}
    </button>              </div>
            </div></div>
          </div>
        )}
      </div>
      <Login isOpen={isModalOpen} onClose={closeModal} />

    </div>
  );
}

export default ImageDetails;
