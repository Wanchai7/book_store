import React, { useState } from "react";
import BookForm from "./BookForm";
import BookList from "./BookList";

function App() {
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);

  const addBook = (book) => {
    const newBook = { ...book, id: Date.now() };
    setBooks([...books, newBook]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
    if (bookToEdit && bookToEdit.id === id) {
      setBookToEdit(null);
    }
  };

  const startEdit = (book) => {
    setBookToEdit(book);
  };

  const editBook = (updatedBook) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setBookToEdit(null);
  };

  const clearEdit = () => {
    setBookToEdit(null);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>ร้านหนังสือ CRUD ด้วย React.js</h1>
      <BookForm
        addBook={addBook}
        editBook={editBook}
        bookToEdit={bookToEdit}
        clearEdit={clearEdit}
      />
      <BookList books={books} deleteBook={deleteBook} startEdit={startEdit} />
    </div>
  );
}

export default App;
