import { useParams } from 'react-router-dom';
import './../css/Button.css';
import bg from "../assets/background/Backgroud.jpeg";
import color0 from "../assets/logo.png";
import { Product } from '../types/productType';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Modal';

interface ProductVariant {
  id: number;
  color: {
    display_name: string;
    hex_code: string;
  };
  size: {
    text: string;
  };
  quantity: number;
}

interface ImageDetailsProps {
  addToBag: (item: Product) => void;
  checkoutItems: Product[];
}


const ImageDetails: React.FC<ImageDetailsProps> = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedProductVariantId, setSelectedProductVariantId] = useState<number | null>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [productVariant, setProductVariant] = useState<ProductVariant[]>([]);
  const { id } = useParams<{ id?: string }>() ?? {};
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

console.log(selectedProductVariantId)
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextSlide = () => {
    console.log("Next Slide");
    setCurrentSlide((prevSlide) => (prevSlide + 1) % (product?.colors?.[selectedImage]?.image_product?.length ?? 1));
  };
  
  const prevSlide = () => {
    console.log("Prev Slide");
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? (product?.colors?.[selectedImage]?.image_product?.length ?? 1) - 1 : prevSlide - 1));
  };
  
  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index); 
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    setSelectedColor(null);

    
    const variant = productVariant.find((variant) => variant.size.text === size);


    setSelectedProductVariantId(variant ? variant.id : null);
  };

  const handleColorClick = (color: string,Image: number) => {
    setSelectedColor(color);
    setSelectedImage(Image);

   
    const variant = productVariant.find((variant) => variant.size.text === selectedSize && variant.color.hex_code === color);

    if (variant) {
      console.log('Selected Product Variant ID:', variant.id);
    } else {
      console.log('Product Variant not found for selected color and size');
    }
  };

 

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const response = await axios.get(`https://13.235.104.232/inventory/?product_id=${id}`);
        setProductVariant(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Set the initial selected size to be the first size available
    if (productVariant.length > 0) {
      setSelectedSize(productVariant[0].size.text);
    }
  }, [productVariant]);

  if (!id) {
    return <div>No ID provided</div>;
  }

  const product = products.find((product) => product.id === parseInt(id));
  if (!product) {
    return <div>Product not found</div>;
  }
  const handleAddToBag = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("Token not found.");
        return;
      }

      const productWithQuantity = {
        "product_varient": 16,
        "quantity": 1
    }
    

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
  const availableColors = productVariant
  .filter(variant => variant.size.text === selectedSize)
  .map(variant => variant.color.hex_code);
  const uniqueSizes = [...new Set(productVariant.map(variant => variant.size.text))];
console.log(products)
  return (
    <div className="flex flex-col">
      <div className="fixed inset-0 bg-black">
        <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover filter brightness-75" />
      </div>
      
      <div className="mt-60 sm:p-8 z-10">
        {product && (
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-20">
            <div className="flex items-center justify-center">
            <div>
            <div className="carousel relative overflow-hidden w-68 h-68">
  <button className="prev absolute top-1/2 transform -translate-y-1/2 left-0 bg-black bg-opacity-50 text-white px-4 py-2 z-10" onClick={prevSlide}>&lt;</button>
  <div className="carousel-inner flex transition-transform duration-500 ease-in-out">
    {product.colors?.[selectedImage]?.image_product?.map((imageData, index) => (
      <div
        key={index}
        className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
        style={{ display: index === currentSlide ? 'block' : 'none' }}
      >
        <img src={imageData.image} alt={product.colors?.[0]?.display_name} className="w-full h-full object-cover" />
      </div>
    ))}
  </div>
  <button className="next absolute top-1/2 transform -translate-y-1/2 right-0 bg-black bg-opacity-50 text-white px-4 py-2 z-10" onClick={nextSlide}>&gt;</button>
</div>
      <div className="carousel-thumbnails">
        {product.colors?.[selectedImage]?.image_product?.map((imageData, index) => (
          <img
            key={index}
            src={imageData.image}
            alt={product.colors?.[0]?.display_name}
            onClick={() => handleThumbnailClick(index)}
            className={`thumbnail ${index === currentSlide ? 'selected' : ''}`}
          />
        ))}
      </div>
    </div>



            </div>
            <div className="">
              <div className="font-bold my-text sm:ml-5 mt-12">
                <h1 className="text-2xl mb-4">Name: {product.name}</h1>
                <div className="flex gap-2">
                {uniqueSizes.map((size, index) => (
  <div key={index}>
    <button
      className={`w-10 h-8 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${size === selectedSize ? 'bg-green-500' : ''}`}
      onClick={() => handleSizeClick(size)}
    >
      {size}
    </button>
  </div>
))}
                </div>
                <div className="flex gap-2 mt-4 mb-4">
                {availableColors.map((color, index) => (
                    <button
                      key={index}
                      style={{ backgroundColor: color }}
                      className={`w-10 h-10 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${selectedColor === color ? 'bg-green-500' : ''}`}
                      onClick={() => handleColorClick(color,index)}
                    >
                      <img src={color0} alt='image' />
                    </button>
                  ))}
                </div>
                <div>
                  <ul className="list-disc">
                    <li>{product.description}.</li>
                  </ul>
                  <p className='font-semibold my-text mt-4'>{product.price}</p>
                  <p className='font-semibold my-text mt-4'>{product.category}</p>
                </div>
                <div className="sm:inline-block mt-4">
                  <button className={`bg-black shadow-3xl text-white my-text hover:bg-white hover:text-black p-2 rounded-lg ${isAdded ? 'added' : ''}`} onClick={handleAddToBag}>
                    {isAdded ? 'Added to Bag' : 'Add to Bag'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Login isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default ImageDetails;
