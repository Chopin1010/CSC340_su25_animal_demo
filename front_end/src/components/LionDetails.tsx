import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface Lion {
  lionId: number;
  name: string;
  species: string;
  habitat: string;
  description: string;
}

function LionDetails() {
  const { id } = useParams<{ id: string }>();
  const [lion, setLion] = useState<Lion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLion = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/lions/${id}`);
        setLion(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch lion details');
        setLoading(false);
      }
    };

    if (id) {
      fetchLion();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this lion?')) {
      try {
        await axios.delete(`http://localhost:8080/api/lions/${id}`);
        navigate('/'); // Redirect to the list of lions after deletion
      } catch (err) {
        setError('Failed to delete lion.');
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!lion) return <div className="p-4">Lion not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{lion.name}</h1>
      <div className="border p-4 rounded shadow bg-gray-800">
        <p className="text-gray-300">ID: {lion.lionId}</p>
        <p className="text-gray-300">Species: {lion.species}</p>
        <p className="text-gray-300">Habitat: {lion.habitat}</p>
        <p className="mt-4 text-gray-200">{lion.description}</p>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => navigate(`/lions/edit/${lion.lionId}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default LionDetails; 