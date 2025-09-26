import React, { useState } from 'react';

const CreditAwarding = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [reason, setReason] = useState('');
  const [activityType, setActivityType] = useState('');

  const [students] = useState([
    { id: 1, name: 'Alice Johnson', rollNumber: 'CS21B045', currentCredits: 116 },
    { id: 2, name: 'Bob Smith', rollNumber: 'CS21B028', currentCredits: 112 },
    { id: 3, name: 'Carol Davis', rollNumber: 'CS21B067', currentCredits: 120 },
    { id: 4, name: 'David Wilson', rollNumber: 'CS21B089', currentCredits: 108 },
    { id: 5, name: 'Eva Martinez', rollNumber: 'CS21B023', currentCredits: 114 },
  ]);

  const [recentAwards] = useState([
    {
      id: 1,
      studentName: 'Alice Johnson',
      rollNumber: 'CS21B045',
      credits: 3,
      reason: 'Machine Learning Certification completion',
      date: '2024-01-18',
      faculty: 'Dr. Smith'
    },
    {
      id: 2,
      studentName: 'Carol Davis',
      rollNumber: 'CS21B067',
      credits: 2,
      reason: 'Outstanding performance in hackathon',
      date: '2024-01-15',
      faculty: 'Dr. Smith'
    },
    {
      id: 3,
      studentName: 'Bob Smith',
      rollNumber: 'CS21B028',
      credits: 4,
      reason: 'Industry internship completion',
      date: '2024-01-12',
      faculty: 'Dr. Smith'
    }
  ]);

  const activityTypes = [
    'MOOC Completion',
    'Industry Internship',
    'Research Publication',
    'Conference Presentation',
    'Hackathon/Competition',
    'Workshop/Seminar',
    'Volunteer Work',
    'Open Source Contribution',
    'Certification',
    'Other'
  ];

  const handleAwardCredits = (e) => {
    e.preventDefault();
    if (!selectedStudent || !creditAmount || !reason) {
      alert('Please fill in all required fields');
      return;
    }

    const student = students.find(s => s.id === parseInt(selectedStudent));
    alert(`Successfully awarded ${creditAmount} credits to ${student.name} for: ${reason}`);
    
    // Reset form
    setSelectedStudent('');
    setCreditAmount('');
    setReason('');
    setActivityType('');
  };

  const handleBulkAward = () => {
    alert('Bulk credit awarding feature would be implemented here');
  };

  return (
    <div className="fade-in space-y-6">
      {/* Statistics */}
      <div className="grid lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Credits Awarded Today', 
            value: '15', 
            icon: '🏆', 
            color: 'green',
            subtitle: 'To 8 students'
          },
          { 
            title: 'This Week', 
            value: '47', 
            icon: '📊', 
            color: 'blue',
            subtitle: '23 students'
          },
          { 
            title: 'This Month', 
            value: '156', 
            icon: '⭐', 
            color: 'purple',
            subtitle: '89 students'
          },
          { 
            title: 'Average Award', 
            value: '2.8', 
            icon: '📈', 
            color: 'orange',
            subtitle: 'Credits per activity'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 card-hover transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Credit Awarding Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Award Academic Credits</h3>
            <p className="text-gray-600">Recognize student achievements with credit points</p>
          </div>

          <form onSubmit={handleAwardCredits} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Choose a student...</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.rollNumber}) - Current: {student.currentCredits} credits
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Type
                </label>
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select activity type...</option>
                  {activityTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credits to Award <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.5 - 10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Credit Award <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe the achievement or activity that merits credit award..."
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">📝 Credit Awarding Guidelines</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• MOOC/Certifications: 1-3 credits</li>
                <li>• Internships: 2-4 credits</li>
                <li>• Research Publications: 3-5 credits</li>
                <li>• Hackathons/Competitions: 1-3 credits</li>
                <li>• Conference Presentations: 2-4 credits</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                🏆 Award Credits
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedStudent('');
                  setCreditAmount('');
                  setReason('');
                  setActivityType('');
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Recent Awards */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Credit Awards</h3>
            <button
              onClick={handleBulkAward}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors duration-200"
            >
              Bulk Award
            </button>
          </div>

          <div className="space-y-4">
            {recentAwards.map((award) => (
              <div key={award.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{award.studentName}</h4>
                    <p className="text-sm text-gray-600">{award.rollNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-600">+{award.credits}</span>
                    <p className="text-xs text-gray-500">credits</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{award.reason}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Awarded by {award.faculty}</span>
                  <span>{award.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
              View All Awards History →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Award Presets</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'MOOC Completion', credits: 2, description: 'Standard online course completion' },
            { title: 'Hackathon Winner', credits: 3, description: 'First place in competition' },
            { title: 'Research Publication', credits: 4, description: 'Peer-reviewed journal/conference' },
            { title: 'Industry Internship', credits: 3, description: 'Completed internship program' }
          ].map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                setCreditAmount(preset.credits.toString());
                setReason(preset.description);
                setActivityType(preset.title);
              }}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 text-center"
            >
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-medium text-gray-900 mb-1">{preset.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{preset.description}</p>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {preset.credits} credits
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Credit Distribution Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Credit Distribution Analysis</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h4 className="font-semibold text-gray-900">Academic Activities</h4>
            <p className="text-2xl font-bold text-blue-600 mt-2">65%</p>
            <p className="text-sm text-gray-600">MOOCs, Certifications</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏢</span>
            </div>
            <h4 className="font-semibold text-gray-900">Industry Experience</h4>
            <p className="text-2xl font-bold text-purple-600 mt-2">25%</p>
            <p className="text-sm text-gray-600">Internships, Projects</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h4 className="font-semibold text-gray-900">Competitions</h4>
            <p className="text-2xl font-bold text-green-600 mt-2">10%</p>
            <p className="text-sm text-gray-600">Hackathons, Contests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditAwarding;