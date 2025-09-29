import React from "react";

function BookList({ books, deleteBook, startEdit }) {
  if (books.length === 0) {
    return <p>ไม่มีหนังสือในร้าน</p>;
  }

  return (
    <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>ชื่อหนังสือ</th>
          <th>ผู้แต่ง</th>
          <th>ราคา</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.price}</td>
            <td>
              <button onClick={() => startEdit(book)}>แก้ไข</button>
              <button onClick={() => deleteBook(book.id)}>ลบ</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookList;
