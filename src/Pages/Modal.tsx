import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import SignUpPage from './SignUp';
import bg from '../assets/background/Backgroud.jpeg';
import axios from 'axios';
import "../App.css"


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

        try {
            if (!isSignUpOpen) {
                const response = await axios.post('/auth/', formData);
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log('Logged in successfully!', response.data);
                window.location.href = '/';

            } else {
                alert("error in logging")
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
        <div className="flex flex-col relative my-text text-2xl text-gray-600  ">
       

            <div className="fixed inset-0 bg-black">
                <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-50" />
            </div>
            <div className="z-50 bg-transparent h-screen mx-auto items-center justify-center relative  rounded-lg sm:w-1/3 " style={{  margin: "10rem auto 0 auto" }}>

                <div className="relative flex flex-col w-full p-8">
                    
                <div className="grid grid-cols-2 gap-20 sm:mt-13 sm:mt-16 py-8">
               
        <button
          className={`font-semibold m-3    ${activeButton === 'login' ? 'border-b-4  border-gray-600' : ''}`}
          type="button"
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className={`font-semibold  ${activeButton === 'signup' ? 'border-b-4 border-gray-600' : ''}`}
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
                                    <label className="block text-2xl font-medium text-gray-700  mb-1" htmlFor="email">
                                    Username                                    </label>
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
                                    <label className="block  font-medium text-gray-700  mb-1" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button className=" w-full bg-black text-white hover:bg-white hover:text-black border-balck shadow-lg font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Login
                                </button>
                            </>
                        )}
                        {isSignUpOpen && <SignUpPage onClose={() => setIsSignUpOpen(false)} />}

                        <div className="flex justify-between items-center">
                          
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
