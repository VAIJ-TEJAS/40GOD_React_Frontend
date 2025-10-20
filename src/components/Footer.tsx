import insta from "../assets/instagram-symbol.png";

function Footer() {
  return (
    <footer className="text-center flex flex-col gap-4 px-2 sm:px-4 pb-2 sm:pb-4">
      <div className="flex justify-between items-start text-sm sm:text-base relative">
        {/* Left: Terms & Privacy */}
        <div className="flex gap-2 sm:gap-20 z-50">
          <a
            href="/terms"
            className="hover:cursor-pointer hover:text-gray-400 z-50"
          >
            TERMS
          </a>
          <a
            href="/privacy"
            className="hover:cursor-pointer hover:text-gray-400 z-50"
          >
            PRIVACY
          </a>
        </div>

        {/* Center: Instagram */}
        <div className="flex items-center justify-center absolute w-full">
          <a
            href="https://www.instagram.com/40.g.o.d?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="hover:text-gray-400"
          >
            <img
              className="w-7 hover:w-8 opacity-60 hover:opacity-70 transition-all z-50"
              src={insta}
              alt="instagram"
            />
          </a>
        </div>

        {/* Right: General & Contact */}
        <div className="flex gap-2 sm:gap-20 z-50">
          <a
            href="/general"
            className="hover:cursor-pointer hover:text-gray-400 z-50"
          >
            GENERAL
          </a>
          <a
            href="/contact"
            className="hover:cursor-pointer hover:text-gray-400 z-50"
          >
            CONTACT
          </a>
        </div>
      </div>

      <div className="text-sm sm:text-base z-50">
        2025 © 40.G.O.D ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}

export default Footer;
