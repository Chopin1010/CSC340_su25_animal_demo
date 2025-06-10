import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
  const [lion, setLion] = useState<Lion | null>(null);
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [habitat, setHabitat] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLion = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/lions/${id}`);
        const fetchedLion: Lion = response.data;
        setLion(fetchedLion);
        setName(fetchedLion.name);
        setSpecies(fetchedLion.species);
        setHabitat(fetchedLion.habitat);
        setDescription(fetchedLion.description);
        setWeight(fetchedLion.weight.toString());
        if (fetchedLion.birthDate) {
          const date = new Date(fetchedLion.birthDate);
          setBirthDate(date.toISOString().split('T')[0]);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch lion details for editing.');
        setLoading(false);
      }
    };

    if (id) {
      fetchLion();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!lion) {
      setError('No lion data to update.');
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
      navigate(`/lions/${id}`);
    } catch (err) {
      setError('Failed to update lion. Please check the form data and ensure all fields are valid.');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!lion) return <div className="p-4">Lion not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Lion: {lion.name}</h1>
      {message && <div className="bg-green-500 text-white p-2 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-400">Species</label>
          <input
            type="text"
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="habitat" className="block text-sm font-medium text-gray-400">Habitat</label>
          <input
            type="text"
            id="habitat"
            value={habitat}
            onChange={(e) => setHabitat(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-400">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-400">Weight</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
            required
            step="0.1"
          />
        </div>
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-400">Birth Date</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Lion
        </button>
      </form>
    </div>
  );
}

export default EditLion; 