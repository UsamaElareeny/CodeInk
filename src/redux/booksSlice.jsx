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

// Create Book
export const createBook = createAsyncThunk('books/createBook', async (newBook) => {
  const token = localStorage.getItem('jwt_token');
  const response = await fetch(`${API_URL}/api/books`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    throw new Error('Failed to create book');
  }

  const data = await response.json();
  return data.data; // Return the created book data
});

// Update Book
export const updateBook = createAsyncThunk('books/updateBook', async (updatedBook ) => {
  const token = localStorage.getItem('jwt_token');
  const response = await fetch(`${API_URL}/api/books`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: updatedBook,
  });

  if (!response.ok) {
    throw new Error('Failed to update book');
  }

  const data = await response.json();
  return data.data; // Return the updated book data
});

// Delete Book
export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  const token = localStorage.getItem('jwt_token');
  const response = await fetch(`${API_URL}/api/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete book');
  }

  return id; // Return the deleted book ID
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(createBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = state.books.filter(book => book.id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;