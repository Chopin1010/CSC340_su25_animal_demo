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

  if (loading) return <div className="text-center py-8 text-2xl text-indigo-300 animate-pulse">Loading majestic lions...</div>;
  if (error) return <div className="text-center py-8 text-2xl text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-[60vh] flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-indigo-400 drop-shadow-lg leading-tight">
        Discover Our Majestic Pride
      </h1>
      <div className="mb-10 w-full max-w-lg">
        <input
          type="text"
          placeholder="Search lions by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-4 border-2 border-indigo-500 rounded-full shadow-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:border-transparent w-full text-lg transition-all duration-300"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl">
        {lions.length > 0 ? (
          lions.map((lion) => (
            <Link to={`/lions/${lion.lionId}`} key={lion.lionId} className="block">
              <div className="
                relative overflow-hidden group
                border border-indigo-700 rounded-2xl shadow-xl hover:shadow-2xl
                bg-gradient-to-br from-gray-850 to-gray-900
                hover:from-indigo-900 hover:to-gray-800
                transition-all duration-500 transform hover:-translate-y-2 hover:scale-102
                p-7 flex flex-col justify-between h-full
              ">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-transparent opacity-0 group-hover:opacity-15 transition-opacity duration-500"></div>
                <h2 className="text-3xl font-bold text-indigo-400 mb-3 group-hover:text-indigo-100 transition-colors duration-300 leading-tight">{lion.name}</h2>
                <p className="text-gray-300 text-base mb-1">Species: <span className="font-semibold text-gray-100">{lion.species}</span></p>
                <p className="text-gray-300 text-base mb-4">Habitat: <span className="font-semibold text-gray-100">{lion.habitat}</span></p>
                <p className="mt-auto text-gray-200 text-base leading-relaxed overflow-hidden line-clamp-4">{lion.description}</p>
                <span className="absolute bottom-5 right-5 text-sm text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">View Details &rarr;</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-2xl text-gray-400 mt-12">No majestic lions found. Try a different search!</p>
        )}
      </div>
    </div>
  );
}

export default LionList; 