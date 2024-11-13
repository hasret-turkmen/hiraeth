import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Books from './pages/Books';
import Movies from './pages/Movies';
import Series from './pages/Series';
import About from "./pages/About";
import './App.css';

// Component for Footer
function Footer() {
  return (
      <footer className="footer">
        <p>© 2024 - This website is coded by Hasret</p>
      </footer>
  );
}

function App() {
    const [isAdmin, setIsAdmin] = useState(false); // Track admin status

  return (
      <div className="app-container">
        <header className="header">
          <nav className="nav-bar">
              <Link to="/hiraeth">🌱 Homepage</Link>
              <Link to="/books">📚 Books</Link>
            <Link to="/movies">🎥 Movies</Link>
            <Link to="/series">📺 Series</Link>
          </nav>
        </header>


        <main>
            <Routes>
                <Route path="/hiraeth" element={<About setIsAdmin={setIsAdmin} />} /> {/* Pass setIsAdmin to About */}
                <Route path="/books" element={<Books isAdmin={isAdmin}/>} />
                <Route path="/movies" element={<Movies isAdmin={isAdmin} />} /> {/* Pass isAdmin to Movies */}
                <Route path="/series" element={<Series isAdmin={isAdmin}/>} />
            </Routes>
        </main>

        {/* Footer is displayed on every page */}
        <Footer />
      </div>
  );
}

function Root() {
  return (
      <Router>
        <App />
      </Router>
  );
}

export default Root;
