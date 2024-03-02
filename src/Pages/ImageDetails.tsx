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



  const { id } = useParams<{ id: string }>();

  const imageDetails = data.find(item => item.id.toString() === id);
  console.log('Image Details:', imageDetails);

  const handleAddToBag = () => {
    if (imageDetails) {
      addToBag({ ...imageDetails, quantity: 1 });
      console.log('Added to bag:', imageDetails);
    }
  };
 
  return (
 
<div className="h-screen relative flex justify-center items-center">
  <div className="fixed flex z-0 justify-center inset-0 bg-black opacity-20">
  <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
  </div>
  <div className="w-max  flex justify-center items-center z-10 ">
    {imageDetails && (
    <div className="grid grid-cols-2 gap-4">
  <div className="relative   flex items-center justify-center">
  <Carousel image={imageDetails.url || ''} />
</div>



    <div className="font-bold my-text sm:w-1/2">
      <h1 className="text-2xl mb-4">{imageDetails.name}</h1>
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
          <li>Paragraphs are the building blocks of papers.</li>
          <li>Many students define paragraphs in terms of length: a paragraph is a group of page long, etc.</li>
          <li>In reality, though, the unity and coherence of ideas among sentences are what constitute a paragraph.</li>
        </ul>
        <p className='font-semibold my-text mt-4 sm:w-1/2'>{imageDetails.tagName}</p>
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
