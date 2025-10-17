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
    </>
  );
};

export default Home;
