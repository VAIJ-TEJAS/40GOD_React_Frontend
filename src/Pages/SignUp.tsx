import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

interface SignUpPageProps {
    onClose: () => void;
}

interface SignUpForm {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<SignUpForm>({
        username: " ",
        first_name: "",
        last_name: "",
        email: "",
        password: ""

});
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        
        console.log('Submitting signup form with data:', formData);
        
        try {
            // Using the correct endpoint for signup
            const response = await axios.post('/signup/', 
                formData, { headers: { 'Content-Type': 'application/json' } });
            
            
            console.log('Signup API response:', response.data);
            
            if (response.data) {
                setSuccessMessage('Signup successful!');
                console.log('SIGNUP SUCCESSFUL - User account created');
                
                // Check if token is in the response
                if (response.data.token) {
                    const token = response.data.token; 
                    localStorage.setItem('token', token); 
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    // Wait a moment before navigating
                    setTimeout(() => {
                        navigate('/Account', { state: formData });
                        onClose();
                    }, 1500);
                } else {
                    console.log('No token in response - user may need to login');
                    setTimeout(() => {
                        onClose(); // Close signup form to show login
                    }, 1500);
                }
            } else {
                setError('Signup completed but received an empty response');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            
            if (axios.isAxiosError(error)) {
                console.log('Axios error details:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    headers: error.response?.headers
                });
                
                if (error.response) {
                    if (error.response.status === 404) {
                        setError('API endpoint not found. Please check your backend configuration.');
                    } else if (error.response.status === 400) {
                        // Handle validation errors
                        const errorData = error.response.data;
                        if (typeof errorData === 'object' && errorData !== null) {
                            const errorMessages = Object.entries(errorData)
                                .map(([field, message]) => `${field}: ${message}`)
                                .join(', ');
                            setError(`Validation error: ${errorMessages}`);
                        } else {
                            setError(String(errorData) || 'Invalid form data');
                        }
                    } else {
                        setError(error.response.data?.message || `Request failed: ${error.response.status}`);
                    }
                } else if (error.request) {
                    setError('No response from server. Please check your internet connection.');
                } else {
                    setError(`Error: ${error.message}`);
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container my-text text-2xl">
            <form className="signup-form" onSubmit={handleSubmit}>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}
                
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                        {successMessage}
                    </div>
                )}
                
                <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1" htmlFor="first_name">
                        First Name
                    </label>
                    <input
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1" htmlFor="last_name">
                        Last Name
                    </label>
                    <input
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
              
                <div className="flex justify-between items-center">
                    <button 
                        type="submit" 
                        onClick={handleSubmit}
                        className="w-full bg-black text-white hover:bg-white hover:text-black shadow-lg font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;