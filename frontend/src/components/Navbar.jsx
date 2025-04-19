import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingBasket, FaTimes, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';
import useLogout from "../hooks/useLogout";
import { TbLogout } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { AiOutlineProfile } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const [active, setActive] = useState("HOME");
  const [menuOpen, setMenuOpen] = useState(false);
  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => setInputValue(event.target.value);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate(`/shop?search=${inputValue}`);
  };

  const handleNavigate = (path, label) => {
    navigate(path);
    setActive(label);
    setMenuOpen(false); // đóng mobile menu nếu đang mở
  };

  return (
    <div>
      <div className="flex items-center justify-between px-[2rem] lg:px-[6rem] py-2 border-b border-gray-200">
        {/* Menu toggle on small screens */}
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="flex items-center">
          <img src="../src/assets/wall-clock.png" alt="" className="w-[3rem] mx-5 lg:block hidden" />
          <div className="flex items-center">
            <ul className="menu menu-vertical hidden lg:menu-horizontal rounded-box">
              {["HOME", "SHOP", "ABOUT US", "CONTACT"].map((item) => (
                <li key={item} onClick={() => handleNavigate(`/${item === "HOME" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`, item)} className="border-none">
                  <button
                    className={`uppercase text-sm font-semibold transition-all !bg-transparent !active:bg-transparent !focus:bg-transparent border-none 
                      ${active === item ? "text-orange-500 font-semibold" : "text-gray-500 hover:text-black-500"}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center">
          {/* Search */}
          <form className="h-[75%] flex items-center gap-2 px-4 border-r border-gray-500" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Type here"
              className="input input-ghost outline-none focus:outline-none"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit" className="cursor-pointer">
              <FaSearch />
            </button>
          </form>

          {/* Auth area */}
          {authUser === null ? (
            <div className="flex items-center ml-10 gap-2">
              <button className="btn btn-outline btn-primary" onClick={() => navigate("/login")}>Sign in</button>
              <button className="btn btn-outline btn-primary hidden sm:block" onClick={() => navigate("/signup")}>Sign up</button>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                  {authUser?.username || <GoPerson />}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  {authUser.role === "AD" && (
                    <li>
                      <button onClick={() => navigate("/admin-dashboard")}><MdDashboard /> Dashboard</button>
                    </li>
                  )}
                  <li><button><AiOutlineProfile /> Profile</button></li>
                  <li><button onClick={logout}><TbLogout /> Logout</button></li>
                </ul>
              </div>
              <div
                className="flex items-center justify-center w-10 h-10 bg-black rounded-full relative cursor-pointer lg:ml-10"
                onClick={() => navigate(`/cart/${authUser._id}`)}
              >
                <FaShoppingBasket className="text-white" />
                <span className="absolute top-0 right-0 w-4 h-4 text-white bg-gray-500 rounded-full flex items-center justify-center text-sm">1</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-white lg:hidden absolute left-0 top-[60px] shadow-md"
          >
            <ul className="menu menu-vertical flex flex-col items-center w-full">
              {["HOME", "SHOP", "ABOUT US", "CONTACT"].map((item) => (
                <li
                  key={item}
                  className="w-full border-b border-gray-200 text-center font-semibold px-[1rem]"
                  onClick={() => handleNavigate(`/${item === "HOME" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`, item)}
                >
                  <button className="w-full py-2">{item}</button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
