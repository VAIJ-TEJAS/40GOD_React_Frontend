import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bg from "../assets/background/Backgroud.jpeg";
import { CurrencyContext } from "../context/CurrencyContext";
import { convertPrice } from "../utils/convertPrice";
import { Product } from "../types/productType";
import {
  getProductStatistics,
  filterProductsByTag,
  sortProductsByPrice,
  getCheapestProduct,
  getMostExpensiveProduct,
} from "../utils/productHelpers";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { currency, rate } = useContext(CurrencyContext);

  const newLocal = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${newLocal}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Product[]>("/product/");
        setProducts(response.data);
        
        // Get featured products (T-shirts)
        const tshirts = filterProductsByTag(response.data, "Tshirt");
        const sortedTshirts = sortProductsByPrice(tshirts, true);
        setFeaturedProducts(sortedTshirts.slice(0, 6)); // Get first 6 cheapest
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Auto-rotate slideshow
    if (featuredProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredProducts.length]);

  const productStats = getProductStatistics(products);
  const cheapestProduct = getCheapestProduct(products);
  const mostExpensiveProduct = getMostExpensiveProduct(products);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={bg}
        alt="40.G.O.D rose background"
        className="absolute w-screen h-full object-cover brightness-50 -z-50"
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        {/* Hero Section */}
        <div className="text-center mb-12 mt-32 sm:mt-40">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to 40.G.O.D
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 drop-shadow-md">
            Gettin' Out Drippin'
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/t-shirt"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-8 rounded-lg transition text-lg"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-black transition text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Featured Products Carousel */}
        {!isLoading && featuredProducts.length > 0 && (
          <div className="w-full max-w-6xl mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
              Featured Products
            </h2>
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="min-w-full flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm"
                    >
                      {product.colors && product.colors[0]?.image_product?.[0] && (
                        <Link to={`/new/${product.id}`}>
                          <img
                            src={product.colors[0].image_product[0].image}
                            alt={product.name || "Product"}
                            className="max-w-xs max-h-96 object-contain mb-4 hover:scale-105 transition-transform cursor-pointer"
                          />
                        </Link>
                      )}
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-xl text-gray-200 mb-4">
                        {convertPrice(parseFloat(product.price || "0"), rate, currency)}
                      </p>
                      <Link
                        to={`/new/${product.id}`}
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 px-6 rounded-lg transition"
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {featuredProducts.length > 1 && (
                <>
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition"
                    aria-label="Previous slide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition"
                    aria-label="Next slide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Slide Indicators */}
              <div className="flex justify-center mt-4 gap-2">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "w-8 bg-white"
                        : "w-2 bg-white bg-opacity-50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Statistics Section */}
        {!isLoading && products.length > 0 && (
          <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center backdrop-blur-sm">
              <p className="text-3xl font-bold text-white">{productStats.totalProducts}</p>
              <p className="text-gray-200 text-sm">Total Products</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center backdrop-blur-sm">
              <p className="text-3xl font-bold text-white">{productStats.totalInStock}</p>
              <p className="text-gray-200 text-sm">In Stock</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center backdrop-blur-sm">
              <p className="text-3xl font-bold text-white">
                {convertPrice(productStats.averagePrice, rate, currency)}
              </p>
              <p className="text-gray-200 text-sm">Avg Price</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center backdrop-blur-sm">
              <p className="text-3xl font-bold text-white">{productStats.totalTags}</p>
              <p className="text-gray-200 text-sm">Categories</p>
            </div>
          </div>
        )}

        {/* Price Range Section */}
        {!isLoading && cheapestProduct && mostExpensiveProduct && (
          <div className="w-full max-w-4xl bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm mb-12">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Price Range
            </h3>
            <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
              <div className="text-center">
                <p className="text-gray-200 text-sm mb-2">Starting from</p>
                <p className="text-2xl font-bold text-white">
                  {convertPrice(parseFloat(cheapestProduct.price || "0"), rate, currency)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-200 text-sm mb-2">Up to</p>
                <p className="text-2xl font-bold text-white">
                  {convertPrice(parseFloat(mostExpensiveProduct.price || "0"), rate, currency)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center">
            <p className="text-white text-xl">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
