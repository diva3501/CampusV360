import React, { useState } from 'react';
import './DigitalPortfolio.css'; 

const DigitalPortfolio = () => {
  const [portfolioGenerated, setPortfolioGenerated] = useState(false);

  
  const studentData = { name: 'John Doe', rollNumber: 'CS21B001', branch: 'Computer Science', year: 'Final Year', gpa: '8.7' };
  const approvedActivities = [
    { title: 'Machine Learning Certification', type: 'Certification', date: '2025-01-15', credits: 3, institution: 'Coursera' },
    { title: 'Industry Internship', type: 'Internship', date: '2025-06-20', credits: 4, institution: 'Google Inc.' },
    { title: 'Volunteer Work', type: 'Volunteer', date: '2024-11-12', credits: 2, institution: 'Local NGO' }
  ];
  const academicRecord = [
    { semester: 'Semester 1', gpa: 8.5 }, { semester: 'Semester 2', gpa: 8.7 },
    { semester: 'Semester 3', gpa: 8.9 }, { semester: 'Semester 4', gpa: 8.8 },
    { semester: 'Semester 5', gpa: 8.6 }
  ];
  const skills = ['JavaScript', 'React.js', 'Node.js', 'Python', 'Machine Learning', 'SQL', 'Git', 'AWS'];

  const generatePortfolio = () => {
    setPortfolioGenerated(true);
    setTimeout(() => alert('Portfolio generated!'), 1000);
  };

  const downloadPortfolio = () => {
    const portfolioContent = `...`; 
    
    alert('Downloading portfolio as a text file...');
  };

  if (portfolioGenerated) {
    return (
      <div className="portfolio-container fade-in">
        <div className="card">
          <div className="success-header">
            <div className="success-icon"><span>✅</span></div>
            <h2>Portfolio Generated Successfully!</h2>
            <p>Your digital academic portfolio is ready for download and sharing.</p>
          </div>

          <div className="info-grid">
            <div className="info-box">
              <h3>Portfolio Contents</h3>
              <ul>
                <li>• Personal & Academic Information</li>
                <li>• Semester-wise Performance Record</li>
                <li>• Approved Extracurricular Activities</li>
                <li>• Skills & Competencies</li>
              </ul>
            </div>
            
            <div className="info-box">
              <h3>Portfolio Statistics</h3>
              <div className="stats-container">
                <div className="stats-row"><span>Total Activities</span><strong>{approvedActivities.length}</strong></div>
                <div className="stats-row"><span>Credits Earned</span><strong>{approvedActivities.reduce((sum, act) => sum + act.credits, 0)}</strong></div>
                <div className="stats-row"><span>Current CGPA</span><strong>{studentData.gpa}</strong></div>
                <div className="stats-row"><span>Skills Listed</span><strong>{skills.length}</strong></div>
              </div>
            </div>
          </div>

          <div className="actions-container">
            <button onClick={downloadPortfolio} className="button button--blue">📄 Download Portfolio</button>
            <button onClick={() => alert('Share link copied!')} className="button button--green">🔗 Share Portfolio</button>
            <button onClick={() => setPortfolioGenerated(false)} className="button button--secondary">🔄 Regenerate</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-container fade-in">
      <div className="card">
        <div className="generator-header">
          <h2>Digital Portfolio Generator</h2>
          <p>Create a comprehensive digital portfolio showcasing your academic journey.</p>
        </div>

        <div className="portfolio-preview-box">
          <h3>Portfolio Preview</h3>
          <div className="student-header-preview">
            <div className="student-icon"><span>👨‍🎓</span></div>
            <div>
              <h2>{studentData.name}</h2>
              <p>{studentData.rollNumber} | {studentData.branch}</p>
              <p>Current CGPA: {studentData.gpa}</p>
            </div>
          </div>

          <div className="preview-grid">
            <div>
              <h4>📊 Academic Performance</h4>
              <div className="list-container">
                {academicRecord.map((record, index) => (
                  <div key={index} className="academic-record-item">
                    <span>{record.semester}</span>
                    <strong>GPA: {record.gpa}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4>🏆 Approved Activities</h4>
              <div className="list-container">
                {approvedActivities.map((activity, index) => (
                  <div key={index} className="activity-item-preview">
                    <h5>{activity.title}</h5>
                    <p>{activity.type} | {activity.credits} credits</p>
                    <small>{activity.institution}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="skills-preview-section">
            <h4>💻 Technical Skills</h4>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="generate-button-container">
          <button onClick={generatePortfolio} className="button generate-button">
            🚀 Generate Digital Portfolio
          </button>
        </div>
      </div>

      <div className="options-grid">
        {[
          { title: 'PDF Portfolio', description: 'Professional PDF for formal submissions.', icon: '📄', color: 'red' },
          { title: 'Web Portfolio', description: 'Interactive web page for online sharing.', icon: '🌐', color: 'blue' },
          { title: 'LinkedIn Import', description: 'Format optimized for LinkedIn profiles.', icon: '💼', color: 'indigo' }
        ].map((option, index) => (
          <div key={index} className="option-card">
            <div className={`option-icon option-icon--${option.color}`}>
              <span>{option.icon}</span>
            </div>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalPortfolio;