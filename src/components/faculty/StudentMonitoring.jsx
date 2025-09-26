import React, { useState } from 'react';
import './StudentMonitoring.css'; 

const StudentMonitoring = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students] = useState([
    { id: 1, name: 'Aarav Sharma', rollNumber: 'CS21B045', semester: 5, cgpa: 8.7, totalCredits: 116, activitiesSubmitted: 8, activitiesApproved: 6, activitiesPending: 2, attendancePercentage: 94, performanceGrade: 'A+', riskLevel: 'low' },
    { id: 2, name: 'Priya Mehta', rollNumber: 'EC21B028', semester: 5, cgpa: 7.8, totalCredits: 112, activitiesSubmitted: 5, activitiesApproved: 3, activitiesPending: 2, attendancePercentage: 78, performanceGrade: 'B', riskLevel: 'medium' },
    { id: 3, name: 'Rohan Desai', rollNumber: 'CS21B067', semester: 5, cgpa: 9.2, totalCredits: 120, activitiesSubmitted: 12, activitiesApproved: 10, activitiesPending: 2, attendancePercentage: 96, performanceGrade: 'A+', riskLevel: 'low' },
    { id: 4, name: 'Sneha Gupta', rollNumber: 'IT21B089', semester: 5, cgpa: 6.9, totalCredits: 108, activitiesSubmitted: 3, activitiesApproved: 1, activitiesPending: 2, attendancePercentage: 65, performanceGrade: 'C', riskLevel: 'high' }
  ]);
  const [viewMode, setViewMode] = useState('grid');
  const studentActivities = { 
    1: [{ title: 'ML Certification', type: 'MOOC', status: 'approved', credits: 3, date: '2025-09-15' }], 
    2: [{ title: 'Jio Internship', type: 'Internship', status: 'approved', credits: 4, date: '2025-09-10' }], 
    3: [{ title: 'IEEE Conference Paper', type: 'Conference', status: 'approved', credits: 3, date: '2025-09-08' }], 
    4: [{ title: 'Web Dev Workshop', type: 'Workshop', status: 'pending', credits: 1, date: '2025-09-02' }]
  };

  const getRiskClass = (risk) => `badge--${risk}`;
  const getGradeClass = (grade) => `grade--${grade.replace('+', 'plus').toLowerCase()}`;
  const getAttendanceClass = (p) => (p >= 90 ? 'attendance--high' : p >= 75 ? 'attendance--medium' : 'attendance--low');
  const getActivityStatusClass = (status) => `badge--${status}`;

  const colorConfig = {
    blue: { color: '#2563eb', bg: '#dbeafe' }, green: { color: '#16a34a', bg: '#dcfce7' },
    red: { color: '#dc2626', bg: '#fee2e2' }, purple: { color: '#9333ea', bg: '#f3e8ff' },
    orange: { color: '#ea580c', bg: '#ffedd5' }
  };
  
  return (
    <div className="monitoring-container fade-in">
      {/* Statistics */}
      <div className="summary-grid">
        {[
          { title: 'Total Students', value: students.length, icon: '👥', color: 'blue' },
          { title: 'High Performers', value: students.filter(s => ['A+', 'A'].includes(s.performanceGrade)).length, icon: '⭐', color: 'green' },
          { title: 'At Risk Students', value: students.filter(s => s.riskLevel === 'high').length, icon: '⚠️', color: 'red' },
          { title: 'Average CGPA', value: (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(1), icon: '📊', color: 'purple' },
          { title: 'Total Activities', value: students.reduce((sum, s) => sum + s.activitiesSubmitted, 0), icon: '🏆', color: 'orange' }
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
      
      {/* Controls */}
      <div className="card controls-container">
        <h3>Student Monitoring Dashboard</h3>
        <div className="controls-actions">
          <select className="form-select"><option>All Students</option><option>High Risk</option></select>
          <div className="view-toggle">
            <button onClick={() => setViewMode('grid')} className={`toggle-button ${viewMode === 'grid' ? 'active' : ''}`}>Grid</button>
            <button onClick={() => setViewMode('table')} className={`toggle-button ${viewMode === 'table' ? 'active' : ''}`}>Table</button>
          </div>
        </div>
      </div>
      
      {/* Student Data */}
      {viewMode === 'grid' ? (
        <div className="student-grid">
          {students.map((s) => (
            <div key={s.id} className="student-card">
              <div className="student-card-header">
                <div><h4>{s.name}</h4><p>{s.rollNumber}</p></div>
                <div><span className={`badge ${getRiskClass(s.riskLevel)}`}>{s.riskLevel} risk</span></div>
              </div>
              <div className="student-card-body">
                <div className="metric-row"><span>CGPA</span><strong className={getGradeClass(s.performanceGrade)}>{s.cgpa} ({s.performanceGrade})</strong></div>
                <div className="metric-row"><span>Attendance</span><strong className={getAttendanceClass(s.attendancePercentage)}>{s.attendancePercentage}%</strong></div>
                <div className="metric-row"><span>Activities</span><strong>{s.activitiesApproved} / {s.activitiesSubmitted}</strong></div>
                <div className="metric-row"><span>Total Credits</span><strong>{s.totalCredits}</strong></div>
              </div>
              <div className="student-card-footer">
                <button onClick={() => setSelectedStudent(s)} className="button button--primary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table className="monitoring-table">
              <thead><tr><th>Student</th><th>CGPA</th><th>Attendance</th><th>Activities</th><th>Risk Level</th><th>Grade</th><th>Actions</th></tr></thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td data-label="Student"><div><div className="user-name">{s.name}</div><div className="user-role">{s.rollNumber}</div></div></td>
                    <td data-label="CGPA">{s.cgpa}</td>
                    <td data-label="Attendance"><span className={`attendance-text ${getAttendanceClass(s.attendancePercentage)}`}>{s.attendancePercentage}%</span></td>
                    <td data-label="Activities">{s.activitiesApproved} / {s.activitiesSubmitted}</td>
                    <td data-label="Risk"><span className={`badge ${getRiskClass(s.riskLevel)}`}>{s.riskLevel}</span></td>
                    <td data-label="Grade"><span className={`grade-text ${getGradeClass(s.performanceGrade)}`}>{s.performanceGrade}</span></td>
                    <td data-label="Actions"><button onClick={() => setSelectedStudent(s)} className="link-button">View Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-profile-header">
              <div className="modal-profile-avatar">
                <span>{selectedStudent.name.charAt(0)}</span>
              </div>
              <div className="modal-profile-info">
                <h3>{selectedStudent.name}</h3>
                <p>{selectedStudent.rollNumber} • Semester {selectedStudent.semester}</p>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="close-button">&times;</button>
            </div>

            <div className="modal-body">
              <div className="modal-grid">
                <div className="info-group">
                  <h4>📊 Academic Standing</h4>
                  <div className="info-group-content">
                    <div className="metric-row"><span>Current CGPA</span><strong>{selectedStudent.cgpa} <span className={`grade-text ${getGradeClass(selectedStudent.performanceGrade)}`}>({selectedStudent.performanceGrade})</span></strong></div>
                    <div className="metric-row"><span>Total Credits Earned</span><strong>{selectedStudent.totalCredits}</strong></div>
                    <div className="metric-row"><span>Attendance</span>
                      <div className="progress-bar-container">
                        <div className={`progress-bar ${getAttendanceClass(selectedStudent.attendancePercentage)}`} style={{ width: `${selectedStudent.attendancePercentage}%` }}>
                          {selectedStudent.attendancePercentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-group">
                  <h4>🏆 Activity Engagement</h4>
                  <div className="info-group-content">
                    <div className="metric-row"><span>Total Submitted</span><strong>{selectedStudent.activitiesSubmitted}</strong></div>
                    <div className="metric-row"><span>Approved Activities</span><strong className="text-green">{selectedStudent.activitiesApproved}</strong></div>
                    <div className="metric-row"><span>Pending Review</span><strong className="text-yellow">{selectedStudent.activitiesPending}</strong></div>
                  </div>
                </div>
              </div>
              <div className="info-group">
                <h4>📋 Recent Submissions</h4>
                <div className="info-group-content activity-list-container">
                  {(studentActivities[selectedStudent.id] || []).length > 0 ? 
                    (studentActivities[selectedStudent.id] || []).map((activity, i) => (
                      <div key={i} className="activity-item">
                        <div>
                          <p className="activity-title">{activity.title} <span className="activity-type">({activity.type})</span></p>
                          <small className="activity-date">Date: {activity.date}</small>
                        </div>
                        <div className="activity-details">
                          <span className={`badge ${getActivityStatusClass(activity.status)}`}>{activity.status}</span>
                          <strong>{activity.credits} Credits</strong>
                        </div>
                      </div>
                    )) : <p className="no-activity-text">No activities submitted yet.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMonitoring;