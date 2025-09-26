import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './shared/NavBar';
import ApprovalPanel from './faculty/ApprovalPanel';
import StudentMonitoring from './faculty/StudentMonitoring';
import CreditAwarding from './faculty/CreditAwarding';
import AuditSupport from './faculty/AuditSupport';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'approvals', label: 'Approval Panel', icon: '✅' },
    { id: 'monitoring', label: 'Student Monitoring', icon: '👥' },
    { id: 'credits', label: 'Award Credits', icon: '🏆' },
    { id: 'audit', label: 'Audit Support', icon: '📋' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'approvals':
        return <ApprovalPanel />;
      case 'monitoring':
        return <StudentMonitoring />;
      case 'credits':
        return <CreditAwarding />;
      case 'audit':
        return <AuditSupport />;
      default:
        return (
          <div className="fade-in">
            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Pending Reviews', value: '15', icon: '⏳', color: 'yellow' },
                { title: 'Students Monitored', value: '127', icon: '👥', color: 'blue' },
                { title: 'Credits Awarded', value: '340', icon: '🏆', color: 'green' },
                { title: 'This Month', value: '89', icon: '📊', color: 'purple' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 card-hover transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className={`text-3xl font-bold text-${stat.color}-600 mt-2`}>{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Student Submissions</h3>
                <div className="space-y-4">
                  {[
                    { student: 'Alice Johnson', activity: 'Research Publication', submitted: '2 hours ago', urgent: true },
                    { student: 'Bob Smith', activity: 'Industry Internship', submitted: '5 hours ago', urgent: false },
                    { student: 'Carol Davis', activity: 'Coding Competition', submitted: '1 day ago', urgent: false },
                    { student: 'David Wilson', activity: 'Volunteer Work', submitted: '2 days ago', urgent: false }
                  ].map((submission, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${submission.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{submission.student}</h4>
                          <p className="text-sm text-gray-600">{submission.activity}</p>
                          <p className="text-xs text-gray-500 mt-1">{submission.submitted}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition-colors duration-200">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors duration-200">
                            Reject
                          </button>
                        </div>
                      </div>
                      {submission.urgent && (
                        <div className="mt-2">
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                            Urgent Review Required
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Review Pending Submissions', count: 15, action: () => setActiveTab('approvals'), color: 'blue' },
                    { label: 'Monitor Student Progress', count: 127, action: () => setActiveTab('monitoring'), color: 'green' },
                    { label: 'Award Academic Credits', count: 8, action: () => setActiveTab('credits'), color: 'purple' },
                    { label: 'Generate Audit Report', count: null, action: () => setActiveTab('audit'), color: 'gray' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className={`w-full p-4 bg-${action.color}-500 hover:bg-${action.color}-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-between`}
                    >
                      <span className="font-medium">{action.label}</span>
                      {action.count && (
                        <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
                          {action.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        title="Faculty Dashboard" 
        userRole="Faculty" 
        onBackClick={() => navigate('/')} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default FacultyDashboard;