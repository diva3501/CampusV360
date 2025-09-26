import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './NavBar.css'; 

const NavBar = ({ title, userRole, onBackClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); 

  
  const getRoleTheme = (role) => {
    switch (role.toLowerCase()) {
      case 'student':
        return {
          gradient: 'linear-gradient(to right, #3b82f6, #2563eb)',
          accent: '#3b82f6',
        };
      case 'faculty':
        return {
          gradient: 'linear-gradient(to right, #22c55e, #16a34a)',
          accent: '#22c55e',
        };
      case 'administrator':
        return {
          gradient: 'linear-gradient(to right, #a855f7, #9333ea)',
          accent: '#a855f7',
        };
      default:
        return {
          gradient: 'linear-gradient(to right, #6b7280, #4b5563)',
          accent: '#6b7280',
        };
    }
  };

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case 'student': return '🎓';
      case 'faculty': return '👨‍🏫';
      case 'administrator': return '⚙️';
      default: return '👤';
    }
  };

  const roleTheme = getRoleTheme(userRole);

  return (
    <nav className="navbar" style={{ '--accent-color': roleTheme.accent }}>
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-title-group">
           
            <div>
              <h1 className="navbar-brand">CampusV360</h1>
              <p className="navbar-page-title">{title}</p>
            </div>
          </div>
        </div>
        
        <div className="navbar-right">
          <button className="icon-button notification-button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="notification-badge">3</span>
          </button>

          <button className="icon-button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
          
          <div className="user-profile-wrapper">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="user-profile">
              <div className="user-profile-icon" style={{ background: roleTheme.gradient }}>
                <span>{getRoleIcon(userRole)}</span>
              </div>
              <div className="user-profile-text">
                <p className="user-welcome">Aditya Sharma</p>
                <p className="user-role">{userRole}</p>
              </div>
              <svg className={`dropdown-caret ${isProfileOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            {isProfileOpen && (
              <div className="profile-dropdown">
                <button onClick={() => { navigate('/profile'); setIsProfileOpen(false); }} className="dropdown-item">👤 My Profile</button>
                <button onClick={() => { navigate('/settings'); setIsProfileOpen(false); }} className="dropdown-item">⚙️ Settings</button>
                <div className="dropdown-divider"></div>
                <button onClick={() => navigate('/')} className="dropdown-item dropdown-item--logout">🚪 Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;