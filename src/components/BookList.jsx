import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books, onDelete }) => {
  if (!books.length)
    return <p className="text-center text-gray-500 mt-6">ไม่พบหนังสือ</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-6 text-left">ชื่อหนังสือ</th>
            <th className="py-3 px-6 text-left">ผู้เขียน</th>
            <th className="py-3 px-6 text-left">ปีพิมพ์</th>
            <th className="py-3 px-6 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.itemId}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{book.title}</td>
              <td className="py-3 px-6">{book.author}</td>
              <td className="py-3 px-6">{book.publishYear}</td>
              <td className="py-3 px-6 text-center space-x-2">
                <Link to={`/edit/${book.itemId}`}>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md transition">
                    แก้ไข
                  </button>
                </Link>
                <button
                  onClick={() => onDelete(book.itemId)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
