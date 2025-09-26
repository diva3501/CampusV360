import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; 


import NavBar from './shared/NavBar';
import UserManagement from './admin/UserManagement';
import ActivityOverview from './admin/ActivityOverview';
import ReportGenerator from './admin/ReportGenerator';
import BulkDataImport from './admin/BulkDataImport';
import AuditLogs from './admin/AuditLogs';
import PolicyMonitoring from './admin/PolicyMonitoring';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'activity', label: 'Activity Overview', icon: '📈' },
    { id: 'reports', label: 'Report Generator', icon: '📄' },
    { id: 'import', label: 'Bulk Import', icon: '📤' },
    { id: 'audit', label: 'Audit Logs', icon: '🔍' },
    { id: 'policy', label: 'Policy Monitoring', icon: '⚖️' }
  ];

  
  const colorConfig = {
    blue: { color: '#2563eb', bg: '#dbeafe' },
    green: { color: '#16a34a', bg: '#dcfce7' },
    purple: { color: '#9333ea', bg: '#f3e8ff' },
    orange: { color: '#ea580c', bg: '#ffedd5' },
    gray: { color: '#4b5563', bg: '#f3f4f6' },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users': return <UserManagement />;
      case 'activity': return <ActivityOverview />;
      case 'reports': return <ReportGenerator />;
      case 'import': return <BulkDataImport />;
      case 'audit': return <AuditLogs />;
      case 'policy': return <PolicyMonitoring />;
      default:
        return (
          <div className="fade-in">
            <div className="summary-grid">
              {[
                { title: 'Total Users', value: '2,847', icon: '👥', color: 'blue', change: '+12%' },
                { title: 'Active Students', value: '2,456', icon: '🎓', color: 'green', change: '+8%' },
                { title: 'Faculty Members', value: '284', icon: 'purple', change: '+3%' },
                { title: 'Activities This Month', value: '1,923', icon: '📊', color: 'orange', change: '+24%' }
              ].map((stat, index) => {
                
                
                const colorStyle = colorConfig[stat.color] || colorConfig.gray;

                return (
                  <div key={index} className="summary-card">
                    <div className="summary-card-header">
                      {/* Use the safe 'colorStyle' variable */}
                      <div className="summary-icon" style={{ backgroundColor: colorStyle.bg }}>
                        <span>{stat.icon}</span>
                      </div>
                      <span className="summary-change">{stat.change}</span>
                    </div>
                    <div>
                      <p className="summary-title">{stat.title}</p>
                      {/* Use the safe 'colorStyle' variable */}
                      <p className="summary-value" style={{ color: colorStyle.color }}>{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="main-grid">
              <div className="card">
                <h3 className="card-header">System Activity</h3>
                <div className="activity-list">
                  {[
                    { action: 'New student registration', user: 'Sarah Chen', time: '5m ago', type: 'success' },
                    { action: 'Faculty approved 12 activities', user: 'Dr. Johnson', time: '15m ago', type: 'info' },
                    { action: 'Bulk data import completed', user: 'System Admin', time: '1h ago', type: 'success' },
                    { action: 'Report generated: NAAC Audit', user: 'Admin User', time: '2h ago', type: 'warning' }
                  ].map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className={`status-dot status-dot--${activity.type}`}></div>
                      <div>
                        <p className="activity-action">{activity.action}</p>
                        <p className="activity-meta">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="card-header">Quick Actions</h3>
                <div className="quick-actions-grid">
                  {[
                    { label: 'Manage Users', icon: '👥', action: () => setActiveTab('users'), color: 'blue' },
                    { label: 'Generate Reports', icon: '📄', action: () => setActiveTab('reports'), color: 'green' },
                    { label: 'Import Data', icon: '📤', action: () => setActiveTab('import'), color: 'purple' },
                    { label: 'View Audit Logs', icon: '🔍', action: () => setActiveTab('audit'), color: 'gray' }
                  ].map((action, index) => (
                    <button key={index} onClick={action.action} className={`quick-action-button button--${action.color}`}>
                      <div className="quick-action-icon">{action.icon}</div>
                      <div>{action.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-header">Institution Performance</h3>
              <div className="performance-grid">
                <div className="performance-item">
                  <div className="performance-icon" style={{ backgroundColor: colorConfig.blue.bg }}><span role="img" aria-label="trophy">🏆</span></div>
                  <h4>Academic Excellence</h4>
                  <p className="performance-value" style={{ color: colorConfig.blue.color }}>94.2%</p>
                  <p className="performance-label">Overall Performance Score</p>
                </div>
                <div className="performance-item">
                  <div className="performance-icon" style={{ backgroundColor: colorConfig.green.bg }}><span role="img" aria-label="checkmark">✅</span></div>
                  <h4>Compliance Rate</h4>
                  <p className="performance-value" style={{ color: colorConfig.green.color }}>98.7%</p>
                  <p className="performance-label">NAAC/AICTE Standards</p>
                </div>
                <div className="performance-item">
                  <div className="performance-icon" style={{ backgroundColor: colorConfig.purple.bg }}><span role="img" aria-label="chart">📊</span></div>
                  <h4>Data Quality</h4>
                  <p className="performance-value" style={{ color: colorConfig.purple.color }}>96.1%</p>
                  <p className="performance-label">Accuracy & Completeness</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard-container">
      <NavBar title="Admin Dashboard" userRole="Administrator" onBackClick={() => navigate('/')} />
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

export default AdminDashboard;