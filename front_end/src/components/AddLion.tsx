import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddLion() {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [habitat, setHabitat] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const newLion = { name, species, habitat, description };
      await axios.post('http://localhost:8080/api/lions', newLion);
      setMessage('Lion added successfully!');
      // Optionally, clear form or redirect
      setName('');
      setSpecies('');
      setHabitat('');
      setDescription('');
      navigate('/'); // Redirect to the list of lions
    } catch (err) {
      setError('Failed to add lion. Please check the form data and try again.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Lion</h1>
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
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Lion
        </button>
      </form>
    </div>
  );
}

export default AddLion; 