import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import Home from './pages/Home.jsx';
import { WeatherProvider } from './Components/WeatherContext.jsx';
import './assets/css/App.css';

const Contact = lazy(() => import('./pages/Contact.jsx'));

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/alibizho/repos');
        const data = await res.json();
        if (Array.isArray(data)) {
          setRepos(data.filter(r => r.description && r.language).slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRepos();
  }, []);

  return (
    <WeatherProvider>
      <div className='main-container'>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home repos={repos} />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </WeatherProvider>
  );
}

export default App;