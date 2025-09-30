import React, { useEffect, useState } from 'react';
import { getBooks, updateBook } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBook = async () => {
    setLoading(true);
    try {
      // API นี้ไม่มี endpoint get book by id แยก ถ้าไม่มีจริงอาจต้องโหลดทั้งหมดแล้วหา
      // สมมติโหลดหน้าหนึ่งแล้วกรอง
      const res = await getBooks();
      if (res.success) {
        const book = res.data.find(b => b.itemId === id);
        if (book) setFormData(book);
        else alert('ไม่พบหนังสือที่ต้องการแก้ไข');
      }
    } catch {
      alert('โหลดข้อมูลหนังสือไม่สำเร็จ');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['publishYear', 'pageCount'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateBook(id, formData);
      alert('แก้ไขหนังสือสำเร็จ');
      navigate('/');
    } catch (error) {
      alert('แก้ไขหนังสือไม่สำเร็จ: ' + (error.message || ''));
    }
    setLoading(false);
  };

  if (!formData) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>แก้ไขหนังสือ</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, val]) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 4 }}>{key}</label>
            <input
              type={['publishYear', 'pageCount'].includes(key) ? 'number' : 'text'}
              name={key}
              value={val}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              required={key === 'title' || key === 'author'}
            />
          </div>
        ))}
        <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
          {loading ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
