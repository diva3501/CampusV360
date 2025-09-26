import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './PolicyMonitoring.css'; 

const PolicyMonitoring = () => {
  
  const complianceMetrics = { overall: 94.2, naac: 96.8, aicte: 92.1, nirf: 89.5, internal: 97.3 };
  const policyViolations = [
    { id: 1, type: 'Activity Submission Deadline', severity: 'medium', count: 12, trend: 'increasing', action: 'Send reminder notifications' },
    { id: 2, type: 'Faculty Review Timeout', severity: 'high', count: 5, trend: 'stable', action: 'Escalate to department head' },
    { id: 3, type: 'Duplicate Activity Submission', severity: 'low', count: 8, trend: 'decreasing', action: 'System validation enhancement' },
  ];
  const complianceReports = [
    { id: 1, title: 'NAAC Criterion 2.6', status: 'compliant', score: 96.8 },
    { id: 2, title: 'AICTE Approval Handbook', status: 'compliant', score: 92.1 },
    { id: 3, title: 'NIRF Data Guidelines', status: 'warning', score: 89.5 },
  ];
  const monitoringAlerts = [
    { id: 1, type: 'Policy Violation', message: 'Multiple faculty members exceeding review time limits', severity: 'high', status: 'active' },
    { id: 2, type: 'Compliance Risk', message: 'NIRF data submission deadline approaching (7 days)', severity: 'medium', status: 'acknowledged' },
    { id: 3, type: 'System Anomaly', message: 'Unusual spike in activity submissions detected', severity: 'low', status: 'resolved' },
  ];
  const quickActions = [
      { label: 'Run Compliance Check', icon: '🔍' }, { label: 'Update Policy Rules', icon: '📝' }, { label: 'Schedule Audit', icon: '📅' },
  ];
  const riskAssessments = [
      { risk: 'Data Quality Issues', level: 'medium' }, { risk: 'Compliance Deadline Miss', level: 'low' }, { risk: 'Policy Violation Increase', level: 'high' }
  ];
  const systemHealthMetrics = [
      { metric: 'Policy Engine Status', value: 'Operational', status: 'good' }, { metric: 'Monitoring Coverage', value: '98.5%', status: 'good' }, { metric: 'Alert Response Time', value: '2.3 min', status: 'warning' }
  ];

  const generateReport = () => {
    const doc = new jsPDF();
    let finalY = 0;

    
    doc.setFontSize(22);
    doc.text("Policy Monitoring Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
    
    
    doc.setFontSize(16);
    doc.text("Overall Compliance Summary", 14, 40);
    autoTable(doc, {
      startY: 44,
      head: [['Metric', 'Compliance Rate']],
      body: [
        ['Overall Compliance', `${complianceMetrics.overall}%`],
        ['NAAC Standards', `${complianceMetrics.naac}%`],
        ['AICTE Guidelines', `${complianceMetrics.aicte}%`],
        ['NIRF Framework', `${complianceMetrics.nirf}%`],
        ['Internal Policies', `${complianceMetrics.internal}%`],
      ],
      theme: 'grid',
      headStyles: { fillColor: '#3b82f6' }
    });
    finalY = doc.lastAutoTable.finalY;

    
    doc.text("Active Policy Violations", 14, finalY + 12);
    autoTable(doc, {
      startY: finalY + 16,
      head: [['Violation Type', 'Severity', 'Count', 'Trend']],
      body: policyViolations.map(v => [v.type, v.severity, v.count, v.trend]),
      theme: 'grid',
      headStyles: { fillColor: '#ef4444' }
    });
    finalY = doc.lastAutoTable.finalY;

    
    doc.text("Monitoring Alerts", 14, finalY + 12);
     autoTable(doc, {
      startY: finalY + 16,
      head: [['Type', 'Severity', 'Status', 'Message']],
      body: monitoringAlerts.map(a => [a.type, a.severity, a.status, a.message]),
      theme: 'grid',
      headStyles: { fillColor: '#f97316' }
    });

    doc.save(`Policy-Monitoring-Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };
  
  const getSeverityClass = (severity) => `badge--${severity}`;
  const getStatusClass = (status) => `badge--${status.replace('_', '-')}`;
  const getTrendIcon = (trend) => ({ increasing: '📈', decreasing: '📉', stable: '➡️' }[trend] || '📊');
  
  const colorConfig = {
    blue: { color: '#2563eb', bg: '#dbeafe' }, green: { color: '#16a34a', bg: '#dcfce7' },
    purple: { color: '#9333ea', bg: '#f3e8ff' }, orange: { color: '#ea580c', bg: '#ffedd5' },
    indigo: { color: '#4f46e5', bg: '#e0e7ff' }
  };

  return (
    <div className="policy-container fade-in">
      {/* Compliance Overview */}
      <div className="summary-grid">
        {[
          { title: 'Overall Compliance', value: `${complianceMetrics.overall}%`, icon: '📊', color: 'blue' },
          { title: 'NAAC Standards', value: `${complianceMetrics.naac}%`, icon: '🏛️', color: 'green' },
          { title: 'AICTE Guidelines', value: `${complianceMetrics.aicte}%`, icon: '📚', color: 'purple' },
          { title: 'NIRF Framework', value: `${complianceMetrics.nirf}%`, icon: '🏆', color: 'orange' },
          { title: 'Internal Policies', value: `${complianceMetrics.internal}%`, icon: '⚖️', color: 'indigo' }
        ].map((metric, index) => (
          <div key={index} className="summary-card">
            <div className="summary-icon" style={{ backgroundColor: colorConfig[metric.color].bg }}><span>{metric.icon}</span></div>
            <div>
              <p className="summary-title">{metric.title}</p>
              <p className="summary-value" style={{ color: colorConfig[metric.color].color }}>{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card filters-container">
        <h3>Policy Monitoring Dashboard</h3>
        <div className="filter-controls">
          <select className="form-select">
            <option>Compliance Overview</option>
            <option>Policy Violations</option>
          </select>
          <button onClick={generateReport} className="button button--primary">📋 Generate Report</button>
        </div>
      </div>

      <div className="main-grid">
        <div className="card">
          <div className="card-header-row">
            <h3>Policy Violations</h3>
            <span className="badge badge--high">{policyViolations.length} Active</span>
          </div>
          <div className="list-container">
            {policyViolations.map((v) => (
              <div key={v.id} className="violation-item">
                <div className="violation-header">
                  <h4>{v.type}</h4>
                  <div className="violation-tags">
                    <span className={`badge ${getSeverityClass(v.severity)}`}>{v.severity}</span>
                    <span className="trend-icon">{getTrendIcon(v.trend)}</span>
                  </div>
                </div>
                <div className="violation-footer">
                  <p><strong>Action:</strong> {v.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card-header">Compliance Reports</h3>
          <div className="list-container">
            {complianceReports.map((report) => (
              <div key={report.id} className="report-item">
                <h4>{report.title}</h4>
                <div className="report-details">
                  <span className={`badge ${getStatusClass(report.status)}`}>{report.status}</span>
                  <strong>{report.score}% Score</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-header">Real-time Monitoring Alerts</h3>
        <div className="alerts-list">
          {monitoringAlerts.map((alert) => (
            <div key={alert.id} className={`alert-item alert-item--${alert.severity}`}>
              <div className="alert-content">
                <div className="alert-header">
                  <span className={`badge ${getSeverityClass(alert.severity)}`}>{alert.severity}</span>
                  <span>{alert.type}</span>
                  <span className={`badge ${getStatusClass(alert.status)}`}>{alert.status.replace('_', ' ')}</span>
                </div>
                <p>{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tools-grid">
        <div className="card">
          <h3 className="card-header">Risk Assessment</h3>
          <div className="list-container">
            {riskAssessments.map((risk, index) => (
              <div key={index} className="risk-item">
                <span>{risk.risk}</span>
                <span className={`badge ${getSeverityClass(risk.level)}`}>{risk.level}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="card-header">System Health</h3>
          <div className="list-container">
            {systemHealthMetrics.map((metric, index) => (
              <div key={index} className="health-item">
                <span>{metric.metric}</span>
                <div>
                  <strong>{metric.value}</strong>
                  <div className={`health-dot health-dot--${metric.status}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyMonitoring;