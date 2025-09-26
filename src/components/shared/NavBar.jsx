import React from 'react';
import './NavBar.css'; // Import the new CSS file

const NavBar = ({ title, userRole, onBackClick }) => {
  // This function now returns a style object for inline styling
  const getRoleStyle = (role) => {
    switch (role.toLowerCase()) {
      case 'student':
        return { background: 'linear-gradient(to right, #3b82f6, #2563eb)' };
      case 'faculty':
        return { background: 'linear-gradient(to right, #22c55e, #16a34a)' };
      case 'administrator':
        return { background: 'linear-gradient(to right, #a855f7, #9333ea)' };
      default:
        return { background: 'linear-gradient(to right, #6b7280, #4b5563)' };
    }
  };

  // This function remains the same
  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case 'student': return '🎓';
      case 'faculty': return '👨‍🏫';
      case 'administrator': return '⚙️';
      default: return '👤';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button
            onClick={onBackClick}
            className="icon-button back-button"
            title="Back to Home"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="navbar-title-group">
            <div className="navbar-logo">
              <span>🎓</span>
            </div>
            <div>
              <h1 className="navbar-title">{title}</h1>
              <p className="navbar-subtitle">Academic Management System</p>
            </div>
          </div>
        </div>
        
        <div className="navbar-right">
          {/* Notifications */}
          <button className="icon-button notification-button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="notification-badge">3</span>
          </button>

          {/* Settings */}
          <button className="icon-button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          {/* User Profile */}
          <div className="user-profile">
            <div className="user-profile-icon" style={getRoleStyle(userRole)}>
              <span>{getRoleIcon(userRole)}</span>
            </div>
            <div className="user-profile-text">
              <p className="user-welcome">Welcome back!</p>
              <p className="user-role">{userRole}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;