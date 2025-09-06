import { useState } from "react";
import "./Home.css";

export default function Home() {
  // 🔍 Search state
  const [search, setSearch] = useState("");

  // 📂 Enhanced categories with icons and descriptions
  const categories = [
    { name: "HR", description: "Human Resources", color: "#E5E7EB" },
    { name: "IT", description: "Information Technology", color: "#E5E7EB" },
    { name: "Finance", description: "Financial Policies", color: "#E5E7EB" },
    { name: "Operations", description: "Operational Procedures", color: "#E5E7EB" },
    { name: "Compliance", description: "Legal & Compliance", color: "#E5E7EB" },
    { name: "Safety", description: "Health & Safety", color: "#E5E7EB" }
  ];

  // 🆕 Enhanced updates with more details
  const updates = [
    { 
      id: 1, 
      title: "Travel Policy Updated", 
      description: "New guidelines for business travel expenses",
      date: "2 days ago",
      type: "policy"
    },
    { 
      id: 2, 
      title: "Remote Work Guidelines", 
      description: "Updated hybrid work arrangements",
      date: "1 week ago",
      type: "guideline"
    },
    { 
      id: 3, 
      title: "New Employee Onboarding", 
      description: "Streamlined process for new hires",
      date: "2 weeks ago",
      type: "process"
    }
  ];

  // ❓ Enhanced FAQs
  const faqs = [
    {
      id: 1,
      question: "How do I reset my work laptop password?",
      answer: "You can reset your password by visiting the IT portal or contacting the helpdesk at ext. 1234. The process takes about 5 minutes.",
      category: "IT"
    },
    {
      id: 2,
      question: "Where can I check my leave balance?",
      answer: "Access the HR portal and navigate to 'Leave Management' section. You can also view your balance in the mobile app.",
      category: "HR"
    },
    {
      id: 3,
      question: "What's the process for expense reimbursement?",
      answer: "Submit receipts through the Finance portal within 30 days. Approval typically takes 3-5 business days.",
      category: "Finance"
    }
  ];

  // Toggle FAQ expand
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">InfoSphere</h1>
        <p className="hero-subtitle">Policies, procedures, and resources in one place</p>
        
        {/* Enhanced Search */}
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search policies, FAQs, procedures..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">24</div>
          <div className="stat-label">Active Policies</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">156</div>
          <div className="stat-label">FAQs</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">8</div>
          <div className="stat-label">Departments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">12</div>
          <div className="stat-label">Recent Updates</div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="section">
        <h2 className="section-title">Browse by Category</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.name} className="category-card" style={{'--card-color': cat.color}}>
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-description">{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Updates Section */}
      <section className="section">
        <h2 className="section-title">Recent Updates</h2>
        <div className="updates-grid">
          {updates.map((update) => (
            <div key={update.id} className="update-card">
              <div className="update-header">
                <span className={`update-type ${update.type}`}>{update.type}</span>
                <span className="update-date">{update.date}</span>
              </div>
              <h3 className="update-title">{update.title}</h3>
              <p className="update-description">{update.description}</p>
              <button className="update-btn">Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-card ${openFaq === faq.id ? 'expanded' : ''}`}
              onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
            >
              <div className="faq-header">
                <div className="faq-question">
                  <span className="faq-category">{faq.category}</span>
                  <strong>{faq.question}</strong>
                </div>
                <span className="faq-toggle">{openFaq === faq.id ? '−' : '+'}</span>
              </div>
              {openFaq === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contribution Section */}
      <section className="contribute-section">
        <div className="contribute-card">
          <h3>Have a Suggestion?</h3>
          <p>Help us improve InfoSphere by suggesting new articles or policy updates</p>
          <button className="contribute-btn" onClick={() => alert("Redirect to Contribution Page")}>Suggest Content</button>
        </div>
      </section>
    </div>
  );
}
