import React, { useState } from 'react';
import './ApprovalPanel.css'; 

const ApprovalPanel = () => {
  const [submissions, setSubmissions] = useState([
    { id: 1, student: { name: 'Alice Johnson', rollNumber: 'CS21B045' }, activity: { title: 'Machine Learning Specialization', type: 'MOOC', date: '2025-09-15', institution: 'Coursera', expectedCredits: 3, description: 'Completed comprehensive ML course...' }, submittedDate: '2025-09-16', status: 'pending', priority: 'high', documents: ['certificate.pdf'] },
    { id: 2, student: { name: 'Bob Smith', rollNumber: 'CS21B028' }, activity: { title: 'Summer Internship at Microsoft', type: 'Internship', date: '2025-09-10', institution: 'Microsoft', expectedCredits: 4, description: 'Three-month internship in the Azure team...' }, submittedDate: '2025-09-12', status: 'under_review', priority: 'high', documents: ['certificate.pdf', 'report.pdf'] },
    { id: 3, student: { name: 'Carol Davis', rollNumber: 'CS21B067' }, activity: { title: 'IEEE Conference Paper', type: 'Conference', date: '2025-09-08', institution: 'IEEE', expectedCredits: 3, description: 'Presented research paper on network security...' }, submittedDate: '2025-09-09', status: 'pending', priority: 'medium', documents: ['certificate.pdf'] }
  ]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const [awardedCredits, setAwardedCredits] = useState('');

  const handleApprove = (submissionId) => {
    
    alert('Activity Approved!');
    resetReviewForm();
  };
  const handleReject = (submissionId) => {
    
    alert('Activity Rejected!');
    resetReviewForm();
  };
  const resetReviewForm = () => {
    setSelectedSubmission(null);
    setReviewComment('');
    setAwardedCredits('');
  };
  
  
  const getStatusClass = (status) => `badge--${status.replace('_', '-')}`;
  const getPriorityClass = (priority) => `priority--${priority}`;
  
  const pendingSubmissions = submissions.filter(s => ['pending', 'under_review'].includes(s.status));

  const colorConfig = {
    yellow: { color: '#ca8a04', bg: '#fef9c3' },
    blue: { color: '#2563eb', bg: '#dbeafe' },
    green: { color: '#16a34a', bg: '#dcfce7' },
    red: { color: '#dc2626', bg: '#fee2e2' }
  };

  return (
    <div className="approval-panel-container fade-in">
      {/* Statistics */}
      <div className="summary-grid">
        {[
          { title: 'Pending Review', value: submissions.filter(s => s.status === 'pending').length, icon: '⏳', color: 'yellow' },
          { title: 'Under Review', value: submissions.filter(s => s.status === 'under_review').length, icon: '👀', color: 'blue' },
          { title: 'Approved Today', value: 0, icon: '✅', color: 'green' }, 
          { title: 'High Priority', value: submissions.filter(s => s.priority === 'high').length, icon: '🔥', color: 'red' }
        ].map((stat, i) => (
          <div key={i} className="summary-card">
            <div>
              <p className="summary-title">{stat.title}</p>
              <p className="summary-value" style={{ color: colorConfig[stat.color].color }}>{stat.value}</p>
            </div>
            <div className="summary-icon" style={{ backgroundColor: colorConfig[stat.color].bg }}><span>{stat.icon}</span></div>
          </div>
        ))}
      </div>

      {/* Submissions List */}
      <div className="card">
        <div className="card-header-row">
          <h3>Student Submissions</h3>
          <div className="header-actions">
            <select className="form-select"><option>All Submissions</option><option>High Priority</option></select>
            <button className="button button--primary">Bulk Actions</button>
          </div>
        </div>
        <div className="submissions-list">
          {pendingSubmissions.length > 0 ? pendingSubmissions.map((sub) => (
            <div key={sub.id} className={`submission-item ${getPriorityClass(sub.priority)}`}>
              <div className="submission-main">
                <div className="submission-content">
                  <div className="submission-header">
                    <h4>{sub.activity.title}</h4>
                    <div className="badges-container">
                      <span className={`badge ${getStatusClass(sub.status)}`}>{sub.status.replace('_', ' ')}</span>
                      <span className={`badge ${getPriorityClass(sub.priority)}`}>{sub.priority} Priority</span>
                    </div>
                  </div>
                  <div className="details-grid">
                    <p><strong>Student:</strong> {sub.student.name} ({sub.student.rollNumber})</p>
                    <p><strong>Activity Type:</strong> {sub.activity.type}</p>
                    <p><strong>Submitted:</strong> {sub.submittedDate}</p>
                    <p><strong>Expected Credits:</strong> {sub.activity.expectedCredits}</p>
                  </div>
                  <p className="description"><strong>Description:</strong> {sub.activity.description}</p>
                  <div className="documents-list">
                    <strong>Documents:</strong>
                    {sub.documents.map((doc, i) => <button key={i} className="document-link">📄 {doc}</button>)}
                  </div>

                  {selectedSubmission === sub.id && (
                    <div className="review-form-box">
                      <h5>Review & Decision</h5>
                      <div className="review-form-inputs">
                        <div>
                          <label>Award Credits (0-{sub.activity.expectedCredits})</label>
                          <input type="number" min="0" max={sub.activity.expectedCredits} value={awardedCredits} onChange={(e) => setAwardedCredits(e.target.value)} className="form-input" placeholder="0"/>
                        </div>
                        <div className="comment-field">
                          <label>Review Comments</label>
                          <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} className="form-textarea" rows={3} placeholder="Add feedback..."/>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="actions-column">
                  {selectedSubmission === sub.id ? (
                    <>
                      <button onClick={() => handleApprove(sub.id)} className="button button--approve">✅ Approve</button>
                      <button onClick={() => handleReject(sub.id)} className="button button--reject">❌ Reject</button>
                      <button onClick={resetReviewForm} className="button button--secondary">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setSelectedSubmission(sub.id)} className="button button--review">📝 Review</button>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div className="empty-state">
              <div className="empty-state-icon">🎉</div>
              <h3>All caught up!</h3>
              <p>No pending submissions to review at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalPanel;