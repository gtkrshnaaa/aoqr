// app/admin/categories/page.jsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";


export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  // Base URL API
  const baseURL = 'http://localhost:9977'; // Ganti dengan URL API yang sesuai

  // Fetch kategori dari API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/categories/get-all`);
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await axios.post(`${baseURL}/api/categories/create`, { name: newCategory });
      setNewCategory('');
      fetchCategories(); // Refresh kategori
    } catch (error) {
      console.error('Failed to create category', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/categories/delete/${id}`);
      fetchCategories(); // Refresh kategori
    } catch (error) {
      console.error('Failed to delete category', error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`${baseURL}/api/categories/update/${editingCategory.id}`, { name: editingCategory.name });
      setEditingCategory(null); // Close edit form
      fetchCategories(); // Refresh kategori
    } catch (error) {
      console.error('Failed to update category', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-5">
      <h1 className="text-3xl mb-5">Manage Categories</h1>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border px-4 py-2 mr-2"
        />
        <button
          onClick={handleCreateCategory}
          className="bg-[#AAA577] text-white px-4 py-2"
        >
          Add Category
        </button>
      </div>

      {editingCategory && (
        <div className="mb-5">
          <input
            type="text"
            value={editingCategory.name}
            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
            className="border px-4 py-2 mr-2"
          />
          <button
            onClick={handleUpdateCategory}
            className="bg-[#AAA577] text-white px-4 py-2"
          >
            Update Category
          </button>
        </div>
      )}

      <div>
        <h2 className="text-2xl mb-3">Category List</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="mb-3 flex justify-between items-center">
              <span>{category.name}</span>
              <div>
                <button
                  onClick={() => handleEditCategory(category)}
                  className="bg-gray-200 text-blue-500 px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-gray-200 text-red-500 px-4 py-2 rounded mr-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}
