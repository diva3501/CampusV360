import React, { useState } from 'react';
import './StudentProfile.css'; // Import the new CSS file

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    personalInfo: { firstName: 'John', lastName: 'Doe', email: 'john.doe@university.edu', phone: '+91 9876543210', dateOfBirth: '2003-05-15', address: '123 University Street, Chennai, TN' },
    academicInfo: { rollNumber: 'CS21B001', program: 'Bachelor of Technology', branch: 'Computer Science', batch: '2021-2025', currentSemester: '7', cgpa: '8.7' },
    interests: ['Machine Learning', 'Web Development', 'Data Science', 'Cloud Computing'],
    achievements: ['Dean\'s List - Sem 3', 'Best Project Award - Sem 4', 'Hackathon Winner - TechFest'],
    socialProfiles: { linkedin: 'https://linkedin.com/in/johndoe', github: 'https://github.com/johndoe', portfolio: 'https://johndoe.dev' }
  });

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleArrayChange = (section, value) => {
    const splitter = section === 'achievements' ? '\n' : ', ';
    const newArray = value.split(splitter).map(s => s.trim()).filter(Boolean);
    setProfileData(prev => ({ ...prev, [section]: newArray }));
  };

  const saveProfile = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-container fade-in">
      {/* Profile Header */}
      <div className="profile-header-card">
        <div className="profile-banner">
          <div className="profile-icon"><span>👨‍🎓</span></div>
          <div className="profile-banner-text">
            <h1>{profileData.personalInfo.firstName} {profileData.personalInfo.lastName}</h1>
            <p>{profileData.academicInfo.rollNumber}</p>
            <p>{profileData.academicInfo.branch}</p>
          </div>
        </div>
        <div className="profile-footer">
          <div className="tags-container">
            <span className="profile-tag profile-tag--status">Active Student</span>
            <span className="profile-tag profile-tag--semester">Semester {profileData.academicInfo.currentSemester}</span>
          </div>
          <button onClick={() => setIsEditing(!isEditing)} className={`button ${isEditing ? 'button--cancel' : 'button--edit'}`}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="profile-grid">
        {/* Personal & Academic Info */}
        <div className="card">
          <h3 className="card-header">Personal Information</h3>
          <div className="fields-container">
            {Object.entries(profileData.personalInfo).map(([key, value]) => (
              <div key={key} className="field-item">
                <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                {isEditing ? (
                  <input type="text" value={value} onChange={(e) => handleInputChange('personalInfo', key, e.target.value)} className="form-input" />
                ) : (
                  <p className="field-value">{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="card-header">Academic Information</h3>
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
      
      {/* Interests, Achievements, Social */}
      <div className="card">
        <h3 className="card-header">Interests & Skills</h3>
        {isEditing ? (
          <textarea value={profileData.interests.join(', ')} onChange={(e) => handleArrayChange('interests', e.target.value)} className="form-input" rows={3} placeholder="Comma-separated skills..."/>
        ) : (
          <div className="tags-container">
            {profileData.interests.map((interest, i) => <span key={i} className="interest-tag">{interest}</span>)}
          </div>
        )}
      </div>
      <div className="card">
        <h3 className="card-header">Achievements & Awards</h3>
        {isEditing ? (
          <textarea value={profileData.achievements.join('\n')} onChange={(e) => handleArrayChange('achievements', e.target.value)} className="form-input" rows={4} placeholder="One achievement per line..."/>
        ) : (
          <ul className="achievement-list">
            {profileData.achievements.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )}
      </div>
      <div className="card">
        <h3 className="card-header">Social Profiles</h3>
        <div className="social-grid">
          {Object.entries(profileData.socialProfiles).map(([key, value]) => (
            <div key={key} className="field-item">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              {isEditing ? (
                <input type="url" value={value} onChange={(e) => handleInputChange('socialProfiles', key, e.target.value)} className="form-input" />
              ) : (
                <a href={value} target="_blank" rel="noopener noreferrer" className={`social-link social-link--${key}`}>{value || 'Not provided'}</a>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {isEditing && (
        <div className="save-button-container">
          <button onClick={saveProfile} className="button button--save">Save Profile Changes</button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;