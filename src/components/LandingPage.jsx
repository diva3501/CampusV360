import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; 

// --- SVG Icon Components (replaces emojis) ---
const StudentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-13A2.5 2.5 0 0 1 6.5 2z"></path></svg>
);
const FacultyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 4v10h11v-5"></path><path d="M13 12H9"></path><path d="M11 9H9"></path><path d="M19 13v6"></path><path d="M22 16h-6"></path></svg>
);
const AdminIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const loginOptions = [
    {
      title: "For Students",
      description: "Access your academic progress, upload activities, and build your digital portfolio to showcase your complete journey.",
      icon: <StudentIcon />,
      route: "/student-dashboard",
      features: ["Track Progress", "Upload Activities", "Build Portfolio", "View Notifications"],
      color: "blue"
    },
    {
      title: "For Faculty",
      description: "Review student submissions, monitor cohort progress, award credits, and provide valuable feedback seamlessly.",
      icon: <FacultyIcon />,
      route: "/faculty-dashboard",
      features: ["Review Submissions", "Monitor Students", "Award Credits", "Provide Feedback"],
      color: "green"
    },
    {
      title: "For Administration",
      description: "Oversee institutional data, manage users, generate compliance reports, and gain insights into academic activities.",
      icon: <AdminIcon />,
      route: "/admin-dashboard",
      features: ["User Management", "Generate Reports", "System Analytics", "Ensure Compliance"],
      color: "purple"
    },
  ];

  return (
    <div className="landing-page">
      <div className="background-shapes"></div>
      
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="logo">CampusV360</a>
          {/* MODIFIED: Replaced nav links with specific login buttons */}
          <div className="nav-menu">
            <button onClick={() => navigate('/student-dashboard')} className="nav-login-button">Student Login</button>
            <button onClick={() => navigate('/faculty-dashboard')} className="nav-login-button">Faculty Login</button>
            <button onClick={() => navigate('/admin-dashboard')} className="nav-login-button">Admin Login</button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero">
          <h1 className="hero-title">A 360° View of Your Campus</h1>
          <p className="hero-subtitle">
            Welcome to CampusV360, the unified platform for managing academic portfolios, tracking activities, and ensuring institutional excellence.
          </p>
        </section>

        <section className="demo-section">
          {/* ADDED: New header for the cards section */}
          <div className="section-header">
            <h2>Explore Your Role</h2>
            <p>Select a portal below to explore the tailored dashboard and features for each user type.</p>
          </div>

          <div className="card-grid">
            {loginOptions.map((option, index) => (
              <div
                key={index}
                className={`login-card card-color-${option.color}`}
                onClick={() => navigate(option.route)}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="card-icon">{option.icon}</div>
                <h3 className="card-title">{option.title}</h3>
                <p className="card-description">{option.description}</p>
                <ul className="features-list">
                  {option.features.map((feature, idx) => (
                    <li key={idx}><CheckIcon /> {feature}</li>
                  ))}
                </ul>
                <button
                  className="card-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(option.route);
                  }}
                >
                  Access Dashboard 
                  <span className="arrow">→</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 CampusV360. Empowering academic excellence through digital innovation.</p>
      </footer>
    </div>
  );
};

export default LandingPage;