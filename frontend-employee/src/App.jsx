import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

// Importing pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Faq from "./pages/Faq";
import Contribute from "./pages/Contribute";
import Register from "./pages/Register";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="app">
      {/* Enhanced Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <span className="logo-icon">📚</span>
              <span className="logo-text">InfoSphere</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <span className="nav-text">Home</span>
            </Link>
            <Link 
              to="/register" 
              className={`nav-link ${isActive('/register') ? 'active' : ''}`}
            >
              <span className="nav-text">Register</span>
            </Link>
            <Link 
              to="/category" 
              className={`nav-link ${isActive('/category') ? 'active' : ''}`}
            >
              <span className="nav-text">Categories</span>
            </Link>
            <Link 
              to="/faq" 
              className={`nav-link ${isActive('/faq') ? 'active' : ''}`}
            >
              <span className="nav-text">FAQs</span>
            </Link>
            <Link 
              to="/contribute" 
              className={`nav-link ${isActive('/contribute') ? 'active' : ''}`}
            >
              <span className="nav-text">Contribute</span>
            </Link>
          </div>

          {/* User Section */}
          <div className="navbar-user">
            <div className="user-profile">
              <div className="user-avatar">
                <span className="avatar-text">JD</span>
              </div>
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="user-role">Employee</span>
              </div>
            </div>
            <Link 
              to="/login" 
              className="login-btn"
            >
              <span className="login-icon">🔐</span>
              <span className="login-text">Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <Link 
              to="/" 
              className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="nav-text">Home</span>
            </Link>
            <Link 
              to="/category" 
              className={`mobile-nav-link ${isActive('/category') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="nav-text">Categories</span>
            </Link>
            <Link 
              to="/register" 
              className={`mobile-nav-link ${isActive('/register') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="nav-text">Register</span>
            </Link>
            <Link 
              to="/faq" 
              className={`mobile-nav-link ${isActive('/faq') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="nav-text">FAQs</span>
            </Link>
            <Link 
              to="/contribute" 
              className={`mobile-nav-link ${isActive('/contribute') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="nav-text">Contribute</span>
            </Link>
            <div className="mobile-user-section">
              <div className="mobile-user-profile">
                <div className="user-avatar">
                  <span className="avatar-text">JD</span>
                </div>
                <div className="user-info">
                  <span className="user-name">John Doe</span>
                  <span className="user-role">Employee</span>
                </div>
              </div>
              <Link 
                to="/login" 
                className="mobile-login-btn"
                onClick={closeMobileMenu}
              >
                <span className="login-icon">🔐</span>
                <span className="login-text">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category" element={<Category />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contribute" element={<Contribute />} />
        </Routes>
      </div>
    </div>
  );
}
