import { useState } from "react";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (!form.password) nextErrors.password = "Password is required";
    if (form.password && form.password.length < 6) nextErrors.password = "Min 6 characters";
    if (!form.confirmPassword) nextErrors.confirmPassword = "Confirm your password";
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords do not match";
    if (!form.department) nextErrors.department = "Select a department";
    if (!form.agree) nextErrors.agree = "You must accept terms";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Registered successfully! (demo)");
  };

  return (
    <div className="register-page">
      <div className="register-hero">
        <h1>Create your account</h1>
        <p>Join InfoSphere to access policies, FAQs, and contribute knowledge.</p>
      </div>

      <div className="register-card">
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="fullName">Full Name</label>
            <div className={`input-wrap ${errors.fullName ? "has-error" : ""}`}>
              <span className="input-icon">👤</span>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Jane Doe"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName && <div className="error-text">{errors.fullName}</div>}
          </div>

          <div className="form-row">
            <label htmlFor="email">Work Email</label>
            <div className={`input-wrap ${errors.email ? "has-error" : ""}`}>
              <span className="input-icon">✉️</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane.doe@company.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <div className={`input-wrap ${errors.password ? "has-error" : ""}`}>
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>

            <div className="form-row">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={`input-wrap ${errors.confirmPassword ? "has-error" : ""}`}>
                <span className="input-icon">✅</span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="department">Department</label>
            <div className={`input-wrap ${errors.department ? "has-error" : ""}`}>
              <span className="input-icon">🏢</span>
              <select
                id="department"
                name="department"
                value={form.department}
                onChange={handleChange}
              >
                <option value="">Select department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>
            {errors.department && <div className="error-text">{errors.department}</div>}
          </div>

          <div className="form-row checkbox-row">
            <label className="checkbox">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              <span>I agree to the Terms and Privacy Policy</span>
            </label>
            {errors.agree && <div className="error-text">{errors.agree}</div>}
          </div>

          <button type="submit" className="register-btn">Create Account</button>

          <div className="alt-action">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
}


