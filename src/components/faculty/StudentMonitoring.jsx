import React, { useState } from 'react';

const StudentMonitoring = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      rollNumber: 'CS21B045',
      branch: 'Computer Science',
      semester: 5,
      cgpa: 8.7,
      totalCredits: 116,
      activitiesSubmitted: 8,
      activitiesApproved: 6,
      activitiesPending: 2,
      lastActivity: '2024-01-16',
      attendancePercentage: 94,
      performanceGrade: 'A',
      riskLevel: 'low'
    },
    {
      id: 2,
      name: 'Bob Smith',
      rollNumber: 'CS21B028',
      branch: 'Computer Science',
      semester: 5,
      cgpa: 7.8,
      totalCredits: 112,
      activitiesSubmitted: 5,
      activitiesApproved: 3,
      activitiesPending: 2,
      lastActivity: '2024-01-12',
      attendancePercentage: 78,
      performanceGrade: 'B',
      riskLevel: 'medium'
    },
    {
      id: 3,
      name: 'Carol Davis',
      rollNumber: 'CS21B067',
      branch: 'Computer Science',
      semester: 5,
      cgpa: 9.2,
      totalCredits: 120,
      activitiesSubmitted: 12,
      activitiesApproved: 10,
      activitiesPending: 2,
      lastActivity: '2024-01-09',
      attendancePercentage: 96,
      performanceGrade: 'A+',
      riskLevel: 'low'
    },
    {
      id: 4,
      name: 'David Wilson',
      rollNumber: 'CS21B089',
      branch: 'Computer Science',
      semester: 5,
      cgpa: 6.9,
      totalCredits: 108,
      activitiesSubmitted: 3,
      activitiesApproved: 1,
      activitiesPending: 2,
      lastActivity: '2024-01-05',
      attendancePercentage: 65,
      performanceGrade: 'C',
      riskLevel: 'high'
    }
  ]);

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-green-600';
      case 'A': return 'text-green-500';
      case 'B': return 'text-yellow-600';
      case 'C': return 'text-orange-600';
      case 'D': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const studentActivities = {
    1: [
      { title: 'Machine Learning Certification', type: 'Certification', status: 'approved', date: '2024-01-15', credits: 3 },
      { title: 'Hackathon Participation', type: 'Competition', status: 'approved', date: '2024-01-10', credits: 2 },
      { title: 'Research Paper', type: 'Publication', status: 'pending', date: '2024-01-16', credits: 4 }
    ],
    2: [
      { title: 'Industry Internship', type: 'Internship', status: 'approved', date: '2024-01-12', credits: 4 },
      { title: 'Workshop Participation', type: 'Workshop', status: 'pending', date: '2024-01-08', credits: 1 }
    ],
    3: [
      { title: 'Conference Presentation', type: 'Presentation', status: 'approved', date: '2024-01-09', credits: 3 },
      { title: 'Open Source Contribution', type: 'Project', status: 'approved', date: '2024-01-05', credits: 2 },
      { title: 'Volunteer Work', type: 'Service', status: 'approved', date: '2023-12-20', credits: 1 }
    ]
  };

  return (
    <div className="fade-in space-y-6">
      {/* Overview Statistics */}
      <div className="grid lg:grid-cols-5 gap-6">
        {[
          { 
            title: 'Total Students', 
            value: students.length, 
            icon: '👥', 
            color: 'blue',
            subtitle: 'Under supervision'
          },
          { 
            title: 'High Performers', 
            value: students.filter(s => s.performanceGrade === 'A+' || s.performanceGrade === 'A').length, 
            icon: '⭐', 
            color: 'green',
            subtitle: 'Grade A/A+'
          },
          { 
            title: 'At Risk', 
            value: students.filter(s => s.riskLevel === 'high').length, 
            icon: '⚠️', 
            color: 'red',
            subtitle: 'Need attention'
          },
          { 
            title: 'Avg CGPA', 
            value: (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(1), 
            icon: '📊', 
            color: 'purple',
            subtitle: 'Class average'
          },
          { 
            title: 'Activities', 
            value: students.reduce((sum, s) => sum + s.activitiesSubmitted, 0), 
            icon: '🏆', 
            color: 'orange',
            subtitle: 'Total submitted'
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

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Student Monitoring Dashboard</h3>
          <div className="flex items-center space-x-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500">
              <option>All Students</option>
              <option>High Risk</option>
              <option>Medium Risk</option>
              <option>Low Risk</option>
              <option>High Performers</option>
            </select>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                  viewMode === 'table' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Table View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Data */}
      {viewMode === 'grid' ? (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-white rounded-xl shadow-sm p-6 card-hover transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.rollNumber}</p>
                  <p className="text-xs text-gray-500">Semester {student.semester}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
                    {student.riskLevel.toUpperCase()}
                  </span>
                  <span className={`text-lg font-bold ${getGradeColor(student.performanceGrade)}`}>
                    {student.performanceGrade}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CGPA</span>
                  <span className="font-semibold text-gray-900">{student.cgpa}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Attendance</span>
                  <span className={`font-semibold ${getAttendanceColor(student.attendancePercentage)}`}>
                    {student.attendancePercentage}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Activities</span>
                  <span className="font-semibold text-gray-900">
                    {student.activitiesApproved}/{student.activitiesSubmitted}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Credits</span>
                  <span className="font-semibold text-gray-900">{student.totalCredits}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedStudent(student)}
                  className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CGPA</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activities</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.rollNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.cgpa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getAttendanceColor(student.attendancePercentage)}`}>
                        {student.attendancePercentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.activitiesApproved}/{student.activitiesSubmitted}
                      <div className="text-xs text-gray-500">{student.activitiesPending} pending</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
                        {student.riskLevel.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-lg font-bold ${getGradeColor(student.performanceGrade)}`}>
                        {student.performanceGrade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-green-600 hover:text-green-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedStudent.name} - Detailed View
              </h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Academic Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>CGPA:</span>
                      <span className="font-medium">{selectedStudent.cgpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Credits:</span>
                      <span className="font-medium">{selectedStudent.totalCredits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attendance:</span>
                      <span className={`font-medium ${getAttendanceColor(selectedStudent.attendancePercentage)}`}>
                        {selectedStudent.attendancePercentage}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance Grade:</span>
                      <span className={`font-bold text-lg ${getGradeColor(selectedStudent.performanceGrade)}`}>
                        {selectedStudent.performanceGrade}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Activity Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Submitted:</span>
                      <span className="font-medium">{selectedStudent.activitiesSubmitted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved:</span>
                      <span className="font-medium text-green-600">{selectedStudent.activitiesApproved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending:</span>
                      <span className="font-medium text-yellow-600">{selectedStudent.activitiesPending}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Activity:</span>
                      <span className="font-medium">{selectedStudent.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity History */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Recent Activities</h4>
                <div className="space-y-3">
                  {(studentActivities[selectedStudent.id] || []).map((activity, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{activity.title}</h5>
                          <p className="text-sm text-gray-600">{activity.type} • {activity.date}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            activity.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {activity.status}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">{activity.credits} credits</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMonitoring;