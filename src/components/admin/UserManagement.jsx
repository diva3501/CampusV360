import React, { useState } from 'react';
import './UserManagement.css'; 

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Vikram Rao', email: 'vikram.r@university.edu', role: 'faculty', department: 'Computer Science', status: 'active', lastLogin: '2025-09-26 09:30' },
    { id: 2, name: 'Priya Sharma', email: 'priya.s@student.edu', role: 'student', department: 'Computer Science', status: 'active', lastLogin: '2025-09-26 14:22' },
    { id: 3, name: 'Rohan Mehta', email: 'rohan.m@student.edu', role: 'student', department: 'Computer Science', status: 'inactive', lastLogin: '2025-09-10 16:45' },
    { id: 4, name: 'Dr. Anjali Desai', email: 'anjali.d@university.edu', role: 'faculty', department: 'Info Tech', status: 'active', lastLogin: '2025-09-25 11:15' },
    { id: 5, name: 'Admin Kumar', email: 'admin@university.edu', role: 'admin', department: 'Administration', status: 'active', lastLogin: '2025-09-26 08:00' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student', department: '', status: 'active' });

  const getRoleClass = (role) => `role-badge--${role}`;
  const getStatusClass = (status) => `status-badge--${status}`;

  const filteredUsers = users.filter(user =>
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter === 'all' || user.role === roleFilter) &&
    (statusFilter === 'all' || user.status === statusFilter)
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.department) {
      alert('Please fill in all required fields');
      return;
    }
    const userToAdd = { ...newUser, id: Date.now(), lastLogin: 'Never', joinDate: new Date().toISOString().split('T')[0] };
    setUsers([...users, userToAdd]);
    setNewUser({ name: '', email: '', role: 'student', department: '', status: 'active' });
    setShowAddModal(false);
    alert('User added successfully!');
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
      alert('User deleted successfully!');
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const exportUserData = () => {
    const headers = ['Name', 'Email', 'Role', 'Department', 'Status', 'Last Login'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        `"${user.name}"`,
        `"${user.email}"`,
        user.role,
        `"${user.department}"`,
        user.status,
        `"${user.lastLogin}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `user_data_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const colorConfig = {
    blue: { color: '#2563eb', bg: '#dbeafe' }, green: { color: '#16a34a', bg: '#dcfce7' },
    purple: { color: '#9333ea', bg: '#f3e8ff' }, orange: { color: '#ea580c', bg: '#ffedd5' },
    red: { color: '#dc2626', bg: '#fee2e2' }
  };

  return (
    <div className="user-management-container fade-in">
      {/* User Statistics */}
      <div className="summary-grid">
        {[
          { title: 'Total Users', value: users.length, icon: '👥', color: 'blue' },
          { title: 'Active Users', value: users.filter(u => u.status === 'active').length, icon: '✅', color: 'green' },
          { title: 'Faculty', value: users.filter(u => u.role === 'faculty').length, icon: '👨‍🏫', color: 'purple' },
          { title: 'Students', value: users.filter(u => u.role === 'student').length, icon: '🎓', color: 'orange' },
          { title: 'Admins', value: users.filter(u => u.role === 'admin').length, icon: '⚙️', color: 'red' },
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

      {/* Controls */}
      <div className="card filters-container">
        <h3>Manage Users</h3>
        <div className="controls-wrapper">
          <div className="filter-controls">
            <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control search-input"/>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="form-control"><option value="all">All Roles</option><option value="admin">Admin</option><option value="faculty">Faculty</option><option value="student">Student</option></select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-control"><option value="all">All Statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select>
          </div>
          <div className="action-buttons">
            <button onClick={exportUserData} className="button button--secondary">📊 Export CSV</button>
            <button onClick={() => setShowAddModal(true)} className="button button--primary">➕ Add User</button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header-row">
          <h3>User List</h3>
          <p>Showing {filteredUsers.length} of {users.length} users</p>
        </div>
        <div className="table-wrapper">
          <table className="users-table">
            <thead><tr><th>User</th><th>Role</th><th>Department</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td data-label="User"><div><div className="user-name">{user.name}</div><div className="user-email">{user.email}</div></div></td>
                  <td data-label="Role"><span className={`badge ${getRoleClass(user.role)}`}>{user.role}</span></td>
                  <td data-label="Department">{user.department}</td>
                  <td data-label="Status"><span className={`badge ${getStatusClass(user.status)}`}>{user.status}</span></td>
                  <td data-label="Last Login">{user.lastLogin}</td>
                  <td data-label="Actions">
                    <div className="table-actions">
                      <button className="link-button">Edit</button>
                      <button onClick={() => handleToggleStatus(user.id)} className={`link-button ${user.status === 'active' ? 'link-button--danger' : 'link-button--success'}`}>{user.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                      <button onClick={() => handleDeleteUser(user.id)} className="link-button link-button--danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New User</h3>
              <button onClick={() => setShowAddModal(false)} className="close-button">&times;</button>
            </div>
            <div className="modal-body">
              <div><label className="form-label">Full Name <span className="required">*</span></label><input type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="form-control" placeholder="Enter full name"/></div>
              <div><label className="form-label">Email Address <span className="required">*</span></label><input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="form-control" placeholder="Enter email address"/></div>
              <div><label className="form-label">Role</label><select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="form-control"><option value="student">Student</option><option value="faculty">Faculty</option><option value="admin">Admin</option></select></div>
              <div><label className="form-label">Department <span className="required">*</span></label><input type="text" value={newUser.department} onChange={(e) => setNewUser({...newUser, department: e.target.value})} className="form-control" placeholder="Enter department"/></div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowAddModal(false)} className="button button--secondary">Cancel</button>
              <button onClick={handleAddUser} className="button button--primary">Add User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;