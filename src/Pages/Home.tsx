
import bg from '../assets/background/Backgroud.jpeg';
import axios from 'axios'
export const Home = () => {
  const newLocal = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${newLocal}`;
  return (
    <div className="flex flex-col relative full-height-div .full-height-div">
      <div className="fixed inset-0 bg-black">
        <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover  filter brightness-50" />
      </div>
  
    </div>
  )};

