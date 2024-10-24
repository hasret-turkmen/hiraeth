import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Books from './pages/Books';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Thoughts from './pages/Thoughts';
import './App.css';

// Component for Project Info Bubble
function ProjectInfoBubble() {
  return (
      <div className="project-info-bubble">
        <h2>🌿 About this Project: Hiraeth Blog 🌿</h2>
        <p>🌷 This website is coded using: </p>
        <p>
          JavaScript - React for its front-end,
          Java - Spring for its back-end,
          PostgreSQL for its database
        </p>
        <p>🌷 It is a blog where you can share your reviews on books, movies, series, and your thoughts.</p>
        <p>🌷 Enjoy the cozy reviews and join the journey!</p>
      </div>
  );
}

// Component for Footer
function Footer() {
  return (
      <footer className="footer">
        <p>© 2024 - This website is coded by Hasret</p>
      </footer>
  );
}

function App() {
  const location = useLocation(); // Get current route

  return (
      <div className="app-container">
        <header className="header">
          <nav className="nav-bar">
            <Link to="/books">📚 Books</Link>
            <Link to="/movies">🎥 Movies</Link>
            <Link to="/series">📺 Series</Link>
            <Link to="/thoughts">💭 Thoughts</Link>
          </nav>
        </header>

        {/* Render the ProjectInfoBubble only on the home route ("/") */}
        {location.pathname === '/' && <ProjectInfoBubble />}

        <main>
          <Routes>
            <Route path="/books" element={<Books />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/thoughts" element={<Thoughts />} />
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
