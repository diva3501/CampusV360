import React, { useState } from 'react';

const AuditLogs = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-18 14:32:15',
      user: 'Dr. Smith',
      userRole: 'faculty',
      action: 'approved_activity',
      resource: 'Activity Submission',
      resourceId: 'ACT-2024-001',
      details: 'Approved "Machine Learning Certification" for Alice Johnson',
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'info',
      category: 'activity_management'
    },
    {
      id: 2,
      timestamp: '2024-01-18 14:28:42',
      user: 'Admin User',
      userRole: 'admin',
      action: 'user_created',
      resource: 'User Account',
      resourceId: 'USR-2024-156',
      details: 'Created new student account for Bob Wilson (CS21B089)',
      ipAddress: '192.168.1.10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'info',
      category: 'user_management'
    },
    {
      id: 3,
      timestamp: '2024-01-18 14:15:23',
      user: 'Alice Johnson',
      userRole: 'student',
      action: 'activity_submitted',
      resource: 'Activity Submission',
      resourceId: 'ACT-2024-002',
      details: 'Submitted "Hackathon Participation - TechFest 2024" for review',
      ipAddress: '192.168.1.78',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      severity: 'info',
      category: 'activity_management'
    },
    {
      id: 4,
      timestamp: '2024-01-18 13:45:12',
      user: 'System',
      userRole: 'system',
      action: 'login_failed',
      resource: 'Authentication',
      resourceId: 'AUTH-2024-789',
      details: 'Failed login attempt for user "john.doe@student.university.edu" - Invalid password',
      ipAddress: '203.45.67.89',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      severity: 'warning',
      category: 'security'
    },
    {
      id: 5,
      timestamp: '2024-01-18 13:30:45',
      user: 'Dr. Johnson',
      userRole: 'faculty',
      action: 'activity_rejected',
      resource: 'Activity Submission',
      resourceId: 'ACT-2024-003',
      details: 'Rejected "Research Paper Publication" - Insufficient documentation',
      ipAddress: '192.168.1.67',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'warning',
      category: 'activity_management'
    },
    {
      id: 6,
      timestamp: '2024-01-18 12:15:33',
      user: 'Admin User',
      userRole: 'admin',
      action: 'bulk_import',
      resource: 'Data Import',
      resourceId: 'IMP-2024-012',
      details: 'Bulk imported 156 student records from students_batch_2024.xlsx',
      ipAddress: '192.168.1.10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'info',
      category: 'data_management'
    },
    {
      id: 7,
      timestamp: '2024-01-18 11:45:21',
      user: 'System',
      userRole: 'system',
      action: 'backup_completed',
      resource: 'Database Backup',
      resourceId: 'BCK-2024-018',
      details: 'Automated daily backup completed successfully (2.4GB)',
      ipAddress: '127.0.0.1',
      userAgent: 'System Process',
      severity: 'info',
      category: 'system_maintenance'
    },
    {
      id: 8,
      timestamp: '2024-01-18 10:30:15',
      user: 'Carol Davis',
      userRole: 'student',
      action: 'profile_updated',
      resource: 'User Profile',
      resourceId: 'USR-2024-067',
      details: 'Updated profile information - Added LinkedIn profile URL',
      ipAddress: '192.168.1.92',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      severity: 'info',
      category: 'user_management'
    },
    {
      id: 9,
      timestamp: '2024-01-18 09:15:42',
      user: 'System',
      userRole: 'system',
      action: 'security_scan',
      resource: 'Security Check',
      resourceId: 'SEC-2024-045',
      details: 'Automated security scan detected 3 suspicious login attempts',
      ipAddress: '127.0.0.1',
      userAgent: 'Security Scanner',
      severity: 'warning',
      category: 'security'
    },
    {
      id: 10,
      timestamp: '2024-01-18 08:45:18',
      user: 'Dr. Brown',
      userRole: 'faculty',
      action: 'credits_awarded',
      resource: 'Credit Award',
      resourceId: 'CRD-2024-089',
      details: 'Awarded 3 credits to David Chen for "Arduino Workshop" completion',
      ipAddress: '192.168.1.55',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'info',
      category: 'activity_management'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'critical': return '🚨';
      default: return '📝';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'user_management': return 'bg-purple-100 text-purple-800';
      case 'activity_management': return 'bg-green-100 text-green-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'data_management': return 'bg-blue-100 text-blue-800';
      case 'system_maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesFilter = selectedFilter === 'all' || log.category === selectedFilter;
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesUser && matchesSearch;
  });

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Resource', 'Details', 'Severity', 'Category', 'IP Address'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user,
        log.action,
        log.resource,
        `"${log.details}"`,
        log.severity,
        log.category,
        log.ipAddress
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))];
  const logStats = {
    total: auditLogs.length,
    info: auditLogs.filter(log => log.severity === 'info').length,
    warning: auditLogs.filter(log => log.severity === 'warning').length,
    error: auditLogs.filter(log => log.severity === 'error').length,
    critical: auditLogs.filter(log => log.severity === 'critical').length
  };

  return (
    <div className="fade-in space-y-6">
      {/* Audit Statistics */}
      <div className="grid lg:grid-cols-5 gap-6">
        {[
          { 
            title: 'Total Logs', 
            value: logStats.total, 
            icon: '📋', 
            color: 'blue',
            subtitle: 'All activities'
          },
          { 
            title: 'Info Events', 
            value: logStats.info, 
            icon: 'ℹ️', 
            color: 'green',
            subtitle: 'Normal operations'
          },
          { 
            title: 'Warnings', 
            value: logStats.warning, 
            icon: '⚠️', 
            color: 'yellow',
            subtitle: 'Attention needed'
          },
          { 
            title: 'Errors', 
            value: logStats.error, 
            icon: '❌', 
            color: 'red',
            subtitle: 'Failed operations'
          },
          { 
            title: 'Critical', 
            value: logStats.critical, 
            icon: '🚨', 
            color: 'purple',
            subtitle: 'Urgent issues'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 card-hover transition-all duration-300">
            <div className="text-center">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className={`text-2xl font-bold text-${stat.color}-600 mt-1`}>{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div>
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="user_management">User Management</option>
                <option value="activity_management">Activity Management</option>
                <option value="security">Security</option>
                <option value="data_management">Data Management</option>
                <option value="system_maintenance">System Maintenance</option>
              </select>
            </div>
            <div>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Users</option>
                {uniqueUsers.map((user, index) => (
                  <option key={index} value={user}>{user}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={exportLogs}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors duration-200"
            >
              📊 Export Logs
            </button>
            <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm transition-colors duration-200">
              🔍 Advanced Search
            </button>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Audit Trail</h3>
          <p className="text-sm text-gray-600">
            Showing {filteredLogs.length} of {auditLogs.length} log entries
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{log.user}</div>
                      <div className="text-sm text-gray-500">{log.userRole}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {log.action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md">
                      {log.details}
                    </div>
                    {log.resourceId && (
                      <div className="text-xs text-gray-500 mt-1">
                        Resource ID: {log.resourceId}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(log.category)}`}>
                      {log.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                      <span className="mr-1">{getSeverityIcon(log.severity)}</span>
                      {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Security Events</h3>
          <div className="space-y-4">
            {auditLogs.filter(log => log.category === 'security').slice(0, 5).map((log, index) => (
              <div key={index} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">{getSeverityIcon(log.severity)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-red-900">{log.action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                    <p className="text-sm text-red-800 mt-1">{log.details}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-red-600">{log.timestamp}</span>
                      <span className="text-xs text-red-600">{log.ipAddress}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Activity Summary</h3>
          <div className="space-y-4">
            {[
              { category: 'User Management', count: auditLogs.filter(log => log.category === 'user_management').length, color: 'purple' },
              { category: 'Activity Management', count: auditLogs.filter(log => log.category === 'activity_management').length, color: 'green' },
              { category: 'Security Events', count: auditLogs.filter(log => log.category === 'security').length, color: 'red' },
              { category: 'Data Management', count: auditLogs.filter(log => log.category === 'data_management').length, color: 'blue' },
              { category: 'System Maintenance', count: auditLogs.filter(log => log.category === 'system_maintenance').length, color: 'gray' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{item.category}</span>
                <div className="flex items-center">
                  <span className={`text-lg font-bold text-${item.color}-600 mr-2`}>{item.count}</span>
                  <div className={`w-3 h-3 bg-${item.color}-500 rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Top Active Users</h4>
            <div className="space-y-2">
              {Object.entries(
                auditLogs.reduce((acc, log) => {
                  acc[log.user] = (acc[log.user] || 0) + 1;
                  return acc;
                }, {})
              ).sort(([,a], [,b]) => b - a).slice(0, 5).map(([user, count], index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{user}</span>
                  <span className="font-medium text-gray-900">{count} actions</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;