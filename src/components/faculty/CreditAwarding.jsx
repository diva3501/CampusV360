import React, { useState } from 'react';
import './CreditAwarding.css'; 

const CreditAwarding = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [reason, setReason] = useState('');
  const [activityType, setActivityType] = useState('');

  
  const [students] = useState([
    { id: 1, name: 'Alice Johnson (CS21B045)', currentCredits: 116 },
    { id: 2, name: 'Bob Smith (CS21B028)', currentCredits: 112 },
    { id: 3, name: 'Carol Davis (CS21B067)', currentCredits: 120 },
  ]);
  const [recentAwards] = useState([
    { id: 1, studentName: 'Alice Johnson', rollNumber: 'CS21B045', credits: 3, reason: 'ML Certification', date: '2025-09-18', faculty: 'Dr. Smith' },
    { id: 2, studentName: 'Carol Davis', rollNumber: 'CS21B067', credits: 2, reason: 'Hackathon performance', date: '2025-09-15', faculty: 'Dr. Smith' },
  ]);
  const activityTypes = ['MOOC Completion', 'Industry Internship', 'Research Publication', 'Hackathon/Competition'];
  const presets = [
    { title: 'MOOC Completion', credits: 2, description: 'Standard course' },
    { title: 'Hackathon Winner', credits: 3, description: 'First place' },
    { title: 'Research Publication', credits: 4, description: 'Peer-reviewed journal' },
    { title: 'Industry Internship', credits: 3, description: 'Completed internship' }
  ];

  const handleAwardCredits = (e) => {
    e.preventDefault();
    if (!selectedStudent || !creditAmount || !reason) {
      alert('Please fill in all fields');
      return;
    }
    const student = students.find(s => s.id === parseInt(selectedStudent));
    alert(`Awarded ${creditAmount} credits to ${student.name}`);
    
    setSelectedStudent(''); setCreditAmount(''); setReason(''); setActivityType('');
  };

  const colorConfig = {
    green: { color: '#16a34a', bg: '#dcfce7' }, blue: { color: '#2563eb', bg: '#dbeafe' },
    purple: { color: '#9333ea', bg: '#f3e8ff' }, orange: { color: '#ea580c', bg: '#ffedd5' }
  };

  return (
    <div className="credit-awarding-container fade-in">
      {/* Statistics */}
      <div className="summary-grid">
        {[
          { title: 'Credits Awarded Today', value: '15', icon: '🏆', color: 'green' },
          { title: 'This Week', value: '47', icon: '📊', color: 'blue' },
          { title: 'This Month', value: '156', icon: '⭐', color: 'purple' },
          { title: 'Average Award', value: '2.8', icon: '📈', color: 'orange' }
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

      <div className="main-grid">
        {/* Credit Awarding Form */}
        <div className="card">
          <h3 className="card-header">Award Academic Credits</h3>
          <form onSubmit={handleAwardCredits} className="awarding-form">
            <div>
              <label className="form-label">Select Student <span className="required">*</span></label>
              <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="form-control" required>
                <option value="">Choose a student...</option>
                {students.map((s) => <option key={s.id} value={s.id}>{s.name} - {s.currentCredits} credits</option>)}
              </select>
            </div>
            <div className="form-row">
              <div>
                <label className="form-label">Activity Type</label>
                <select value={activityType} onChange={(e) => setActivityType(e.target.value)} className="form-control">
                  <option value="">Select type...</option>
                  {activityTypes.map((type, i) => <option key={i} value={type}>{type}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Credits to Award <span className="required">*</span></label>
                <input type="number" min="0" max="10" step="0.5" value={creditAmount} onChange={(e) => setCreditAmount(e.target.value)} className="form-control" placeholder="0.5 - 10" required />
              </div>
            </div>
            <div>
              <label className="form-label">Reason for Award <span className="required">*</span></label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className="form-control" placeholder="Describe the achievement..." required />
            </div>
            <div className="guideline-box">
              <h4>📝 Credit Guidelines</h4>
              <ul><li>MOOC/Certifications: 1-3</li><li>Internships/Research: 2-5</li><li>Competitions: 1-3</li></ul>
            </div>
            <div className="form-actions">
              <button type="submit" className="button button--primary">🏆 Award Credits</button>
              <button type="button" onClick={() => { setSelectedStudent(''); setCreditAmount(''); setReason(''); setActivityType(''); }} className="button button--secondary">Clear</button>
            </div>
          </form>
        </div>

        {/* Recent Awards */}
        <div className="card">
          <div className="card-header-row">
            <h3>Recent Credit Awards</h3>
            <button onClick={() => alert('Bulk award feature.')} className="button button--blue">Bulk Award</button>
          </div>
          <div className="list-container">
            {recentAwards.map((award) => (
              <div key={award.id} className="award-item">
                <div className="award-header">
                  <div><h4>{award.studentName}</h4><p>{award.rollNumber}</p></div>
                  <div className="award-amount"><span>+{award.credits}</span><p>credits</p></div>
                </div>
                <p className="award-reason">{award.reason}</p>
                <div className="award-footer"><span>By {award.faculty}</span><span>{award.date}</span></div>
              </div>
            ))}
            <div className="view-all-container"><button className="link-button">View All Awards History →</button></div>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="card">
        <h3 className="card-header">Quick Award Presets</h3>
        <div className="presets-grid">
          {presets.map((preset, i) => (
            <button key={i} onClick={() => { setCreditAmount(preset.credits.toString()); setReason(preset.description); setActivityType(preset.title); }} className="preset-button">
              <div className="preset-icon">⚡</div>
              <h4>{preset.title}</h4>
              <p>{preset.description}</p>
              <span className="preset-badge">{preset.credits} credits</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditAwarding;