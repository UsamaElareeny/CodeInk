import React, { useEffect, useState } from 'react';
import Modal from '../../components/Admin/Product/Modal';
import Notification from '../../components/Admin/Notification';
import Table from '../../components/Admin/Product/Table';
import { useDispatch, useSelector } from 'react-redux';
import { createBook, deleteBook, fetchBooks, updateBook } from '../../redux/booksSlice';

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
  const base64ToBlob = (base64String, mimeType) => {
    const byteString = atob(base64String.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: mimeType });
  };

  const handleSave = (e) => {
    e.preventDefault();
  
    const formdata = new FormData();
    formdata.append('title', formData.title);
    formdata.append('author', formData.author);
    formdata.append('isbn', formData.isbn);
    formdata.append('price', formData.price);
    formdata.append('isPublished', formData.isPublished);
  
    if (formData.cover) {
      const base64Parts = formData.cover.split(",");
      if (base64Parts.length === 2) {
        const mimeType = base64Parts[0].match(/:(.*?);/)[1];
        if (mimeType) {
          const blob = base64ToBlob(formData.cover, mimeType);
  
          const coverImageFile = new File([blob], "coverImage", {
            type: blob.type,
          });
  
          // Check file size (example: limit to 2MB)
          if (coverImageFile.size > 2 * 1024 * 1024) {
            alert("File size exceeds the 2MB limit.");
            return;
          }
  
          // Check file type
          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
          if (!allowedTypes.includes(coverImageFile.type)) {
            alert("File type is not allowed. Allowed types are: .jpg, .jpeg, .png, .gif.");
            return;
          }
  
          formdata.append("CoverImage", coverImageFile);
        } else {
          alert("Invalid cover image format.");
          return;
        }
      } else {
        alert("Invalid cover image format.");
        return;
      }
    } else {
      alert("Cover image is required.");
      return;
    }
  
    if (selectedBook) {
      formdata.append('id', selectedBook.id);
      formdata.append("description", selectedBook.description);
      formdata.append("categoryIds[0]", selectedBook.categories[0].id);
      dispatch(updateBook(formdata));
    } else {
      formdata.append("categoryIds[0]", "1");
      dispatch(createBook(formdata));
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