import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // <-- 1. MODIFIED IMPORT
import './AuditSupport.css'; 

const AuditSupport = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [auditRecords] = useState([
    { id: 1, studentName: 'Aarav Sharma', rollNumber: 'CS21B045', activityTitle: 'ML Certification', activityType: 'Certification', submissionDate: '2025-09-16', approvalDate: '2025-09-18', reviewedBy: 'Dr. Mehta', status: 'approved', creditsAwarded: 3, verificationStatus: 'verified', auditFlags: [] },
    { id: 2, studentName: 'Riya Desai', rollNumber: 'EC21B067', activityTitle: 'Research Paper Publication', activityType: 'Research', submissionDate: '2025-09-05', approvalDate: null, reviewedBy: 'Dr. Kumar', status: 'rejected', creditsAwarded: 0, verificationStatus: 'pending', auditFlags: ['incomplete_documentation'] },
    { id: 3, studentName: 'Vikram Singh', rollNumber: 'IT21B023', activityTitle: 'Open Source Contribution', activityType: 'Project', submissionDate: '2025-09-14', approvalDate: '2025-09-17', reviewedBy: 'Dr. Mehta', status: 'approved', creditsAwarded: 2, verificationStatus: 'verified', auditFlags: ['review_recommended'] },
    { id: 4, studentName: 'Priya Patel', rollNumber: 'CS21B028', activityTitle: 'Jio Summer Internship', activityType: 'Internship', submissionDate: '2025-09-12', approvalDate: '2025-09-15', reviewedBy: 'Dr. Joshi', status: 'approved', creditsAwarded: 4, verificationStatus: 'verified', auditFlags: [] }
  ]);
  
  const getStatusClass = (status) => `badge--${status}`;
  const getVerificationClass = (status) => `verification--${status}`;
  const getVerificationIcon = (status) => ({ verified: '✅', pending: '⏳', failed: '❌' }[status] || '❓');

  const filteredRecords = auditRecords.filter(record =>
    (selectedFilter === 'all' || record.status === selectedFilter) &&
    (record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || record.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const exportAuditReport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text("Audit Support Report", 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Table columns
    const tableColumn = ["Student Name", "Roll No.", "Activity", "Status", "Credits", "Reviewed By", "Approval Date"];
    
    // Map filtered data to table rows
    const tableRows = filteredRecords.map(record => [
        record.studentName,
        record.rollNumber,
        record.activityTitle,
        record.status,
        record.creditsAwarded,
        record.reviewedBy,
        record.approvalDate || "N/A"
    ]);

    // Create the table using the imported autoTable function
    autoTable(doc, { // <-- 2. MODIFIED FUNCTION CALL
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
        styles: { cellPadding: 3, fontSize: 10 },
    });
    
    // Add Footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 35, doc.internal.pageSize.height - 10);
    }
    
    // Trigger the download
    doc.save(`Audit-Report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

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
            <div>
              <p className="summary-title">{stat.title}</p>
              <p className="summary-value" style={{ color: colorConfig[stat.color].color }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card filters-container">
        <h3>Filter & Export Records</h3>
        <div className="controls-wrapper">
          <div className="filter-controls">
            <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="form-select">
              <option value="all">All Status</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
            </select>
            <input type="text" placeholder="Search by name or roll no..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control" />
          </div>
          <div className="action-buttons">
            <button onClick={exportAuditReport} className="button button--blue">📊 Export Report</button>
            <button onClick={generateComplianceReport} className="button button--green">📋 Compliance Report</button>
          </div>
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
                  <td data-label="Credits" className="credits-cell">{record.creditsAwarded || 0}</td>
                  <td data-label="Reviewed By">{record.reviewedBy}</td>
                  <td data-label="Actions"><div className="table-actions"><button className="link-button">View</button><button className="link-button">Verify</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditSupport;