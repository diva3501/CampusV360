import React, { useState } from 'react';

const BulkDataImport = () => {
  const [selectedImportType, setSelectedImportType] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [validationResults, setValidationResults] = useState(null);

  const importTypes = [
    {
      id: 'students',
      title: 'Student Data',
      description: 'Import student information, enrollment details, and academic records',
      icon: '🎓',
      color: 'blue',
      template: 'student_template.xlsx',
      fields: ['Name', 'Roll Number', 'Email', 'Department', 'Semester', 'CGPA'],
      sampleData: '156 students imported last time'
    },
    {
      id: 'faculty',
      title: 'Faculty Data',
      description: 'Import faculty profiles, department assignments, and permissions',
      icon: '👨‍🏫',
      color: 'green',
      template: 'faculty_template.xlsx',
      fields: ['Name', 'Employee ID', 'Email', 'Department', 'Designation', 'Permissions'],
      sampleData: '23 faculty members imported last time'
    },
    {
      id: 'activities',
      title: 'Activity Records',
      description: 'Bulk import of student activities and achievements',
      icon: '🏆',
      color: 'purple',
      template: 'activities_template.xlsx',
      fields: ['Student ID', 'Activity Title', 'Type', 'Date', 'Institution', 'Credits'],
      sampleData: '342 activities imported last time'
    },
    {
      id: 'departments',
      title: 'Department Structure',
      description: 'Import department information and organizational hierarchy',
      icon: '🏢',
      color: 'orange',
      template: 'departments_template.xlsx',
      fields: ['Department Name', 'Code', 'Head', 'Established', 'Programs'],
      sampleData: '8 departments updated last time'
    }
  ];

  const importHistory = [
    {
      id: 1,
      type: 'Student Data',
      filename: 'students_batch_2024.xlsx',
      importedBy: 'Admin User',
      date: '2024-01-15',
      status: 'completed',
      recordsProcessed: 156,
      recordsImported: 154,
      errors: 2,
      warnings: 5
    },
    {
      id: 2,
      type: 'Activity Records',
      filename: 'activities_q4_2023.xlsx',
      importedBy: 'Dr. Smith',
      date: '2024-01-10',
      status: 'completed',
      recordsProcessed: 342,
      recordsImported: 325,
      errors: 17,
      warnings: 23
    },
    {
      id: 3,
      type: 'Faculty Data',
      filename: 'faculty_updates.xlsx',
      importedBy: 'Admin User',
      date: '2024-01-05',
      status: 'partial',
      recordsProcessed: 25,
      recordsImported: 20,
      errors: 5,
      warnings: 8
    },
    {
      id: 4,
      type: 'Student Data',
      filename: 'new_admissions.xlsx',
      importedBy: 'Registrar',
      date: '2023-12-28',
      status: 'failed',
      recordsProcessed: 89,
      recordsImported: 0,
      errors: 89,
      warnings: 0
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Simulate file validation
      setTimeout(() => {
        setValidationResults({
          totalRows: 156,
          validRows: 154,
          errors: 2,
          warnings: 5,
          errorDetails: [
            'Row 23: Missing required field "Email"',
            'Row 67: Invalid department code "XYZ"'
          ],
          warningDetails: [
            'Row 12: CGPA value seems high (9.8)',
            'Row 45: Unusual character in name field',
            'Row 78: Future enrollment date',
            'Row 89: Duplicate roll number detected',
            'Row 134: Missing optional field "Phone"'
          ]
        });
      }, 1500);
    }
  };

  const startImport = () => {
    if (!uploadedFile || !selectedImportType) {
      alert('Please select import type and upload a file');
      return;
    }

    setIsImporting(true);
    setImportProgress(0);

    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          alert(`Import completed successfully!\n\n${validationResults.validRows} records imported\n${validationResults.errors} errors\n${validationResults.warnings} warnings`);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const downloadTemplate = (templateFile) => {
    alert(`Downloading ${templateFile}...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fade-in space-y-6">
      {/* Import Statistics */}
      <div className="grid lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Total Imports', 
            value: '1,247', 
            icon: '📊', 
            color: 'blue',
            subtitle: 'All time'
          },
          { 
            title: 'This Month', 
            value: '89', 
            icon: '📅', 
            color: 'green',
            subtitle: 'Successful imports'
          },
          { 
            title: 'Records Processed', 
            value: '45,678', 
            icon: '📋', 
            color: 'purple',
            subtitle: 'Total records'
          },
          { 
            title: 'Success Rate', 
            value: '94.2%', 
            icon: '✅', 
            color: 'orange',
            
            subtitle: 'Import accuracy'
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
        {/* Import Configuration */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Bulk Data Import</h3>
            <p className="text-gray-600">Import large datasets efficiently with validation and error handling</p>
          </div>

          <div className="space-y-6">
            {/* Import Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Import Type <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {importTypes.map((type) => (
                  <label key={type.id} className="relative">
                    <input
                      type="radio"
                      name="importType"
                      value={type.id}
                      checked={selectedImportType === type.id}
                      onChange={(e) => setSelectedImportType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedImportType === type.id 
                        ? `border-${type.color}-500 bg-${type.color}-50` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg bg-${type.color}-100 mr-3`}>
                          <span className="text-xl">{type.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{type.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                          <p className="text-xs text-gray-500 mt-2">{type.sampleData}</p>
                          <button
                            onClick={() => downloadTemplate(type.template)}
                            className="text-xs text-blue-600 hover:text-blue-800 mt-2"
                          >
                            📥 Download Template
                          </button>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Data File <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-200">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".xlsx,.xls,.csv"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-4xl text-gray-400 mb-2">📄</div>
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">Excel (.xlsx, .xls) or CSV files only</p>
                  {uploadedFile && (
                    <p className="text-sm text-purple-600 mt-2 font-medium">
                      Selected: {uploadedFile.name}
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* Validation Results */}
            {validationResults && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">📊 File Validation Results</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{validationResults.validRows}</p>
                    <p className="text-sm text-gray-600">Valid Records</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{validationResults.errors}</p>
                    <p className="text-sm text-gray-600">Errors</p>
                  </div>
                </div>
                
                {validationResults.errors > 0 && (
                  <div className="mb-4">
                    <h5 className="font-medium text-red-900 mb-2">❌ Errors (must fix before import):</h5>
                    <ul className="text-sm text-red-800 space-y-1">
                      {validationResults.errorDetails.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {validationResults.warnings > 0 && (
                  <div>
                    <h5 className="font-medium text-yellow-900 mb-2">⚠️ Warnings (review recommended):</h5>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      {validationResults.warningDetails.slice(0, 3).map((warning, index) => (
                        <li key={index}>• {warning}</li>
                      ))}
                      {validationResults.warningDetails.length > 3 && (
                        <li>• ... and {validationResults.warningDetails.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Import Progress */}
            {isImporting && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3">🔄 Import in Progress</h4>
                <div className="bg-blue-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${importProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-blue-800">{importProgress}% complete</p>
              </div>
            )}

            {/* Import Button */}
            <button
              onClick={startImport}
              disabled={!uploadedFile || !selectedImportType || isImporting || (validationResults && validationResults.errors > 0)}
              className={`w-full py-3 px-6 rounded-lg transition-colors duration-200 font-medium ${
                !uploadedFile || !selectedImportType || isImporting || (validationResults && validationResults.errors > 0)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              {isImporting ? '🔄 Importing...' : '🚀 Start Import'}
            </button>
          </div>
        </div>

        {/* Import Guidelines & Templates */}
        <div className="space-y-6">
          {/* Data Format Guidelines */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Import Guidelines</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">📋 File Format Requirements</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use provided Excel templates for best results</li>
                  <li>• First row must contain column headers</li>
                  <li>• Required fields cannot be empty</li>
                  <li>• Date format: YYYY-MM-DD</li>
                  <li>• Maximum file size: 50MB</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">⚠️ Important Notes</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Always backup existing data before import</li>
                  <li>• Duplicate records will be skipped</li>
                  <li>• Import process cannot be undone</li>
                  <li>• Large files may take several minutes</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">✅ Best Practices</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Validate data in smaller batches first</li>
                  <li>• Review error logs after import</li>
                  <li>• Schedule imports during low-usage hours</li>
                  <li>• Keep original files for reference</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Download All Templates', icon: '📥', action: () => alert('Downloading template package...') },
                { label: 'View Import Logs', icon: '📋', action: () => alert('Opening import logs...') },
                { label: 'Data Backup', icon: '💾', action: () => alert('Starting data backup...') },
                { label: 'Import Schedule', icon: '⏰', action: () => alert('Opening import scheduler...') }
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{action.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Import History */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Import History</h3>
          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
            View All History →
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Import Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imported By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Records</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issues</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {importHistory.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {record.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {record.filename}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {record.importedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {record.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.recordsImported}/{record.recordsProcessed}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {record.errors > 0 && (
                      <span className="text-red-600 mr-2">{record.errors} errors</span>
                    )}
                    {record.warnings > 0 && (
                      <span className="text-yellow-600">{record.warnings} warnings</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-purple-600 hover:text-purple-900">View Log</button>
                      {record.status === 'failed' && (
                        <button className="text-green-600 hover:text-green-900">Retry</button>
                      )}
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

export default BulkDataImport;