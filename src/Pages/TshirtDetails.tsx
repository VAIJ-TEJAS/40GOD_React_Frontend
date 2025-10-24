import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./../css/Button.css";
import bg from "../assets/background/Backgroud.jpeg";
import SizeGuideImage from "../assets/SizeGuide.jpeg";
import { Product } from "../types/productType";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface ProductVariant {
  id: number;
  color: {
    display_name: string;
    hex_code: string;
  };
  size: {
    text: string;
  };
  quantity: number;
}

interface ImageDetailsProps {}

const ImageDetails: React.FC<ImageDetailsProps> = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedProductVariantId, setSelectedProductVariantId] = useState<
    number | null
  >(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [productVariant, setProductVariant] = useState<ProductVariant[]>([]);
  const { id } = useParams<{ id?: string }>() ?? {};
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSizeGuideModal = () => {
    setIsSizeGuideOpen(!isSizeGuideOpen);
  };

  useEffect(() => {
    if (productVariant.length > 0) {
      const initialSize = productVariant[0].size.text;
      const initialColor = productVariant[0].color.hex_code;
      setSelectedSize(initialSize);
      setSelectedColor(initialColor);

      const variant = productVariant.find(
        (v) => v.size.text === initialSize && v.color.hex_code === initialColor
      );

      console.log(variant ? variant.id : null);

      setSelectedProductVariantId(variant ? variant.id : null);

      if (!variant) {
        console.log("No variant found for the initial size and color.");
      }
    }
  }, [productVariant]);

  const nextSlide = () => {
    console.log("Next Slide");
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide + 1) %
        (product?.colors?.[selectedImage]?.image_product?.length ?? 1)
    );
  };

  const prevSlide = () => {
    console.log("Prev Slide");
    setCurrentSlide((prevSlide) =>
      prevSlide === 0
        ? (product?.colors?.[selectedImage]?.image_product?.length ?? 1) - 1
        : prevSlide - 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);

    const variant = productVariant.find(
      (variant) => variant.size.text === size
    );

    setSelectedProductVariantId(variant ? variant.id : null);
  };

  const handleColorClick = (color: string, Image: number) => {
    setSelectedColor(color);
    setSelectedImage(Image);

    const variant = productVariant.find(
      (variant) =>
        variant.size.text === selectedSize && variant.color.hex_code === color
    );

    if (variant) {
      console.log("Selected Product Variant ID:", variant.id);
    } else {
      console.log("Product Variant not found for selected color and size");
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const response = await axios.get(
          `https://api.40god.com/inventory/?product_id=${id}`
        );
        setProductVariant(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (productVariant.length > 0) {
      const firstVariant = productVariant[0];
      setSelectedSize(firstVariant.size.text);
      setSelectedColor(firstVariant.color.hex_code);
      setSelectedProductVariantId(firstVariant.id);
    }
  }, [productVariant]);

  if (!id) {
    return <div>No ID provided</div>;
  }

  const product = products.find((product) => product.id === parseInt(id));
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToBag = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found.");
        navigate("/login");
        return;
      }

      const productWithQuantity = {
        product_varient: selectedProductVariantId,
        quantity: 1,
      };

      const response = await axios.post("/cart-items/", productWithQuantity, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      console.log("Added to bag:", response.data);
      setIsAdded(true);
    } catch (error) {
      if (selectedProductVariantId === 0) {
        alert("Please select color and size.");
        console.error("Error adding item to bag:", error);
      } else {
        alert("Please login to add to bag.");
        console.error("Error adding item to bag:", error);
      }
    }
  };
  const availableColors = productVariant
    .filter((variant) => variant.size.text === selectedSize)
    .map((variant) => variant.color.hex_code);
  const uniqueSizes = [
    ...new Set(productVariant.map((variant) => variant.size.text)),
  ];

  return (
    <div className="flex flex-col select-none">
      <div className="fixed inset-0">
        <img
          src={bg}
          alt="40.G.O.D rose background"
          className="absolute inset-0 w-screen h-full object-cover filter brightness-50"
        />
      </div>

      <div className="mt-48 sm:mt-56 sm:p-8 z-10">
        {product && (
          <div className="grid grid-cols-1 sm:grid-cols-2 p-2 gap-4">

            <div className="">
                <div className="carousel relative overflow-hidden">
                  <button
                    className="prev absolute top-1/2 transform -translate-y-1/2 left-0 bg-black bg-opacity-50 hover:bg-gray-400 text-white px-4 z-10 rounded-full ml-2"
                    onClick={prevSlide}
                  >
                    &lt;
                  </button>
                  <div className="carousel-inner flex transition-transform duration-500 ease-in-out">
                    {product.colors?.[selectedImage]?.image_product?.map(
                      (imageData, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${
                            index === currentSlide ? "active" : ""
                          }`}
                          style={{
                            display: index === currentSlide ? "block" : "none",
                          }}
                        >
                          <img
                            src={imageData.image}
                            alt={product.colors?.[0]?.display_name}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      )
                    )}
                  </div>
                  <button
                    className="next absolute top-1/2 transform -translate-y-1/2 right-0 bg-black bg-opacity-50 hover:bg-gray-400 text-white px-4 z-10 rounded-full mr-2"
                    onClick={nextSlide}
                  >
                    &gt;
                  </button>
                </div>
                <div className="carousel-thumbnails p-2">
                  {product.colors?.[selectedImage]?.image_product?.map(
                    (imageData, index) => (
                      <img
                        key={index}
                        src={imageData.image}
                        alt={product.colors?.[0]?.display_name}
                        onClick={() => handleThumbnailClick(index)}
                        className={`thumbnail ${
                          index === currentSlide ? "selected" : ""
                        }`}
                      />
                    )
                  )}
                </div>
            </div>

            <div className="">
              <div className="p-4 flex flex-col gap-2">
                <h1 className="font-semibold text-xl">{product.name}</h1>
                <div className="flex gap-2">
                  {uniqueSizes.map((size, index) => (
                    <div key={index}>
                      <button
                        className={`w-10 h-10 text-center rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${
                          size === selectedSize ? "bg-gray-900" : ""
                        }`}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="">
                  <button
                    className="underline focus:outline-none"
                    onClick={toggleSizeGuideModal}
                  >
                    SIZE GUIDE
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {availableColors.map((color, index) => (
                    <button
                    key={index}
                    onClick={() => handleColorClick(color, index)}
                    style={{ backgroundColor: color }}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${selectedColor === color 
                        ? "border-black scale-110 ring-2 ring-offset-2 ring-black" 
                        : "border-gray-400 hover:scale-105"
                      }`}
                    title={`Color: ${color}`}
                  ></button>
                  
                  ))}
                </div>
                <div>{product.description}</div>
                <div className="font-semibold text-xl">{product.price}</div>
                <div className="sm:inline-block w-full">
                  <button
                    className={`bg-black shadow-3xl text-white hover:bg-white hover:text-black p-2 rounded-lg w-full sm:w-fit ${
                      isAdded ? "added" : ""
                    }`}
                    onClick={() => {
                      !isAdded && handleAddToBag();
                    }}
                  >
                    {isAdded ? "ADDED TO BAG" : "ADD TO BAG"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isSizeGuideOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleSizeGuideModal}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-black hover:text-red-500 focus:outline-none"
              onClick={toggleSizeGuideModal}
            >
              &times;
            </button>
            <img
              src={SizeGuideImage}
              alt="Size Guide"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetails;
