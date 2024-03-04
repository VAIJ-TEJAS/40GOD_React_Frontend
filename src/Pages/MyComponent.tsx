import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: string;
  category: number;
  colors: Color[];
  tags: Tag[];
}

interface Color {
  id: number;
  display_name: string;
  color_name: string;
  hex_code: string;
  image_product: Image[];
}

interface Image {
  id: number;
  image: string;
}

interface Tag {
  id: number;
  text: string;
}

const MyComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://13.235.104.232:8000/product/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <div>
            <h3>Colors:</h3>
            {product.colors.map(color => (
              <div key={color.id}>
                <p>{color.display_name}</p>
                <img src={color.image_product[0].image} alt={color.display_name} />
              </div>
            ))}
          </div>
          <div>
            <h3>Tags:</h3>
            {product.tags.map(tag => (
              <span key={tag.id}>{tag.text}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
