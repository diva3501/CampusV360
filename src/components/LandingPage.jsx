import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // custom css file

const LandingPage = () => {
  const navigate = useNavigate();

  const loginOptions = [
    {
      title: "Student Login",
      description:
        "Access your academic progress, upload activities, and manage your digital portfolio.",
      icon: "🎓",
      route: "/student-dashboard",
      features: ["Track Progress", "Upload Activities", "Digital Portfolio", "View Notifications"],
    },
    {
      title: "Faculty Login",
      description:
        "Review student submissions, monitor progress, and award academic credits.",
      icon: "👨‍🏫",
      route: "/faculty-dashboard",
      features: ["Review Submissions", "Monitor Students", "Award Credits", "Generate Reports"],
    },
    {
      title: "Admin Login",
      description:
        "Manage users, generate reports, and oversee institutional activities.",
      icon: "⚙️",
      route: "/admin-dashboard",
      features: ["User Management", "Generate Reports", "Bulk Import", "System Analytics"],
    },
  ];

  return (
    <div className="landing">
      {/* Header */}
      <header className="header">
        <h1>EduPortfolio System</h1>
        <p>Digital Academic Portfolio & Activity Management</p>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to Your Academic Journey</h2>
        <p>
          Streamline academic activity management, portfolio creation, and
          institutional oversight with our comprehensive digital platform.
        </p>

        <div className="card-container">
          {loginOptions.map((option, index) => (
            <div
              key={index}
              className="card"
              onClick={() => navigate(option.route)}
            >
              <div className="icon">{option.icon}</div>
              <h3>{option.title}</h3>
              <p className="desc">{option.description}</p>

              <ul>
                {option.features.map((feature, idx) => (
                  <li key={idx}>✔ {feature}</li>
                ))}
              </ul>

              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(option.route);
                }}
              >
                Access Dashboard →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2024 EduPortfolio System. Empowering academic excellence through digital innovation.
      </footer>
    </div>
  );
};

export default LandingPage;
