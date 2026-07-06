import axios from "axios";
import bg from "../assets/background/Backgroud.jpeg";

const Home = () => {
  const newLocal = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${newLocal}`;

  return (
    <>
      <img
        src={bg}
        alt="40.G.O.D rose background"
        className="absolute w-screen h-full object-cover brightness-50 -z-50"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center"><h1 className="god-text text-white text-4xl md:text-6xl animate-pulse">Our products are exclusive and limited, one time designed. It won't be repeated. First come first serve.</h1></div>
    </>
  );
};

export default Home;
