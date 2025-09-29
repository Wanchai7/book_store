import React, { useState, useEffect } from "react";

function BookForm({ addBook, editBook, bookToEdit, clearEdit }) {
  const [book, setBook] = useState({ title: "", author: "", price: "" });

  useEffect(() => {
    if (bookToEdit) {
      setBook(bookToEdit);
    } else {
      setBook({ title: "", author: "", price: "" });
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.price) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if (bookToEdit) {
      editBook(book);
    } else {
      addBook(book);
    }
    setBook({ title: "", author: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{bookToEdit ? "แก้ไขหนังสือ" : "เพิ่มหนังสือใหม่"}</h2>
      <input
        type="text"
        name="title"
        placeholder="ชื่อหนังสือ"
        value={book.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="author"
        placeholder="ผู้แต่ง"
        value={book.author}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="ราคา"
        value={book.price}
        onChange={handleChange}
      />
      <button type="submit">{bookToEdit ? "บันทึก" : "เพิ่ม"}</button>
      {bookToEdit && (
        <button type="button" onClick={clearEdit}>
          ยกเลิก
        </button>
      )}
    </form>
  );
}

export default BookForm;
