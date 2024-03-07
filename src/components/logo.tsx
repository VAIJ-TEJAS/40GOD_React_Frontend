import  { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import god from '../assets/logo1.png';
import A2 from '/logo/Asset 2-8.png';
import A4 from '/logo/Asset 4-8.png';
import A6 from '/logo/Asset 6-8.png';
import A7 from '/logo/Asset 7-8.png';
import A10 from '/logo/Asset 1-8.png';
import P1 from '/logo/p1.png';
import P2 from '/logo/p2.png';
import P3 from '/logo/p3.png';
import P4 from '/logo/p4.png';
import ring from '../assets/ring.png';
import './../App.css';

const Logo = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const isMobile = window.innerWidth <= 600;
    return (
        <div className={`ml-5 sm:ml-40 inset-0 relative flex`} style={{ transform: isMobile ? 'scale(0.4) translateY(-80%)' : 'scale(0.6) translateY(-30%)' }}>
        <NavLink className='slow-spin' to="/">
                <img className="z-10 w-68" src={ring} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 30px rgba(0, 0, 0, 1))' }} />
                <img className="z-10 w-20 pump absolute" src={A2} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: isSmallScreen ? '-13rem' : '-17rem', marginLeft:isSmallScreen ? '2rem' : '4rem',width:isSmallScreen ? '4rem':'4rem' }} />
                <img className="z-10 w-20 pump absolute" src={A4} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop:isSmallScreen ? '-15rem' : '-5rem', marginLeft:isSmallScreen ? '8rem' : '7rem',width:isSmallScreen ? '4rem':'4rem' }} />
                <img className="z-10 w-20 pump absolute" src={A7} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop:isSmallScreen ? '-4rem' : '-19rem', marginLeft:isSmallScreen ? '4rem' : '11rem',width:isSmallScreen ? '4rem':'4rem' }} />
                <img className="z-10 w-20 pump absolute" src={A6} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop:isSmallScreen ? '-9rem' : '-11rem', marginLeft:isSmallScreen ? '11rem' : '15rem',width:isSmallScreen ? '4rem':'4rem' }} />
                <img className="z-10 w-20 pump absolute" src={A10} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop:isSmallScreen ? '-8rem' : '-11rem', marginLeft:isSmallScreen ? '-0rem' : '1rem', width:isSmallScreen ? '3rem':'4rem' }} />
                <img className=" w-20 pump absolute" src={P1} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop:isSmallScreen ? '-17rem' : '-24rem', marginLeft:isSmallScreen ? '-1rem' : '-1rem', width: '40rem' }} />
                <img className="w-20 pump absolute" src={P2} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop:isSmallScreen ? '-17rem' : '-21rem', marginLeft:isSmallScreen ? '-1.5rem' : '-3rem', width: '50rem' }} />
                <img className="w-20 pump absolute" src={P3} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop:isSmallScreen ? '-16.5rem' : '-20.5rem', marginLeft:isSmallScreen ? '0rem' : '0.5rem', width: '40rem' }} />
                <img className="w-20 pump absolute" src={P4} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop:isSmallScreen ? '-15rem': '-20.5rem', marginLeft:isSmallScreen ? '-0rem' : '-1.5rem', width: '40rem' }} />


            </NavLink>
            <img className="ml-24 sm:ml-28 mt-24 sm:mt-28 w-20 z-10 sm:w-32 absolute" src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 1))' }} />
        </div>
    );
};

export default Logo;
