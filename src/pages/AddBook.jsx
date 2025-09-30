// src/pages/AddBook.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publishYear: '',
    isbn: '',
    publisher: '',
    edition: '',
    pageCount: '',
    language: '',
    genre: '',
    description: '',
    coverImage: '',
    location: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publishYear' || name === 'pageCount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('https://bookshop-api-er7t.onrender.com/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('เพิ่มหนังสือเรียบร้อยแล้ว');
        navigate('/'); // กลับไปหน้า home หลังเพิ่มสำเร็จ
      } else {
        setError(data.message || 'เกิดข้อผิดพลาดในการเพิ่มหนังสือ');
      }
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">เพิ่มหนังสือใหม่</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="ชื่อหนังสือ"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="author"
          placeholder="ผู้แต่ง"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="category"
          placeholder="หมวดหมู่"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="publishYear"
          placeholder="ปีที่พิมพ์"
          value={formData.publishYear}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          min="0"
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="publisher"
          placeholder="สำนักพิมพ์"
          value={formData.publisher}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="edition"
          placeholder="ฉบับพิมพ์"
          value={formData.edition}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="pageCount"
          placeholder="จำนวนหน้า"
          value={formData.pageCount}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          min="1"
        />
        <input
          type="text"
          name="language"
          placeholder="ภาษา"
          value={formData.language}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="genre"
          placeholder="ประเภท"
          value={formData.genre}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="description"
          placeholder="คำอธิบาย"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="coverImage"
          placeholder="ลิงก์รูปปกหนังสือ"
          value={formData.coverImage}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="location"
          placeholder="ตำแหน่งหนังสือ"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'กำลังส่ง...' : 'เพิ่มหนังสือ'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
