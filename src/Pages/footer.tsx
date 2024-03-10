import './../App.css';


function Footer() {

   

  return (
    
<footer className=" bottom-0 w-full z-50 text-center flex justify-between p-4 text-gray transition-all duration-300">
    <div className=" z-20 flex items-center space-x-4">
        <a href="/terms" className="hover:text-gray-400 my-text">Terms</a>
        <a href="/privacy" className="hover:text-gray-400 my-text">Privacy</a>
    </div>
    <div className=" z-20 items-center space-x-4">
        <a href="#" className="hover:text-gray-400 my-text">Socials</a><br/>
        <p>2024 © 40.G.O.D all rights reserved</p>
        
    </div>
    <div className="flex  z-20 items-center">
        <a href="/" className="hover:text-gray-400 my-text mr-4">General</a>
        <a href="#" className="hover:text-gray-400 my-text">Contact</a>
    </div>
</footer>



  );
}

export default Footer;
