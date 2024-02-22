import { NavLink } from 'react-router-dom';


export const Account = () => {
    

    return (
        <div className="flex flex-col bg-gray-400">
       
        <div className="justify-center items-center mt-40 p-24">
          <div className="grid grid-cols-2">
          <NavLink className="my-text text-xl text-gray-700" to="/history">history</NavLink>

          </div>
        </div>
      </div>
    );
};
