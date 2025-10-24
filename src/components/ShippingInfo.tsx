import React, { useEffect, useState } from "react";
import "./../css/Button.css";
import b4 from "../assets/background/b4.jpeg";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

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

const ShippingInfo: React.FC<ShippingInfoProps> = () => {
  const [addressBook, setAddressBook] = useState<AddressBookEntry[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      axios
        .get<AddressBookEntry[]>("/address-book/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then((response: AxiosResponse<AddressBookEntry[]>) => {
          console.log("Address Book:", response.data);
          setAddressBook(response.data);
          if (response.data.length > 0) {
            setSelectedAddressId(response.data[0].id); // Select the first address entry by default
          }
        })
        .catch((error) => {
          console.error("Error fetching address book entries:", error);
        });
    }
  }, []);
  const navi = () => {
    navigate("/account");
  };
  const handleAddressSelect = (addressId: number) => {
    setSelectedAddressId(addressId);
  };
  console.log(selectedAddressId);

  return (
    <div
      className="p-4 rounded-lg shadow-md z-40"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${b4})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-lg">SELECT ADDRESS</h2>
      <ul>
        {addressBook.map((entry) => (
          <li key={entry.id} className="p-4">
            <input
              type="radio"
              id={`address_${entry.id}`}
              name="selectedAddress"
              value={entry.id}
              checked={selectedAddressId === entry.id}
              onChange={() => handleAddressSelect(entry.id)}
            />
            <label htmlFor={`address_${entry.id}`} className="ml-2">
            <strong>{entry.name}</strong>
              <br />
              Phone: <strong>{entry.phone_number}</strong>
              <br />
              Street Address:
              <strong>{entry.street_address}</strong>
              <br />
              City: <strong>{entry.city}</strong>
              <br />
              State: <strong>{entry.state}</strong>
              <br />
              Postal Code: <strong>{entry.postal_code}</strong> 
              <br />
              Country: <strong>{entry.country}</strong>
            </label>
          </li>
        ))}
      </ul>
      <button
        className="bg-black hover:bg-gray-700 text-white font-bold py-2 my-text px-4 rounded"
        onClick={navi}
      >
        ADD NEW ADDRESS
      </button>
    </div>
  );
};

export default ShippingInfo;
