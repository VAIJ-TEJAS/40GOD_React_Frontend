import { NavLink } from 'react-router-dom';
import bg from '../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg';
import b4 from '../assets/background/b4.jpeg'

export const Account = () => {
  const userProfile = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
   
  };

  return (
<div className="flex flex-col min-h-screen">
<div className="fixed z-5 inset-0 bg-black opacity-20">
        <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
      </div>
      <div className="relative z-10 mt-40 p-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">My Account</h2>
          <button className="font-bold py-2 px-4 rounded">
            Edit
          </button>
        </div>
       
        <div className="my-4">
          <h3 className="text-lg font-semibold mb-4">Profile</h3>
          
        </div>
        <div className="mb-4 grid grid-cols-2">
          <label className="block mb-2">User Name</label>
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            value="XYZ"
             
          />
      </div>
      <div className="mb-4 grid grid-cols-2">
          <label className="block mb-2">Email</label>
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            value="abc@gmail.com"
             
          />
      </div>
      <div className="mb-4 grid grid-cols-2">
          <label className="block mb-2">First Name</label>
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            value="ABC"
             
          />
      </div>
      <div className="mb-4 grid grid-cols-2">
          <label className="block mb-2">Last Name</label>
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            value="PQR"
             
          />
      </div>
        <ul className="flex space-x-2">
          <li>
            <NavLink className="my-text text-xl text-gray-700 z-50" to="/history">History</NavLink>
          </li>
        </ul>
      </div>
     
      <div className="p-4 z-10 rounded-lg shadow-md" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

      <h2 className="text-lg  font-semibold mb-4">Shipping Information</h2>
     
    
      <div className="mb-4 gap-4 grid grid-cols-2">
          <div>
          <label className="block mb-2">Country </label>
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            
              
          /></div>
             <div>
          <label className="block mb-2">State </label>
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              
             
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
            
              
          /></div>
            <div>
          <label className="block mb-2">Postal Code </label>
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
          
              
          /></div>
      </div> 
      <div className="mb-4 grid grid-cols-1">
          <label className="block mb-2">street </label>
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
             
              
          />
      </div>
     </div>
      
     
 
    </div>
  );
};
