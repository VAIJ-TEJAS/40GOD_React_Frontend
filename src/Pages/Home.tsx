// import { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
import bg from '../assets/background/Backgroud.jpeg';
// import { Product } from '../types/productType';
import axios from 'axios'
export const Home = () => {
  // const [hoveredId, setHoveredId] = useState<number | null>(null);
  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/product/');
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  
  // const newData: Product[] = products.filter((product: Product) =>
  //   product.tags?.some(tag => tag.text === "New")
  // ).slice(0, 4);
  const newLocal = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${newLocal}`;
  return (
    <div className="flex flex-col relative full-height-div .full-height-div">
      <div className="fixed inset-0 bg-black">
        <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-50" />
      </div>
  
    </div>
  )};

