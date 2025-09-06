import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalPolicies: 0,
    pendingContributions: 0,
    totalFAQs: 0,
    recentContributions: 0
  });

  const [recentContributions, setRecentContributions] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Simulate API calls
    setStats({
      totalUsers: 156,
      activeUsers: 89,
      totalPolicies: 24,
      pendingContributions: 12,
      totalFAQs: 45,
      recentContributions: 8
    });

    setRecentContributions([
      {
        id: 1,
        title: "Remote Work Policy Update",
        employee: "John Doe",
        department: "HR",
        status: "pending",
        submittedAt: "2 hours ago"
      },
      {
        id: 2,
        title: "IT Security Guidelines",
        employee: "Jane Smith",
        department: "IT",
        status: "in_review",
        submittedAt: "4 hours ago"
      },
      {
        id: 3,
        title: "Expense Reimbursement Process",
        employee: "Mike Johnson",
        department: "Finance",
        status: "approved",
        submittedAt: "1 day ago"
      }
    ]);

    setRecentActivities([
      {
        id: 1,
        type: "policy_created",
        description: "New HR policy 'Remote Work Guidelines' created",
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        type: "contribution_approved",
        description: "Contribution 'IT Security Guidelines' approved",
        timestamp: "4 hours ago"
      },
      {
        id: 3,
        type: "user_registered",
        description: "New user Sarah Wilson registered",
        timestamp: "6 hours ago"
      }
    ]);
  }, []);

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of InfoSphere administration</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalUsers}</div>
          <div className="stat-label">Total Users</div>
          <div className="stat-change positive">+12 this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activeUsers}</div>
          <div className="stat-label">Active Users</div>
          <div className="stat-change positive">+5 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalPolicies}</div>
          <div className="stat-label">Published Policies</div>
          <div className="stat-change positive">+3 this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pendingContributions}</div>
          <div className="stat-label">Pending Contributions</div>
          <div className="stat-change">Needs review</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalFAQs}</div>
          <div className="stat-label">Published FAQs</div>
          <div className="stat-change positive">+2 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.recentContributions}</div>
          <div className="stat-label">Contributions Today</div>
          <div className="stat-change positive">+3 from yesterday</div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        {/* Recent Contributions */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Contributions</h3>
            <Link to="/contributions" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="contributions-list">
            {recentContributions.map((contribution) => (
              <div key={contribution.id} className="contribution-item">
                <div className="contribution-content">
                  <h4 className="contribution-title">{contribution.title}</h4>
                  <p className="contribution-meta">
                    {contribution.employee} • {contribution.department} • {contribution.submittedAt}
                  </p>
                </div>
                <span className={`status-badge status-${contribution.status}`}>
                  {contribution.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activities</h3>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-content">
                  <p className="activity-description">{activity.description}</p>
                  <span className="activity-timestamp">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div className="quick-actions">
          <Link to="/policies" className="btn btn-primary">Manage Policies</Link>
          <Link to="/contributions" className="btn btn-secondary">Review Contributions</Link>
          <Link to="/users" className="btn btn-secondary">Manage Users</Link>
          <Link to="/faqs" className="btn btn-secondary">Manage FAQs</Link>
        </div>
      </div>
    </div>
  );
}
