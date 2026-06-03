import React, { use, useState } from 'react';
import { LayoutDashboard, BookOpen, User, Bell, LogOut, Menu, X } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {logout, isAuthenticated,user } = useContext(AuthContext);

  const navigate=useNavigate();

  const handleLogOut=()=>{
    logout();
    navigate("/");
   console.log("Logging out...");
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Left: Logo & Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                kill-skill
              </span>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              <NavLink icon={<LayoutDashboard size={18} />} label="Dashboard" active />
              <NavLink label="Interviews-experience" />
              <NavLink label="Resources" />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:text-orange-500 transition-colors">
              <Bell size={20} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-700 leading-none">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
              {/* <NavLink to="/profile" className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold"> */}
              <a href="/profile" className="w-9 h-9 rounded-full cursor-pointer bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
               
                {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                
              </a>
              {/* </NavLink> */}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          <MobileNavLink label="Dashboard" active />
          <MobileNavLink label="Interviews-experience" />
          <MobileNavLink label="Resources" />
          <MobileNavLink label="Profile Settings" />
          <div className="pt-4 border-t border-slate-100">
            <button onClick={handleLogOut} className="flex items-center text-red-500 gap-2 text-sm font-medium px-3 py-2">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper Components for cleaner code
const NavLink = ({ label, active = false, icon }) => (
  <a 
    href={label==="Dashboard" ? "/dashboard" : label==="Interviews-experience" ? "/mock-interviews" : label==="Profile Settings" ? "/profile" : "#"}
    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
      active 
      ? 'text-orange-600 bg-orange-50' 
      : 'text-slate-600 hover:text-orange-500 hover:bg-slate-50'
    }`}
  >
    {icon}
    {label}
  </a>
);

const MobileNavLink = ({ label, active = false }) => (
  <a 
    href={label==="Dashboard" ? "/dashboard" : label==="Interviews-experience" ? "/mock-interviews":label==="Profile Settings" ? "/profile" : "#"}
    className={`block px-3 py-2 rounded-md text-base font-medium ${
      active ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'
    }`}
  >
    {label}
  </a>
);

export default Navbar;