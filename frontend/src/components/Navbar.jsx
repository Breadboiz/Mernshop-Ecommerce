import { useState } from "react";
import { Link } from "react-router-dom"; // Nếu dùng React Router
import { FaSearch, FaShoppingBasket, FaTimes, FaBars   } from "react-icons/fa";
import {motion , AnimatePresence} from 'framer-motion';
import {useAuthContext} from '../context/AuthContext'
import  useLogout  from "../hooks/useLogout";
import { TbLogout } from "react-icons/tb";
import { GoPerson } from "react-icons/go";


const Navbar = () => {
    const [active, setActive] = useState("HOME");
    const [menuOpen, setMenuOpen] = useState(false);
    const {authUser} = useAuthContext();
    const {logout} = useLogout();
   // console.log(authUser);
  return (
    <div>
        <div className="flex items-center justify-between bg-white px-[2rem] lg:px-[6rem] py-2 border-b border-gray-200">
     {/* This button appears only on small screens    */}
    <button 
    className="lg:hidden text-2xl focus:outline-none"
    onClick={() => setMenuOpen(!menuOpen)}>
    {menuOpen ? <FaTimes /> : <FaBars />}
  </button>

        <div className="flex items-center justify-between">
            
            <img src="../src/assets/wall-clock.png" alt="" className="w-[3rem] mx-5 lg:block hidden"/>
            <div className="flex items-center justify-start">
            <ul className="menu menu-vertical hidden lg:menu-horizontal rounded-box ">
                <li onClick={() => setActive("HOME")} className="border-none">
                    <Link 
                        to="/" 
                        className={`uppercase text-sm font-semibold transition-all !bg-transparent !active:bg-transparent !focus:bg-transparent border-none 
                        ${active === "HOME" ? "text-orange-500 font-semibold" : "text-gray-500 hover:text-black-500"}`}
                    >
                        HOME
                    </Link>
                </li>

                <li onClick={() => setActive("SHOP")} className="border-none">
                    <Link 
                        to="/shop" 
                        className={`uppercase text-sm font-semibold transition-all !bg-transparent !active:bg-transparent !focus:bg-transparent border-none 
                        ${active === "SHOP" ? "text-orange-500 font-semibold" : "text-gray-500 hover:text-black-500"}`}
                    >
                        SHOP
                    </Link>
                </li>

                <li onClick={() => setActive("ABOUT US")} className="border-none">
                    <Link 
                        to="/about-us" 
                        className={`uppercase text-sm font-semibold transition-all !bg-transparent !active:bg-transparent !focus:bg-transparent border-none 
                        ${active === "ABOUT US" ? "text-orange-500 font-semibold" : "text-gray-500 hover:text-black-500"}`}
                    >
                        ABOUT US
                    </Link>
                </li>

                <li onClick={() => setActive("CONTACT")} className="border-none">
                    <Link 
                        to="/contact" 
                        className={`uppercase text-sm font-semibold transition-all !bg-transparent !active:bg-transparent !focus:bg-transparent border-none 
                        ${active === "CONTACT" ? "text-orange-500 font-semibold" : "text-gray-500 hover:text-black-500"}`}
                    >
                        CONTACT
                    </Link>
                </li>
            </ul>
        </div>
        </div>
        
        <div className="flex items-center justify-start">

            <form  className="h-[75%] flex items-center gap-2 px-4 border-r border-gray-500">
                <input type="text" placeholder="Type here" className="input input-ghost outline-none focus:outline-none" />
                <button className="cursor-pointer "><FaSearch /></button>
            </form>   


            {
            authUser === null ?(
                <div className="flex items-center justify-center w-auto h-auto ml-10 gap-2">
                    <button className="btn btn-outline btn-primary"><Link to="/login">Sign in</Link></button>
                    <button className="btn btn-outline btn-primary hidden sm:block"><Link to="/signup">Sign up</Link></button>
                </div>
                )  : (
                    <div className="flex items-center justify-center">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1">{authUser? authUser.username : <GoPerson/>}</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a>Profile</a></li>
                                <li><button onClick={
                                   logout
                                }><TbLogout/> Logout</button></li>
                            </ul>
                            </div>
                        <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full relative cursor-pointer  lg:ml-10 ">
                        <div>
                        <FaShoppingBasket className="text-white"/>
                        <span className="absolute top-0 right-0 w-4 h-4 text-white bg-gray-500 rounded-full flex items-center justify-center text-sm">1</span>
                        </div>
                    </div>
                     </div>
                  )
            }
        </div>
    </div>
     {/* Mobile Menu */}
     <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -50 }} // Start high
            animate={{ opacity: 1, y: 0 }}   // Fall down
            exit={{ opacity: 0, y: -50 }}    // Fall up when closing
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full bg-white lg:hidden absolute left-0 top-[60px] shadow-md"
          >
            <ul className="menu menu-vertical flex flex-col items-center justify-center w-full">
              {["HOME", "SHOP", "ABOUT US", "CONTACT"].map((item) => (
                <li 
                  key={item} 
                  className="w-full border-b border-gray-200 text-center font-semibold px-[1rem]"
                  onClick={() => setMenuOpen(false)} // Close menu on click
                >
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
};



export default Navbar;


// import { useState } from "react";
// import { Menu, X } from "lucide-react"; // Icon menu
// import { Link } from "react-router-dom"; // Nếu dùng React Router

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-blue-600 text-white">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold">
//           MyLogo
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6">
//           <Link to="/" className="hover:text-gray-300">Home</Link>
//           <Link to="/about" className="hover:text-gray-300">About</Link>
//           <Link to="/services" className="hover:text-gray-300">Services</Link>
//           <Link to="/contact" className="hover:text-gray-300">Contact</Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button 
//           onClick={() => setIsOpen(!isOpen)} 
//           className="md:hidden text-white"
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`md:hidden transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
//         <div className="flex flex-col space-y-4 p-4 bg-blue-700">
//           <Link to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link>
//           <Link to="/about" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>About</Link>
//           <Link to="/services" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Services</Link>
//           <Link to="/contact" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Contact</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
