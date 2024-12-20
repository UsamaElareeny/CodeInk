import React, { useEffect, useState } from 'react';
import Modal from '../../components/Admin/Modal';
import Notification from '../../components/Admin/Notification';
import Table from '../../components/Admin/Table';
import { useDispatch, useSelector } from 'react-redux';
import { createBook, deleteBook, fetchBooks, updateBook } from '../../redux/booksSlice';
import { Form } from 'react-router-dom';

export default function Products() {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (error) {
      console.error('Failed to fetch books:', error);
    }
  }, [error]);

  const columns = ["cover", "title", "author", "isbn", "price", "status"];
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleEdit = (book) => {
    setSelectedBook(book);
    // console.log(book)
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      price: book.price,
      isPublished: book.isPublished,
      cover: book.coverImageUrl,
    });
  };

  const handleAdd = () => {
    setSelectedBook(null);
    setFormData({
      title: "",
      author: "",
      isbn: "",
      price: "",
      isPublished: true,
      cover: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      dispatch(deleteBook(id));
      setSelectedBook(null);
      setFormData(null);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (selectedBook) {
      console.log(selectedBook)
      const formdata = new FormData();
      formdata.append('id', selectedBook.id);
      formdata.append("description",selectedBook.description)
      formdata.append("categoryIds[0]", selectedBook.categories[0].id);
      formdata.append('title', formData.title);
      formdata.append('author', formData.author);
      formdata.append('isbn', formData.isbn);
      formdata.append('price', formData.price);
      formdata.append('isPublished', formData.isPublished);
      const coverImageFile = new File(["dummy content"], formData.cover, {
        type: "image/png",
      });
      formdata.append("CoverImage", coverImageFile);

      dispatch(updateBook(formdata));
    } else {
      dispatch(createBook({ ...formData, cover: `https://via.placeholder.com/40?text=${formData.title[0]}` }));
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
    setSelectedBook(null);
    setFormData(null);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Books</h2>
          <p className="text-sm text-gray-500 px-2">
            A list of all the books in the library including their title, author, price, and status.
          </p>
        </div>
        <button onClick={handleAdd} className="min-w-[105px] bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Add book
        </button>
      </div>
      <div className="overflow-x-auto">
        <Table handleEdit={handleEdit} data={books} columns={columns} />
      </div>
      {showNotification && (
        <Notification message={"Book added successfully!"} />
      )}
      <Modal selectedBook={selectedBook} formData={formData} handleChange={handleChange} handleSave={handleSave} setFormData={setFormData} setSelectedBook={setSelectedBook} handleDelete={handleDelete} />
    </div>
  );
}