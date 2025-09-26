import React, { useState } from 'react';
import './StudentProfile.css'; // Import the new CSS file

// Helper component for SVG Icons
const Icon = ({ path, className = '' }) => (
  <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d={path} />
  </svg>
);

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    personalInfo: { firstName: 'Adithya', lastName: 'Sharma', email: 'adhithyasharma@university.edu', phone: '+91 9876543210', dateOfBirth: '2003-05-15', address: '123 University Street, Chennai, TN' },
    academicInfo: { rollNumber: 'CS21B001', program: 'Bachelor of Technology', branch: 'Computer Science', batch: '2021-2025', currentSemester: '7', cgpa: '8.7' },
    interests: ['Machine Learning', 'Web Development', 'Data Science', 'Cloud Computing', 'UI/UX Design'],
    achievements: ['Dean\'s List - Semester 3, 5', 'Best Project Award - Semester 4', 'Hackathon Winner - TechFest \'24', 'Published Research Paper in IEEE'],
    socialProfiles: { linkedin: 'https://linkedin.com/in/Adithyasharma2005', github: 'https://github.com/Adithyasharma2005', portfolio: 'https://adhi2005.dev' }
  });

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleArrayChange = (section, value) => {
    const splitter = section === 'achievements' ? '\n' : ',';
    const newArray = value.split(splitter).map(s => s.trim()).filter(Boolean);
    setProfileData(prev => ({ ...prev, [section]: newArray }));
  };

  const saveProfile = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const socialIcons = {
    linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    github: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    portfolio: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
  };
  const cardIcons = {
    personal: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    academic: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
    interests: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z",
    achievements: "M12 6l1.45 4.47L18 11l-3.24 2.83L16.09 18 12 15.45 7.91 18l1.38-4.17L6 11l4.55-.53L12 6z",
  }

  return (
    <div className="profile-container fade-in">
      {/* --- Sidebar --- */}
      <aside className="profile-sidebar">
        <div className="profile-avatar-card">
          <div className="profile-avatar">
            <span>JD</span>
          </div>
          <h1 className="profile-name">{profileData.personalInfo.firstName} {profileData.personalInfo.lastName}</h1>
          <p className="profile-role">Student</p>
          <div className="profile-tags">
            <span className="profile-tag status-active">Active</span>
            <span className="profile-tag semester-info">Semester {profileData.academicInfo.currentSemester}</span>
          </div>
          <button onClick={() => setIsEditing(!isEditing)} className={`button edit-button ${isEditing ? 'edit-button--cancel' : ''}`}>
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        <div className="card">
          <h3 className="card-header">
            <Icon path="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            Contact & Social
          </h3>
          <div className="fields-container">
            {isEditing ? (
              <>
                <div className="field-item">
                  <label>Email</label>
                  <input type="email" value={profileData.personalInfo.email} onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)} className="form-input" />
                </div>
                <div className="field-item">
                  <label>Phone</label>
                  <input type="tel" value={profileData.personalInfo.phone} onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)} className="form-input" />
                </div>
              </>
            ) : (
              <>
                 <div className="field-item"><label>Email</label><p className="field-value">{profileData.personalInfo.email}</p></div>
                 <div className="field-item"><label>Phone</label><p className="field-value">{profileData.personalInfo.phone}</p></div>
              </>
            )}
            
            {Object.entries(profileData.socialProfiles).map(([key, value]) => (
              <div key={key} className="field-item">
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                {isEditing ? (
                  <input type="url" value={value} onChange={(e) => handleInputChange('socialProfiles', key, e.target.value)} className="form-input" />
                ) : (
                  <a href={value || '#'} target="_blank" rel="noopener noreferrer" className="social-link">
                    <Icon path={socialIcons[key]} />
                    <span>{value ? 'View Profile' : 'Not Provided'}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="profile-main">
        <div className="profile-grid">
          <div className="card">
             <h3 className="card-header"><Icon path={cardIcons.personal} />Personal Information</h3>
            <div className="fields-container">
              {Object.entries(profileData.personalInfo).map(([key, value]) => (
                 !['email', 'phone'].includes(key) && (
                    <div key={key} className="field-item">
                      <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                      {isEditing ? (
                        <input type={key === 'dateOfBirth' ? 'date' : 'text'} value={value} onChange={(e) => handleInputChange('personalInfo', key, e.target.value)} className="form-input" />
                      ) : (
                        <p className="field-value">{value}</p>
                      )}
                    </div>
                 )
              ))}
            </div>
          </div>
          <div className="card">
             <h3 className="card-header"><Icon path={cardIcons.academic} />Academic Information</h3>
            <div className="fields-container">
              {Object.entries(profileData.academicInfo).map(([key, value]) => (
                <div key={key} className="field-item">
                  <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                  <p className="field-value field-value--readonly">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card">
           <h3 className="card-header"><Icon path={cardIcons.interests} />Interests & Skills</h3>
          {isEditing ? (
            <textarea value={profileData.interests.join(', ')} onChange={(e) => handleArrayChange('interests', e.target.value)} className="form-input" rows={3} placeholder="Comma-separated skills..."/>
          ) : (
            <div className="tags-container">
              {profileData.interests.map((interest, i) => <span key={i} className="interest-tag">{interest}</span>)}
            </div>
          )}
        </div>

        <div className="card">
           <h3 className="card-header"><Icon path={cardIcons.achievements} />Achievements & Awards</h3>
          {isEditing ? (
            <textarea value={profileData.achievements.join('\n')} onChange={(e) => handleArrayChange('achievements', e.target.value)} className="form-input" rows={4} placeholder="One achievement per line..."/>
          ) : (
            <ul className="achievement-list">
              {profileData.achievements.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          )}
        </div>
        
        {isEditing && (
          <div className="save-button-container">
            <button onClick={saveProfile} className="button save-button">Save Changes</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentProfile;