import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import god from "../assets/logo1.png";
import A2 from "/logo/Asset 2-8.png";
import A4 from "/logo/Asset 4-8.png";
import A6 from "/logo/Asset 6-8.png";
import A7 from "/logo/Asset 7-8.png";
import A10 from "/logo/Asset 1-8.png";
import P1 from "/logo/p1.png";
import P2 from "/logo/p2.png";
import P3 from "/logo/p3.png";
import P4 from "/logo/p4.png";
import ring from "../assets/ring.png";

const Logo = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = window.innerWidth <= 600;
  const handleClick = () => {
    navigate("/");
  };

  return (
    <NavLink
      to="/"
      className="flex justify-center items-center select-none hover:cursor-pointer"
      style={{
        transform: isMobile
          ? "scale(0.4) translateY(-80%)"
          : "scale(0.6) translateY(-30%)",
      }}
    >
      <div className="slow-spin">
        <img
          className="z-10  w-68"
          src={ring}
          alt="Ring"
          style={{ filter: "drop-shadow(0px 0px 30px rgba(0, 0, 0, 1))" }}
        />

        <img
          className="z-10 w-20 pump absolute"
          src={A2}
          alt="Ring"
          style={{
            filter: "drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))",
            marginTop: isSmallScreen ? "-17rem" : "-17rem",
            marginLeft: isSmallScreen ? "4rem" : "4rem",
            width: isSmallScreen ? "4rem" : "4rem",
          }}
        />
        <img
          className="z-10 w-20 pump absolute"
          src={A4}
          alt="Ring"
          style={{
            filter: "drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))",
            marginTop: isSmallScreen ? "-5rem" : "-5rem",
            marginLeft: isSmallScreen ? "7rem" : "7rem",
            width: isSmallScreen ? "4rem" : "4rem",
          }}
        />
        <img
          className="z-10 w-20 pump absolute"
          src={A7}
          alt="Ring"
          style={{
            filter: "drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))",
            marginTop: isSmallScreen ? "-19rem" : "-19rem",
            marginLeft: isSmallScreen ? "11rem" : "11rem",
            width: isSmallScreen ? "4rem" : "4rem",
          }}
        />
        <img
          className="z-10 w-20 pump absolute"
          src={A6}
          alt="Ring"
          style={{
            filter: "drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))",
            marginTop: isSmallScreen ? "-11rem" : "-11rem",
            marginLeft: isSmallScreen ? "15rem" : "15rem",
            width: isSmallScreen ? "4rem" : "4rem",
          }}
        />
        <img
          className="z-10 w-20 pump absolute"
          src={A10}
          alt="Ring"
          style={{
            filter: "drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))",
            marginTop: isSmallScreen ? "-11rem" : "-11rem",
            marginLeft: isSmallScreen ? "1rem" : "1rem",
            width: isSmallScreen ? "4rem" : "4rem",
          }}
        />

        <img
          className="w-20 pump absolute"
          src={P1}
          alt="Ring"
          style={{
            filter: "drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))",
            marginTop: isSmallScreen ? "-24rem" : "-24rem",
            marginLeft: isSmallScreen ? "-1rem" : "-1rem",
            width: isSmallScreen ? "40rem" : "40rem",
          }}
        />
        <img
          className="w-20 pump absolute"
          src={P2}
          alt="Ring"
          style={{
            filter: "drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))",
            marginTop: isSmallScreen ? "-21rem" : "-21rem",
            marginLeft: isSmallScreen ? "-3rem" : "-3rem",
            width: isSmallScreen ? "50rem" : "50rem",
          }}
        />
        <img
          className="w-20 pump absolute"
          src={P3}
          alt="Ring"
          style={{
            filter: "drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))",
            marginTop: isSmallScreen ? "-20.5rem" : "-20.5rem",
            marginLeft: isSmallScreen ? "0.5rem" : "0.5rem",
            width: isSmallScreen ? "40rem" : "40rem",
          }}
        />
        <img
          className="w-20 pump absolute"
          src={P4}
          alt="Ring"
          style={{
            filter: "drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))",
            marginTop: isSmallScreen ? "-20.5rem" : "-20.5rem",
            marginLeft: isSmallScreen ? "-1.5rem" : "-1.5rem",
            width: isSmallScreen ? "40rem" : "40rem",
          }}
        />
      </div>
      <img
        className="w-32 absolute"
        src={god}
        alt="40.G.O.D"
        style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1))" }}
        onClick={handleClick}
      />
    </NavLink>
  );
};

export default Logo;
