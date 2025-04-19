import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { BarChart, PlusCircleIcon, ShoppingBasket,User,ReceiptText   } from 'lucide-react';
import { Outlet } from 'react-router-dom';


import { Link, useLocation } from 'react-router-dom';

const AdminPage = () => {
  const location = useLocation();

  const tabs = [
    { id: "create", label: "Create Product", icon: PlusCircleIcon, path: "/admin-dashboard/create" },
    { id: "products", label: "Products", icon: ShoppingBasket, path: "/admin-dashboard/products" },
    { id: "users", label: "Users", icon: User, path: "/admin-dashboard/users" },
    { id: "orders", label: "Orders", icon: ReceiptText, path: "/admin-dashboard/orders" },
    { id: "analytics", label: "Analytics", icon: BarChart, path: "/admin-dashboard/analytics" },
  ];

  return (
    <div className='flex flex-col flex-grow w-full  min-h-screen absolute scroll-smooth '>
      <Navbar />
      <div className='flex flex-col sm:flex-row w-full min-h-screen  px-1 sm:px-[7rem]'>
        <div className='flex flex-col w-full sm:w-[25%] h-auto items-center '>
          <div className='flex flex-col w-full h-full py-10'>
            <h2 className='text-xl font-bold mb-5 px-7'>Admin Dashboard</h2>
            {tabs.map((tab) => {
              const isActive = location.pathname.includes(tab.id);
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`flex items-center px-6 py-2 transition-colors duration-200 ${
                    isActive
                      ? "bg-slate-700 text-white"
                      : "border-b border-gray-600 hover:bg-gray-600 text-black"
                  }`}
                >
                  <tab.icon className='mr-2 h-5 w-5' />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className='w-full sm:w-[75%] h-auto py-10'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;


// import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";


// const tabs = [
// 	{ id: "create", label: "Create Product", icon: PlusCircle },
// 	{ id: "products", label: "Products", icon: ShoppingBasket },
// 	{ id: "analytics", label: "Analytics", icon: BarChart },
// ];

// const AdminPage = () => {
// 	const [activeTab, setActiveTab] = useState("create");


// 	return (
// 		<div className='min-h-screen relative overflow-hidden'>
// 			<div className='relative z-10 container mx-auto px-4 py-16'>
// 				<motion.h1
// 					className='text-4xl font-bold mb-8 text-emerald-400 text-center'
// 					initial={{ opacity: 0, y: -20 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.8 }}
// 				>
// 					Admin Dashboard
// 				</motion.h1>

// 				<div className='flex justify-center mb-8'>
// 					{tabs.map((tab) => (
// 						<button
// 							key={tab.id}
// 							onClick={() => setActiveTab(tab.id)}
// 							className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
// 								activeTab === tab.id
// 									? "bg-emerald-600 text-white"
// 									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
// 							}`}
// 						>
// 							<tab.icon className='mr-2 h-5 w-5' />
// 							{tab.label}
// 						</button>
// 					))}
// 				</div>
// 				{activeTab === "create"}
// 				{activeTab === "products" }
// 				{activeTab === "analytics" }
// 			</div>
// 		</div>
// 	);
// };
// export default AdminPage;