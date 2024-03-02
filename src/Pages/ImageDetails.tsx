import React from 'react';
import { useParams,  } from 'react-router-dom';
import data from '../assets/data.json';
import './../css/Button.css';
import bg from "../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg"
import color from "../assets/logo.png"
import Carousel  from "./carousel";
interface ImageData {
  id: number;
  url: string;
  name?: string;
  tagName?: string;
  quantity?: number;
  price?: number;
}

interface ImageDetailsProps {
  addToBag: (item: ImageData) => void;
  checkoutItems: ImageData[]; 
}


const ImageDetails: React.FC<ImageDetailsProps> = ({  addToBag }) => {




  const imageDetails = data.find(item => item.id.toString() === id);
  console.log('Image Details:', imageDetails);

  const handleAddToBag = () => {
    if (imageDetails) {
      addToBag({ ...imageDetails, quantity: 1 });
      console.log('Added to bag:', imageDetails);
    }
  };
  const { id } = useParams<{ id?: string }>(); // Add a question mark to make id optional

  if (!id) {
    return <div>No ID provided</div>; // Handle the case where id is not provided
  }

  const product = data.find(product => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
 
<div className="h-screen relative flex justify-center items-center">
  <div className="fixed flex z-0 justify-center inset-0 bg-black opacity-20">
  <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
  </div>
  <div className="w-max   justify-center items-center z-10 ">
    {imageDetails && (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div className="relative  flex items-center justify-center">
  {/* <Carousel image={imageDetails.url || ''} /> */}
  <div>
        {product.colors.map(color => (
          <div key={color.id}>
            <h3>{color.display_name}</h3>
            <img src={color.image_product[0].image} alt={color.display_name} />
          </div>
        ))}
      </div>
</div>



    <div className="font-bold my-text sm:w-1/2">
      <h1 className="text-2xl mb-4">{product.name}</h1>
      <div className="flex gap-2">
        <button className="w-10 h-10 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center">S</button>
        <button className="w-10 h-10 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center">M</button>
        <button className="w-10 h-10 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center">L</button>
        <button className="w-10 h-10 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center">XL</button>
      </div>
      <div className="flex gap-2 mt-4 mb-4">
        <button className="w-10 text-center rounded-full bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"><img src={color} alt='image' /></button>
        <button className="w-10 text-center rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"><img src={color} alt='image' /></button>
        <button className="w-10 text-center rounded-full bg-yellow-300 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"><img src={color} alt='image' /></button>
        <button className="w-10 text-center rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"><img src={color} alt='image' /></button>
      </div>
      <div className="w-68">
        <ul className="list-disc">
          <li> {product.description}.</li>
          <li> {product.description}</li>
          <li> {product.description}</li>
        </ul>
        <p className='font-semibold my-text mt-4 sm:w-1/2'>{product.price}</p>
        <p className='font-semibold my-text mt-4 sm:w-1/2'>{product.category}</p>

      </div>
      <div className="hidden sm:inline-block mt-4">
        <button className="button my-text" onClick={handleAddToBag}>Add to Bag</button>
      </div>
    </div>
  </div>
  
    )}
  </div>
  
</div>



  );
}

export default ImageDetails;
