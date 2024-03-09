import React, { useEffect, useState } from 'react';
import './../css/Button.css';
import b4 from '../assets/background/b4.jpeg';
import axios, { AxiosResponse } from 'axios';

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

const ShippingInfo: React.FC<ShippingInfoProps> = ({ }) => {
    const [addressBook, setAddressBook] = useState<AddressBookEntry[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

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
                    if (response.data.length > 0) {
                        setSelectedAddressId(response.data[0].id); // Select the first address entry by default
                    }
                })
                .catch((error) => {
                    console.error('Error fetching address book entries:', error);
                });
        }
    }, []);

    const handleAddressSelect = (addressId: number) => {
        setSelectedAddressId(addressId);
    };
console.log(selectedAddressId)

    return (
        <div className="p-4 rounded-lg shadow-md z-40"  style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
           <h2 className="text-lg font-semibold mb-2">Select the address</h2>
            <ul>
                {addressBook.map((entry) => (
                    <li key={entry.id} className='m-4 mb-8'>
                        <input
                            type="radio"
                            id={`address_${entry.id}`}
                            name="selectedAddress"
                            value={entry.id}
                            checked={selectedAddressId === entry.id}
                            onChange={() => handleAddressSelect(entry.id)}
                        />
                        <label  htmlFor={`address_${entry.id}`}>
                            <strong className='m-2'>Name:</strong> {entry.name}<br />
                            <strong className='m-4'>Phone:</strong> {entry.phone_number}<br />
                            <strong className='m-4'>Street Address:</strong> {entry.street_address}<br />
                            <strong className='m-4'>City:</strong> {entry.city}<br />
                            <strong className='m-4'>State:</strong> {entry.state}<br />
                            <strong className='m-4'>Postal Code:</strong> {entry.postal_code}<br />
                            <strong className='m-4'>Country:</strong> {entry.country}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShippingInfo;
