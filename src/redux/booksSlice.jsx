// src/redux/booksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API URL
const API_URL = 'http://codeink.runasp.net';

// Async Thunks for CRUD operations

// Fetch Books (Read)
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const token = localStorage.getItem('jwt_token'); // Retrieve OAuth token
  const response = await fetch(`${API_URL}/api/books`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  const data = await response.json();
  return data.data.items; // Return the books data
});

// Create Book (Create)
export const createBook = createAsyncThunk('books/createBook', async (bookData) => {
  const token = localStorage.getItem('jwt_token'); // Retrieve OAuth token
  const response = await fetch(`${API_URL}/api/books`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error('Failed to create book');
  }

  const newBook = await response.json();
  return newBook.data; // Return the new book data
});

// Update Book (Update)
export const updateBook = createAsyncThunk('books/updateBook', async (bookData) => {
  const token = localStorage.getItem('jwt_token'); // Retrieve OAuth token
  const response = await fetch(`${API_URL}/api/books`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error('Failed to update book');
  }

  const updatedBook = await response.json();
  return updatedBook.data; // Return the updated book data
});

// Delete Book (Delete)
export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  const token = localStorage.getItem('jwt_token'); // Retrieve OAuth token
  const response = await fetch(`${API_URL}/api/Books/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete book');
  }

  return id; // Return the ID of the deleted book
});

// Redux slice for books
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Create Book
      .addCase(createBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books.push(action.payload); // Add the new book to the list
      })
      .addCase(createBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Update Book
      .addCase(updateBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload; // Update the book in the list
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete Book
      .addCase(deleteBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = state.books.filter((book) => book.id !== action.payload); // Remove the deleted book
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
