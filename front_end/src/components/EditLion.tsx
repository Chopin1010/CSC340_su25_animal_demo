import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Lion {
  lionId: number;
  name: string;
  species: string;
  habitat: string;
  description: string;
  weight: number;
  birthDate: string;
}

function EditLion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lion, setLion] = useState<Lion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [habitat, setHabitat] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');

  useEffect(() => {
    const fetchLion = async () => {
      try {
        const response = await axios.get<Lion>(`http://localhost:8080/api/lions/${id}`);
        setLion(response.data);
        setName(response.data.name);
        setSpecies(response.data.species);
        setHabitat(response.data.habitat);
        setDescription(response.data.description);
        setWeight(response.data.weight.toString());
        setBirthDate(response.data.birthDate.split('T')[0]); // Format to YYYY-MM-DD
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch lion details.');
        setLoading(false);
      }
    };
    fetchLion();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!lion) {
      setError('Lion data not loaded.');
      return;
    }

    try {
      const updatedLion = {
        ...lion,
        name,
        species,
        habitat,
        description,
        weight: parseFloat(weight),
        birthDate: new Date(birthDate).toISOString().split('T')[0]
      };
      await axios.put(`http://localhost:8080/api/lions/${id}`, updatedLion);
      setMessage('Lion updated successfully!');
      navigate(`/lions/${id}`); // Redirect to lion details page
    } catch (err) {
      setError('Failed to update lion. Please check the form data and ensure all fields are valid.');
    }
  };

  if (loading) return <div className="text-center py-8 text-2xl text-indigo-300 animate-pulse">Loading lion details...</div>;
  if (error && !lion) return <div className="text-center py-8 text-2xl text-red-500">Error: {error}</div>;
  if (!lion) return <div className="text-center py-8 text-2xl text-gray-400">Lion not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-10 bg-gray-900 rounded-2xl shadow-3xl border border-indigo-800 mt-12 transform transition-all duration-300 hover:scale-[1.01]">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-indigo-400 drop-shadow-lg">Edit Lion: {lion.name}</h1>
      {message && <div className="bg-green-700 text-white p-4 rounded-lg mb-6 text-center font-semibold shadow-md animate-fade-in">{message}</div>}
      {error && <div className="bg-red-700 text-white p-4 rounded-lg mb-6 text-center font-semibold shadow-md animate-fade-in">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-200 mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-4 border border-gray-700 rounded-lg shadow-inner bg-gray-800 text-gray-50 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 text-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="species" className="block text-lg font-medium text-gray-200 mb-2">Species</label>
          <input
            type="text"
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="mt-1 block w-full p-4 border border-gray-700 rounded-lg shadow-inner bg-gray-800 text-gray-50 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 text-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="habitat" className="block text-lg font-medium text-gray-200 mb-2">Habitat</label>
          <input
            type="text"
            id="habitat"
            value={habitat}
            onChange={(e) => setHabitat(e.target.value)}
            className="mt-1 block w-full p-4 border border-gray-700 rounded-lg shadow-inner bg-gray-800 text-gray-50 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 text-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-200 mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="mt-1 block w-full p-4 border border-gray-700 rounded-lg shadow-inner bg-gray-800 text-gray-50 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 text-lg"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="weight" className="block text-lg font-medium text-gray-200 mb-2">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 block w-full p-4 border border-gray-700 rounded-lg shadow-inner bg-gray-800 text-gray-50 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 text-lg"
            required
            step="0.1"
          />
        </div>
        <div>
          <label htmlFor="birthDate" className="block text-lg font-medium text-gray-200 mb-2">Birth Date</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-1 block w-full p-4 border border-gray-700 rounded-lg shadow-inner bg-gray-800 text-gray-50 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 text-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-lg text-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          Update Lion
        </button>
      </form>
    </div>
  );
}

export default EditLion; 