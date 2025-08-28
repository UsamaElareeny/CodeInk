import React from 'react';
import 'tailwindcss/tailwind.css';
import Products from '../../assets/books.png';
import Orders from '../../assets/order.png';
import Categories from '../../assets/categories.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Home Page</h1>
      <p className="text-lg mb-8">This is the admin section of the e-commerce application.</p>
      <div className="flex justify-around">
        <div className="section cursor-pointer transform transition-transform hover:scale-110" onClick={() => navigate('/admin/products')}>
          <img src={Products} alt="Manage Products" className="w-48 h-48 mx-auto object-cover object-left" />
          <p className="mt-2 font-semibold">Manage Products</p>
        </div>
        <div className="section cursor-pointer transform transition-transform hover:scale-110" onClick={() => navigate('/admin/order')}>
          <img src={Orders} alt="View Orders" className="w-48 h-48 mx-auto object-cover object-left" />
          <p className="mt-2 font-semibold">View Orders</p>
        </div>
        <div className="section cursor-pointer transform transition-transform hover:scale-110" onClick={() => navigate('/admin/category')}>
          <img src={Categories} alt="Manage Users" className="w-48 h-48 mx-auto object-cover object-left" />
          <p className="mt-2 font-semibold">Manage Categories</p>
        </div>
      </div>
    </div>
  );
}