import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultyDashboard.css'; 

// Assuming these child components are also styled with CSS
import NavBar from './shared/NavBar';
import ApprovalPanel from './faculty/ApprovalPanel';
import StudentMonitoring from './faculty/StudentMonitoring';
import CreditAwarding from './faculty/CreditAwarding';
import AuditSupport from './faculty/AuditSupport';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // MODIFIED: Submission data is now in state to make it interactive
  const [submissions, setSubmissions] = useState([
    { id: 1, student: 'Priya Sharma', activity: 'Research Publication', submitted: '2 hours ago', urgent: true },
    { id: 2, student: 'Arjun Kumar', activity: 'Industry Internship', submitted: '5 hours ago', urgent: false },
    { id: 3, student: 'Sneha Patel', activity: 'Coding Competition', submitted: '1 day ago', urgent: false },
    { id: 4, student: 'Vikram Singh', activity: 'Volunteer Work', submitted: '2 days ago', urgent: false }
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'approvals', label: 'Approval Panel', icon: '✅' },
    { id: 'monitoring', label: 'Student Monitoring', icon: '👥' },
    { id: 'credits', label: 'Award Credits', icon: '🏆' },
    { id: 'audit', label: 'Audit Support', icon: '📋' }
  ];

  const colorConfig = {
    yellow: { color: '#ca8a04', bg: '#fef9c3' },
    blue: { color: '#2563eb', bg: '#dbeafe' },
    green: { color: '#16a34a', bg: '#dcfce7' },
    purple: { color: '#9333ea', bg: '#f3e8ff' },
    gray: { color: '#4b5563', bg: '#f3f4f6' },
  };
  
  // ADDED: Handler to approve and remove a submission from the list
  const handleApprove = (submissionId) => {
    setSubmissions(prevSubmissions => prevSubmissions.filter(s => s.id !== submissionId));
    alert('Submission approved and removed from this list.');
  };
  
  // ADDED: Handler to reject and remove a submission from the list
  const handleReject = (submissionId) => {
    setSubmissions(prevSubmissions => prevSubmissions.filter(s => s.id !== submissionId));
    alert('Submission rejected and feedback sent to the student.');
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'approvals': return <ApprovalPanel />;
      case 'monitoring': return <StudentMonitoring />;
      case 'credits': return <CreditAwarding />;
      case 'audit': return <AuditSupport />;
      default:
        return (
          <div className="fade-in">
            <div className="summary-grid">
              {/* This section is unchanged */}
              {[
                { title: 'Pending Reviews', value: '15', icon: '⏳', color: 'yellow' },
                { title: 'Students Monitored', value: '127', icon: '👥', color: 'blue' },
                { title: 'Credits Awarded', value: '340', icon: '🏆', color: 'green' },
                { title: 'This Month', value: '89', icon: '📊', color: 'purple' }
              ].map((stat, index) => (
                <div key={index} className="summary-card">
                  <div>
                    <p className="summary-title">{stat.title}</p>
                    <p className="summary-value" style={{ color: colorConfig[stat.color].color }}>{stat.value}</p>
                  </div>
                  <div className="summary-icon" style={{ backgroundColor: colorConfig[stat.color].bg }}>
                    <span>{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="main-grid">
              <div className="card">
                <h3 className="card-header">Recent Student Submissions</h3>
                <div className="list-container">
                  {/* MODIFIED: Mapping over state and using handlers */}
                  {submissions.length > 0 ? submissions.map((submission) => (
                    <div key={submission.id} className={`submission-item ${submission.urgent ? 'submission-item--urgent' : ''}`}>
                      <div>
                        <h4 className="submission-student">{submission.student}</h4>
                        <p className="submission-activity">{submission.activity}</p>
                        <p className="submission-time">{submission.submitted}</p>
                        {submission.urgent && <div className="urgent-badge">Urgent Review Required</div>}
                      </div>
                      <div className="submission-actions">
                        <button onClick={() => handleApprove(submission.id)} className="button button--approve">Approve</button>
                        <button onClick={() => handleReject(submission.id)} className="button button--reject">Reject</button>
                      </div>
                    </div>
                  )) : (
                    <div className="empty-state">
                      <p>🎉 All submissions have been reviewed!</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <h3 className="card-header">Quick Actions</h3>
                <div className="list-container">
                  {/* This section is unchanged */}
                  {[
                    { label: 'Review Pending Submissions', count: 15, action: () => setActiveTab('approvals'), color: 'blue' },
                    { label: 'Monitor Student Progress', count: 127, action: () => setActiveTab('monitoring'), color: 'green' },
                    { label: 'Award Academic Credits', count: 8, action: () => setActiveTab('credits'), color: 'purple' },
                    { label: 'Generate Audit Report', count: null, action: () => setActiveTab('audit'), color: 'gray' }
                  ].map((action, index) => (
                    <button key={index} onClick={action.action} className={`quick-action-button button--${action.color}`}>
                      <span>{action.label}</span>
                      {action.count && <span className="quick-action-count">{action.count}</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="faculty-dashboard-container">
      <NavBar title="Faculty Dashboard" userRole="Faculty" onBackClick={() => navigate('/')} />
      <main className="dashboard-content">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default FacultyDashboard;