import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { BarChart, PlusCircleIcon, ShoppingBasket } from 'lucide-react';
import CreateProductForm from '../../components/CreateProductForm/CreateProductForm';
import AnalyticsTab from '../../components/AnalyticsTab/AnalyticsTab';
import ProductDetails from '../../components/ProductDetails.jsx/ProductDetails';


const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create");
    const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircleIcon },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

  return (
        <div className='flex flex-col flex-grow w-full h-auto absolute '>
        <Navbar />
        <div className='flex flex-col sm:flex-row w-full h-full '>
          <div className='flex flex-col w-full sm:w-[20%] h-auto  items-center bg-slate-200'>
          <div className='flex flex-col w-full h-full  py-10'>
          <h2 className='text-xl font-bold mb-5 px-7'>Admin Dashboard</h2>
          {
            tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-2   transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-slate-700 text-white"
                    : " border-b border-gray-600 hover:bg-gray-600 text-black"
                }`}
              >
                <tab.icon className='mr-2 h-5 w-5' />
                {tab.label}
              </button>
            ))
          }
        </div> 
          </div>
          <div className='w-full sm:w-[80%] h-auto py-10'>
          {activeTab === "create" && <CreateProductForm/>}
          {activeTab === "products" && <ProductDetails/>}
 		  {activeTab === "analytics" && <AnalyticsTab/>}
          </div>
        </div>
        <Footer />
    </div>
 )
}

export default AdminPage

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