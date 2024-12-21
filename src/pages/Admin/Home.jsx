import React from 'react';
import 'tailwindcss/tailwind.css';

export default function Home() {
  const handleSectionClick = (sectionName) => {
    setSection(sectionName);
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Home Page</h1>
      <p className="text-lg mb-8">This is the admin section of the e-commerce application.</p>
      <div className="flex justify-around">
        <div className="section cursor-pointer transform transition-transform hover:scale-110" onClick={() => handleSectionClick('products')}>
          <img src="https://via.placeholder.com/100" alt="Manage Products" className="w-24 h-24 mx-auto" />
          <p className="mt-2 font-semibold">Manage Products</p>
        </div>
        <div className="section cursor-pointer transform transition-transform hover:scale-110" onClick={() => handleSectionClick('orders')}>
          <img src="https://via.placeholder.com/100" alt="View Orders" className="w-24 h-24 mx-auto" />
          <p className="mt-2 font-semibold">View Orders</p>
        </div>
        <div className="section cursor-pointer transform transition-transform hover:scale-110" onClick={() => handleSectionClick('users')}>
          <img src="https://via.placeholder.com/100" alt="Manage Users" className="w-24 h-24 mx-auto" />
          <p className="mt-2 font-semibold">Manage Users</p>
        </div>
      </div>
      
    </div>
  );
}