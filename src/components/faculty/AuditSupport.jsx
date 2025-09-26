import React, { useState } from 'react';
import './AuditSupport.css'; 

const AuditSupport = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  
  const [auditRecords] = useState([
    { id: 1, studentName: 'Alice Johnson', rollNumber: 'CS21B045', activityTitle: 'ML Certification', activityType: 'Certification', submissionDate: '2025-09-16', approvalDate: '2025-09-18', reviewedBy: 'Dr. Smith', status: 'approved', creditsAwarded: 3, verificationStatus: 'verified', auditFlags: [] },
    { id: 2, studentName: 'Carol Davis', rollNumber: 'CS21B067', activityTitle: 'Research Paper', activityType: 'Research', submissionDate: '2025-09-05', approvalDate: null, reviewedBy: 'Dr. Brown', status: 'rejected', creditsAwarded: 0, verificationStatus: 'pending', auditFlags: ['incomplete_documentation'] },
    { id: 3, studentName: 'Eva Martinez', rollNumber: 'CS21B023', activityTitle: 'Open Source Contribution', activityType: 'Project', submissionDate: '2025-09-14', approvalDate: '2025-09-17', reviewedBy: 'Dr. Smith', status: 'approved', creditsAwarded: 2, verificationStatus: 'verified', auditFlags: ['review_recommended'] }
  ]);
  
  
  const getStatusClass = (status) => `badge--${status}`;
  const getVerificationClass = (status) => `verification--${status}`;
  const getVerificationIcon = (status) => ({ verified: '✅', pending: '⏳', failed: '❌' }[status] || '❓');

  
  const filteredRecords = auditRecords.filter(record =>
    (selectedFilter === 'all' || record.status === selectedFilter) &&
    (record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || record.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const exportAuditReport = () => alert('Exporting audit report...');
  const generateComplianceReport = () => alert('Generating compliance report...');

  const colorConfig = {
    blue: { color: '#2563eb', bg: '#dbeafe' }, green: { color: '#16a34a', bg: '#dcfce7' },
    yellow: { color: '#ca8a04', bg: '#fef9c3' }, red: { color: '#dc2626', bg: '#fee2e2' },
    purple: { color: '#9333ea', bg: '#f3e8ff' }
  };
  
  return (
    <div className="audit-support-container fade-in">
      {/* Statistics */}
      <div className="summary-grid">
        {[
          { title: 'Total Records', value: auditRecords.length, icon: '📊', color: 'blue' },
          { title: 'Approved', value: auditRecords.filter(r => r.status === 'approved').length, icon: '✅', color: 'green' },
          { title: 'Pending Verification', value: auditRecords.filter(r => r.verificationStatus === 'pending').length, icon: '⏳', color: 'yellow' },
          { title: 'Flagged', value: auditRecords.filter(r => r.auditFlags.length > 0).length, icon: '⚠️', color: 'red' },
          { title: 'Credits Awarded', value: auditRecords.reduce((sum, r) => sum + (r.creditsAwarded || 0), 0), icon: '🏆', color: 'purple' }
        ].map((stat, i) => (
          <div key={i} className="summary-card">
            <div className="summary-icon" style={{ backgroundColor: colorConfig[stat.color].bg }}><span>{stat.icon}</span></div>
            <p className="summary-title">{stat.title}</p>
            <p className="summary-value" style={{ color: colorConfig[stat.color].color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card filters-container">
        <div className="filter-controls">
          <div className="filter-group">
            <label>Filter by Status</label>
            <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="form-select">
              <option value="all">All Records</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Search</label>
            <input type="text" placeholder="Student name or roll no..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control" />
          </div>
        </div>
        <div className="action-buttons">
          <button onClick={exportAuditReport} className="button button--blue">📊 Export Report</button>
          <button onClick={generateComplianceReport} className="button button--green">📋 Compliance Report</button>
        </div>
      </div>

      {/* Audit Table */}
      <div className="card">
        <div className="card-header-row">
          <h3>Audit Records</h3>
          <p>Showing {filteredRecords.length} of {auditRecords.length} records</p>
        </div>
        <div className="table-wrapper">
          <table className="audit-table">
            <thead><tr><th>Student</th><th>Activity</th><th>Status</th><th>Verification</th><th>Credits</th><th>Reviewed By</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td data-label="Student"><div><div className="user-name">{record.studentName}</div><div className="user-role">{record.rollNumber}</div></div></td>
                  <td data-label="Activity">
                    <div>
                      <div className="activity-title">{record.activityTitle}</div>
                      <div className="activity-type">{record.activityType}</div>
                      {record.auditFlags.length > 0 && (
                        <div className="audit-flags">
                          {record.auditFlags.map((flag, i) => <span key={i} className="audit-flag-badge">⚠️ {flag.replace('_', ' ')}</span>)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td data-label="Status"><span className={`badge ${getStatusClass(record.status)}`}>{record.status}</span></td>
                  <td data-label="Verification">
                    <div className={`verification-status ${getVerificationClass(record.verificationStatus)}`}>
                      <span>{getVerificationIcon(record.verificationStatus)}</span> {record.verificationStatus}
                    </div>
                  </td>
                  <td data-label="Credits">{record.creditsAwarded || 0}</td>
                  <td data-label="Reviewed By">{record.reviewedBy}</td>
                  <td data-label="Actions"><div className="table-actions"><button className="link-button">View</button><button className="link-button">Verify</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="main-grid">
        <div className="card">
          <h3 className="card-header">Compliance Metrics</h3>
          <div className="list-container">
            {[
              { metric: 'Documentation Completeness', value: 94, status: 'compliant' },
              { metric: 'Review Timeliness', value: 87, status: 'compliant' },
              { metric: 'Verification Rate', value: 96, status: 'compliant' },
              { metric: 'Appeal Resolution Time', value: 78, status: 'warning' }
            ].map((metric, i) => (
              <div key={i} className="metric-item">
                <div><h4>{metric.metric}</h4></div>
                <div className="metric-value">
                  <strong className={metric.status === 'compliant' ? 'text-green' : 'text-yellow'}>{metric.value}%</strong>
                  <p className={metric.status === 'compliant' ? 'text-green' : 'text-yellow'}>
                    {metric.status === 'compliant' ? '✅ Compliant' : '⚠️ Warning'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="card-header">Recent Audit Activities</h3>
          <div className="list-container">
            {[
              { action: 'Document verification completed', user: 'System', time: '5 min ago', type: 'success' },
              { action: 'Compliance report generated', user: 'Dr. Smith', time: '1 hour ago', type: 'info' },
              { action: 'Flag raised for incomplete docs', user: 'Dr. Johnson', time: '2 hours ago', type: 'warning' }
            ].map((activity, i) => (
              <div key={i} className="audit-activity-item">
                <div className={`status-dot status-dot--${activity.type}`}></div>
                <div>
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-meta">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditSupport;