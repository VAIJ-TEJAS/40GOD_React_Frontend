import insta from "../assets/instagram-symbol.png";
import { useState, useEffect } from "react";

function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide footer when near bottom, show otherwise
      setIsVisible(scrollPosition + windowHeight < documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("/")) {
      window.location.href = href;
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <footer className="text-center flex flex-col gap-4 px-2 sm:px-4 pb-2 sm:pb-4">
      <div className="flex justify-between items-start text-sm sm:text-base relative">
        {/* Left: Terms & Privacy */}
        <div className="flex gap-2 sm:gap-20 z-50">
          <a
            href="/terms"
            onClick={(e) => handleLinkClick(e, "/terms")}
            className="hover:cursor-pointer hover:text-gray-400 z-50 transition-colors duration-200"
          >
            TERMS
          </a>
          <a
            href="/privacy"
            onClick={(e) => handleLinkClick(e, "/privacy")}
            className="hover:cursor-pointer hover:text-gray-400 z-50 transition-colors duration-200"
          >
            PRIVACY
          </a>
        </div>

        {/* Center: Instagram */}
        <div className="flex items-center justify-center absolute w-full">
          <a
            href="https://www.instagram.com/40.g.o.d?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            onClick={(e) => handleLinkClick(e, "https://www.instagram.com/40.g.o.d?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==")}
            className="hover:text-gray-400 transition-all duration-200"
            aria-label="Visit our Instagram page"
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
            onClick={(e) => handleLinkClick(e, "/general")}
            className="hover:cursor-pointer hover:text-gray-400 z-50 transition-colors duration-200"
          >
            GENERAL
          </a>
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, "/contact")}
            className="hover:cursor-pointer hover:text-gray-400 z-50 transition-colors duration-200"
          >
            CONTACT
          </a>
        </div>
      </div>

      <div className="text-sm sm:text-base z-50">
        {getCurrentYear()} © 40.G.O.D ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}

export default Footer;
