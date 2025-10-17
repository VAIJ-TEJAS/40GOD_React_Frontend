import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg2 from "./../assets/background/b9.jpeg";
import bg from "../assets/background/Backgroud.jpeg";
import { Product } from "../types/productType";
import axios from "axios";
import "../css/blur.css";

const Option1: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/product/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const tshirts: Product[] = products.filter((product: Product) =>
    product.tags?.some((tag) => tag.text === "Tshirt")
  );

  return (
    <div>

      <div className="fixed inset-0 -z-50">
        <img
          src={bg}
          alt="40.G.O.D rose background"
          className="inset-0 w-full h-full object-cover brightness-50"
        />
      </div>
      <div className="w-full h-screen -z-40">
        <img
          src={bg2}
          alt="40.G.O.D goth background"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute w-full h-full flex flex-col justify-center items-center">
          <p className="text-white font-bold god-text text-3xl lg:text-9xl ">
            Gettin’ Out Drippin’
          </p>
        </div>
      </div>

      <div className="py-12 px-4 md:px-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20">
          {tshirts.map((product) => (
            <div key={product.id}>
              {product.colors && product.colors.length > 0 && (
                <div key={product.colors[0].id}>
                  {product.colors[0].image_product &&
                    product.colors[0].image_product[0] && (
                      <div
                        key={product.colors[0].image_product[0].id}
                        className="relative flex flex-col items-center justify-center transition-transform duration-300 transform"
                        onMouseEnter={() =>
                          product.colors &&
                          product.colors[0] &&
                          product.colors[0].image_product &&
                          product.colors[0].image_product[0] &&
                          setHoveredId(product.colors[0].image_product[0].id)
                        }
                        onMouseLeave={() => setHoveredId(null)}
                        style={{ transform: hoveredId === product.colors[0].image_product[0].id ? "scale(1.05)" : "scale(1)" }}
                      >
                        <Link to={`/new/${product.id}`}>
                          <img
                            src={product.colors[0].image_product[0].image}
                            alt={`Tshirt ${product.colors[0].image_product[0].id}`}
                          />
                        </Link>
                        <div className={`text-center my-text py-2 px-4 ${
                            hoveredId !==
                              product.colors[0].image_product[0].id &&
                            "invisible"
                          }`}
                        >
                          {product.name}
                          <br />
                          Price: {product.price}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Option1;
