import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShippingInfo from './shippingInfo'; 
import bg from '../assets/background/Backgroud.jpeg';
import b4 from '../assets/background/b4.jpeg';


const paymentMethods = [
  { id: 1, name: 'Credit Card', logoUrl: 'credit-card-logo.png', requiresDetails: true, detailsLabel: 'Card Number' },
  { id: 2, name: 'Debit Card', logoUrl: 'debit-card-logo.png', requiresDetails: true, detailsLabel: 'Card Number' },
  { id: 3, name: 'Net Banking', logoUrl: 'net-banking-logo.png', requiresDetails: true, detailsLabel: 'Bank Name' },
  { id: 4, name: 'UPI', logoUrl: 'upi-logo.png', requiresDetails: true, detailsLabel: 'UPI ID' },

];



interface SignUpForm {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email:string;
}

interface ImageData {                              
  id: number;
  url: string;
  name?: string;
  tagName?: string;
  quantity?: number;
  price?: number;
}


interface CheckoutProps {
  checkoutItems: ImageData[];
  addToHistory: (item: ImageData) => void;
  userData: SignUpForm;
}

const Checkout: React.FC<CheckoutProps> = ({ checkoutItems, addToHistory, userData }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<string>('');
  const navigate = useNavigate();

  

  const handleCheckout = () => {
    if (selectedPaymentMethod === null) {
      alert('Please select a payment method.');
      return;
    }

    if (paymentMethods[selectedPaymentMethod - 1].requiresDetails && !paymentDetails.trim()) {
      alert(`Please provide ${paymentMethods[selectedPaymentMethod - 1].detailsLabel}`);
      return;
    }

   
    navigate('/history');
    alert('Checked out successfully!');
  };

  return (
    <div className="flex flex-col min-h-screen relative h-full justify-center items-center"> {/* Added px-4 for padding on the left and right */}
    <div className="fixed inset-0 bg-black">
        <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-75" />
      </div>
      <div className='mt-36  relative z-10'>
        <div className="my-8 w-full">
          <h1 className="text-2xl font-semibold">Checkout</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        
        <ShippingInfo signUpData={{ token: "yourTokenHere", user: userData }} />

       
          <div className="p-4 rounded-lg shadow-md" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Items</h2>

              {checkoutItems.map(item => (
                <div className="border-b-2 border-black py-4 flex items-center justify-between relative" key={item.id} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                  <div className="flex items-center" onClick={() => addToHistory(item)}>
                    <img src={item.url} alt="img" className="w-16 h-auto mr-4 shadow-md" />
                    <div>
                      <p>{item.name}</p>
                      <p className="text-gray-500">Navy blue</p>
                    </div>
                    <div className='ml-9'>
                      
                      <p className="text-gray-500">Description about jeans</p>
                    </div>
                    <div className='ml-9'>
                      <p>size:M</p>
                      <p className="text-gray-500">{item.quantity}</p>
                    </div>
                    <div className='ml-9'>
                      <p>Amount to be paid</p>
                      <p className="text-gray-500">10000</p>
                    </div>
                  </div>
                 
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
              {paymentMethods.map(method => (
                <div key={method.id} className="mb-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-blue-600"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedPaymentMethod === method.id}
                      onChange={() => setSelectedPaymentMethod(method.id)}
                    />
                    <img src={method.logoUrl} alt={method.name} className="w-10 h-10 ml-2" />
                  </label>
                  {selectedPaymentMethod === method.id && method.requiresDetails && (
                    <input
                      type="text"
                      placeholder={`Enter ${method.detailsLabel}`}
                      className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                      value={paymentDetails}
                      onChange={e => setPaymentDetails(e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
     
        <div className="flex justify-end">
          <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 m-4 rounded" onClick={handleCheckout}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
