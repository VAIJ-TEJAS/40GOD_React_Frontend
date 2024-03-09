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
  //       const response = await axios.get('https://13.235.104.232/product/');
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
    <div className="flex flex-col relative min-h-screen">
      <div className="fixed inset-0 bg-black">
        <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-75" />
      </div>
      {/* <div className="mt-40 p-24">
        
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
                className="object-cover w-full rounded-lg"
              />
              </Link>
              <p className={`text-center my-text py-2 px-4 ${hoveredId !== product.colors[0].image_product[0].id && 'invisible'}`}>
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
      </div> */}
    </div>
  )};

