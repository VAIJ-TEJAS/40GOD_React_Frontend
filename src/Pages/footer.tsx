function Footer() {

   

  return (
    <footer className="fixed bottom-0 w-full z-50 text-center flex justify-between p-4  text-gray">
    <div className="flex items-center space-x-4">
        <a href="#" className="hover:text-gray-400">Terms</a>
        <a href="#" className="hover:text-gray-400">Privacy</a>
    </div>
    <div className="flex items-center space-x-4">
        <a href="#" className="hover:text-gray-400">Socials</a>
    </div>
    <div className="flex items-center">
    <a href="#" className="hover:text-gray-400">General</a>
    <a href="#" className="hover:text-gray-400">Contact</a>
    </div>
</footer>


  );
}

export default Footer;
