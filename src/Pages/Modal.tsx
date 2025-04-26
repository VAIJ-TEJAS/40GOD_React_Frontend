import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import SignUpPage from './SignUp';
import bg from '../assets/background/Backgroud.jpeg';
import axios from 'axios';
import "../App.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [activeButton, setActiveButton] = useState<'login' | 'signup'>('login');
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setIsSignUpOpen(true);
        setActiveButton('signup');
        setError('');
    };

    const handleLoginClick = () => {
        setIsSignUpOpen(false);
        setActiveButton('login');
        setError('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (!isSignUpOpen) {
                // Using the correct endpoint from your API
                const response = await axios.post('/auth/', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.data && response.data.token) {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    
                    // Set default header for future requests
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    // Store user info if available
                    if (response.data.user) {
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                    }
                    
                    console.log('Logged in successfully!', response.data);
                    navigate('/Account'); // Navigate to Account page after login
                } else {
                    setError('Invalid response from server');
                }
            }
        } catch (error) {
            console.error('Error logging in:', error);
            
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 404) {
                        setError('API endpoint not found. Please check your backend configuration.');
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');

        if (token && userJson) {
            try {
                const user = JSON.parse(userJson);
                console.log('User is already logged in:', user);
                
                // Set authorization header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                // Optionally redirect to Account page if already logged in
                // navigate('/Account');
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
    }, []);

    return (
        <div className="flex flex-col relative my-text text-2xl text-gray-600">
            <div className="fixed inset-0 bg-black">
                <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover filter brightness-50" />
            </div>
            <div className="z-50 bg-transparent h-screen mx-auto items-center justify-center relative rounded-lg sm:w-1/3" style={{ margin: "10rem auto 0 auto" }}>
                <div className="relative flex flex-col w-full p-8">
                    <div className="grid grid-cols-2 gap-20 sm:mt-13 sm:mt-16 py-8">
                        <button
                            className={`font-semibold m-3 ${activeButton === 'login' ? 'border-b-4 border-gray-600' : ''}`}
                            type="button"
                            onClick={handleLoginClick}
                        >
                            Login
                        </button>
                        <button
                            className={`font-semibold ${activeButton === 'signup' ? 'border-b-4 border-gray-600' : ''}`}
                            type="button"
                            onClick={handleSignUpClick}
                        >
                            Create Account
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {!isSignUpOpen && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-2xl font-medium text-gray-700 mb-1" htmlFor="username">
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
                                <div className="mb-6">
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
                                <button 
                                    className="w-full bg-black text-white hover:bg-white hover:text-black border-black shadow-lg font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </>
                        )}
                        {isSignUpOpen && <SignUpPage onClose={() => setIsSignUpOpen(false)} />}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;