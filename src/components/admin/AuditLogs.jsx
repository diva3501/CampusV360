import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './AuditLogs.css';

const AuditLogs = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [auditLogs] = useState([
    { id: 1, timestamp: '2025-09-26 10:32:15', user: 'Dr. Mehta', userRole: 'faculty', action: 'approved_activity', details: 'Approved "ML Certification"', severity: 'info', category: 'activity_management', ipAddress: '192.168.1.45' },
    { id: 2, timestamp: '2025-09-26 10:28:42', user: 'Admin Kumar', userRole: 'admin', action: 'user_created', details: 'Created student account for Rohan', severity: 'info', category: 'user_management', ipAddress: '192.168.1.10' },
    { id: 3, timestamp: '2025-09-26 10:15:23', user: 'Priya Sharma', userRole: 'student', action: 'activity_submitted', details: 'Submitted "Hackathon Participation"', severity: 'info', category: 'activity_management', ipAddress: '192.168.1.78' },
    { id: 4, timestamp: '2025-09-26 09:45:12', user: 'System', userRole: 'system', action: 'login_failed', details: 'Failed login attempt for "vikram.s"', severity: 'warning', category: 'security', ipAddress: '203.45.67.89' },
    { id: 5, timestamp: '2025-09-26 09:15:05', user: 'Dr. Desai', userRole: 'faculty', action: 'rejected_activity', details: 'Rejected "Internship Report"', severity: 'error', category: 'activity_management', ipAddress: '192.168.1.52' },
  ]);
  
  const getSeverityClass = (severity) => `severity-badge--${severity}`;
  const getCategoryClass = (category) => `category-badge--${category.replace(/_/g, '-')}`;
  const getSeverityIcon = (severity) => ({ info: 'ℹ️', warning: '⚠️', error: '❌', critical: '🚨' }[severity] || '📝');

  const filteredLogs = auditLogs.filter(log =>
    (selectedFilter === 'all' || log.category === selectedFilter) &&
    (selectedUser === 'all' || log.user === selectedUser) &&
    (log.details.toLowerCase().includes(searchTerm.toLowerCase()) || log.user.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportLogs = () => {
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFontSize(20);
    doc.text("Audit Log Report", 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

    const tableColumn = ["Timestamp", "User", "Role", "Action", "Details", "Category", "Severity", "IP Address"];
    const tableRows = filteredLogs.map(log => [
      log.timestamp,
      log.user,
      log.userRole,
      log.action.replace(/_/g, ' '),
      log.details,
      log.category.replace(/_/g, ' '),
      log.severity,
      log.ipAddress
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: '#4f46e5' },
    });
    
    doc.save(`Audit-Logs-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))];
  const logStats = {
    total: auditLogs.length,
    info: auditLogs.filter(log => log.severity === 'info').length,
    warning: auditLogs.filter(log => log.severity === 'warning').length,
    error: auditLogs.filter(log => log.severity === 'error').length,
  };

  const colorConfig = {
    blue: { color: '#2563eb', bg: '#dbeafe' }, green: { color: '#16a34a', bg: '#dcfce7' },
    yellow: { color: '#ca8a04', bg: '#fef9c3' }, red: { color: '#dc2626', bg: '#fee2e2' },
    purple: { color: '#9333ea', bg: '#f3e8ff' }
  };

  return (
    <div className="audit-logs-container fade-in">
      {/* Audit Statistics */}
      <div className="summary-grid">
        {[
          { title: 'Total Logs', value: logStats.total, icon: '📋', color: 'blue' },
          { title: 'Info Events', value: logStats.info, icon: 'ℹ️', color: 'green' },
          { title: 'Warnings', value: logStats.warning, icon: '⚠️', color: 'yellow' },
          { title: 'Errors', value: logStats.error, icon: '❌', color: 'red' },
        ].map((stat, index) => (
          <div key={index} className="summary-card">
            <div className="summary-icon" style={{ backgroundColor: colorConfig[stat.color].bg }}><span>{stat.icon}</span></div>
            <div>
              <p className="summary-title">{stat.title}</p>
              <p className="summary-value" style={{ color: colorConfig[stat.color].color }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Controls */}
      <div className="card filters-container">
        <div className="filter-controls">
          <input type="text" placeholder="Search logs by user or details..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control search-input" />
          <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="form-control">
            <option value="all">All Categories</option>
            <option value="user_management">User Management</option>
            <option value="activity_management">Activity Management</option>
            <option value="security">Security</option>
          </select>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="form-control">
            <option value="all">All Users</option>
            {uniqueUsers.map((user, i) => <option key={i} value={user}>{user}</option>)}
          </select>
        </div>
        <div className="action-buttons">
          <button onClick={exportLogs} className="button button--secondary">📊 Export PDF</button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="card">
        <div className="card-header-row">
          <h3>Audit Trail</h3>
          <p>Showing {filteredLogs.length} of {auditLogs.length} entries</p>
        </div>
        <div className="table-wrapper">
          <table className="audit-table">
            <thead>
              <tr><th>Timestamp</th><th>User</th><th>Action</th><th>Details</th><th>Category</th><th>Severity</th><th>IP Address</th></tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td data-label="Timestamp" className="font-mono">{log.timestamp}</td>
                  <td data-label="User"><div className="user-name">{log.user}</div><div className="user-role">{log.userRole}</div></td>
                  <td data-label="Action" className="action-cell">{log.action.replace(/_/g, ' ')}</td>
                  <td data-label="Details" className="details-cell">{log.details}</td>
                  <td data-label="Category"><span className={`log-badge ${getCategoryClass(log.category)}`}>{log.category.replace(/_/g, ' ')}</span></td>
                  <td data-label="Severity"><span className={`log-badge ${getSeverityClass(log.severity)}`}>{getSeverityIcon(log.severity)} {log.severity}</span></td>
                  <td data-label="IP Address" className="font-mono">{log.ipAddress}</td>
                </tr>
              )) : (
                  <tr>
                    <td colSpan="7" className="empty-row">No logs found matching your criteria.</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;