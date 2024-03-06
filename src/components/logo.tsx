import { NavLink } from 'react-router-dom';
import god from '../assets/logo1.png';
import A1 from '/logo/Asset 1-8.png';
import A2 from '/logo/Asset 2-8.png';
import A3 from '/logo/Asset 3-8.png';
import A4 from '/logo/Asset 4-8.png';
import A5 from '/logo/Asset 5-8.png';
import A6 from '/logo/Asset 6-8.png';
import A7 from '/logo/Asset 7-8.png';
import A8 from '/logo/Asset 8-8.png';
import A9 from '/logo/Asset 1-8.png';
import A10 from '/logo/Asset 1-8.png';
import B1 from '/logo/B1.png';
import B2 from '/logo/B2.png';
import P1 from '/logo/p1.png';
import P2 from '/logo/p2.png';
import P3 from '/logo/p3.png';
import P4 from '/logo/p4.png';


import ring from '../assets/ring.png'
import './../App.css';

const Logo = () => {
    return (
        <div className="ml-5 sm:ml-20 inset-0  relative flex " style={{ transform: 'scale(0.7) translateY(-30%)' }}>
            <NavLink className='slow-spin' to="/">
            <img className=" z-10 w-68   " src={ring} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 30px rgba(0, 0, 0, 1))' }} />
            <img className="z-10 pump absolute" src={A1} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: '-6.5rem', marginLeft: '13rem',width: '4rem' }} />
            <img className="z-10 w-20 pump absolute" src={A2} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: '-17rem', marginLeft: '4rem' }} />
            <img className="z-10 w-20 pump absolute" src={A4} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: '-5rem', marginLeft: '7rem' }} />
            <img className="z-10 w-20 pump absolute" src={A7} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: '-19rem', marginLeft: '11rem' }} />
            <img className="z-10 w-20 pump absolute" src={A6} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: '-11rem', marginLeft: '15rem',width: '4rem' }} />
        < img className="z-10 w-20 pump absolute"    src={A10} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: '-11rem', marginLeft: '1rem',width: '4rem' }} />
            <img className=" w-20 pump absolute"     src={P1} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: '-22rem', marginLeft: '-1rem',width: '40rem' }} />
            <img className="w-20 pump absolute"      src={P2} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: '-18rem', marginLeft: '1rem', width: '50rem' }} />
            <img className="w-20 pump absolute"      src={P3} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: '-20.5rem', marginLeft: '0.5rem', width: '40rem' }} />
            <img className="w-20 pump absolute"      src={P4} alt="Ring" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))', marginTop: '-20.5rem', marginLeft: '-0.5rem', width: '40rem' }} />


            </NavLink>
            <img className="ml-28 mt-28 w-20 z-10 sm:w-32 absolute" src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 1))' }} />
        </div>
    );
};

export default Logo;
