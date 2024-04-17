/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import bg from '../assets/background/Backgroud.jpeg';
import { NavLink } from 'react-router-dom';
import b4 from '../assets/background/b4.jpeg'
import'../App.css'

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
        .get<AddressBookEntry[]>('/address-book/', {
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    window.location.reload();
    try {
      const token: string | null = localStorage.getItem('token');

      if (!token) {
        console.error('Error: Token not found in localStorage');
        return;
      }

      const response: AxiosResponse<AddressBookEntry> = await axios.post<AddressBookEntry>(
        '/address-book/',
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
  }

  const handleDelete = (itemId: number) => {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      axios
        .delete(`/address-book/${itemId}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        })
        .then((response: AxiosResponse<void>) => {
          console.log('Item deleted:', response.data);


          setAddressBook(AddressBook.filter(item => item.id !== itemId));
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    }
  };
  const [showForm, setShowForm] = useState(false);
  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleDeleteButtonClick = () => {
    setShowForm(false);
  };


  return (
    <div className='flex relative min-h-screen my-text text-gray-700 text-2xl'>
    <div className="fixed inset-0 bg-black">
        <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-75" />
      </div>
      <div className="relative w-screen z-10 mt-60 sm:mt-40 p-4 sm:p-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold mt-16">My Account</h2>
          <button className="font-bold py-2 px-4 rounded">
            
          </button>  </div>
          <ul className="flex space-x-2">
          <li>
            <NavLink className="my-text text-2xl text-gray-700 z-50 font-bold" to="/history">History</NavLink>
          </li>
        </ul>

        <div className="my-4">
     
        </div>
        {AddressBook.slice(0, 1).map((entry: any) => (
  <div key={entry.id}>
    <div className="mb-4 grid grid-cols-2">
      <label className="block mb-2">User Name : {entry.user.username}</label>
    </div>
    <div className="mb-4 grid grid-cols-2">
      <label className="block mb-8 ">Email Address : {entry.user.email}</label>
    </div>
  </div>
))}

<h2 className="text-3xl  font-semibold mb-4 my-text">Shipping Information</h2>

        {AddressBook.map((entry: any) => (
          <div key={entry.id}>
           

            <div className="z-10 mt-8 pb-6">


              <div>
              <label className="block mb-2 font-bold my-text">Name : {entry.name}</label>
            </div> 
                <div>
                  <label className="block   mb-2 my-text">Country : {entry.country} </label>
                  </div>
                <div>
                  <label className="block  mb-2 my-text">State : {entry.state} </label>
                 </div>
             
             
              <div className="mb-2   ">
                <div>
                  <label className="block  mb-2 my-text">Town/city : {entry.city} </label>
              </div>
                <div>
                  <label className="block mb-2 my-text">Postal Code : {entry.postal_code}</label>
                  </div>
              </div>
              <div className="mb-2 grid grid-cols-1">
                <label className="block   mb-2 my-text">street address : {entry.street_address} </label>
              </div>
              <div >
                <label className="block  my-text">street : {entry.street_address} </label>
              </div>
              <div >
              <button type="button" onClick={() => handleDelete(entry.id)} className="mt-4 my-text hover:text-gray-500 text-black font-bold rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
       


        {showForm && (
        <form onSubmit={handleSubmit} className="p-4 z-10 mt-8 rounded-lg shadow-md w-full" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          <h2 className="text-lg  font-semibold mb-4">Shipping Information</h2>


          <div className="mb-4 gap-4 grid grid-cols-2">
            <div>
              <label className="block">
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="block mt-1 p-2 w-full border border-gray-300 rounded-md" />
              </label></div>
            <label className="block">
              Phone Number:
              <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="block p-2 mt-1 w-full border border-gray-300 rounded-md" />
            </label>
          </div>
          <div className="mb-4 grid gap-4 grid-cols-2">
            <label className="block">
              Country:
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="block mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </label>
            <label className="block">
              State:
              <input type="text" name="state" value={formData.state} onChange={handleChange} className="block mt-1 w-full p-2 border border-gray-300 rounded-md" />
            </label>

          </div>
          <div className="mb-4 gap-4 grid grid-cols-2">
            <div>
              <label className="block">
                City:
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="block mt-1 w-full p-2 border border-gray-300 rounded-md" />
              </label></div>
            <label className="block">
              Postal Code:
              <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} className="block p-2 mt-1 w-full border border-gray-300 rounded-md" />
            </label>
          </div>
          <div className="mb-4 grid grid-cols-1">
            <label className="block">
              Street Address:
              <input type="text" name="street_address" value={formData.street_address} onChange={handleChange} className="block p-2 mt-1 w-full border border-gray-300 rounded-md" />
            </label>


          </div>
          <button type="submit" className="mr-4 bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Submit</button>
          <button className="mt-4  hover:text-gray-500 text-black font-bold py-2 px-1 rounded" onClick={handleDeleteButtonClick}>Delete</button>
       </form>  )}
       <button className="mt-4 bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded" onClick={handleAddButtonClick}>Add</button>
     
        </div>
       
        

      </div>
    
  );
};

export default AddressBookComponent;



