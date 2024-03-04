import { NavLink } from 'react-router-dom';
import god from '../assets/logo1.png'




const Logo = () => {
    return (
        <div className="ml-5 sm:ml-20">
            <NavLink to="/">
                {' '}
                <img className="w-24 sm:w-32" src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))' }} />
            </NavLink>
        </div>
    );
};

export default Logo;
