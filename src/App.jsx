import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import Home from './pages/Home.jsx'; 
import Contact from './pages/Contact.jsx'; 
import "./assets/css/App.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const cachedRepos = localStorage.getItem('githubRepos');
    const cachedTimestamp = localStorage.getItem('githubReposTimestamp');
    const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

    if (cachedRepos && cachedTimestamp && (Date.now() - Number(cachedTimestamp)) < ONE_HOUR) {
      setRepos(JSON.parse(cachedRepos));
      return;
    }

    fetch('https://api.github.com/users/alibizho/repos')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const filteredRepos = data.filter(repo => repo.description && repo.language).slice(0, 4);
          setRepos(filteredRepos);
          localStorage.setItem('githubRepos', JSON.stringify(filteredRepos));
          localStorage.setItem('githubReposTimestamp', Date.now().toString());
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  
  return (
    <div className='main-container'>
      <Router>
        <div className='main-container'>
          <Navbar />
          <Route path='/' exact>
            <Home repos={repos} />
          </Route>
          <Route path='/contact' exact>
            <Contact />
          </Route>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
