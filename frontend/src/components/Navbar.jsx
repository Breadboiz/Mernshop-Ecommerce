import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaShoppingBasket, FaTimes, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { TbLogout } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { AiOutlineProfile } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { useCartContext } from "../context/CartContext";
const menuItems = [
  { label: "HOME", path: "/" },
  { label: "SHOP", path: "/shop" },
  { label: "ABOUT US", path: "/about-us" },
  { label: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const { cartState } = useCartContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cartState?.selectedCart?.cart_products?.length || ""; // Hoặc thay bằng cartContext.products.length nếu có

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate(`/shop?search=${inputValue}`);
    setInputValue("");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div className="flex items-center justify-between px-[2rem] lg:px-[6rem] py-2 border-b border-gray-200">
        <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo & Menu */}
        <div className="flex items-center">
          <img src="../src/assets/wall-clock.png" alt="logo" className="w-[3rem] mx-5 lg:block hidden" />
          <ul className="menu menu-vertical hidden lg:menu-horizontal rounded-box">
            {menuItems.map(({ label, path }) => (
              <li key={label} className="border-none">
                <button
                  onClick={() => handleNavigate(path)}
                  className={`uppercase text-sm font-semibold border-none 
                    ${isActive(path) ? "text-orange-500 font-semibold" : "text-gray-500 hover:text-black"}`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Search + Auth */}
        <div className="flex items-center">
          <form onSubmit={handleFormSubmit} className="h-[75%] flex items-center gap-2 px-4 border-r border-gray-500">
            <input
              type="text"
              placeholder="Type here"
              className="input input-ghost outline-none"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit"><FaSearch /></button>
          </form>

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
                <ul tabIndex={0} className="dropdown-content menu transition duration-200 ease-in-out bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                  {authUser.role === "AD" && (
                    <li><button onClick={() => navigate("/admin-dashboard")}><MdDashboard /> Admin panel</button></li>
                  )}
                  <li><button onClick={() => navigate("/dashboard")}><AiOutlineProfile /> Dashboard</button></li>
                  <li><button onClick={logout}><TbLogout /> Logout</button></li>
                </ul>
              </div>
              <div
                className="flex items-center justify-center w-10 h-10 bg-black rounded-full relative cursor-pointer lg:ml-10"
                onClick={() => navigate(`/cart/${authUser._id}`)}
              >
                <FaShoppingBasket className="text-white" />
                {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 text-white bg-gray-500 rounded-full flex items-center justify-center text-sm">
                {cartCount}
              </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
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
              {menuItems.map(({ label, path }) => (
                <li
                  key={label}
                  className="w-full border-b border-gray-200 text-center font-semibold px-[1rem]"
                  onClick={() => handleNavigate(path)}
                >
                  <button className="w-full py-2">{label}</button>
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
