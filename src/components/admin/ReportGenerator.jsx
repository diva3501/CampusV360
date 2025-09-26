import React, { useState } from 'react';
import './ReportGenerator.css'; 

const ReportGenerator = () => {
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('current_semester');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [reportFormat, setReportFormat] = useState('pdf');

  
  const reportTypes = [
    { id: 'naac', title: 'NAAC Compliance Report', description: 'For accreditation requirements', icon: '🏛️', color: 'blue', estimatedTime: '5-10 min', sections: ['Student Activities', 'Faculty Performance', 'Quality Indicators'] },
    { id: 'aicte', title: 'AICTE Annual Report', description: 'Annual report for AICTE compliance', icon: '📚', color: 'green', estimatedTime: '8-15 min', sections: ['Academic Performance', 'Industry Collaboration'] },
    { id: 'nirf', title: 'NIRF Ranking Data', description: 'Data for National Ranking Framework', icon: '🏆', color: 'purple', estimatedTime: '10-20 min', sections: ['Teaching & Learning', 'Research', 'Graduation Outcomes'] },
    { id: 'activity_summary', title: 'Activity Summary', description: 'Analysis of student activities', icon: '📊', color: 'orange', estimatedTime: '3-5 min' },
    { id: 'faculty_performance', title: 'Faculty Performance', description: 'Faculty engagement evaluation', icon: '👨‍🏫', color: 'indigo', estimatedTime: '5-8 min' },
  ];
  const recentReports = [
    { id: 1, title: 'NAAC Report - Q4 2024', type: 'NAAC', generatedBy: 'Admin', date: '2025-09-15', size: '2.4 MB', downloads: 12 },
    { id: 2, title: 'Activity Summary - Sep 2025', type: 'Activity', generatedBy: 'Dr. Smith', date: '2025-09-10', size: '1.8 MB', downloads: 8 },
    { id: 3, title: 'Faculty Performance - Sem 1', type: 'Faculty', generatedBy: 'Admin', date: '2025-09-05', size: '3.1 MB', downloads: 15 },
  ];
  const scheduledReports = [
      { title: 'Monthly Activity Summary', next: '2025-09-30', status: 'active' }, { title: 'Quarterly NAAC Report', next: '2025-10-31', status: 'active' }, { title: 'Weekly Faculty Report', next: '2025-10-03', status: 'paused' }
  ];

  const generateReport = () => {
    if (!selectedReportType) {
      alert('Please select a report type');
      return;
    }
    const report = reportTypes.find(r => r.id === selectedReportType);
    alert(`Generating ${report.title}...`);
  };

  const colorConfig = {
    blue: { color: '#2563eb', bg: '#dbeafe' }, green: { color: '#16a34a', bg: '#dcfce7' },
    purple: { color: '#9333ea', bg: '#f3e8ff' }, orange: { color: '#ea580c', bg: '#ffedd5' },
    indigo: { color: '#4f46e5', bg: '#e0e7ff' }, teal: { color: '#0d9488', bg: '#ccfbf1' }
  };
  
  const getStatusClass = (status) => `status-badge--${status}`;

  return (
    <div className="report-generator-container fade-in">
      {/* Statistics */}
      <div className="summary-grid">
        {[
          { title: 'Reports Generated', value: '247', icon: '📊', color: 'blue' },
          { title: 'NAAC Reports', value: '12', icon: '🏛️', color: 'green' },
          { title: 'AICTE Reports', value: '8', icon: '📚', color: 'purple' },
          { title: 'Custom Reports', value: '89', icon: '📋', color: 'orange' },
        ].map((stat, i) => (
          <div key={i} className="summary-card">
            <div className="summary-icon" style={{ backgroundColor: colorConfig[stat.color].bg }}><span>{stat.icon}</span></div>
            <p className="summary-title">{stat.title}</p>
            <p className="summary-value" style={{ color: colorConfig[stat.color].color }}>{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="main-grid">
        {/* Report Generation Form */}
        <div className="card">
          <h3 className="card-header">Generate New Report</h3>
          <div className="form-content">
            <div>
              <label className="form-label">Step 1: Select Report Type <span className="required">*</span></label>
              <div className="report-type-list">
                {reportTypes.slice(0, 3).map((report) => (
                  <label key={report.id}>
                    <input type="radio" name="reportType" value={report.id} checked={selectedReportType === report.id} onChange={(e) => setSelectedReportType(e.target.value)} className="sr-only" />
                    <div className={`report-type-card ${selectedReportType === report.id ? `report-type-card--selected-${report.color}` : ''}`}>
                      <div className="report-type-icon" style={{ backgroundColor: colorConfig[report.color].bg }}><span>{report.icon}</span></div>
                      <div><h4>{report.title}</h4><p>{report.description}</p></div>
                    </div>
                  </label>
                ))}
              </div>
              <button className="link-button">View All Report Types →</button>
            </div>
            
            <div>
                <label className="form-label">Step 2: Configure Options</label>
                <div className="options-grid">
                    <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="form-select">
                        <option value="current_semester">Current Semester</option>
                        <option value="academic_year">Academic Year</option>
                    </select>
                    <select className="form-select">
                        <option value="all">All Departments</option>
                        <option value="cs">Computer Science</option>
                    </select>
                    <select value={reportFormat} onChange={(e) => setReportFormat(e.target.value)} className="form-select">
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                    </select>
                    <label className="checkbox-label"><input type="checkbox" checked={includeCharts} onChange={(e) => setIncludeCharts(e.target.checked)} className="form-checkbox"/><span>Include Charts</span></label>
                </div>
            </div>

            {selectedReportType && (
              <div className="included-sections">
                <h4>📋 {reportTypes.find(r => r.id === selectedReportType)?.title} Sections</h4>
                <ul>{reportTypes.find(r => r.id === selectedReportType)?.sections.map((s, i) => <li key={i}>• {s}</li>)}</ul>
              </div>
            )}

            <button onClick={generateReport} className="button button--primary generate-button">🚀 Generate Report</button>
          </div>
        </div>
        
        {/* Side Cards */}
        <div className="side-content">
          <div className="card">
            <h3 className="card-header">Quick Templates</h3>
            <div className="template-grid">
              {reportTypes.slice(3).map((report) => (
                <button key={report.id} onClick={() => setSelectedReportType(report.id)} className={`template-button template-button--${report.color}`}>
                  <div className="template-icon">{report.icon}</div>
                  <h4>{report.title}</h4>
                  <p>{report.estimatedTime}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="card-header">Scheduled Reports</h3>
            <div className="list-container">
              {scheduledReports.map((s, i) => (
                <div key={i} className="scheduled-item">
                  <div><h4>{s.title}</h4><p>Next: {s.next}</p></div>
                  <span className={`status-badge ${getStatusClass(s.status)}`}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="card">
        <div className="card-header-row">
          <h3>Recent Reports</h3>
          <button className="link-button">View All Reports →</button>
        </div>
        <div className="table-wrapper">
          <table className="history-table">
            <thead><tr><th>Report</th><th>Type</th><th>Generated By</th><th>Date</th><th>Size</th><th>Downloads</th><th>Actions</th></tr></thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id}>
                  <td data-label="Report">{report.title}</td>
                  <td data-label="Type"><span className="type-badge">{report.type}</span></td>
                  <td data-label="By">{report.generatedBy}</td>
                  <td data-label="Date">{report.date}</td>
                  <td data-label="Size">{report.size}</td>
                  <td data-label="Downloads">{report.downloads}</td>
                  <td data-label="Actions"><div className="table-actions"><button onClick={() => alert(`Downloading ${report.title}`)} className="link-button">Download</button><button className="link-button">Share</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;