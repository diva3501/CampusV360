import React, { useState } from 'react';

const ActivityOverview = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const activityData = {
    totalActivities: 1247,
    approvedActivities: 1089,
    pendingActivities: 123,
    rejectedActivities: 35,
    totalCredits: 3456,
    activeStudents: 456,
    activeFaculty: 23,
    averageApprovalTime: 2.3
  };

  const departmentData = [
    {
      name: 'Computer Science',
      students: 156,
      activities: 423,
      approved: 387,
      pending: 28,
      rejected: 8,
      credits: 1234,
      avgCredits: 7.9
    },
    {
      name: 'Information Technology',
      students: 134,
      activities: 345,
      approved: 298,
      pending: 35,
      rejected: 12,
      credits: 967,
      avgCredits: 7.2
    },
    {
      name: 'Electronics',
      students: 98,
      activities: 267,
      approved: 241,
      pending: 19,
      rejected: 7,
      credits: 723,
      avgCredits: 7.4
    },
    {
      name: 'Mechanical Engineering',
      students: 87,
      activities: 212,
      approved: 163,
      pending: 41,
      rejected: 8,
      credits: 532,
      avgCredits: 6.1
    }
  ];

  const activityTypes = [
    { type: 'MOOC Completion', count: 298, percentage: 23.9, trend: '+12%' },
    { type: 'Industry Internship', count: 234, percentage: 18.8, trend: '+8%' },
    { type: 'Hackathon/Competition', count: 189, percentage: 15.2, trend: '+15%' },
    { type: 'Research Publication', count: 156, percentage: 12.5, trend: '+5%' },
    { type: 'Workshop/Seminar', count: 134, percentage: 10.7, trend: '-2%' },
    { type: 'Volunteer Work', count: 123, percentage: 9.9, trend: '+7%' },
    { type: 'Certification', count: 113, percentage: 9.1, trend: '+10%' }
  ];

  const recentActivities = [
    {
      id: 1,
      student: 'Alice Johnson',
      department: 'Computer Science',
      activity: 'Machine Learning Certification',
      type: 'Certification',
      status: 'approved',
      credits: 3,
      date: '2024-01-18',
      faculty: 'Dr. Smith'
    },
    {
      id: 2,
      student: 'Bob Wilson',
      department: 'Information Technology',
      activity: 'Summer Internship at Google',
      type: 'Industry Internship',
      status: 'pending',
      credits: 4,
      date: '2024-01-17',
      faculty: 'Dr. Davis'
    },
    {
      id: 3,
      student: 'Carol Martinez',
      department: 'Computer Science',
      activity: 'IEEE Conference Presentation',
      type: 'Conference Presentation',
      status: 'approved',
      credits: 3,
      date: '2024-01-16',
      faculty: 'Dr. Johnson'
    },
    {
      id: 4,
      student: 'David Chen',
      department: 'Electronics',
      activity: 'Arduino Workshop',
      type: 'Workshop/Seminar',
      status: 'approved',
      credits: 1,
      date: '2024-01-15',
      faculty: 'Dr. Brown'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend) => {
    return trend.startsWith('+') ? 'text-green-600' : trend.startsWith('-') ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <div className="fade-in space-y-6">
      {/* Overview Statistics */}
      <div className="grid lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Total Activities', 
            value: activityData.totalActivities.toLocaleString(), 
            icon: '📊', 
            color: 'blue',
            subtitle: 'All submissions'
          },
          { 
            title: 'Approval Rate', 
            value: `${((activityData.approvedActivities / activityData.totalActivities) * 100).toFixed(1)}%`, 
            icon: '✅', 
            color: 'green',
            subtitle: 'Activities approved'
          },
          { 
            title: 'Total Credits', 
            value: activityData.totalCredits.toLocaleString(), 
            icon: '🏆', 
            color: 'purple',
            subtitle: 'Credits awarded'
          },
          { 
            title: 'Active Users', 
            value: (activityData.activeStudents + activityData.activeFaculty).toLocaleString(), 
            icon: '👥', 
            color: 'orange',
            subtitle: 'Students & Faculty'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 card-hover transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <span className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{stat.title}</p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <h3 className="text-xl font-semibold text-gray-900">Activity Analytics</h3>
          <div className="flex space-x-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
              <option value="year">Academic Year</option>
            </select>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="cs">Computer Science</option>
              <option value="it">Information Technology</option>
              <option value="ec">Electronics</option>
              <option value="me">Mechanical Engineering</option>
            </select>
            <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm transition-colors duration-200">
              📊 Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Department Performance</h3>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{dept.name}</h4>
                  <span className="text-sm text-gray-600">{dept.students} students</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Activities:</span>
                    <span className="font-medium text-gray-900 ml-2">{dept.activities}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Approved:</span>
                    <span className="font-medium text-green-600 ml-2">{dept.approved}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Credits:</span>
                    <span className="font-medium text-purple-600 ml-2">{dept.credits}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg/Student:</span>
                    <span className="font-medium text-blue-600 ml-2">{dept.avgCredits}</span>
                  </div>
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(dept.approved / dept.activities) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Types Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Activity Types Distribution</h3>
          <div className="space-y-4">
            {activityTypes.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{activity.type}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600">{activity.count} activities</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{activity.percentage}%</span>
                  </div>
                </div>
                <div className={`text-sm font-medium ${getTrendColor(activity.trend)}`}>
                  {activity.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity Submissions</h3>
          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
            View All →
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {activity.student}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{activity.activity}</div>
                      <div className="text-sm text-gray-500">{activity.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {activity.department}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {activity.credits}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {activity.faculty}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {activity.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Approval Efficiency</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Review Time:</span>
              <span className="font-bold text-blue-600">{activityData.averageApprovalTime} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Same-day Approvals:</span>
              <span className="font-bold text-green-600">34%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending Reviews:</span>
              <span className="font-bold text-yellow-600">{activityData.pendingActivities}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Rejection Rate:</span>
              <span className="font-bold text-red-600">{((activityData.rejectedActivities / activityData.totalActivities) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Student Engagement</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Students:</span>
              <span className="font-bold text-blue-600">{activityData.activeStudents}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg Activities/Student:</span>
              <span className="font-bold text-green-600">2.7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Top Performer Credits:</span>
              <span className="font-bold text-purple-600">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Engagement Rate:</span>
              <span className="font-bold text-orange-600">78%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Faculty Participation</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Faculty:</span>
              <span className="font-bold text-blue-600">{activityData.activeFaculty}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg Reviews/Faculty:</span>
              <span className="font-bold text-green-600">47</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Most Active Reviewer:</span>
              <span className="font-bold text-purple-600">Dr. Smith</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Response Rate:</span>
              <span className="font-bold text-orange-600">94%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityOverview;