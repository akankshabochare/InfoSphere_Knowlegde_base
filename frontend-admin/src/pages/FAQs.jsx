import { useState } from "react";
import "./FAQs.css";

export default function FAQs() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How do I reset my work laptop password?",
      answer: "You can reset your password by visiting the IT portal or contacting the helpdesk at ext. 1234. The process takes about 5 minutes.",
      category: "IT",
      isPublished: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15"
    },
    {
      id: 2,
      question: "Where can I check my leave balance?",
      answer: "Access the HR portal and navigate to 'Leave Management' section. You can also view your balance in the mobile app.",
      category: "HR",
      isPublished: true,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-10"
    },
    {
      id: 3,
      question: "What's the process for expense reimbursement?",
      answer: "Submit receipts through the Finance portal within 30 days. Approval typically takes 3-5 business days.",
      category: "Finance",
      isPublished: false,
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20"
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredFaqs = faqs.filter(faq => {
    if (filter === 'all') return true;
    return faq.isPublished === (filter === 'published');
  });

  const handleCreateFaq = () => {
    setShowCreateModal(true);
  };

  const handleEditFaq = (faq) => {
    setEditingFaq(faq);
    setShowCreateModal(true);
  };

  const handleDeleteFaq = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(faqs.filter(f => f.id !== id));
    }
  };

  const handleTogglePublish = (id) => {
    setFaqs(faqs.map(f => 
      f.id === id ? { ...f, isPublished: !f.isPublished } : f
    ));
  };

  return (
    <div className="faqs">
      <div className="page-header">
        <h1 className="page-title">FAQs</h1>
        <p className="page-subtitle">Manage frequently asked questions</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All FAQs</h3>
          <div className="faq-controls">
            <select
              className="form-input form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ width: '120px', marginRight: '12px' }}
            >
              <option value="all">All FAQs</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <button className="btn btn-primary" onClick={handleCreateFaq}>
              Create FAQ
            </button>
          </div>
        </div>

        <div className="faqs-list">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="faq-card">
              <div className="faq-header">
                <div className="faq-question">{faq.question}</div>
                <div className="faq-actions">
                  <span className={`status-badge ${faq.isPublished ? 'status-approved' : 'status-pending'}`}>
                    {faq.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <span className="category-badge">{faq.category}</span>
                </div>
              </div>
              
              <div className="faq-answer">
                {faq.answer}
              </div>
              
              <div className="faq-meta">
                <span>Created: {faq.createdAt}</span>
                <span>Updated: {faq.updatedAt}</span>
              </div>
              
              <div className="faq-actions-buttons">
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleEditFaq(faq)}
                >
                  Edit
                </button>
                <button 
                  className={`btn btn-sm ${faq.isPublished ? 'btn-secondary' : 'btn-success'}`}
                  onClick={() => handleTogglePublish(faq.id)}
                >
                  {faq.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteFaq(faq.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="empty-state">
            <p>No FAQs found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingFaq ? 'Edit FAQ' : 'Create FAQ'}</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingFaq(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="form-label">Question</label>
                  <input 
                    type="text" 
                    className="form-input"
                    defaultValue={editingFaq?.question || ''}
                    placeholder="Enter the question"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Answer</label>
                  <textarea 
                    className="form-input form-textarea"
                    defaultValue={editingFaq?.answer || ''}
                    placeholder="Enter the answer"
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input form-select">
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingFaq(null);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary">
                {editingFaq ? 'Update FAQ' : 'Create FAQ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
