import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface Lion {
  lionId: number;
  name: string;
  species: string;
  habitat: string;
  description: string;
  weight: number;
  birthDate: string;
}

function LionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lion, setLion] = useState<Lion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLion = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Lion>(`http://localhost:8080/api/lions/${id}`);
        setLion(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch lion details.');
        setLoading(false);
      }
    };
    fetchLion();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to permanently delete this lion?')) {
      try {
        await axios.delete(`http://localhost:8080/api/lions/${id}`);
        navigate('/'); // Redirect to home after deletion
      } catch (err) {
        setError('Failed to delete lion.');
      }
    }
  };

  if (loading) return <div className="text-center py-8 text-2xl text-indigo-300 animate-pulse">Loading lion details...</div>;
  if (error) return <div className="text-center py-8 text-2xl text-red-500">Error: {error}</div>;
  if (!lion) return <div className="text-center py-8 text-2xl text-gray-400">Lion not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-10 bg-gray-900 rounded-2xl shadow-3xl border border-indigo-800 mt-12 transform transition-all duration-300 hover:scale-[1.01]">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-indigo-400 drop-shadow-lg leading-tight">{lion.name}</h1>
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 space-y-5 text-xl text-gray-200">
        <p><strong>Species:</strong> <span className="text-indigo-200 font-semibold">{lion.species}</span></p>
        <p><strong>Habitat:</strong> <span className="text-indigo-200 font-semibold">{lion.habitat}</span></p>
        <p><strong>Weight:</strong> <span className="text-indigo-200 font-semibold">{lion.weight} kg</span></p>
        <p><strong>Birth Date:</strong> <span className="text-indigo-200 font-semibold">{new Date(lion.birthDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
        <div>
          <strong className="block mb-2 text-gray-300">Description:</strong>
          <p className="text-gray-100 leading-relaxed bg-gray-700 p-5 rounded-lg border border-gray-600 shadow-inner">{lion.description}</p>
        </div>
      </div>
      <div className="mt-10 flex justify-center space-x-6">
        <Link
          to={`/lions/edit/${lion.lionId}`}
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          Edit Lion
        </Link>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg shadow-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
        >
          Delete Lion
        </button>
      </div>
    </div>
  );
}

export default LionDetails; 