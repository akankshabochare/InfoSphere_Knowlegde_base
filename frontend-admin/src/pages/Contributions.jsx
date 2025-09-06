import { useState } from "react";
import "./Contributions.css";

export default function Contributions() {
  const [contributions, setContributions] = useState([
    {
      id: 1,
      title: "Remote Work Policy Update",
      description: "I suggest updating the remote work policy to include new guidelines for hybrid work arrangements.",
      employee: "John Doe",
      department: "HR",
      status: "pending",
      submittedAt: "2024-01-20 10:30",
      suggestedCategory: "HR",
      suggestedUrl: "https://company.com/policies/remote-work-v2"
    },
    {
      id: 2,
      title: "IT Security Guidelines",
      description: "We need clearer guidelines for password management and two-factor authentication setup.",
      employee: "Jane Smith",
      department: "IT",
      status: "in_review",
      submittedAt: "2024-01-19 14:22",
      suggestedCategory: "IT",
      suggestedUrl: "https://company.com/policies/it-security-guidelines"
    },
    {
      id: 3,
      title: "Expense Reimbursement Process",
      description: "The current expense reimbursement process is confusing. Here's a simplified version.",
      employee: "Mike Johnson",
      department: "Finance",
      status: "approved",
      submittedAt: "2024-01-18 09:15",
      suggestedCategory: "Finance",
      suggestedUrl: "https://company.com/policies/expense-reimbursement-v2"
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const filteredContributions = contributions.filter(contribution => {
    if (filter === 'all') return true;
    return contribution.status === filter;
  });

  const handleStatusChange = (id, newStatus, reviewNote = '') => {
    setContributions(contributions.map(contribution => 
      contribution.id === id 
        ? { 
            ...contribution, 
            status: newStatus,
            reviewNote: reviewNote,
            reviewedAt: new Date().toISOString()
          } 
        : contribution
    ));
  };

  const handleReview = (contribution) => {
    setSelectedContribution(contribution);
    setShowReviewModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in_review': return 'status-in-review';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <div className="contributions">
      <div className="page-header">
        <h1 className="page-title">Contributions</h1>
        <p className="page-subtitle">Review and manage employee suggestions</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Contributions</h3>
          <select
            className="form-input form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="contributions-list">
          {filteredContributions.map((contribution) => (
            <div key={contribution.id} className="contribution-card">
              <div className="contribution-header">
                <div className="contribution-title">{contribution.title}</div>
                <span className={`status-badge ${getStatusColor(contribution.status)}`}>
                  {contribution.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="contribution-meta">
                <span className="contributor">{contribution.employee} • {contribution.department}</span>
                <span className="submitted-date">{contribution.submittedAt}</span>
              </div>
              
              <div className="contribution-description">
                {contribution.description}
              </div>
              
              <div className="contribution-details">
                <div className="detail-item">
                  <strong>Suggested Category:</strong> {contribution.suggestedCategory}
                </div>
                <div className="detail-item">
                  <strong>Suggested URL:</strong> 
                  <a href={contribution.suggestedUrl} target="_blank" rel="noopener noreferrer" className="suggested-url">
                    {contribution.suggestedUrl}
                  </a>
                </div>
              </div>
              
              <div className="contribution-actions">
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => handleReview(contribution)}
                >
                  Review
                </button>
                {contribution.status === 'pending' && (
                  <>
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => handleStatusChange(contribution.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleStatusChange(contribution.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredContributions.length === 0 && (
          <div className="empty-state">
            <p>No contributions found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedContribution && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Review Contribution</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedContribution(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="review-content">
                <h4>{selectedContribution.title}</h4>
                <p><strong>From:</strong> {selectedContribution.employee} ({selectedContribution.department})</p>
                <p><strong>Description:</strong></p>
                <p>{selectedContribution.description}</p>
                <p><strong>Suggested Category:</strong> {selectedContribution.suggestedCategory}</p>
                <p><strong>Suggested URL:</strong> {selectedContribution.suggestedUrl}</p>
              </div>
              
              <div className="form-group">
                <label className="form-label">Review Note (Optional)</label>
                <textarea 
                  className="form-input form-textarea"
                  placeholder="Add a note about your decision..."
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedContribution(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => {
                  handleStatusChange(selectedContribution.id, 'rejected');
                  setShowReviewModal(false);
                  setSelectedContribution(null);
                }}
              >
                Reject
              </button>
              <button 
                className="btn btn-success"
                onClick={() => {
                  handleStatusChange(selectedContribution.id, 'approved');
                  setShowReviewModal(false);
                  setSelectedContribution(null);
                }}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
