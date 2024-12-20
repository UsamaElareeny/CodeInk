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
      console.log("Selected Book:", selectedBook);
  
      // Create FormData for updating the book
      const formdata = new FormData();
      formdata.append("id", selectedBook.id);
      formdata.append("description", formData.description || selectedBook.description);
      formdata.append("categoryIds[0]", selectedBook.categories?.[0]?.id || ""); // Check if the category exists
      formdata.append("Title", formData.title || selectedBook.title); // Ensure proper casing
      formdata.append("Author", formData.author || selectedBook.author); // Ensure proper casing
      formdata.append("ISBN", formData.isbn || selectedBook.isbn);
      formdata.append("price", parseFloat(formData.price || selectedBook.price)); // Ensure it's a number
      formdata.append("isPublished", formData.isPublished === "true" || formData.isPublished); // Convert to boolean if needed
  
      // Handle file input for the CoverImage field
      if (formData.cover && formData.cover instanceof File) {
        formdata.append("CoverImage", formData.cover); // If coverImage is a valid file object
      } else {
        console.warn("Invalid CoverImage: Using placeholder or existing image.");
        formdata.append(
          "CoverImage",
          new File(["dummy content"], "placeholder.png", { type: "image/png" })
        );
      }
  
      // Dispatch the updated form data
      dispatch(updateBook(formdata))
        .unwrap()
        .then(() => {
          alert("Book updated successfully!");
        })
        .catch((error) => {
          console.error("Update failed:", error.message || error);
          alert("Error updating the book. Please check your input.");
        });
    } else {
      // Create a new book
      const newBookData = {
        ...formData,
        cover: formData.cover
          ? formData.cover.name // Assuming it's a File object, get its name
          : `https://via.placeholder.com/40?text=${formData.title[0]}`,
      };
  
      dispatch(createBook(newBookData))
        .unwrap()
        .then(() => {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        })
        .catch((error) => {
          console.error("Create failed:", error.message || error);
          alert("Error creating the book. Please try again.");
        });
    }
  
    // Reset selectedBook and formData
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