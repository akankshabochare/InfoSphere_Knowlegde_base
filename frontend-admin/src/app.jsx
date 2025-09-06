import { useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import Policies from "./pages/Policies";
import Users from "./pages/Users";
import FAQs from "./pages/FAQs";
import Contributions from "./pages/Contributions";
import Login from "./pages/Login";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (isLoginPage) {
    return (
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="app">
        <Routes>
          <Route path="*" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">InfoSphere Admin</h2>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/" 
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
          >
            <span className="nav-text">Dashboard</span>
          </Link>
          <Link 
            to="/policies" 
            className={`nav-item ${isActive('/policies') ? 'active' : ''}`}
          >
            <span className="nav-text">Policies</span>
          </Link>
          <Link 
            to="/users" 
            className={`nav-item ${isActive('/users') ? 'active' : ''}`}
          >
            <span className="nav-text">Users</span>
          </Link>
          <Link 
            to="/faqs" 
            className={`nav-item ${isActive('/faqs') ? 'active' : ''}`}
          >
            <span className="nav-text">FAQs</span>
          </Link>
          <Link 
            to="/contributions" 
            className={`nav-item ${isActive('/contributions') ? 'active' : ''}`}
          >
            <span className="nav-text">Contributions</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div className="admin-info">
              <span className="admin-name">Admin User</span>
              <span className="admin-role">Super Admin</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/users" element={<Users />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contributions" element={<Contributions />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
