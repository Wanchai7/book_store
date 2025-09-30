import React, { useState } from 'react';

const BookSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex justify-center gap-2">
      <input
        type="text"
        placeholder="ค้นหาหนังสือ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
      >
        ค้นหา
      </button>
    </form>
  );
};

export default BookSearch;
