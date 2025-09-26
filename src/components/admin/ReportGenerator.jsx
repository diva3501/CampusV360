import React, { useState } from 'react';

const ReportGenerator = () => {
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('current_semester');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [reportFormat, setReportFormat] = useState('pdf');

  const reportTypes = [
    {
      id: 'naac',
      title: 'NAAC Compliance Report',
      description: 'Comprehensive report for NAAC accreditation requirements',
      icon: '🏛️',
      color: 'blue',
      estimatedTime: '5-10 minutes',
      sections: ['Student Activities', 'Faculty Performance', 'Institutional Metrics', 'Quality Indicators']
    },
    {
      id: 'aicte',
      title: 'AICTE Annual Report',
      description: 'Annual institutional report for AICTE compliance',
      icon: '📚',
      color: 'green',
      estimatedTime: '8-15 minutes',
      sections: ['Academic Performance', 'Research Activities', 'Industry Collaboration', 'Student Outcomes']
    },
    {
      id: 'nirf',
      title: 'NIRF Ranking Data',
      description: 'Data compilation for National Institutional Ranking Framework',
      icon: '🏆',
      color: 'purple',
      estimatedTime: '10-20 minutes',
      sections: ['Teaching & Learning', 'Research & Innovation', 'Graduation Outcomes', 'Outreach & Inclusivity']
    },
    {
      id: 'activity_summary',
      title: 'Activity Summary Report',
      description: 'Detailed analysis of student activities and achievements',
      icon: '📊',
      color: 'orange',
      estimatedTime: '3-5 minutes',
      sections: ['Activity Statistics', 'Department Breakdown', 'Credit Analysis', 'Trend Analysis']
    },
    {
      id: 'faculty_performance',
      title: 'Faculty Performance Report',
      description: 'Evaluation of faculty engagement and review efficiency',
      icon: '👨‍🏫',
      color: 'indigo',
      estimatedTime: '5-8 minutes',
      sections: ['Review Statistics', 'Response Times', 'Approval Rates', 'Faculty Rankings']
    },
    {
      id: 'student_progress',
      title: 'Student Progress Report',
      description: 'Individual and cohort-wise student progress analysis',
      icon: '🎓',
      color: 'teal',
      estimatedTime: '4-7 minutes',
      sections: ['Academic Progress', 'Activity Participation', 'Credit Accumulation', 'Performance Trends']
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'NAAC Compliance Report - Q4 2023',
      type: 'NAAC',
      generatedBy: 'Admin User',
      date: '2024-01-15',
      size: '2.4 MB',
      status: 'completed',
      downloadCount: 12
    },
    {
      id: 2,
      title: 'Activity Summary - January 2024',
      type: 'Activity Summary',
      generatedBy: 'Dr. Smith',
      date: '2024-01-10',
      size: '1.8 MB',
      status: 'completed',
      downloadCount: 8
    },
    {
      id: 3,
      title: 'Faculty Performance - Semester 1',
      type: 'Faculty Performance',
      generatedBy: 'Admin User',
      date: '2024-01-05',
      size: '3.1 MB',
      status: 'completed',
      downloadCount: 15
    },
    {
      id: 4,
      title: 'AICTE Annual Report 2023-24',
      type: 'AICTE',
      generatedBy: 'Principal',
      date: '2023-12-28',
      size: '5.2 MB',
      status: 'completed',
      downloadCount: 23
    }
  ];

  const generateReport = () => {
    if (!selectedReportType) {
      alert('Please select a report type');
      return;
    }

    const reportType = reportTypes.find(r => r.id === selectedReportType);
    alert(`Generating ${reportType.title}...\n\nEstimated completion time: ${reportType.estimatedTime}\n\nYou will receive a notification when the report is ready for download.`);
  };

  const downloadReport = (reportId) => {
    const report = recentReports.find(r => r.id === reportId);
    alert(`Downloading ${report.title}...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fade-in space-y-6">
      {/* Report Generation Statistics */}
      <div className="grid lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Reports Generated', 
            value: '247', 
            icon: '📊', 
            color: 'blue',
            subtitle: 'This academic year'
          },
          { 
            title: 'NAAC Reports', 
            value: '12', 
            icon: '🏛️', 
            color: 'green',
            subtitle: 'Quarterly submissions'
          },
          { 
            title: 'AICTE Reports', 
            value: '8', 
            icon: '📚', 
            color: 'purple',
            subtitle: 'Annual compliance'
          },
          { 
            title: 'Custom Reports', 
            value: '89', 
            icon: '📋', 
            color: 'orange',
            subtitle: 'Department specific'
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Report Generation Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate New Report</h3>
            <p className="text-gray-600">Create comprehensive institutional reports for compliance and analysis</p>
          </div>

          <div className="space-y-6">
            {/* Report Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Report Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                {reportTypes.slice(0, 3).map((report) => (
                  <label key={report.id} className="relative">
                    <input
                      type="radio"
                      name="reportType"
                      value={report.id}
                      checked={selectedReportType === report.id}
                      onChange={(e) => setSelectedReportType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedReportType === report.id 
                        ? `border-${report.color}-500 bg-${report.color}-50` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg bg-${report.color}-100 mr-3`}>
                          <span className="text-xl">{report.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{report.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                          <p className="text-xs text-gray-500 mt-2">Est. time: {report.estimatedTime}</p>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              
              <button className="mt-3 text-sm text-purple-600 hover:text-purple-800 font-medium">
                View All Report Types →
              </button>
            </div>

            {/* Configuration Options */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="current_semester">Current Semester</option>
                  <option value="last_semester">Last Semester</option>
                  <option value="academic_year">Academic Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  <option value="cs">Computer Science</option>
                  <option value="it">Information Technology</option>
                  <option value="ec">Electronics</option>
                  <option value="me">Mechanical Engineering</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select
                  value={reportFormat}
                  onChange={(e) => setReportFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV Data</option>
                  <option value="word">Word Document</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeCharts}
                    onChange={(e) => setIncludeCharts(e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include Charts</span>
                </label>
              </div>
            </div>

            {selectedReportType && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  📋 {reportTypes.find(r => r.id === selectedReportType)?.title} Sections
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {reportTypes.find(r => r.id === selectedReportType)?.sections.map((section, index) => (
                    <li key={index}>• {section}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={generateReport}
              className="w-full py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              🚀 Generate Report
            </button>
          </div>
        </div>

        {/* Report Templates & Options */}
        <div className="space-y-6">
          {/* Quick Templates */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Report Templates</h3>
            <div className="grid grid-cols-2 gap-4">
              {reportTypes.slice(3).map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReportType(report.id)}
                  className={`p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-${report.color}-400 hover:bg-${report.color}-50 transition-all duration-200 text-center`}
                >
                  <div className="text-2xl mb-2">{report.icon}</div>
                  <h4 className="font-medium text-gray-900 mb-1">{report.title}</h4>
                  <p className="text-xs text-gray-600">{report.estimatedTime}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Report Scheduling */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Scheduled Reports</h3>
            <div className="space-y-4">
              {[
                { title: 'Monthly Activity Summary', schedule: 'Last day of month', next: '2024-01-31', status: 'active' },
                { title: 'Quarterly NAAC Report', schedule: 'End of quarter', next: '2024-03-31', status: 'active' },
                { title: 'Weekly Faculty Report', schedule: 'Every Friday', next: '2024-01-19', status: 'paused' }
              ].map((scheduled, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{scheduled.title}</h4>
                    <p className="text-sm text-gray-600">{scheduled.schedule}</p>
                    <p className="text-xs text-gray-500">Next: {scheduled.next}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    scheduled.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {scheduled.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm transition-colors duration-200">
              ⚙️ Manage Schedules
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Recent Reports</h3>
          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
            View All Reports →
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generated By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{report.generatedBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{report.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{report.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{report.downloadCount}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => downloadReport(report.id)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Download
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Share
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;