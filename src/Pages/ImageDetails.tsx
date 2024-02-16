import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../assets/data.json';
import './../css/Button.css';
import { NavLink } from "react-router-dom";


interface ImageData {
  tagName?: string;
  id: number;
  url: string;
  name: string;
}



interface ImageDetailsProps {
  addToBag: (item: ImageData) => void;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ addToBag }) => {
  const { id } = useParams<{ id: string }>();

  const imageDetails = data.find(item => item.id.toString() === id);

  const handleAddToBag = () => {
    if (imageDetails) {
      addToBag(imageDetails);
      console.log('Added to bag:', imageDetails);
    }
  };


  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="w-full max-w-lg flex justify-center items-center">
        {imageDetails && (
        <table className="w-full table-auto p-4">
        <tbody>
          <tr>
            <td style={{ width: '40%' }} rowSpan={7}>
              <div className="flex justify-center items-center">
                <img src={imageDetails.url} alt={`Image ${imageDetails.id}`} />
              </div>
            </td>
          </tr>
          <tr>
            <td className='font-bold my-text' style={{ width: '60%' }}>
              <h1>{imageDetails.name}</h1>
            </td>
          </tr>
          <tr>
            <td className="flex gap-2">
              <button className="w-10 space-y-2 h-10 text-center rounded-full bg-red-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center">S</button>
              <button className="w-10 space-y-2 h-10 text-center rounded-full bg-red-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center">M</button>
              <button className="w-10 space-y-2 h-10 text-center rounded-full bg-red-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center">L</button>
              <button className="w-10 space-y-2 h-10 text-center rounded-full bg-red-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center">XL</button>
            </td>
          </tr>
          <tr>
            <td className='my-text'>
              <NavLink className="hidden sm:inline-block" to="/">
                <div>
                  <p>
                    Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences are what constitute a paragraph.
                  </p>
                </div>
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>red</td>
          </tr>
          <tr>
            <td className='font-semibold my-text'>{imageDetails.tagName}</td>
          </tr>
          <tr>
            <td>
              <div className="hidden sm:inline-block">
                <div>
                  <button className="button my-text" onClick={handleAddToBag}>Add to Bag</button>
                  <div className="drip-1"></div>
                  <div className="drip-2"></div>
                  <div className="drip-3"></div>
                </div>
              </div>
              <NavLink className="hidden sm:inline-block" to="/">
                <div>
                  <button className="button my-text pl-4 pr-4 ml-4">CheckOut</button>
                  <div className="drip-1"></div>
                  <div className="drip-2"></div>
                </div>
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
      
        )}
      </div>
    </div>
  );
}

export default ImageDetails;
