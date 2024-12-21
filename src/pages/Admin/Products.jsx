import React, { useEffect, useState } from 'react'
import Modal from '../../components/Admin/Modal';
import Notification from '../../components/Admin/Notification';
import Table from '../../components/Admin/Table';
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
  console.log(books)
  const columns = ["cover", "title", "author", "isbn", "price", "Status"]
  // const [books, setBooks] = useState([
  //   {
  //     id: 1,
  //     title: "The Great Gatsby",
  //     author: "F. Scott Fitzgerald",
  //     genre: "Classic",
  //     publicationYear: 1925,
  //     status: "Available",
  //     cover: "https://via.placeholder.com/40?text=G",
  //   },
  //   {
  //     id: 2,
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     genre: "Historical Fiction",
  //     publicationYear: 1960,
  //     status: "Checked Out",
  //     cover: "https://via.placeholder.com/40?text=T",
  //   },
  //   {
  //     id: 3,
  //     title: "1984",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     publicationYear: 1949,
  //     status: "Available",
  //     cover: "https://via.placeholder.com/40?text=1",
  //   },
  //   {
  //     id: 4,
  //     title: "1984",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     publicationYear: 1949,
  //     status: "Available",
  //     cover: "https://via.placeholder.com/40?text=1",
  //   },
  //   {
  //     id: 5,
  //     title: "1984",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     publicationYear: 1949,
  //     status: "Available",
  //     cover: "https://via.placeholder.com/40?text=1",
  //   },
  //   {
  //     id: 6,
  //     title: "1984",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     publicationYear: 1949,
  //     status: "Available",
  //     cover: "https://via.placeholder.com/40?text=1",
  //   },
  //   {
  //     id: 7,
  //     title: "1984",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     publicationYear: 1949,
  //     status: "Available",
  //     cover: "https://via.placeholder.com/40?text=1",
  //   },
  //   {
  //     id: 8,
  //     title: "1984",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     publicationYear: 1949,
  //     status: "Available",
  //     cover: "https://via.placeholder.com/40?text=1",
  //   },
  //   {
  //     id: 9,
  //     title: "1984",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     publicationYear: 1949,
  //     status: "Available",
  //     cover: "https://via.placeholder.com/40?text=1",
  //   },
  //   {
  //     id: 10,
  //     title: "1984",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     publicationYear: 1949,
  //     status: "Available",
  //     cover: "https://via.placeholder.com/40?text=1",
  //   },
  // ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      price: book.price,
      status: book.status,
      cover: book.cover,
    });
  };

  const handleAdd = () => {
    setSelectedBook(null);
    setFormData({
      title: "",
      author: "",
      isbn: "",
      Price: "",
      status: "Available",
      cover: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (id) => {
    // Confirm deletion (optional)
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const updatedData = books.filter((book) => book.id !== id);
      setBooks(updatedData);
      setSelectedBook(null);
      setFormData(null);
    }

  };

  const handleSave = (e) => {
    e.preventDefault();

    if (selectedBook) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === selectedBook.id ? { ...book, ...formData } : book
        )
      );
    } else {
      const newBook = {
        id: books.length + 1,
        ...formData,
        cover: `https://via.placeholder.com/40?text=${formData.title[0]}`
      };
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
    setSelectedBook(null);
    setFormData(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Books</h2>
          <p className="text-sm text-gray-500 px-2">
            A list of all the books in the library including their title, author, genre, and status.
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
