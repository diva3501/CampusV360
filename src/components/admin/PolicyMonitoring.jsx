import React, { useState } from 'react';

const PolicyMonitoring = () => {
  const [selectedMetric, setSelectedMetric] = useState('compliance_overview');

  const complianceMetrics = {
    overall: 94.2,
    naac: 96.8,
    aicte: 92.1,
    nirf: 89.5,
    internal: 97.3
  };

  const policyViolations = [
    {
      id: 1,
      type: 'Activity Submission Deadline',
      severity: 'medium',
      count: 12,
      description: 'Students submitting activities after semester deadline',
      affectedUsers: ['Alice Johnson', 'Bob Smith', 'Carol Davis'],
      lastOccurrence: '2024-01-17',
      trend: 'increasing',
      action: 'Send reminder notifications'
    },
    {
      id: 2,
      type: 'Faculty Review Timeout',
      severity: 'high',
      count: 5,
      description: 'Faculty not reviewing submissions within 7-day policy',
      affectedUsers: ['Dr. Wilson', 'Dr. Martinez'],
      lastOccurrence: '2024-01-16',
      trend: 'stable',
      action: 'Escalate to department head'
    },
    {
      id: 3,
      type: 'Duplicate Activity Submission',
      severity: 'low',
      count: 8,
      description: 'Students attempting to submit same activity multiple times',
      affectedUsers: ['David Chen', 'Eva Rodriguez'],
      lastOccurrence: '2024-01-15',
      trend: 'decreasing',
      action: 'System validation enhancement'
    },
    {
      id: 4,
      type: 'Credit Limit Exceeded',
      severity: 'medium',
      count: 3,
      description: 'Students exceeding maximum credits per semester policy',
      affectedUsers: ['Frank Miller'],
      lastOccurrence: '2024-01-14',
      trend: 'stable',
      action: 'Manual review required'
    }
  ];

  const complianceReports = [
    {
      id: 1,
      title: 'NAAC Criterion 2.6 - Student Performance',
      status: 'compliant',
      score: 96.8,
      lastReview: '2024-01-15',
      nextReview: '2024-04-15',
      issues: 0,
      recommendations: 2
    },
    {
      id: 2,
      title: 'AICTE Approval Process Handbook',
      status: 'compliant',
      score: 92.1,
      lastReview: '2024-01-10',
      nextReview: '2024-07-10',
      issues: 1,
      recommendations: 3
    },
    {
      id: 3,
      title: 'NIRF Data Collection Guidelines',
      status: 'warning',
      score: 89.5,
      lastReview: '2024-01-08',
      nextReview: '2024-03-08',
      issues: 2,
      recommendations: 5
    },
    {
      id: 4,
      title: 'Internal Quality Assurance',
      status: 'compliant',
      score: 97.3,
      lastReview: '2024-01-12',
      nextReview: '2024-02-12',
      issues: 0,
      recommendations: 1
    }
  ];

  const monitoringAlerts = [
    {
      id: 1,
      type: 'Policy Violation',
      message: 'Multiple faculty members exceeding review time limits',
      severity: 'high',
      timestamp: '2024-01-18 14:30',
      status: 'active',
      affectedCount: 5
    },
    {
      id: 2,
      type: 'Compliance Risk',
      message: 'NIRF data submission deadline approaching (7 days)',
      severity: 'medium',
      timestamp: '2024-01-18 09:15',
      status: 'acknowledged',
      affectedCount: 1
    },
    {
      id: 3,
      type: 'System Anomaly',
      message: 'Unusual spike in activity submissions detected',
      severity: 'low',
      timestamp: '2024-01-17 16:45',
      status: 'resolved',
      affectedCount: 23
    },
    {
      id: 4,
      type: 'Data Quality',
      message: 'Incomplete student records affecting compliance metrics',
      severity: 'medium',
      timestamp: '2024-01-17 11:20',
      status: 'in_progress',
      affectedCount: 12
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'non_compliant': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const generateComplianceReport = () => {
    alert('Generating comprehensive compliance report...\n\nThis will include:\n- Policy adherence metrics\n- Violation analysis\n- Recommendations\n- Action items\n\nReport will be ready in 5-10 minutes.');
  };

  return (
    <div className="fade-in space-y-6">
      {/* Compliance Overview */}
      <div className="grid lg:grid-cols-5 gap-6">
        {[
          { 
            title: 'Overall Compliance', 
            value: `${complianceMetrics.overall}%`, 
            icon: '📊', 
            color: 'blue',
            subtitle: 'All policies'
          },
          { 
            title: 'NAAC Standards', 
            value: `${complianceMetrics.naac}%`, 
            icon: '🏛️', 
            color: 'green',
            subtitle: 'Accreditation'
          },
          { 
            title: 'AICTE Guidelines', 
            value: `${complianceMetrics.aicte}%`, 
            icon: '📚', 
            color: 'purple',
            subtitle: 'Regulatory'
          },
          { 
            title: 'NIRF Framework', 
            value: `${complianceMetrics.nirf}%`, 
            icon: '🏆', 
            color: 'orange',
            subtitle: 'Ranking'
          },
          { 
            title: 'Internal Policies', 
            value: `${complianceMetrics.internal}%`, 
            icon: '⚖️', 
            color: 'indigo',
            subtitle: 'Institutional'
          }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 card-hover transition-all duration-300">
            <div className="text-center">
              <div className={`w-12 h-12 bg-${metric.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <p className={`text-2xl font-bold text-${metric.color}-600 mt-1`}>{metric.value}</p>
              <p className="text-xs text-gray-500">{metric.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Monitoring Dashboard Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <h3 className="text-xl font-semibold text-gray-900">Policy Monitoring Dashboard</h3>
          <div className="flex space-x-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="compliance_overview">Compliance Overview</option>
              <option value="policy_violations">Policy Violations</option>
              <option value="risk_assessment">Risk Assessment</option>
              <option value="trend_analysis">Trend Analysis</option>
            </select>
            <button
              onClick={generateComplianceReport}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm transition-colors duration-200"
            >
              📋 Generate Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Policy Violations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Policy Violations</h3>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {policyViolations.length} Active
            </span>
          </div>
          
          <div className="space-y-4">
            {policyViolations.map((violation) => (
              <div key={violation.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{violation.type}</h4>
                    <p className="text-sm text-gray-600 mt-1">{violation.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(violation.severity)}`}>
                      {violation.severity.toUpperCase()}
                    </span>
                    <span className="text-lg">{getTrendIcon(violation.trend)}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Occurrences:</span>
                    <span className="font-medium text-gray-900 ml-2">{violation.count}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last:</span>
                    <span className="font-medium text-gray-900 ml-2">{violation.lastOccurrence}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-700">
                    <strong>Action:</strong> {violation.action}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      Affected: {violation.affectedUsers.length} users
                    </span>
                    <button className="text-purple-600 hover:text-purple-800 text-xs font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Reports */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Compliance Reports</h3>
          
          <div className="space-y-4">
            {complianceReports.map((report) => (
              <div key={report.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                    <div className="flex items-center mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)} mr-3`}>
                        {report.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-lg font-bold text-blue-600">{report.score}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-600">Last Review:</span>
                    <span className="font-medium text-gray-900 ml-2">{report.lastReview}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Next Review:</span>
                    <span className="font-medium text-gray-900 ml-2">{report.nextReview}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex space-x-4">
                    <span className="text-red-600">
                      {report.issues} Issues
                    </span>
                    <span className="text-blue-600">
                      {report.recommendations} Recommendations
                    </span>
                  </div>
                  <button className="text-purple-600 hover:text-purple-800 font-medium">
                    View Report →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monitoring Alerts */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Real-time Monitoring Alerts</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors duration-200">
              Mark All Read
            </button>
            <button className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm transition-colors duration-200">
              Configure Alerts
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {monitoringAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)} mr-3`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{alert.type}</span>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{alert.message}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{alert.timestamp}</span>
                    <span className="mx-2">•</span>
                    <span>Affects {alert.affectedCount} {alert.affectedCount === 1 ? 'item' : 'items'}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  {alert.status === 'active' && (
                    <>
                      <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors duration-200">
                        Acknowledge
                      </button>
                      <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors duration-200">
                        Resolve
                      </button>
                    </>
                  )}
                  <button className="px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm transition-colors duration-200">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Management Tools */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: 'Run Compliance Check', icon: '🔍', action: () => alert('Running comprehensive compliance check...') },
              { label: 'Update Policy Rules', icon: '📝', action: () => alert('Opening policy configuration...') },
              { label: 'Schedule Audit', icon: '📅', action: () => alert('Opening audit scheduler...') },
              { label: 'Export Violations', icon: '📊', action: () => alert('Exporting violation report...') }
            ].map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="w-full p-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center"
              >
                <span className="text-2xl mr-3">{action.icon}</span>
                <span className="font-medium text-gray-900">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Risk Assessment</h3>
          <div className="space-y-4">
            {[
              { risk: 'Data Quality Issues', level: 'Medium', probability: 65, impact: 'Moderate' },
              { risk: 'Compliance Deadline Miss', level: 'Low', probability: 25, impact: 'High' },
              { risk: 'Policy Violation Increase', level: 'High', probability: 85, impact: 'Low' },
              { risk: 'System Downtime', level: 'Low', probability: 15, impact: 'Critical' }
            ].map((risk, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{risk.risk}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    risk.level === 'High' ? 'bg-red-100 text-red-800' :
                    risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {risk.level}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Probability: {risk.probability}%</span>
                    <span>Impact: {risk.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">System Health</h3>
          <div className="space-y-4">
            {[
              { metric: 'Policy Engine Status', value: 'Operational', status: 'good' },
              { metric: 'Monitoring Coverage', value: '98.5%', status: 'good' },
              { metric: 'Alert Response Time', value: '2.3 min', status: 'good' },
              { metric: 'Data Freshness', value: '< 5 min', status: 'good' },
              { metric: 'Compliance Score', value: '94.2%', status: 'warning' }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{metric.metric}</span>
                <div className="flex items-center">
                  <span className="text-gray-700 mr-2">{metric.value}</span>
                  <div className={`w-3 h-3 rounded-full ${
                    metric.status === 'good' ? 'bg-green-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyMonitoring;