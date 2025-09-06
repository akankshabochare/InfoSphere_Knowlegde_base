import { useState } from "react";
import "./Policies.css";

export default function Policies() {
  const [policies, setPolicies] = useState([
    {
      id: 1,
      title: "Remote Work Guidelines",
      category: "HR",
      version: "2.1",
      effectiveDate: "2024-01-15",
      isPublished: true,
      url: "https://company.com/policies/remote-work",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-15"
    },
    {
      id: 2,
      title: "IT Security Policy",
      category: "IT",
      version: "1.3",
      effectiveDate: "2024-01-01",
      isPublished: true,
      url: "https://company.com/policies/it-security",
      createdAt: "2023-12-20",
      updatedAt: "2024-01-01"
    },
    {
      id: 3,
      title: "Expense Reimbursement",
      category: "Finance",
      version: "1.0",
      effectiveDate: "2024-02-01",
      isPublished: false,
      url: "https://company.com/policies/expense-reimbursement",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20"
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);

  const handleCreatePolicy = () => {
    setShowCreateModal(true);
  };

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy);
    setShowCreateModal(true);
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      setPolicies(policies.filter(p => p.id !== id));
    }
  };

  const handleTogglePublish = (id) => {
    setPolicies(policies.map(p => 
      p.id === id ? { ...p, isPublished: !p.isPublished } : p
    ));
  };

  return (
    <div className="policies">
      <div className="page-header">
        <h1 className="page-title">Policies</h1>
        <p className="page-subtitle">Manage company policies and procedures</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Policies</h3>
          <button className="btn btn-primary" onClick={handleCreatePolicy}>
            Create Policy
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Version</th>
                <th>Status</th>
                <th>Effective Date</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy.id}>
                  <td>
                    <div>
                      <div className="policy-title">{policy.title}</div>
                      <div className="policy-url">{policy.url}</div>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{policy.category}</span>
                  </td>
                  <td>{policy.version}</td>
                  <td>
                    <span className={`status-badge ${policy.isPublished ? 'status-approved' : 'status-pending'}`}>
                      {policy.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{policy.effectiveDate}</td>
                  <td>{policy.updatedAt}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEditPolicy(policy)}
                      >
                        Edit
                      </button>
                      <button 
                        className={`btn btn-sm ${policy.isPublished ? 'btn-secondary' : 'btn-success'}`}
                        onClick={() => handleTogglePublish(policy.id)}
                      >
                        {policy.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeletePolicy(policy.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingPolicy ? 'Edit Policy' : 'Create Policy'}</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingPolicy(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input 
                    type="text" 
                    className="form-input"
                    defaultValue={editingPolicy?.title || ''}
                    placeholder="Enter policy title"
                  />
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
                <div className="form-group">
                  <label className="form-label">Policy URL</label>
                  <input 
                    type="url" 
                    className="form-input"
                    defaultValue={editingPolicy?.url || ''}
                    placeholder="https://company.com/policies/..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Version</label>
                  <input 
                    type="text" 
                    className="form-input"
                    defaultValue={editingPolicy?.version || ''}
                    placeholder="1.0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Effective Date</label>
                  <input 
                    type="date" 
                    className="form-input"
                    defaultValue={editingPolicy?.effectiveDate || ''}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Summary</label>
                  <textarea 
                    className="form-input form-textarea"
                    placeholder="Brief description of the policy"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingPolicy(null);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary">
                {editingPolicy ? 'Update Policy' : 'Create Policy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
