import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteBook, searchBooks } from '../services/api';
import BookList from '../components/BookList';
import BookSearch from '../components/BookSearch';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 ดึงข้อมูลจาก API ที่ให้มา
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://bookshop-api-er7t.onrender.com/api/books?page=1&limit=10'
      );

      if (res.data && res.data.success) {
        setBooks(res.data.data); // API ส่ง data อยู่ใน res.data.data
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    }
    setLoading(false);
  };

  // 🔍 ค้นหาหนังสือ
  const handleSearch = async (query) => {
    if (!query) return fetchBooks();

    setLoading(true);
    try {
      const res = await searchBooks(query);
      if (res.success) setBooks(res.data);
    } catch {
      alert('ค้นหาไม่สำเร็จ');
    }
    setLoading(false);
  };

  // 🗑️ ลบหนังสือ
  const handleDelete = async (id) => {
    if (window.confirm('คุณต้องการลบหนังสือนี้ใช่ไหม?')) {
      try {
        const res = await deleteBook(id);
        if (res.success) {
          alert('ลบหนังสือสำเร็จ');
          fetchBooks();
        }
      } catch {
        alert('ลบหนังสือไม่สำเร็จ');
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 flex items-center gap-3">
        📚 ระบบจัดการหนังสือ
      </h1>

      <Link to="/add">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-6 transition">
          ➕ เพิ่มหนังสือ
        </button>
      </Link>

      <BookSearch onSearch={handleSearch} />
      {loading ? (
        <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>
      ) : (
        <BookList books={books} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;
