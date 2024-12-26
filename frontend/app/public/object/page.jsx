'use client'; // Menandai ini sebagai Client Component

import { useState, useEffect } from 'react';
import axios from 'axios';

const ObjectList = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data objek dari API
  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axios.get('http://localhost:9977/api/public/objects/get-all');
        setObjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchObjects();
  }, []); // Hanya eksekusi sekali ketika komponen pertama kali dimuat

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>List of Objects</h1>
      <div>
        {objects.length === 0 ? (
          <p>No objects found.</p>
        ) : (
          objects.map((object) => (
            <div key={object.id} style={{ border: '1px solid #ddd', marginBottom: '20px', padding: '10px' }}>
              <h2>{object.name}</h2>
              <p>{object.description}</p>
              <img src={`http://localhost:9977${object.image_url}`} alt={object.name} style={{ width: '100px', height: 'auto' }} />
              <p>Location: {object.location}</p>
              <p>Category: {object.category_name}</p>
              <p>Created at: {new Date(object.created_at).toLocaleString()}</p>
              <p>Updated at: {new Date(object.updated_at).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ObjectList;
