import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignUpPage from "./SignUp";
import bg from "../assets/background/Backgroud.jpeg";

const Login = () => {
  const [activeButton, setActiveButton] = useState<"login" | "signup">("login");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
    setActiveButton("signup");
    setError("");
  };

  const handleLoginClick = () => {
    setIsSignUpOpen(false);
    setActiveButton("login");
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!isSignUpOpen) {
        // Using the correct endpoint from your API
        const response = await axios.post("/auth/", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data && response.data.token) {
          const token = response.data.token;
          localStorage.setItem("token", token);

          // Set default header for future requests
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Store user info if available
          if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }

          console.log("Logged in successfully!", response.data);
          navigate("/Account"); // Navigate to Account page after login
        } else {
          setError("Invalid response from server");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setError(
              "API endpoint not found. Please check your backend configuration."
            );
          } else {
            setError(
              error.response.data?.message ||
                `Request failed: ${error.response.status}`
            );
          }
        } else if (error.request) {
          setError(
            "No response from server. Please check your internet connection."
          );
        } else {
          setError(`Error: ${error.message}`);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        console.log("User is already logged in:", user);

        // Set authorization header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Optionally redirect to Account page if already logged in
        // navigate('/Account');
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <div className="text-gray-300">
      <div className="fixed inset-0">
        <img
          src={bg}
          alt="40.G.O.D rose background"
          className="absolute inset-0 w-screen h-full object-cover brightness-50"
        />
      </div>
      <div
        className="sm:w-1/3"
        style={{ margin: "10rem auto 0 auto" }}
      >
        <div className="relative flex flex-col gap-4 w-full p-8 top-12">
            
          <div className="grid grid-cols-2">
            <button
              className={`font-semibold p-2 hover:cursor-pointer z-30 ${
                activeButton === "login" ? "border-b-4 border-gray-600 bg-slate-200 bg-opacity-20" : ""
              }`}
              type="button"
              onClick={handleLoginClick}
            >
              LOGIN
            </button>
            <button
              className={`font-semibold p-2 hover:cursor-pointer z-30 ${
                activeButton === "signup" ? "border-b-4 border-gray-600 bg-slate-200 bg-opacity-20" : ""
              }`}
              type="button"
              onClick={handleSignUpClick}
            >
              SIGNUP
            </button>
          </div>

          {error && (
            <div className="p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isSignUpOpen && (
              <div className="flex flex-col gap-4">
                <div className="">
                  <label
                    className="text-gray-700"
                    htmlFor="username"
                  >
                    USERNAME
                  </label>
                  <input className="w-full rounded-md focus:outline-none focus:border-indigo-500 text-black p-2"
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="">
                  <label
                    className="text-gray-700"
                    htmlFor="password"
                  >
                    PASSWORD
                  </label>
                  <input className="w-full rounded-md focus:outline-none focus:border-indigo-500 text-black p-2"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  className="w-full bg-black text-white hover:bg-gray-400 hover:text-black border-black shadow-lg font-semibold p-2 rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "LOGGING IN..." : "LOGIN"}
                </button>
              </div>
            )}
            {isSignUpOpen && (
              <SignUpPage onClose={() => setIsSignUpOpen(false)} />
            )}
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
