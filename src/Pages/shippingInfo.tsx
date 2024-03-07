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
  

const ShippingInfo: React.FC<ShippingInfoProps> = ({ }) => {
    const [addressBook, setAddressBook] = useState<AddressBookEntry[]>([]);
    const [formData, setFormData] = useState<AddressFormData>({
        name: '',
        phone_number: '',
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
        country: ''
      });
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
                    console.error('Error fetching address book entries:', error);
                });
        }
    }, []);

    return (
        <div className="p-4 rounded-lg shadow-md" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <h2>Address Book Entries:</h2>
            <ul>
                {addressBook.map((entry) => (
                    <li key={entry.id}>
                        Name: {entry.name}, Phone: {entry.phone_number}
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShippingInfo;
