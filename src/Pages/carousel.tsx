import React, { useState, useEffect } from 'react';
import '../css/carousel.css'; // Assuming you have custom styles here

interface CarouselProps {
  images: { id: number; image: string; }[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    }, 5000); // Change slide every 5 seconds, adjust as needed

    return () => clearInterval(interval);
  }, [images.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  if (!images || !Array.isArray(images) || images.length === 0) {
    return null; // or render a placeholder, or handle the case as needed
  }

  return (
    <div>
      <div className="cards">
        {images.map((image, index) => (
          <label key={image.id} className="card" htmlFor={`item-${index + 1}`} id={`song-${index + 1}`}>
            <input type="radio" name="slider" id={`item-${index + 1}`} checked={currentSlide === index} onChange={() => handleSlideChange(index)} />
            <img src={image.image} alt="" />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
