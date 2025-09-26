import React, { useState } from 'react';

const AuditSupport = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current_semester');
  const [searchTerm, setSearchTerm] = useState('');

  const [auditRecords] = useState([
    {
      id: 1,
      studentName: 'Alice Johnson',
      rollNumber: 'CS21B045',
      activityTitle: 'Machine Learning Certification',
      activityType: 'Certification',
      submissionDate: '2024-01-16',
      approvalDate: '2024-01-18',
      reviewedBy: 'Dr. Smith',
      status: 'approved',
      creditsAwarded: 3,
      documents: ['certificate.pdf', 'transcript.pdf'],
      comments: 'Excellent course completion with outstanding performance.',
      verificationStatus: 'verified',
      auditFlags: []
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      rollNumber: 'CS21B028',
      activityTitle: 'Summer Internship - Microsoft',
      activityType: 'Industry Internship',
      submissionDate: '2024-01-12',
      approvalDate: '2024-01-15',
      reviewedBy: 'Dr. Johnson',
      status: 'approved',
      creditsAwarded: 4,
      documents: ['internship_letter.pdf', 'completion_certificate.pdf'],
      comments: 'Comprehensive internship experience with good learning outcomes.',
      verificationStatus: 'verified',
      auditFlags: []
    },
    {
      id: 3,
      studentName: 'Carol Davis',
      rollNumber: 'CS21B067',
      activityTitle: 'Research Paper Publication',
      activityType: 'Research Publication',
      submissionDate: '2024-01-05',
      approvalDate: null,
      reviewedBy: 'Dr. Brown',
      status: 'rejected',
      creditsAwarded: 0,
      documents: ['paper_draft.pdf'],
      comments: 'Requires additional documentation and journal impact factor verification.',
      verificationStatus: 'pending',
      auditFlags: ['incomplete_documentation']
    },
    {
      id: 4,
      studentName: 'David Wilson',
      rollNumber: 'CS21B089',
      activityTitle: 'Hackathon Participation',
      activityType: 'Competition',
      submissionDate: '2024-01-08',
      approvalDate: '2024-01-10',
      reviewedBy: 'Dr. Davis',
      status: 'approved',
      creditsAwarded: 2,
      documents: ['participation_certificate.pdf'],
      comments: 'Active participation in competitive programming event.',
      verificationStatus: 'verified',
      auditFlags: []
    },
    {
      id: 5,
      studentName: 'Eva Martinez',
      rollNumber: 'CS21B023',
      activityTitle: 'Open Source Contribution',
      activityType: 'Project Work',
      submissionDate: '2024-01-14',
      approvalDate: '2024-01-17',
      reviewedBy: 'Dr. Smith',
      status: 'approved',
      creditsAwarded: 2,
      documents: ['contribution_proof.pdf', 'project_screenshots.pdf'],
      comments: 'Meaningful contributions to open source projects.',
      verificationStatus: 'verified',
      auditFlags: ['review_recommended']
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getVerificationIcon = (status) => {
    switch (status) {
      case 'verified': return '✅';
      case 'pending': return '⏳';
      case 'failed': return '❌';
      default: return '❓';
    }
  };

  const filteredRecords = auditRecords.filter(record => {
    const matchesFilter = selectedFilter === 'all' || record.status === selectedFilter;
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.activityTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const exportAuditReport = () => {
    const reportData = filteredRecords.map(record => ({
      Student: record.studentName,
      RollNumber: record.rollNumber,
      Activity: record.activityTitle,
      Type: record.activityType,
      Status: record.status,
      Credits: record.creditsAwarded,
      ReviewedBy: record.reviewedBy,
      ApprovalDate: record.approvalDate || 'N/A'
    }));

    const csvContent = [
      Object.keys(reportData[0]).join(','),
      ...reportData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateComplianceReport = () => {
    alert('Compliance report generation initiated. Report will be available in 5-10 minutes.');
  };

  return (
    <div className="fade-in space-y-6">
      {/* Audit Overview Statistics */}
      <div className="grid lg:grid-cols-5 gap-6">
        {[
          { 
            title: 'Total Records', 
            value: auditRecords.length, 
            icon: '📊', 
            color: 'blue',
            subtitle: 'All submissions'
          },
          { 
            title: 'Approved', 
            value: auditRecords.filter(r => r.status === 'approved').length, 
            icon: '✅', 
            color: 'green',
            subtitle: 'Verified activities'
          },
          { 
            title: 'Pending Review', 
            value: auditRecords.filter(r => r.verificationStatus === 'pending').length, 
            icon: '⏳', 
            color: 'yellow',
            subtitle: 'Needs verification'
          },
          { 
            title: 'Flagged', 
            value: auditRecords.filter(r => r.auditFlags.length > 0).length, 
            icon: '⚠️', 
            color: 'red',
            subtitle: 'Requires attention'
          },
          { 
            title: 'Credits Awarded', 
            value: auditRecords.reduce((sum, r) => sum + (r.creditsAwarded || 0), 0), 
            icon: '🏆', 
            color: 'purple',
            subtitle: 'Total credits'
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
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Records</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="current_semester">Current Semester</option>
                <option value="last_semester">Last Semester</option>
                <option value="academic_year">Academic Year</option>
                <option value="all_time">All Time</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search student or activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={exportAuditReport}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors duration-200"
            >
              📊 Export Report
            </button>
            <button
              onClick={generateComplianceReport}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors duration-200"
            >
              📋 Compliance Report
            </button>
          </div>
        </div>
      </div>

      {/* Audit Records Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Audit Records</h3>
          <p className="text-sm text-gray-600 mt-1">
            Showing {filteredRecords.length} of {auditRecords.length} records
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reviewed By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                      <div className="text-sm text-gray-500">{record.rollNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.activityTitle}</div>
                      <div className="text-sm text-gray-500">{record.activityType}</div>
                      {record.auditFlags.length > 0 && (
                        <div className="flex space-x-1 mt-1">
                          {record.auditFlags.map((flag, index) => (
                            <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              ⚠️ {flag.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center text-sm ${getVerificationColor(record.verificationStatus)}`}>
                      <span className="mr-1">{getVerificationIcon(record.verificationStatus)}</span>
                      {record.verificationStatus.charAt(0).toUpperCase() + record.verificationStatus.slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {record.creditsAwarded || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {record.reviewedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>{record.submissionDate}</div>
                    {record.approvalDate && (
                      <div className="text-xs text-gray-400">Approved: {record.approvalDate}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Verify</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Compliance Metrics</h3>
          <div className="space-y-4">
            {[
              { 
                metric: 'Documentation Completeness', 
                value: 94, 
                threshold: 90, 
                status: 'compliant' 
              },
              { 
                metric: 'Review Timeliness', 
                value: 87, 
                threshold: 85, 
                status: 'compliant' 
              },
              { 
                metric: 'Verification Rate', 
                value: 96, 
                threshold: 95, 
                status: 'compliant' 
              },
              { 
                metric: 'Appeal Resolution Time', 
                value: 78, 
                threshold: 80, 
                status: 'warning' 
              }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                  <p className="text-sm text-gray-600">Threshold: {metric.threshold}%</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    metric.status === 'compliant' ? 'text-green-600' : 
                    metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {metric.value}%
                  </p>
                  <p className={`text-xs ${
                    metric.status === 'compliant' ? 'text-green-600' : 
                    metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {metric.status === 'compliant' ? '✅ Compliant' : 
                     metric.status === 'warning' ? '⚠️ Warning' : '❌ Non-compliant'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Audit Activities</h3>
          <div className="space-y-4">
            {[
              { action: 'Document verification completed', user: 'System', time: '5 min ago', type: 'success' },
              { action: 'Compliance report generated', user: 'Dr. Smith', time: '1 hour ago', type: 'info' },
              { action: 'Flag raised for incomplete docs', user: 'Dr. Johnson', time: '2 hours ago', type: 'warning' },
              { action: 'Batch approval processed', user: 'Dr. Davis', time: '3 hours ago', type: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditSupport;