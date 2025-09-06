import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login({ onLogin }) {
  const [loginType, setLoginType] = useState('admin'); // 'admin' or 'employee'
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { loginType, ...formData });
    // Simulate successful login
    if (onLogin) {
      onLogin();
    }
  };

  const handleSSOLogin = (provider) => {
    console.log(`SSO login with ${provider}`);
    // Handle SSO login logic here
    // Simulate successful SSO login
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">InfoSphere</h1>
          <p className="login-subtitle">Administrative Portal</p>
        </div>

        <div className="login-tabs">
          <button 
            className={`tab-button ${loginType === 'admin' ? 'active' : ''}`}
            onClick={() => setLoginType('admin')}
          >
            Admin Login
          </button>
          <button 
            className={`tab-button ${loginType === 'employee' ? 'active' : ''}`}
            onClick={() => setLoginType('employee')}
          >
            Employee Login
          </button>
        </div>

        <div className="login-content">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary login-btn">
              Sign In
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="sso-options">
            <h3 className="sso-title">Single Sign-On</h3>
            <div className="sso-buttons">
              <button 
                className="sso-btn sso-google"
                onClick={() => handleSSOLogin('google')}
              >
                <span className="sso-icon">G</span>
                Continue with Google
              </button>
              <button 
                className="sso-btn sso-microsoft"
                onClick={() => handleSSOLogin('microsoft')}
              >
                <span className="sso-icon">M</span>
                Continue with Microsoft
              </button>
              <button 
                className="sso-btn sso-azure"
                onClick={() => handleSSOLogin('azure')}
              >
                <span className="sso-icon">A</span>
                Continue with Azure AD
              </button>
            </div>
          </div>
        </div>

        <div className="login-footer">
          <p>
            {loginType === 'admin' ? (
              <>
                Need employee access? <Link to="/employee-login">Switch to Employee Portal</Link>
              </>
            ) : (
              <>
                Admin access? <Link to="/admin-login">Switch to Admin Portal</Link>
              </>
            )}
          </p>
          <p>
            <Link to="/forgot-password">Forgot your password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
