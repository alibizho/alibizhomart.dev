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
    fetch('https://api.github.com/users/alibizho/repos')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const filteredRepos = data.filter(repo => repo.description && repo.language).slice(0, 4);
          setRepos(filteredRepos);
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
