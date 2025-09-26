import React, { useState } from 'react';
import './ActivityOverview.css'; 

const ActivityOverview = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  
  const activityData = { totalActivities: 1247, approvedActivities: 1089, pendingActivities: 123, rejectedActivities: 35, totalCredits: 3456, activeStudents: 456, activeFaculty: 23, averageApprovalTime: 2.3 };
  const departmentData = [
    { name: 'Computer Science', students: 156, activities: 423, approved: 387, credits: 1234, avgCredits: 7.9 },
    { name: 'Information Technology', students: 134, activities: 345, approved: 298, credits: 967, avgCredits: 7.2 },
    { name: 'Electronics', students: 98, activities: 267, approved: 241, credits: 723, avgCredits: 7.4 },
    { name: 'Mechanical Engineering', students: 87, activities: 212, approved: 163, credits: 532, avgCredits: 6.1 }
  ];
  const activityTypes = [
    { type: 'MOOC Completion', count: 298, percentage: 23.9, trend: '+12%' },
    { type: 'Industry Internship', count: 234, percentage: 18.8, trend: '+8%' },
    { type: 'Hackathon/Competition', count: 189, percentage: 15.2, trend: '+15%' },
  ];
  const recentActivities = [
    { id: 1, student: 'Alice Johnson', department: 'Computer Science', activity: 'ML Certification', type: 'Certification', status: 'approved', credits: 3, date: '2025-09-18', faculty: 'Dr. Smith' },
    { id: 2, student: 'Bob Wilson', department: 'Info Tech', activity: 'Summer Internship', type: 'Internship', status: 'pending', credits: 4, date: '2025-09-17', faculty: 'Dr. Davis' },
    { id: 3, student: 'Carol Martinez', department: 'Computer Science', activity: 'IEEE Presentation', type: 'Conference', status: 'approved', credits: 3, date: '2025-09-16', faculty: 'Dr. Johnson' }
  ];
  
  
  const getStatusClass = (status) => `status-badge--${status}`;
  const getTrendClass = (trend) => trend.startsWith('+') ? 'trend--positive' : 'trend--negative';
  
  const colorConfig = {
    blue: { color: '#2563eb', bg: '#dbeafe' },
    green: { color: '#16a34a', bg: '#dcfce7' },
    purple: { color: '#9333ea', bg: '#f3e8ff' },
    orange: { color: '#ea580c', bg: '#ffedd5' },
    red: { color: '#dc2626' },
    yellow: { color: '#ca8a04' }
  };

  return (
    <div className="overview-container fade-in">
      {/* Overview Statistics */}
      <div className="summary-grid">
        {[
          { title: 'Total Activities', value: activityData.totalActivities.toLocaleString(), icon: '📊', color: 'blue', subtitle: 'All submissions' },
          { title: 'Approval Rate', value: `${((activityData.approvedActivities / activityData.totalActivities) * 100).toFixed(1)}%`, icon: '✅', color: 'green', subtitle: 'Activities approved' },
          { title: 'Total Credits', value: activityData.totalCredits.toLocaleString(), icon: '🏆', color: 'purple', subtitle: 'Credits awarded' },
          { title: 'Active Users', value: (activityData.activeStudents + activityData.activeFaculty).toLocaleString(), icon: '👥', color: 'orange', subtitle: 'Students & Faculty' }
        ].map((stat, index) => (
          <div key={index} className="summary-card">
            <div className="summary-card-header">
              <div className="summary-icon" style={{ backgroundColor: colorConfig[stat.color].bg }}><span>{stat.icon}</span></div>
              <span className="summary-value" style={{ color: colorConfig[stat.color].color }}>{stat.value}</span>
            </div>
            <div>
              <p className="summary-title">{stat.title}</p>
              <p className="summary-subtitle">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card filters-container">
        <h3>Activity Analytics</h3>
        <div className="filters-controls">
          <select value={selectedTimeframe} onChange={(e) => setSelectedTimeframe(e.target.value)} className="form-select">
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="form-select">
            <option value="all">All Departments</option>
            <option value="cs">Computer Science</option>
          </select>
          <button className="button button--primary">📊 Export Report</button>
        </div>
      </div>

      <div className="main-grid">
        {/* Department Performance */}
        <div className="card">
          <h3 className="card-header">Department Performance</h3>
          <div className="list-container">
            {departmentData.map((dept, index) => (
              <div key={index} className="department-item">
                <div className="department-header">
                  <h4>{dept.name}</h4>
                  <span>{dept.students} students</span>
                </div>
                <div className="department-stats">
                  <div><span>Activities:</span><strong>{dept.activities}</strong></div>
                  <div><span>Approved:</span><strong style={{color: colorConfig.green.color}}>{dept.approved}</strong></div>
                  <div><span>Credits:</span><strong style={{color: colorConfig.purple.color}}>{dept.credits}</strong></div>
                  <div><span>Avg/Student:</span><strong style={{color: colorConfig.blue.color}}>{dept.avgCredits}</strong></div>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fg" style={{ width: `${(dept.approved / dept.activities) * 100}%` }}></div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Types Distribution */}
        <div className="card">
          <h3 className="card-header">Activity Types Distribution</h3>
          <div className="list-container">
            {activityTypes.map((activity, index) => (
              <div key={index} className="activity-type-item">
                <div>
                  <h4>{activity.type}</h4>
                  <p>{activity.count} activities • {activity.percentage}%</p>
                </div>
                <div className={`trend ${getTrendClass(activity.trend)}`}>{activity.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="card">
        <div className="card-header-row">
          <h3>Recent Activity Submissions</h3>
          <button className="link-button">View All →</button>
        </div>
        <div className="table-wrapper">
          <table className="overview-table">
            <thead>
              <tr><th>Student</th><th>Activity</th><th>Department</th><th>Status</th><th>Credits</th><th>Date</th></tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr key={activity.id}>
                  <td data-label="Student">{activity.student}</td>
                  <td data-label="Activity">
                    <div className="activity-title">{activity.activity}</div>
                    <div className="activity-type">{activity.type}</div>
                  </td>
                  <td data-label="Department">{activity.department}</td>
                  <td data-label="Status"><span className={`status-badge ${getStatusClass(activity.status)}`}>{activity.status}</span></td>
                  <td data-label="Credits">{activity.credits}</td>
                  <td data-label="Date">{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="metrics-grid">
        <div className="card metric-card">
          <h3 className="card-header">Approval Efficiency</h3>
          <div className="metric-list">
            <div className="metric-row"><span>Avg Review Time:</span><strong style={{color: colorConfig.blue.color}}>{activityData.averageApprovalTime} days</strong></div>
            <div className="metric-row"><span>Pending Reviews:</span><strong style={{color: colorConfig.yellow.color}}>{activityData.pendingActivities}</strong></div>
            <div className="metric-row"><span>Rejection Rate:</span><strong style={{color: colorConfig.red.color}}>{((activityData.rejectedActivities / activityData.totalActivities) * 100).toFixed(1)}%</strong></div>
          </div>
        </div>
        <div className="card metric-card">
          <h3 className="card-header">Student Engagement</h3>
          <div className="metric-list">
            <div className="metric-row"><span>Active Students:</span><strong style={{color: colorConfig.blue.color}}>{activityData.activeStudents}</strong></div>
            <div className="metric-row"><span>Avg Activities/Student:</span><strong style={{color: colorConfig.green.color}}>2.7</strong></div>
            <div className="metric-row"><span>Engagement Rate:</span><strong style={{color: colorConfig.orange.color}}>78%</strong></div>
          </div>
        </div>
        <div className="card metric-card">
          <h3 className="card-header">Faculty Participation</h3>
          <div className="metric-list">
            <div className="metric-row"><span>Active Faculty:</span><strong style={{color: colorConfig.blue.color}}>{activityData.activeFaculty}</strong></div>
            <div className="metric-row"><span>Avg Reviews/Faculty:</span><strong style={{color: colorConfig.green.color}}>47</strong></div>
            <div className="metric-row"><span>Most Active Reviewer:</span><strong style={{color: colorConfig.purple.color}}>Dr. Smith</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityOverview;