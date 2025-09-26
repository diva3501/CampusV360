import React, { useState } from 'react';

const ApprovalPanel = () => {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      student: {
        name: 'Alice Johnson',
        rollNumber: 'CS21B045',
        branch: 'Computer Science'
      },
      activity: {
        title: 'Machine Learning Specialization',
        type: 'MOOC Completion',
        date: '2024-01-15',
        institution: 'Coursera - Stanford University',
        expectedCredits: 3,
        description: 'Completed comprehensive ML course covering supervised and unsupervised learning, neural networks, and practical applications.'
      },
      submittedDate: '2024-01-16',
      status: 'pending',
      priority: 'high',
      documents: ['certificate.pdf', 'course_transcript.pdf']
    },
    {
      id: 2,
      student: {
        name: 'Bob Smith',
        rollNumber: 'CS21B028',
        branch: 'Computer Science'
      },
      activity: {
        title: 'Summer Internship at Microsoft',
        type: 'Industry Internship',
        date: '2024-01-10',
        institution: 'Microsoft Corporation',
        expectedCredits: 4,
        description: 'Three-month internship in the Azure team, working on cloud infrastructure and DevOps practices.'
      },
      submittedDate: '2024-01-12',
      status: 'under_review',
      priority: 'high',
      documents: ['internship_certificate.pdf', 'project_report.pdf', 'recommendation_letter.pdf']
    },
    {
      id: 3,
      student: {
        name: 'Carol Davis',
        rollNumber: 'CS21B067',
        branch: 'Computer Science'
      },
      activity: {
        title: 'IEEE Conference Paper Presentation',
        type: 'Conference Presentation',
        date: '2024-01-08',
        institution: 'IEEE International Conference',
        expectedCredits: 3,
        description: 'Presented research paper on "Advanced Algorithms for Network Security" at international conference.'
      },
      submittedDate: '2024-01-09',
      status: 'pending',
      priority: 'medium',
      documents: ['conference_certificate.pdf', 'paper_abstract.pdf']
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const [awardedCredits, setAwardedCredits] = useState('');

  const handleApprove = (submissionId) => {
    const credits = parseInt(awardedCredits) || 0;
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { 
            ...sub, 
            status: 'approved', 
            reviewComment,
            awardedCredits: credits,
            reviewDate: new Date().toISOString().split('T')[0]
          } 
        : sub
    ));
    resetReviewForm();
    alert(`Activity approved with ${credits} credits!`);
  };

  const handleReject = (submissionId) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { 
            ...sub, 
            status: 'rejected', 
            reviewComment,
            reviewDate: new Date().toISOString().split('T')[0]
          } 
        : sub
    ));
    resetReviewForm();
    alert('Activity rejected with feedback sent to student.');
  };

  const resetReviewForm = () => {
    setSelectedSubmission(null);
    setReviewComment('');
    setAwardedCredits('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const pendingSubmissions = submissions.filter(s => s.status === 'pending' || s.status === 'under_review');

  return (
    <div className="fade-in space-y-6">
      {/* Statistics */}
      <div className="grid lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Pending Review', 
            value: submissions.filter(s => s.status === 'pending').length, 
            icon: '⏳', 
            color: 'yellow' 
          },
          { 
            title: 'Under Review', 
            value: submissions.filter(s => s.status === 'under_review').length, 
            icon: '👀', 
            color: 'blue' 
          },
          { 
            title: 'Approved Today', 
            value: submissions.filter(s => s.status === 'approved').length, 
            icon: '✅', 
            color: 'green' 
          },
          { 
            title: 'High Priority', 
            value: submissions.filter(s => s.priority === 'high').length, 
            icon: '🔥', 
            color: 'red' 
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 card-hover transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-3xl font-bold text-${stat.color}-600 mt-1`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Student Submissions</h3>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>All Submissions</option>
              <option>Pending Review</option>
              <option>High Priority</option>
              <option>Under Review</option>
            </select>
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors duration-200">
              Bulk Actions
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {pendingSubmissions.map((submission) => (
            <div key={submission.id} className={`p-6 border-l-4 ${getPriorityColor(submission.priority)} hover:bg-gray-50 transition-colors duration-200`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 mr-3">
                      {submission.activity.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                      {submission.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      submission.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      submission.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {submission.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>Student:</strong> {submission.student.name} ({submission.student.rollNumber})
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Activity Type:</strong> {submission.activity.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Institution:</strong> {submission.activity.institution}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>Activity Date:</strong> {submission.activity.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Submitted:</strong> {submission.submittedDate}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Expected Credits:</strong> {submission.activity.expectedCredits}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4">
                    <strong>Description:</strong> {submission.activity.description}
                  </p>

                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm font-medium text-gray-700">Documents:</span>
                    {submission.documents.map((doc, index) => (
                      <button key={index} className="text-blue-600 hover:text-blue-800 text-sm underline">
                        📄 {doc}
                      </button>
                    ))}
                  </div>

                  {selectedSubmission === submission.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-3">Review & Decision</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Award Credits (0-{submission.activity.expectedCredits})
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={submission.activity.expectedCredits}
                            value={awardedCredits}
                            onChange={(e) => setAwardedCredits(e.target.value)}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Review Comments
                          </label>
                          <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            rows={3}
                            placeholder="Add your review comments, feedback, or reasons for decision..."
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {selectedSubmission === submission.id ? (
                    <>
                      <button
                        onClick={() => handleApprove(submission.id)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors duration-200"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleReject(submission.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors duration-200"
                      >
                        ❌ Reject
                      </button>
                      <button
                        onClick={resetReviewForm}
                        className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedSubmission(submission.id)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors duration-200"
                    >
                      📝 Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {pendingSubmissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No pending submissions to review at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalPanel;