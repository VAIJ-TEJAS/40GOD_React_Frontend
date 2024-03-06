// import React from 'react';
import './../css/Button.css';
import b4 from '../assets/background/b4.jpeg'
interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}
interface ShippingInfoProps {
    signUpData: { token: string; user: UserData } | null;
}





const ShippingInfo: React.FC<ShippingInfoProps> = ({ }) => {
   

   

    return (
        <div className="p-4 rounded-lg shadow-md" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      
            <h2 className="text-lg  font-semibold mb-4">Shipping Information</h2>
            <div className="mb-4 grid grid-cols-2">
                <label className="block mb-2">Username</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value="XYZ"
                    readOnly
                />
            </div>
            <div className="mb-4 grid grid-cols-2">
                <label className="block mb-2">First Name</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value="ABC"
                    readOnly
                />
            </div>
            <div className="mb-4 grid grid-cols-2">
                <label className="block mb-2">Last Name </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value="PQR"
                    readOnly
                />
            </div>
           
            <div className="mb-4 gap-4 grid grid-cols-2">
                <div>
                <label className="block mb-2">Country </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value="India"
                    readOnly
                /></div>
                   <div>
                <label className="block mb-2">State </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value="Maharashtra"
                    readOnly
                /></div>
            </div> 
            <div className="mb-4 grid grid-cols-2">
             
            </div> 
            <div className="mb-4 grid gap-4 grid-cols-2">
                <div>
                <label className="block mb-2">Town/city </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value="Pune"
                    readOnly
                /></div>
                  <div>
                <label className="block mb-2">Postal Code </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value="40001"
                    readOnly
                /></div>
            </div> 
            <div className="mb-4 grid grid-cols-1">
                <label className="block mb-2">street </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value="pimpri chindwad ,moshi, near spine mall"
                    readOnly
                />
            </div>
           
            
            {/* Add other shipping information fields as needed */}
        </div>
    );
};

export default ShippingInfo;
