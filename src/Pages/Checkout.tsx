/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext, useMemo } from "react";
import ShippingInfo from "../components/ShippingInfo";
import bg from "../assets/background/Backgroud.jpeg";
import axios, { AxiosResponse } from "axios";
import { RazorpayOptions } from "../types/razorpay";
import { CurrencyContext } from "../context/CurrencyContext";
import { convertPrice, calculatePriceWithTax, calculateDiscount } from "../utils/convertPrice";
import { trackEvent, trackConversion, trackError } from "../utils/analyticsHelpers";
import { validateEmail, validatePhone, validatePostalCode } from "../utils/validationHelpers";
import { calculateCartTotal, getCartSummary, getCartStatistics } from "../utils/cartHelpers";

interface ColorData {
  product: any;
  id: number;
  display_name: string;
  color_name: string;
  hex_code: string;
  image_product: { id: number; image: string }[];
}

interface SizeData {
  id: number;
  text: string;
}

interface ProductVariant {
  id: number;
  color: ColorData;
  size: SizeData;
  quantity: number;
}

interface CartItem {
  id: number;
  product_varient: ProductVariant;
  quantity: number;
}

interface AddressBookEntry {
  id: number;
  name: string;
  phone_number: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

const Checkout: React.FC = () => {
  const { currency, rate } = useContext(CurrencyContext);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderSummary, setOrderSummary] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showOrderSummary, setShowOrderSummary] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<string>("razorpay");
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(18); // 18% GST
  const [addresses, setAddresses] = useState<AddressBookEntry[]>([]);

  useEffect(() => {
    trackEvent("page_view", "checkout", "checkout_page_loaded");
    const token: string | null = localStorage.getItem("token");

    if (token) {
      setIsLoading(true);
      axios
        .get<AddressBookEntry[]>("/address-book/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then((response: AxiosResponse<AddressBookEntry[]>) => {
          console.log("Address Book:", response.data);
          setAddresses(response.data);

          if (response.data.length > 0) {
            setSelectedAddressId(response.data[0].id);
            const selectedAddress = response.data[0];
            validateAddress(selectedAddress);
            calculateShipping(selectedAddress);
            calculateEstimatedDelivery(selectedAddress);
          }
        })
        .catch((error) => {
          console.error("Error fetching address book entries:", error);
          trackError("Failed to fetch address book", error.message, { endpoint: "/address-book/" });
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  console.log(selectedAddressId);

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      axios
        .get<CartItem[]>("/cart-items/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          console.log("Cart Items:", response.data);
          setCartItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, []);

  const postCartItems = async () => {
    try {
      const BASE_URL = "";
      const token = localStorage.getItem("token");

      // Preparing the data payload for the POST request
      const data = {
        address_id: selectedAddressId,
      };

      // Axios request configuration, including the headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };

      // Performing the POST request using Axios
      const orderResponse = await axios.get(
        `${BASE_URL}/order/calculate_order/?currency=${currency}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const { order_id, razorpay_key_id } = orderResponse.data;

      const options: RazorpayOptions = {
        key: razorpay_key_id,
        currency: currency,
        name: "40.G.O.D",
        description: "",
        image: "logo1.png",
        order_id: order_id,
        handler: function (response: any) {
          console.log(response);
          axios.post(`${BASE_URL}/order/create_order/`, data, config);
          // Handle payment success
          window.location.href = "/history";
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
        },
        prefill: {
          // "name": "Gaurav Kumar",
          // "email": "gaurav.kumar@example.com",
          // "contact": "9999999999"
        },
        notes: {},
        theme: {
          color: "#f4dcab",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      // Performing the POST request using Axios
      // const response = await axios.post(`${BASE_URL}/order/create_order/`, data, config);

      // The response data is directly accessible
      // console.log('Response:', response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(
    "product_variants",
    cartItems.map((item) => item.product_varient.id)
  );
  console.log(
    "quantyties",
    cartItems.map((item) => item.quantity)
  );
  const validateAddress = (address: AddressBookEntry) => {
    const errors: Record<string, string> = {};
    
    if (!validatePhone(address.phone_number)) {
      errors.phone = "Invalid phone number";
    }
    
    if (!validatePostalCode(address.postal_code, address.country)) {
      errors.postalCode = "Invalid postal code";
    }
    
    if (!address.street_address.trim()) {
      errors.street = "Street address is required";
    }
    
    if (!address.city.trim()) {
      errors.city = "City is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateShipping = (address: AddressBookEntry) => {
    // Simple shipping calculation based on country
    let cost = 0;
    if (address.country.toLowerCase() === "india") {
      cost = totalSum > 1000 ? 0 : 50; // Free shipping over 1000
    } else {
      cost = totalSum > 5000 ? 0 : 500; // Free international shipping over 5000
    }
    setShippingCost(cost);
  };

  const calculateEstimatedDelivery = (address: AddressBookEntry) => {
    const today = new Date();
    let days = 3;
    
    if (address.country.toLowerCase() !== "india") {
      days = 10;
    }
    
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + days);
    setEstimatedDelivery(deliveryDate.toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    }));
  };

  const handleDiscountCode = async () => {
    if (!discountCode.trim()) return;
    
    trackEvent("action", "checkout", "discount_code_entered", { code: discountCode });
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/discount/validate/",
        { code: discountCode },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      
      if (response.data.valid) {
        setDiscountApplied(true);
        setDiscountPercentage(response.data.discount_percentage || 10);
        trackEvent("success", "checkout", "discount_applied", { 
          code: discountCode, 
          percentage: response.data.discount_percentage 
        });
      } else {
        trackEvent("error", "checkout", "discount_invalid", { code: discountCode });
        alert("Invalid discount code");
      }
    } catch (error) {
      trackError("Failed to validate discount code", (error as Error).message);
      alert("Error validating discount code");
    }
  };

  const totalSum = useMemo(() => {
    return calculateCartTotal(cartItems, rate);
  }, [cartItems, rate]);

  const subtotal = totalSum;
  const discountAmount = discountApplied ? calculateDiscount(subtotal, discountPercentage) : 0;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = calculatePriceWithTax(subtotalAfterDiscount, taxRate) - subtotalAfterDiscount;
  const finalTotal = subtotalAfterDiscount + taxAmount + shippingCost;

  const cartSummary = useMemo(() => getCartSummary(cartItems, rate), [cartItems, rate]);
  const cartStats = useMemo(() => getCartStatistics(cartItems, rate), [cartItems, rate]);
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select a shipping address");
      trackEvent("error", "checkout", "no_address_selected");
      return;
    }

    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
    if (selectedAddress && !validateAddress(selectedAddress)) {
      alert("Please fix address validation errors");
      return;
    }

    setIsLoading(true);
    trackEvent("action", "checkout", "place_order_clicked", {
      totalAmount: finalTotal,
      itemCount: cartSummary.totalItems,
    });

    try {
      await postCartItems();
      trackConversion("purchase", finalTotal, {
        items: cartSummary.totalItems,
        currency,
      });
    } catch (error) {
      trackError("Order placement failed", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col relative justify-center items-center">
      <div className="fixed inset-0">
        <img
          src={bg}
          alt="bg"
          className="absolute inset-0 w-screen h-full object-cover filter brightness-50"
        />
      </div>
      <div className="mt-36 sm:mt-60 z-10 p-4 flex flex-col gap-4 max-w-4xl w-full">
        <div className="w-full">
          <h1 className="text-xl font-semibold text-white text-center">CHECKOUT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Shipping Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <ShippingInfo signUpData={null} />
            
            {/* Address Selection */}
            {addresses.length > 0 && (
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Select Shipping Address</h3>
                <div className="space-y-2">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`flex items-start p-3 border rounded cursor-pointer transition ${
                        selectedAddressId === address.id
                          ? "border-yellow-400 bg-yellow-400 bg-opacity-20"
                          : "border-white border-opacity-20 hover:border-opacity-40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={() => {
                          setSelectedAddressId(address.id);
                          validateAddress(address);
                          calculateShipping(address);
                          calculateEstimatedDelivery(address);
                        }}
                        className="mt-1 mr-3"
                      />
                      <div className="text-white text-sm">
                        <div className="font-semibold">{address.name}</div>
                        <div>{address.street_address}</div>
                        <div>{address.city}, {address.state} {address.postal_code}</div>
                        <div>{address.country}</div>
                        <div>{address.phone_number}</div>
                        {validationErrors.phone && (
                          <div className="text-red-400 text-xs mt-1">{validationErrors.phone}</div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center p-2 border border-white border-opacity-20 rounded cursor-pointer hover:border-opacity-40">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-white">Razorpay (Credit/Debit Card, UPI, Netbanking)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg sticky top-20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">Order Summary</h3>
                <button
                  onClick={() => setShowOrderSummary(!showOrderSummary)}
                  className="text-white text-sm"
                >
                  {showOrderSummary ? "−" : "+"}
                </button>
              </div>

              {showOrderSummary && (
                <>
                  <div className="space-y-2 text-sm text-white mb-4">
                    <div className="flex justify-between">
                      <span>Items ({cartSummary.totalItems})</span>
                      <span>{convertPrice(subtotal, rate, currency)}</span>
                    </div>
                    
                    {discountApplied && (
                      <div className="flex justify-between text-green-400">
                        <span>Discount ({discountPercentage}%)</span>
                        <span>-{convertPrice(discountAmount, rate, currency)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? "FREE" : convertPrice(shippingCost, rate, currency)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax (GST {taxRate}%)</span>
                      <span>{convertPrice(taxAmount, rate, currency)}</span>
                    </div>
                    
                    <div className="border-t border-white border-opacity-20 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>{convertPrice(finalTotal, rate, currency)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Discount Code */}
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                        className="flex-1 bg-white bg-opacity-10 border border-white border-opacity-20 rounded px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-opacity-40"
                      />
                      <button
                        onClick={handleDiscountCode}
                        disabled={!discountCode.trim() || discountApplied}
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 text-white px-3 py-2 rounded text-sm"
                      >
                        Apply
                      </button>
                    </div>
                    {discountApplied && (
                      <div className="text-green-400 text-xs mt-1">
                        Discount applied!
                      </div>
                    )}
                  </div>

                  {/* Estimated Delivery */}
                  {estimatedDelivery && (
                    <div className="text-white text-xs mb-4 p-2 bg-white bg-opacity-5 rounded">
                      <div className="font-semibold">Estimated Delivery:</div>
                      <div>{estimatedDelivery}</div>
                    </div>
                  )}

                  {/* Order Stats */}
                  <div className="text-xs text-gray-300 space-y-1 mb-4">
                    <div>Unique Products: {cartSummary.uniqueProducts}</div>
                    {cartStats.lowStockCount > 0 && (
                      <div className="text-yellow-400">
                        ⚠️ {cartStats.lowStockCount} item(s) with low stock
                      </div>
                    )}
                  </div>
                </>
              )}

              <button
                className="w-full bg-black hover:bg-gray-700 text-white font-bold py-3 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePlaceOrder}
                disabled={isLoading || !selectedAddressId || Object.keys(validationErrors).length > 0}
              >
                {isLoading ? "Processing..." : `PLACE ORDER - ${convertPrice(finalTotal, rate, currency)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
