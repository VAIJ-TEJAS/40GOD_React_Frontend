import React from 'react';
import './../css/Button.css';
import b4 from '../assets/background/b4.jpeg'
interface ShippingInfoProps {
    signUpData: SignUpForm | null;
}

interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const ShippingInfo: React.FC<ShippingInfoProps> = ({ signUpData }) => {
    if (!signUpData) {
    
        return <div>No sign-up data available.</div>;
    }

    const { email, phoneNumber } = signUpData;

    return (
        <div className="p-4 rounded-lg shadow-md" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      
            <h2 className="text-lg  font-semibold mb-4">Shipping Information</h2>
            <div className="mb-4 grid grid-cols-2">
                <label className="block mb-2">Email address</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={email}
                    readOnly
                />
            </div>
            <div className="mb-4 grid grid-cols-2">
                <label className="block mb-2">Phone Number</label>
                <input
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={phoneNumber}
                    readOnly
                />
            </div>
            
            <h2 className="text-lg  font-semibold mb-4">Shipping Address</h2>
            <div className="mb-4 grid grid-cols-2 gap-4">
            <div >
                <label className="block mb-2">First Name </label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={email}
                    readOnly
                />
            </div>
            <div >
                <label className="block mb-2">Last Name</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={email}
                    readOnly
                />
            </div>
           
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
            <div >
                <label className="block mb-2">Country</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value='India'
                    readOnly
                />
            </div>
            <div >
                <label className="block mb-2">State</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={email}
                    readOnly
                />
            </div>
           
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
            <div >
                <label className="block mb-2">City/Town</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={email}
                    readOnly
                />
            </div>
            <div >
                <label className="block mb-2">Postal Code</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={email}
                    readOnly
                />
            </div>
           
            </div>
            <div className="mb-4 space-y-2">
                <label className="block mb-2">Address</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={email}
                    readOnly
                />
                 <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={email}
                    readOnly
                />
            </div>
            <button className="button my-text pl-4 pr-4 ml-4">Continue Shopping</button>
            <button className="button my-text pl-4 pr-4 ml-4">Back to bag</button>

            <div className="mb-4 mt-8 grid grid-cols-3 gap-4">

            <button className=" my-text pr-4 ml-4">Refund policy</button>
            <button className=" my-text pl-4 pr-4 ml-4">Privacy policy</button>
            <button className=" my-text pl-4 pr-4 ml-4">Terms of service</button>
            </div>

        </div>
    );
};

export default ShippingInfo;
