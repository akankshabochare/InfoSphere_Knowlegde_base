import { useState } from "react";
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      department: "HR",
      isActive: true,
      lastLogin: "2024-01-20 10:30",
      registeredAt: "2023-12-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      department: "IT",
      isActive: true,
      lastLogin: "2024-01-20 09:15",
      registeredAt: "2023-11-20"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      department: "Finance",
      isActive: false,
      lastLogin: "2024-01-15 14:22",
      registeredAt: "2023-10-10"
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && user.isActive) || 
      (filter === 'inactive' && !user.isActive);
    
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleToggleActive = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="users">
      <div className="page-header">
        <h1 className="page-title">Users</h1>
        <p className="page-subtitle">Manage employee accounts and permissions</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Users</h3>
          <div className="user-controls">
            <input
              type="text"
              className="form-input"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '200px', marginRight: '12px' }}
            />
            <select
              className="form-input form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ width: '120px' }}
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Registered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">{user.name.charAt(0)}</div>
                      <div className="user-details">
                        <div className="user-name">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className="department-badge">{user.department}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'status-approved' : 'status-pending'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>{user.registeredAt}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className={`btn btn-sm ${user.isActive ? 'btn-secondary' : 'btn-success'}`}
                        onClick={() => handleToggleActive(user.id)}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteUser(user.id)}
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

        {filteredUsers.length === 0 && (
          <div className="empty-state">
            <p>No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
