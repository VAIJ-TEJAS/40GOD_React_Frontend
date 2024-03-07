import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import bg from '../assets/background/WhatsApp Image 2024-02-16 at 11.01.36 PM.jpeg';
import { NavLink } from 'react-router-dom';
import b4 from '../assets/background/b4.jpeg'

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
        .get<AddressBookEntry[]>('https://13.235.104.232/address-book/', {
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

    try {
      const token: string | null = localStorage.getItem('token');

      if (!token) {
        console.error('Error: Token not found in localStorage');
        return;
      }

      const response: AxiosResponse<AddressBookEntry> = await axios.post<AddressBookEntry>(
        'https://13.235.104.232/address-book/',
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
        .delete(`https://13.235.104.232/address-book/${itemId}/`, {
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
    <div className='flex relative min-h-screen '>
      <div className="fixed z-5 inset-0 bg-black opacity-20">
        <img src={bg} alt='bg' className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-75" />
      </div>
      <div className="relative w-screen z-10 mt-60 sm:mt-40 p-4 sm:p-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">My Account</h2>
          <button className="font-bold py-2 px-4 rounded">
            Edit
          </button>  </div>
          <ul className="flex space-x-2">
          <li>
            <NavLink className="my-text text-xl text-gray-700 z-50" to="/history">History</NavLink>
          </li>
        </ul>

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
          <label className="block mb-2">Email Address</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value="XYZ"

          />
        </div>
        <div className="mb-4 grid grid-cols-2">
          <label className="block mb-2">Phone number</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value="XYZ"
          />
        </div>

        {AddressBook.map((entry: any) => (
          <div key={entry.id}>
            <div className="mb-4 grid grid-cols-2">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={entry.name}
              />
            </div>

            <div className="p-4 z-10 rounded-lg shadow-md" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

              <h2 className="text-lg  font-semibold mb-4">Shipping Information</h2>


              <div className="mb-4 gap-4 grid grid-cols-2">
                <div>
                  <label className="block mb-2">Country </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={entry.country}
                  /></div>
                <div>
                  <label className="block mb-2">City </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={entry.state}

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
                    value={entry.city}

                  /></div>
                <div>
                  <label className="block mb-2">Postal Code </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={entry.postal_code}

                  /></div>
              </div>
              <div className="mb-4 grid grid-cols-1">
                <label className="block mb-2">street </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={entry.street_address}
                />
              </div>
            </div>

            <button type="button" onClick={() => handleDelete(entry.id)} className="mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Delete</button>
          </div>
        ))}
       


        {showForm && (
        <form onSubmit={handleSubmit} className="p-4 z-10 rounded-lg shadow-md w-full" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          <h2 className="text-lg  font-semibold mb-4">Shipping Information</h2>


          <div className="mb-4 gap-4 grid grid-cols-2">
            <div>
              <label className="block">
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="block mt-1 p-2 w-full border border-gray-300 rounded-md" />
              </label></div>
            <label className="block">
              Phone Number:
              <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
            </label>
          </div>
          <div className="mb-4 grid gap-4 grid-cols-2">
            <label className="block">
              Country:
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
            </label>
            <label className="block">
              State:
              <input type="text" name="state" value={formData.state} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
            </label>

          </div>
          <div className="mb-4 gap-4 grid grid-cols-2">
            <div>
              <label className="block">
                City:
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
              </label></div>
            <label className="block">
              Postal Code:
              <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
            </label>
          </div>
          <div className="mb-4 grid grid-cols-1">
            <label className="block">
              Street Address:
              <input type="text" name="street_address" value={formData.street_address} onChange={handleChange} className="block mt-1 w-full border border-gray-300 rounded-md" />
            </label>


          </div>
          <button type="submit" className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteButtonClick}>Delete</button>
       </form>  )}
       <button className="mt-4 bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded" onClick={handleAddButtonClick}>Add</button>
     
        </div>
       
        

      </div>
    
  );
};

export default AddressBookComponent;



