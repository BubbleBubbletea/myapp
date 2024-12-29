import React from 'react';
import logo from '../assets/wildcat.jpg'; 
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-white text-purple-900 font-bold rounded-md px-3 py-2'
      : 'text-white hover:bg-white hover:text-purple-900 rounded-md px-4 py-2';

  return (
    <nav className="bg-[#4E2A84] text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="flex items-center">
            <img className="h-12 w-auto" src={logo} alt="NUFindGroup Logo" />
          </NavLink>
          <span className="hidden md:block text-2xl font-bold">
            NUFindGroup
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/groups/1" className={linkClass}>
              STEM Group
            </NavLink>
          </li>
          <li>
            <NavLink to="/groups/2" className={linkClass}>
              Humanities Group
            </NavLink>
          </li>
          <li>
            <NavLink to="/groups/3" className={linkClass}>
              Arts Group
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
