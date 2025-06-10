import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LionList from './components/LionList';
import AddLion from './components/AddLion';
import LionDetails from './components/LionDetails';
import EditLion from './components/EditLion';

interface Lion {
  id: number;
  name: string;
  species: string;
  habitat: string;
  description: string;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-gray-50 font-sans antialiased">
        <nav className="bg-gray-900 p-4 shadow-2xl border-b-4 border-indigo-600">
          <ul className="flex justify-center space-x-8 text-xl font-medium">
            <li>
              <Link to="/" className="text-indigo-400 hover:text-indigo-200 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-indigo-700/30">See All Lions</Link>
            </li>
            <li>
              <Link to="/add" className="text-indigo-400 hover:text-indigo-200 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-indigo-700/30">Add New Lion</Link>
            </li>
          </ul>
        </nav>

        <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
          <Routes>
            <Route path="/" element={<LionList />} />
            <Route path="/add" element={<AddLion />} />
            <Route path="/lions/:id" element={<LionDetails />} />
            <Route path="/lions/edit/:id" element={<EditLion />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
