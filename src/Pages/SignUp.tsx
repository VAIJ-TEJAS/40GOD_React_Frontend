import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css"
interface SignUpPageProps {
    onClose: () => void;
}

interface SignUpForm {
    username: string,
    password: string|number,
    first_name: string,
    last_name: string,
    email: string,
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<SignUpForm>({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('/signup/', formData);
            const token = response.data.token; 
            localStorage.setItem('token', token); 
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            console.log(response.data); 
            navigate('/Account', { state: formData });
            onClose();
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up');

        }

        setFormData({
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
        });
    };

    return (
        <div className="signup-container my-text text-2xl">
          
            <form className="signup-form" onSubmit={handleSubmit}>
            <div className="mb-4">
                    <label className="block  font-medium text-gray-700 mb-1" htmlFor="phoneNumber">
                        Username
                    </label>
                    <input
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="username"
                        name="username"
                        placeholder='   Username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block  font-medium text-gray-700 mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block  font-medium   mb-1" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="w-full border border-gray-300  rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder='First-Name'
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block  font-medium mb-1" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="last_name"
                        placeholder='Last Name'
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block  font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full border border-gray-300  rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                        type="email"
                        placeholder='Email'
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
              
              
                <div className="flex justify-between items-center">

                <button type="submit" className="w-full bg-black text-white hover:bg-white hover:text-black shadow-lg font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Sign Up
    </button>
                  
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
