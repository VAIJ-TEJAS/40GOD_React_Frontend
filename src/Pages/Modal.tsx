import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import SignUpPage from './SignUp';
import bg from '../assets/background/Backgroud.jpeg';
import axios from 'axios';



const Login = () => {

    const [activeButton, setActiveButton] = useState<'login' | 'signup' | null>('login');;

    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSignUpClick = () => {
        setIsSignUpOpen(true);
        setActiveButton('signup');


    };
    const handleLoginClick = () => {
        setIsSignUpOpen(false);
        setActiveButton('login');

    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('button tudum')
        try {
            if (!isSignUpOpen) {
                const response = await axios.post('/auth/', formData);
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log('Logged in successfully!', response.data);

            } else {
                // Handle sign-up logic
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }

        setFormData({
            username: '',
            password: ''
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');

        if (token) {
            const user = JSON.parse(userJson!);
            console.log(user);
            console.log('User is already logged in with token:', token);
        }
    }, []);


    return (
        <div className="flex flex-col relative ">
             <div
        className={`absolute bottom-0 ${activeButton === 'login' ? 'left-0' : 'right-0'}`}
        style={{ width: 'calc(50% - 50px)', borderBottom: '64px solid black' }}
      />

            <div className="fixed inset-0 bg-black">
                <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-75" />
            </div>
            <div className="bg-transparent h-screen mt-60 items-center justify-center relative w-auto max-w-md mx-auto my-6 rounded-lg">

                <div className="relative flex flex-col w-full p-8">
                    
                <div className="grid grid-cols-2 gap-20 mt-10 sm:mt-16 py-8">
               
        <button
          className={`font-semibold mr-16 ${activeButton === 'login' ? 'border-b-2 border-black' : ''}`}
          type="button"
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className={`font-semibold ${activeButton === 'signup' ? 'border-b-2 border-black' : ''}`}
          type="button"
          onClick={handleSignUpClick}
        >
          Create Account
        </button>
       
      </div>
   

                    <form onSubmit={handleSubmit}>
                        {!isSignUpOpen && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {isSignUpOpen && <SignUpPage onClose={() => setIsSignUpOpen(false)} />}

                        <div className="flex justify-between items-center">
                            {!isSignUpOpen && (
                                <>
                                    <button className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Login
                                    </button>
                                    <button className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSignUpClick}>
                                        Sign Up
                                    </button>
                                    <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
