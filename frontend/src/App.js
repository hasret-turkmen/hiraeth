import React, {useState} from 'react';
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';
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
                    {/* Add route for the homepage. it should go to /hiraeth */}
                    <Route path="/" element={<Navigate to="/hiraeth" replace/>}/>
                    <Route path="/hiraeth" element={<About setIsAdmin={setIsAdmin}/>}/>
                    <Route path="/books" element={<Books isAdmin={isAdmin}/>}/>
                    <Route path="/movies" element={<Movies isAdmin={isAdmin}/>}/>
                    <Route path="/series" element={<Series isAdmin={isAdmin}/>}/>
                </Routes>
            </main>

            <Footer/>
        </div>
    );
}

function Root() {
    return (
        <Router>
            <App/>
        </Router>
    );
}

export default Root;
