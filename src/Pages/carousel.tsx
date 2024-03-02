import React, { useState } from 'react';
import '../css/carousel.css'; 

interface CarouselProps {
  image: string; 
}

const Carousel: React.FC<CarouselProps> = ({ image }) => {
  
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <input type="radio" name="slider" id="item-1" checked={isChecked} onChange={handleCheckboxChange} />
      <input type="radio" name="slider" id="item-2" checked={isChecked} onChange={handleCheckboxChange} />
      <input type="radio" name="slider" id="item-3" checked={isChecked} onChange={handleCheckboxChange} />
      <input type="radio" name="slider" id="item-4" checked={isChecked} onChange={handleCheckboxChange} />
      <input type="radio" name="slider" id="item-5" checked={isChecked} onChange={handleCheckboxChange} />

      <div className="cards">
        <label className="card" htmlFor="item-1" id="song-1">
          <img src={image} alt="" />
        </label>
        <label className="card" htmlFor="item-2" id="song-2">
          <img src={image} alt="" />
        </label>
        <label className="card" htmlFor="item-3" id="song-3">
          <img src={image} alt="" />
        </label>
        <label className="card" htmlFor="item-4" id="song-4">
          <img src={image} alt="" />
        </label>
        <label className="card" htmlFor="item-5" id="song-5">
          <img src={image} alt="" />
        </label>
      
      </div>
    </div>
  );
};

export default Carousel;
