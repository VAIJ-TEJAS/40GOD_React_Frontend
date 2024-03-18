import './../App.css';
import insta from '../assets/instagram-symbol.png'

function Footer() {

   

  return (
   <>
<footer>
  <div className="bottom-0 w-full z-50 text-center  justify-between p- text-gray transition-all duration-300">
  <div className="text-center flex justify-between  text-gray pb-4 ">
    <div className="z-20 flex items-center space-x-4">
      <a href="/terms" className="hover:text-gray-400 my-text ml-4">Terms</a>
      <a href="/privacy" className="hover:text-gray-400 my-text">Privacy</a>
    </div>
    <div className="z-20 items-center justify-center space-x-4 ">
    
      <a href="https://www.instagram.com/40.g.o.d?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-gray-400 my-text  items-center justify-center mb-6"><img className='flex w-7 sm:w-7 absolute opacity-60 hover:opacity-70 hover:w-8' src={insta} alt='instagram' /></a>   

    </div>
    <div className="flex z-20 items-center">
      <a href="/" className="hover:text-gray-400 my-text mr-4">General</a>
      <a href="#" className="hover:text-gray-400 my-text mr-4">Contact</a>
    </div>
  </div>
  <p className='my-text text-sm z-20 flex items-center justify-center absolute  left-0 right-0 p-2'>
  2024 © 40.G.O.D all rights reserved
</p>
  </div>
</footer>   
</>



  );
}

export default Footer;
