/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import bg from '../assets/background/Backgroud.jpeg';
import { NavLink } from 'react-router-dom';
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
    if (AddressBook.length === 0) {
        setShowForm(true);
    } else {
        setShowForm(false);
    }
}, [AddressBook]);
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
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Logged out successfully.');

    window.location.href = '/login';  
};

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
    <div className='my-text flex relative min-h-screen text-2xl text-white'>
    <div className="fixed inset-0 bg-black">
      <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover filter brightness-50" />
    </div>
  
    <div className="relative w-full z-10 mt-32 sm:mt-40 p-4 sm:p-12 lg:p-24">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold">My Account</h2>
      </div>
  
      <ul className="flex flex-wrap gap-4 mb-4">
        <li>
          <NavLink className="text-gray-300 hover:text-white font-semibold transition" to="/history">
            History
          </NavLink>
        </li>
      </ul>
  
      {AddressBook.slice(0, 1).map((entry: any) => (
        <div key={entry.id} className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label>User Name: {entry?.user?.username || "N/A"}</label>
            <label>Email Address: {entry?.user?.email || "N/A"}</label>
          </div>
        </div>
      ))}
  
      <h2 className="text-3xl font-semibold mb-4">Shipping Information</h2>
  
      {AddressBook.map((entry: any) => (
        <div key={entry.id} className="bg-white bg-opacity-10 p-4 rounded-lg shadow mb-6">
          <div className="space-y-2">
            <p><strong>Name:</strong> {entry?.name || "N/A"}</p>
            <p><strong>Country:</strong> {entry?.country || "N/A"}</p>
            <p><strong>State:</strong> {entry?.state || "N/A"}</p>
            <p><strong>City:</strong> {entry?.city || "N/A"}</p>
            <p><strong>Postal Code:</strong> {entry?.postal_code || "N/A"}</p>
            <p><strong>Street Address:</strong> {entry?.street_address || "N/A"}</p>
          </div>
          <button
            type="button"
            onClick={() => handleDelete(entry.id)}
            className="mt-4 text-red-400 hover:text-red-200 font-bold rounded transition"
          >
            Delete
          </button>
        </div>
      ))}
  
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 p-6 rounded-lg shadow mt-8 space-y-6">
          <h2 className="text-xl font-bold">Shipping Information</h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-white bg-opacity-80 text-black rounded"
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-white bg-opacity-80 text-black rounded"
              />
            </label>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-white bg-opacity-80 text-black rounded"
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-white bg-opacity-80 text-black rounded"
              />
            </label>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-white bg-opacity-80 text-black rounded"
              />
            </label>
            <label>
              Postal Code:
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-white bg-opacity-80 text-black rounded"
              />
            </label>
          </div>
  
          <label className="block">
            Street Address:
            <input
              type="text"
              name="street_address"
              value={formData.street_address}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-white bg-opacity-80 text-black rounded"
            />
          </label>
  
          <div className="flex flex-wrap gap-4 mt-4">
  <button type="submit" className="bg-gray-500 hover:bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center transition">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  </button>
  <button type="button" onClick={handleDeleteButtonClick} className="bg-gray-500 hover:bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center transition">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>
        </form>
      )}
  
  <button
  className="mt-8 bg-black hover:bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
  onClick={handleAddButtonClick}
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
</button>

  
      <div className="mt-6">
        <button className="text-xl font-bold text-gray-300 hover:text-white" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  </div>
  
    
  );
};

export default AddressBookComponent;



