import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Lion {
  lionId: number;
  name: string;
  species: string;
  habitat: string;
  description: string;
}

function LionList() {
  const [lions, setLions] = useState<Lion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLions = async () => {
      try {
        setLoading(true);
        const url = searchTerm
          ? `http://localhost:8080/api/lions/search?name=${searchTerm}`
          : 'http://localhost:8080/api/lions';
        const response = await axios.get(url);
        setLions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch lions');
        setLoading(false);
      }
    };

    fetchLions();
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lions</h1>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-1/3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lions.map((lion) => (
          <Link to={`/lions/${lion.lionId}`} key={lion.lionId} className="block">
            <div className="border p-4 rounded shadow bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-200">{lion.name}</h2>
              <p className="text-gray-400">Species: {lion.species}</p>
              <p className="text-gray-400">Habitat: {lion.habitat}</p>
              <p className="mt-2 text-gray-300">{lion.description}</p>
            </div>
          </Link>
        ))}
      </div>
      {lions.length === 0 && !loading && !error && (
        <p className="text-gray-400 mt-4">No lions found matching your search.</p>
      )}
    </div>
  );
}

export default LionList; 