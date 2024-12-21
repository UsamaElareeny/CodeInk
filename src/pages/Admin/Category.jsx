import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../redux/categorySlice';
import Modal from '../../components/Admin/category/Modal';
import Notification from '../../components/Admin/Notification';
import Table from '../../components/Admin/category/Table';

const Category = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', numOfBooks: 0, createdOn: '', lastUpdatedOn: '' });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (currentCategory.id) {
      await dispatch(updateCategory({ id: currentCategory.id, name: currentCategory.name })).unwrap();
    } else {
      const newCategory = await dispatch(createCategory({ name: currentCategory.name })).unwrap();
      setCurrentCategory(newCategory);
    }
    setShowModal(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);

  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const openModal = (category = { id: null, name: '', numOfBooks: 0 }) => {
    setCurrentCategory(category);
    setShowModal(true);
  };

  const columns = ["ID", "Name", "Number of Books", "Created On", "Last Updated On", "Actions"];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Categories</h2>
          <p className="text-sm text-gray-500 px-2">
            A list of all the categories including their name, number of books, and dates.
          </p>
        </div>
        <button onClick={() => openModal()} className="min-w-[105px] bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <Table handleEdit={openModal} handleDelete={handleDelete} data={categories} columns={columns} />
      </div>
      {showNotification && (
        <Notification message={"Category saved successfully!"} />
      )}
      {showModal && (
        <Modal
          title={currentCategory.id ? 'Edit Category' : 'Add Category'}
          formData={currentCategory}
          handleChange={(e) => setCurrentCategory({ ...currentCategory, [e.target.name]: e.target.value })}
          handleSave={handleSave}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Category;