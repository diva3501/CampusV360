import React, { useState } from 'react';
import './ApprovalTracker.css'; 

const ApprovalTracker = () => {
  const [submissions] = useState([
    { id: 1, title: 'Machine Learning Certification', type: 'Certification', submittedDate: '2025-09-15', status: 'approved', reviewedBy: 'Dr. Smith', reviewDate: '2025-09-18', credits: 3, comments: 'Excellent course completion with outstanding performance.' },
    { id: 2, title: 'Hackathon Participation - TechFest', type: 'Competition', submittedDate: '2025-09-10', status: 'pending', reviewedBy: null, reviewDate: null, credits: 2, comments: null },
    { id: 3, title: 'Research Paper Publication', type: 'Research', submittedDate: '2025-09-05', status: 'rejected', reviewedBy: 'Dr. Johnson', reviewDate: '2025-09-08', credits: 0, comments: 'Please provide complete publication details and journal impact factor.' },
    { id: 4, title: 'Industry Internship - Google', type: 'Internship', submittedDate: '2025-08-20', status: 'under_review', reviewedBy: 'Dr. Brown', reviewDate: null, credits: 4, comments: null },
    { id: 5, title: 'Volunteer Work - NGO Project', type: 'Volunteer', submittedDate: '2025-08-12', status: 'approved', reviewedBy: 'Dr. Davis', reviewDate: '2025-08-14', credits: 2, comments: 'Great community service contribution.' }
  ]);
  
  
  const getStatusClass = (status) => {
    return `status--${status.replace('_', '-')}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      case 'pending': return '⏳';
      case 'under_review': return '👀';
      default: return '❓';
    }
  };

  const formatStatus = (status) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const statusCounts = {
    total: submissions.length,
    approved: submissions.filter(s => s.status === 'approved').length,
    pending: submissions.filter(s => s.status === 'pending').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    under_review: submissions.filter(s => s.status === 'under_review').length
  };

  const summaryCardColors = {
    blue: '#2563eb',
    green: '#16a34a',
    yellow: '#ca8a04',
    red: '#dc2626'
  };

  return (
    <div className="tracker-container fade-in">
      {/* Status Overview */}
      <div className="summary-grid">
        {[
          { label: 'Total Submissions', value: statusCounts.total, color: 'blue', icon: '📊' },
          { label: 'Approved', value: statusCounts.approved, color: 'green', icon: '✅' },
          { label: 'Pending', value: statusCounts.pending, color: 'yellow', icon: '⏳' },
          { label: 'Under Review', value: statusCounts.under_review, color: 'blue', icon: '👀' },
          { label: 'Rejected', value: statusCounts.rejected, color: 'red', icon: '❌' }
        ].map((stat, index) => (
          <div key={index} className="summary-card">
            <div className="summary-icon">{stat.icon}</div>
            <p className="summary-label">{stat.label}</p>
            <p className="summary-value" style={{ color: summaryCardColors[stat.color] }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Submissions List */}
      <div className="card">
        <div className="card-header">
          <h3>Submission Tracking</h3>
        </div>
        <div className="table-wrapper">
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Type</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Reviewer</th>
                <th>Credits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td data-label="Activity">
                    <div className="activity-title">{submission.title}</div>
                    {submission.comments && <div className="activity-comment">💬 {submission.comments}</div>}
                  </td>
                  <td data-label="Type">{submission.type}</td>
                  <td data-label="Submitted">{new Date(submission.submittedDate).toLocaleDateString()}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${getStatusClass(submission.status)}`}>
                      <span className="status-icon">{getStatusIcon(submission.status)}</span>
                      {formatStatus(submission.status)}
                    </span>
                  </td>
                  <td data-label="Reviewer">
                    {submission.reviewedBy || '-'}
                    {submission.reviewDate && <div className="reviewer-date">{new Date(submission.reviewDate).toLocaleDateString()}</div>}
                  </td>
                  <td data-label="Credits">
                    <span className={submission.status === 'approved' ? 'credits credits--approved' : 'credits'}>
                      {submission.status === 'approved' ? submission.credits : 0}
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <button className="action-button action-button--view">View</button>
                      {submission.status === 'rejected' && (
                        <button className="action-button action-button--resubmit">Resubmit</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="card">
        <div className="card-header">
          <h3>Recent Activity Timeline</h3>
        </div>
        <div className="timeline-container">
          {submissions.slice(0, 4).map((submission, index) => (
            <div key={index} className="timeline-item">
              <div className={`timeline-icon ${getStatusClass(submission.status)}`}>
                <span>{getStatusIcon(submission.status)}</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h4>{submission.title}</h4>
                  <span>{submission.submittedDate}</span>
                </div>
                <p className="timeline-status">{formatStatus(submission.status)}</p>
                {submission.comments && <p className="timeline-comment">{submission.comments}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprovalTracker;