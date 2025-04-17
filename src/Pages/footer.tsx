import './../App.css';
import insta from '../assets/instagram-symbol.png'

function Footer() {

   

  return (
   
<footer className=" w-full text-center  justify-between  text-gray transition-all duration-300 ">
<div className="text-center flex justify-between text-gray pb-4 text-sm sm:text-base">
  {/* Left: Terms & Privacy */}
  <div className="z-20 flex items-center">
    <a href="/terms" className="hover:text-gray-400 my-text ml-2 sm:ml-4 mr-2 sm:mr-4">Terms</a>
    <a href="/privacy" className="hover:text-gray-400 my-text mr-2 sm:mr-4">Privacy</a>
  </div>

  {/* Center: Instagram */}
  <div className="z-20 flex items-center justify-center relative">
    <a
      href="https://www.instagram.com/40.g.o.d?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
      className="hover:text-gray-400 my-text mb-2 sm:mb-0"
    >
      <img
        className="w-6 sm:w-7 opacity-60 hover:opacity-70 hover:w-7.5 transition-all"
        src={insta}
        alt="instagram"
      />
    </a>
  </div>

  {/* Right: General & Contact */}
  <div className="flex z-20 items-center">
    <a href="/general" className="hover:text-gray-400 my-text mr-2 sm:mr-4">General</a>
    <a href="/contact" className="hover:text-gray-400 my-text mr-2 sm:mr-4">Contact</a>
  </div>
</div>


  <p className='my-text text-[10px] z-20 flex items-center justify-center absolute left-0 right-0'>
  2024 © 40.G.O.D   all  rights  reserved
</p>

</footer>   




  );
}

export default Footer;
