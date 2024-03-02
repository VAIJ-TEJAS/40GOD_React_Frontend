import { NavLink } from 'react-router-dom';
import bg from '../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg';

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
          <div>
            <p><span className="font-semibold mb-2">First Name:</span> {userProfile.firstName}</p>
            <p><span className="font-semibold mb-2">Last Name:</span> {userProfile.lastName}</p>
            <p><span className="font-semibold mb-2">Email:</span> {userProfile.email}</p>
            <p><span className="font-semibold mb-2">Phone:</span> {userProfile.phone}</p>
            {/* Add more profile fields as needed */}
          </div>
        </div>
        <ul className="flex space-x-4 mb-8">
          <li>
            <NavLink className="my-text text-xl text-gray-700 z-50" to="/history">History</NavLink>
          </li>
        </ul>
        {/* Add more sections such as password management, address book, payment, etc. */}
      </div>
      
    </div>
  );
};
