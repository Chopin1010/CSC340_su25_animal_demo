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
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <nav className="bg-gray-800 p-4 shadow-md">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-400">See All Lions</Link>
            </li>
            <li>
              <Link to="/add" className="hover:text-gray-400">Add New Lion</Link>
            </li>
          </ul>
        </nav>

        <main className="p-4">
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
