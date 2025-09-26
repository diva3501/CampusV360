import React from 'react';
import './AcademicProgress.css'; 

const AcademicProgress = () => {
  const semesterData = [
    { semester: 'Semester 1', gpa: 8.5, credits: 24, status: 'completed' },
    { semester: 'Semester 2', gpa: 8.7, credits: 24, status: 'completed' },
    { semester: 'Semester 3', gpa: 8.9, credits: 24, status: 'completed' },
    { semester: 'Semester 4', gpa: 8.8, credits: 24, status: 'completed' },
    { semester: 'Semester 5', gpa: 8.6, credits: 20, status: 'current' },
    { semester: 'Semester 6', gpa: 0, credits: 0, status: 'upcoming' }
  ];

  const achievements = [
    { title: 'Dean\'s List', semester: 'Semester 3', date: '2024-01-15' },
    { title: 'Best Project Award', semester: 'Semester 4', date: '2024-05-20' },
    { title: 'Academic Excellence', semester: 'Semester 2', date: '2023-12-10' }
  ];

  const attendanceData = [
    { subject: 'Computer Networks', attended: 45, total: 50, percentage: 90 },
    { subject: 'Database Systems', attended: 48, total: 50, percentage: 96 },
    { subject: 'Software Engineering', attended: 42, total: 50, percentage: 84 },
    { subject: 'Machine Learning', attended: 47, total: 50, percentage: 94 },
    { subject: 'Web Development', attended: 49, total: 50, percentage: 98 }
  ];

  
  const summaryColors = {
    blue: '#2563eb',
    green: '#16a34a',
    purple: '#9333ea',
    orange: '#ea580c',
  };

  
  const getAttendanceClass = (percentage) => {
    if (percentage >= 90) return 'attendance-high';
    if (percentage >= 75) return 'attendance-medium';
    return 'attendance-low';
  };

  return (
    <div className="progress-container fade-in">
      {/* Summary Cards */}
      <div className="grid-container four-cols">
        {[
          { title: 'Overall GPA', value: '8.7', subtitle: 'Current CGPA', color: 'blue' },
          { title: 'Credits Earned', value: '116', subtitle: 'Out of 144', color: 'green' },
          { title: 'Overall Attendance', value: '92%', subtitle: 'This Semester', color: 'purple' },
          { title: 'Achievements', value: '3', subtitle: 'Awards Received', color: 'orange' }
        ].map((card, index) => (
          <div key={index} className="summary-card">
            <p className="card-title">{card.title}</p>
            <p className="card-value" style={{ color: summaryColors[card.color] }}>{card.value}</p>
            <p className="card-subtitle">{card.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid-container two-cols">
        {/* Semester Progress */}
        <div className="card">
          <h3 className="card-header">Semester Progress</h3>
          <div className="list-container">
            {semesterData.map((semester, index) => (
              <div key={index} className={`semester-item semester-item--${semester.status}`}>
                <div>
                  <h4 className="item-title">{semester.semester}</h4>
                  <p className="item-subtitle">
                    {semester.status === 'upcoming' ? 'Upcoming' : `GPA: ${semester.gpa} | Credits: ${semester.credits}`}
                  </p>
                </div>
                <span className={`status-badge status-badge--${semester.status}`}>
                  {semester.status.charAt(0).toUpperCase() + semester.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="card">
          <h3 className="card-header">Current Semester Attendance</h3>
          <div className="list-container">
            {attendanceData.map((subject, index) => {
              const attendanceClass = getAttendanceClass(subject.percentage);
              return (
                <div key={index} className="attendance-item">
                  <div className="attendance-header">
                    <h4 className="item-title">{subject.subject}</h4>
                    <span className={`attendance-percentage ${attendanceClass}`}>
                      {subject.percentage}%
                    </span>
                  </div>
                  <p className="item-subtitle">{subject.attended}/{subject.total} classes attended</p>
                  <div className="progress-bar-bg">
                    <div
                      className={`progress-bar-fg ${attendanceClass}`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h3 className="card-header">Academic Achievements</h3>
        <div className="grid-container three-cols">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">
                <span>🏆</span>
              </div>
              <h4 className="achievement-title">{achievement.title}</h4>
              <p className="achievement-semester">{achievement.semester}</p>
              <p className="achievement-date">{achievement.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicProgress;