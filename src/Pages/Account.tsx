import React, { useState, useEffect } from 'react';
import axios ,{ AxiosResponse } from 'axios';

interface AddressBookEntry {
  id: number;
  name: string;
  phone_number: string;
 
}

interface AddressFormData {
  name: string;
  phone_number: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}


const AddressBookComponent: React.FC = () => {
  const [AddressBook, setAddressBook] = useState<AddressBookEntry[]>([]);
  const [formData, setFormData] = useState<AddressFormData>({
    name: '',
    phone_number: '',
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      axios
        .get<AddressBookEntry[]>('http://13.235.104.232:8000/address-book/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        })
        .then((response: AxiosResponse<AddressBookEntry[]>) => {
          console.log('Address Book:', response.data);
          setAddressBook(response.data);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token: string | null = localStorage.getItem('token');

      if (!token) {
        console.error('Error: Token not found in localStorage');
        return;
      }

      const response: AxiosResponse<AddressBookEntry> = await axios.post<AddressBookEntry>(
        'http://13.235.104.232:8000/address-book/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
          }
        }
      );

      console.log('Response:', response.data);

      setFormData({
        name: '',
        phone_number: '',
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
        country: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = (itemId: number) => {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      axios
        .delete(`http://13.235.104.232:8000/address-book/${itemId}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        })
        .then((response: AxiosResponse<void>) => {
          console.log('Item deleted:', response.data);

          // Filter out the deleted item from the AddressBook array
          setAddressBook(AddressBook.filter(item => item.id !== itemId));
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    }
  };



  return (
    <div className='flex min-h-screen '>
      <form  onSubmit={handleSubmit} className="relative mt-40 flex items-center justify-center">
      <label className="block">
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" /> 
      </label>
      <label className="block">
        Phone Number:
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
      </label>
      <label className="block">
        Street Address:
        <input type="text" name="street_address" value={formData.street_address} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
      </label>
      <label className="block">
        City:
        <input type="text" name="city" value={formData.city} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
      </label>
      <label className="block">
        State:
        <input type="text" name="state" value={formData.state} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
      </label>
      <label className="block">
        Postal Code:
        <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
      </label>
      <label className="block">
        Country:
        <input type="text" name="country" value={formData.country} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
      </label>
     
      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>

    </form>
    <div className="relative mt-40 flex items-center justify-center">
      <h2>Address Book</h2>
      <ul>
        {AddressBook.map((entry: any) => (
          <li key={entry.id}>
            <div>Name: {entry.name}</div>
            <div>Phone Number: {entry.phone_number}</div>
            <div>Phone Number: {entry.phone_number}</div>
            <div>Phone Number: {entry.phone_number}</div>
            <div>Phone Number: {entry.phone_number}</div>
            {entry.id}
            <button type="button"   onClick={() => handleDelete(entry.id)} className="mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AddressBookComponent;



// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /

// import { NavLink } from 'react-router-dom';
// import bg from '../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg';
// import b4 from '../assets/background/b4.jpeg'

// export const Account = () => {
//   const userProfile = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
   
//   };

//   return (
// <div className="flex flex-col min-h-screen">
// <div className="fixed z-5 inset-0 bg-black opacity-20">
//         <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
//       </div>
//       <div className="relative z-10 mt-40 p-24">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-xl font-semibold">My Account</h2>
//           <button className="font-bold py-2 px-4 rounded">
//             Edit
//           </button>
//         </div>
       
//         <div className="my-4">
//           <h3 className="text-lg font-semibold mb-4">Profile</h3>
          
//         </div>
//         <div className="mb-4 grid grid-cols-2">
//           <label className="block mb-2">User Name</label>
//           <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             value="XYZ"
             
//           />
//       </div>
//       <div className="mb-4 grid grid-cols-2">
//           <label className="block mb-2">Email</label>
//           <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             value="abc@gmail.com"
             
//           />
//       </div>
//       <div className="mb-4 grid grid-cols-2">
//           <label className="block mb-2">First Name</label>
//           <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             value="ABC"
             
//           />
//       </div>
//       <div className="mb-4 grid grid-cols-2">
//           <label className="block mb-2">Last Name</label>
//           <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             value="PQR"
             
//           />
//       </div>
//         <ul className="flex space-x-2">
//           <li>
//             <NavLink className="my-text text-xl text-gray-700 z-50" to="/history">History</NavLink>
//           </li>
//         </ul>
//       </div>
     
//       <div className="p-4 z-10 rounded-lg shadow-md" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

//       <h2 className="text-lg  font-semibold mb-4">Shipping Information</h2>
     
    
//       <div className="mb-4 gap-4 grid grid-cols-2">
//           <div>
//           <label className="block mb-2">Country </label>
//           <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
            
              
//           /></div>
//              <div>
//           <label className="block mb-2">State </label>
//           <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
              
             
//           /></div>
//       </div> 
//       <div className="mb-4 grid grid-cols-2">
       
//       </div> 
//       <div className="mb-4 grid gap-4 grid-cols-2">
//           <div>
//           <label className="block mb-2">Town/city </label>
//           <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
            
              
//           /></div>
//             <div>
//           <label className="block mb-2">Postal Code </label>
//           <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
          
              
//           /></div>
//       </div> 
//       <div className="mb-4 grid grid-cols-1">
//           <label className="block mb-2">street </label>
//           <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
             
              
//           />
//       </div>
//      </div>
      
     
 
//     </div>
//   );
// };
