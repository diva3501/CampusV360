import React, { useState } from 'react';
import './Notifications.css'; 

const Notifications = () => {
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const [notifications] = useState([
    { id: 1, type: 'approval', title: 'Activity Approved', message: 'Your "Machine Learning Certification" has been approved. Credits: 3', date: today.toLocaleDateString(), time: '10:30 AM', read: false, priority: 'high' },
    { id: 2, type: 'rejection', title: 'Activity Needs Revision', message: 'Your "Research Paper Publication" requires additional documentation.', date: today.toLocaleDateString(), time: '2:15 PM', read: false, priority: 'high' },
    { id: 3, type: 'reminder', title: 'Submission Deadline', message: 'Reminder: Portfolio submission deadline is approaching.', date: yesterday.toLocaleDateString(), time: '9:00 AM', read: true, priority: 'medium' },
    { id: 4, type: 'info', title: 'New Activity Category', message: 'New activity category "Community Service" has been added.', date: twoDaysAgo.toLocaleDateString(), time: '11:45 AM', read: true, priority: 'low' },
  ]);

  const getNotificationIcon = (type) => { };

  
  const getNotificationClass = (type, priority) => {
    if (priority === 'high') return 'notification-item--priority-high';
    return `notification-item--${type}`;
  };

  
  const getPriorityBadgeClass = (priority) => `priority-badge--${priority}`;

  const unreadCount = notifications.filter(n => !n.read).length;
  const todayNotifications = notifications.filter(n => n.date === today.toLocaleDateString());
  const weekNotifications = notifications.length; 

  const summaryCardConfig = {
    blue: { color: '#2563eb', bg: '#dbeafe' },
    red: { color: '#dc2626', bg: '#fee2e2' },
    green: { color: '#16a34a', bg: '#dcfce7' },
    purple: { color: '#9333ea', bg: '#f3e8ff' },
  };

  return (
    <div className="notifications-container fade-in">
      {/* Notification Summary */}
      <div className="summary-grid">
        {[
          { title: 'Total', value: notifications.length, icon: '📢', color: 'blue' },
          { title: 'Unread', value: unreadCount, icon: '🔴', color: 'red' },
          { title: 'Today', value: todayNotifications.length, icon: '📅', color: 'green' },
          { title: 'This Week', value: weekNotifications, icon: '📊', color: 'purple' }
        ].map((stat, index) => (
          <div key={index} className="summary-card">
            <div>
              <p className="summary-title">{stat.title}</p>
              <p className="summary-value" style={{ color: summaryCardConfig[stat.color].color }}>{stat.value}</p>
            </div>
            <div className="summary-icon" style={{ backgroundColor: summaryCardConfig[stat.color].bg }}>
              <span>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Notifications List */}
      <div className="card">
        <div className="card-header">
          <h3>Recent Notifications</h3>
          <div className="header-actions">
            <button className="header-button">Mark All Read</button>
            <button className="header-button">Clear All</button>
          </div>
        </div>
        <div className="notifications-list">
          {notifications.map((n) => (
            <div key={n.id} className={`notification-item ${getNotificationClass(n.type, n.priority)} ${!n.read ? 'notification-item--unread' : ''}`}>
              <div className="notification-content">
                <div className="notification-header">
                  <span className="notification-icon">{getNotificationIcon(n.type)}</span>
                  <h4>{n.title}</h4>
                  {!n.read && <span className="unread-dot"></span>}
                </div>
                <p className="notification-message">{n.message}</p>
                <div className="notification-footer">
                  <span className="timestamp">{n.date} • {n.time}</span>
                  <span className={`priority-badge ${getPriorityBadgeClass(n.priority)}`}>
                    {n.priority} Priority
                  </span>
                </div>
              </div>
              <div className="notification-actions">
                {!n.read && <button className="action-button">Mark Read</button>}
                <button className="action-button action-button--delete">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <div className="card-header">
          <h3>Notification Preferences</h3>
        </div>
        <div className="settings-content">
          <div className="settings-grid">
            <div className="settings-group">
              <h4>Email Notifications</h4>
              <div className="settings-options">
                {['Activity Updates', 'Deadline Reminders', 'System Updates'].map((label, i) => (
                  <label key={i} className="checkbox-label">
                    <input type="checkbox" defaultChecked={i !== 2} className="form-checkbox" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="settings-group">
              <h4>Push Notifications</h4>
              <div className="settings-options">
                {['Instant Updates', 'Daily Digest', 'Faculty Messages'].map((label, i) => (
                  <label key={i} className="checkbox-label">
                    <input type="checkbox" defaultChecked={i !== 1} className="form-checkbox" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="settings-footer">
            <button className="button button--primary">Save Preferences</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;