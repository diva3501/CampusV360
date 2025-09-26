import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css'; 


import NavBar from './shared/NavBar';
import AcademicProgress from './student/AcademicProgress';
import ActivityUpload from './student/ActivityUpload';
import ApprovalTracker from './student/ApprovalTracker';
import DigitalPortfolio from './student/DigitalPortfolio';
import Notifications from './student/Notifications';
import StudentProfile from './student/StudentProfile';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  
  const colorMap = {
    blue: { gradient: 'linear-gradient(to right, #60a5fa, #3b82f6)', color: '#2563eb' },
    green: { gradient: 'linear-gradient(to right, #4ade80, #22c55e)', color: '#16a34a' },
    purple: { gradient: 'linear-gradient(to right, #c084fc, #a855f7)', color: '#9333ea' },
    orange: { gradient: 'linear-gradient(to right, #fb923c, #f97316)', color: '#ea580c' },
  };

  const statusInfo = {
    approved: { label: 'Approved', colorClass: 'status-approved' },
    pending: { label: 'Pending', colorClass: 'status-pending' },
    under_review: { label: 'Under Review', colorClass: 'status-under-review' },
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'progress', label: 'Academic Progress', icon: '📈' },
    { id: 'upload', label: 'Upload Activities', icon: '📤' },
    { id: 'tracker', label: 'Approval Status', icon: '✅' },
    { id: 'portfolio', label: 'Digital Portfolio', icon: '🎓' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'progress': return <AcademicProgress />;
      case 'upload': return <ActivityUpload />;
      case 'tracker': return <ApprovalTracker />;
      case 'portfolio': return <DigitalPortfolio />;
      case 'notifications': return <Notifications />;
      case 'profile': return <StudentProfile />;
      default:
        return (
          <div className="fade-in">
            {/* Welcome Section */}
            <div className="welcome-banner">
              <div>
                <h2>Welcome back, John! 👋</h2>
                <p>Ready to track your academic journey?</p>
              </div>
              <div className="welcome-icon">🎓</div>
            </div>

            {/* Stats Cards */}
            <div className="grid-container four-cols">
              {[
                { title: 'Current GPA', value: '8.7', icon: '🎯', color: 'blue', subtitle: 'Excellent Performance', trend: '+0.2 from last semester' },
                { title: 'Completed Activities', value: '24', icon: '📚', color: 'green', subtitle: 'Great Progress', trend: '+5 this month' },
                { title: 'Achievement Score', value: '92', icon: '⭐', color: 'purple', subtitle: 'Outstanding', trend: 'Top 10% in class' },
                { title: 'Credits Earned', value: '116', icon: '🏆', color: 'orange', subtitle: 'On Track', trend: '28 credits remaining' }
              ].map((stat, index) => (
                <div key={index} className="card stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon" style={{ background: colorMap[stat.color].gradient }}>
                      <span>{stat.icon}</span>
                    </div>
                    <div className="stat-card-value">
                      <div style={{ color: colorMap[stat.color].color }}>{stat.value}</div>
                      <small>{stat.trend}</small>
                    </div>
                  </div>
                  <div>
                    <h3>{stat.title}</h3>
                    <p>{stat.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid-container two-cols">
              {/* Recent Activities */}
              <div className="card">
                <div className="card-header">
                  <h3>Recent Activities</h3>
                  <button onClick={() => setActiveTab('tracker')} className="link-button">
                    View All →
                  </button>
                </div>
                <div className="activity-list">
                  {[
                    { title: 'Machine Learning Certificate', status: 'approved', date: '2 days ago', credits: 3 },
                    { title: 'Hackathon Participation', status: 'pending', date: '1 week ago', credits: 2 },
                    { title: 'Research Paper Publication', status: 'approved', date: '2 weeks ago', credits: 5 },
                    { title: 'Volunteer Work', status: 'under_review', date: '3 weeks ago', credits: 1 }
                  ].map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-details">
                        <div className={`status-dot ${statusInfo[activity.status].colorClass}`}></div>
                        <div>
                          <h4>{activity.title}</h4>
                          <p>{activity.date}</p>
                        </div>
                      </div>
                      <div className="activity-status">
                        <span className={`status-badge ${statusInfo[activity.status].colorClass}`}>
                          {statusInfo[activity.status].label}
                        </span>
                        <p>{activity.credits} credits</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3>Quick Actions</h3>
                <div className="quick-actions-list">
                  {[
                    { label: 'Upload New Activity', action: () => setActiveTab('upload'), color: 'blue', icon: '📤', description: 'Submit certificates and achievements' },
                    { label: 'Check Approval Status', action: () => setActiveTab('tracker'), color: 'green', icon: '✅', description: 'Track your submission progress' },
                    { label: 'Generate Portfolio', action: () => setActiveTab('portfolio'), color: 'purple', icon: '🎓', description: 'Create your digital portfolio' },
                    { label: 'View Notifications', action: () => setActiveTab('notifications'), color: 'orange', icon: '🔔', description: 'Check latest updates' }
                  ].map((action, index) => (
                    <button key={index} onClick={action.action} className="quick-action-btn" style={{ background: colorMap[action.color].gradient }}>
                      <span>{action.icon}</span>
                      <div>
                        <div className="action-label">{action.label}</div>
                        <div className="action-description">{action.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="card full-width-card">
              <h3>Academic Progress Overview</h3>
              <div className="grid-container three-cols">
                {[
                  { title: 'Overall Performance', value: '94.2%', icon: '📊', color: 'blue' },
                  { title: 'Activity Completion', value: '87.5%', icon: '🎯', color: 'green' },
                  { title: 'Achievement Rate', value: '92.1%', icon: '🏆', color: 'purple' },
                ].map((progress, index) => (
                  <div key={index} className="progress-item">
                    <div className="progress-icon" style={{ background: colorMap[progress.color].gradient }}>
                      <span>{progress.icon}</span>
                    </div>
                    <h4>{progress.title}</h4>
                    <div className="progress-value" style={{ color: colorMap[progress.color].color }}>{progress.value}</div>
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: progress.value, background: colorMap[progress.color].gradient }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <NavBar
        title="Student Dashboard"
        userRole="Student"
        onBackClick={() => navigate('/')}
      />
      <main className="dashboard-content">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;