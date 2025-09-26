import React, { useState } from 'react';
import './BulkDataImport.css'; 

const BulkDataImport = () => {
  const [selectedImportType, setSelectedImportType] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [validationResults, setValidationResults] = useState(null);

  
  const importTypes = [
    { id: 'students', title: 'Student Data', description: 'Import student information and records.', icon: '🎓', color: 'blue', template: 'student_template.xlsx' },
    { id: 'faculty', title: 'Faculty Data', description: 'Import faculty profiles and assignments.', icon: '👨‍🏫', color: 'green', template: 'faculty_template.xlsx' },
    { id: 'activities', title: 'Activity Records', description: 'Bulk import of student activities.', icon: '🏆', color: 'purple', template: 'activities_template.xlsx' },
  ];
  const importHistory = [
    { id: 1, type: 'Student Data', filename: 'students_batch_2024.xlsx', importedBy: 'Admin User', date: '2025-09-15', status: 'completed', recordsImported: 154, recordsProcessed: 156, errors: 2, warnings: 5 },
    { id: 2, type: 'Activity Records', filename: 'activities_q4_2024.xlsx', importedBy: 'Dr. Smith', date: '2025-09-10', status: 'partial', recordsImported: 325, recordsProcessed: 342, errors: 17, warnings: 23 },
    { id: 3, type: 'Faculty Data', filename: 'faculty_updates.xlsx', importedBy: 'Admin User', date: '2025-09-05', status: 'failed', recordsImported: 0, recordsProcessed: 25, errors: 25, warnings: 0 },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setValidationResults(null); 
      setTimeout(() => { 
        setValidationResults({
          validRows: 154, errors: 2, warnings: 5,
          errorDetails: ['Row 23: Missing "Email"', 'Row 67: Invalid department code'],
          warningDetails: ['Row 12: CGPA value seems high (9.8)', 'Row 45: Unusual character in name', 'Row 78: Future enrollment date'],
        });
      }, 1500);
    }
  };

  const startImport = () => {
    setIsImporting(true);
    setImportProgress(0);
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          alert('Import completed!');
          
          setUploadedFile(null);
          setSelectedImportType('');
          setValidationResults(null);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const getStatusClass = (status) => `status-badge--${status}`;
  const colorConfig = {
    blue: { color: '#2563eb', bg: '#dbeafe' },
    green: { color: '#16a34a', bg: '#dcfce7' },
    purple: { color: '#9333ea', bg: '#f3e8ff' },
    orange: { color: '#ea580c', bg: '#ffedd5' },
    red: { color: '#dc2626' },
    yellow: { color: '#ca8a04' },
  };

  return (
    <div className="import-container fade-in">
      {/* Summary Cards */}
      <div className="summary-grid">
        {[
          { title: 'Total Imports', value: '1,247', icon: '📊', color: 'blue' },
          { title: 'This Month', value: '89', icon: '📅', color: 'green' },
          { title: 'Records Processed', value: '45,678', icon: '📋', color: 'purple' },
          { title: 'Success Rate', value: '94.2%', icon: '✅', color: 'orange' },
        ].map((stat, i) => (
          <div key={i} className="summary-card">
            <div className="summary-icon" style={{ backgroundColor: colorConfig[stat.color].bg }}><span>{stat.icon}</span></div>
            <p className="summary-title">{stat.title}</p>
            <p className="summary-value" style={{ color: colorConfig[stat.color].color }}>{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="main-grid">
        {/* Import Configuration */}
        <div className="card import-workflow-card">
          <h3 className="card-header">Bulk Data Import</h3>
          <div className="workflow-steps">
            <div>
              <label className="form-label">Step 1: Select Import Type <span className="required">*</span></label>
              <div className="import-type-list">
                {importTypes.map((type) => (
                  <label key={type.id}>
                    <input type="radio" name="importType" value={type.id} checked={selectedImportType === type.id} onChange={(e) => setSelectedImportType(e.target.value)} className="sr-only"/>
                    <div className={`import-type-card ${selectedImportType === type.id ? `import-type-card--selected-${type.color}` : ''}`}>
                      <div className="import-type-icon" style={{ backgroundColor: colorConfig[type.color].bg }}><span>{type.icon}</span></div>
                      <div>
                        <h4>{type.title}</h4>
                        <p>{type.description}</p>
                        <button onClick={() => alert(`Downloading ${type.template}`)} className="link-button">📥 Download Template</button>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="form-label">Step 2: Upload Data File <span className="required">*</span></label>
              <div className="file-drop-zone">
                <input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" accept=".xlsx,.xls,.csv" />
                <label htmlFor="file-upload" className="file-drop-label">
                  <div className="file-drop-icon">📄</div>
                  <p>Click to upload or drag and drop</p>
                  {uploadedFile && <strong className="selected-file-name">Selected: {uploadedFile.name}</strong>}
                </label>
              </div>
            </div>

            {validationResults && (
              <div className="validation-results">
                <h4>📊 File Validation Results</h4>
                <div className="validation-summary">
                  <div><strong style={{color: colorConfig.green.color}}>{validationResults.validRows}</strong><span>Valid Records</span></div>
                  <div><strong style={{color: colorConfig.red.color}}>{validationResults.errors}</strong><span>Errors</span></div>
                  <div><strong style={{color: colorConfig.yellow.color}}>{validationResults.warnings}</strong><span>Warnings</span></div>
                </div>
                {validationResults.errors > 0 && (
                  <div className="validation-details validation-details--error"><h5>❌ Errors (must fix before import):</h5><ul>{validationResults.errorDetails.map((e, i) => <li key={i}>• {e}</li>)}</ul></div>
                )}
                {validationResults.warnings > 0 && (
                  <div className="validation-details validation-details--warning"><h5>⚠️ Warnings (review recommended):</h5><ul>{validationResults.warningDetails.map((w, i) => <li key={i}>• {w}</li>)}</ul></div>
                )}
              </div>
            )}

            {isImporting && (
              <div className="import-progress-box">
                <h4>🔄 Import in Progress</h4>
                <div className="progress-bar-bg"><div className="progress-bar-fg" style={{ width: `${importProgress}%` }}></div></div>
                <p>{importProgress}% complete</p>
              </div>
            )}

            <div>
              <label className="form-label">Step 3: Start Import</label>
              <button onClick={startImport} disabled={!uploadedFile || !selectedImportType || isImporting || (validationResults && validationResults.errors > 0)} className="button button--primary import-button">
                {isImporting ? '🔄 Importing...' : '🚀 Start Import'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Guidelines & History */}
        <div className="side-content">
          <div className="card">
            <h3 className="card-header">Import Guidelines</h3>
            <div className="guidelines-list">
              <div className="guideline-box guideline-box--info"><h4>📋 Requirements</h4><ul><li>• Use provided Excel templates</li><li>• First row must be headers</li><li>• Required fields cannot be empty</li></ul></div>
              <div className="guideline-box guideline-box--warning"><h4>⚠️ Important Notes</h4><ul><li>• Always backup data before import</li><li>• Duplicate records will be skipped</li><li>• Import process cannot be undone</li></ul></div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-header">Quick Actions</h3>
            <div className="quick-actions-grid">
              <button className="quick-action-button">📥 Download All Templates</button>
              <button className="quick-action-button">📋 View Import Logs</button>
            </div>
          </div>
        </div>
      </div>

      {/* Import History */}
      <div className="card">
        <div className="card-header-row">
          <h3>Import History</h3>
          <button className="link-button">View All History →</button>
        </div>
        <div className="table-wrapper">
          <table className="history-table">
            <thead><tr><th>Type</th><th>File</th><th>By</th><th>Date</th><th>Status</th><th>Records</th><th>Issues</th><th>Actions</th></tr></thead>
            <tbody>
              {importHistory.map((record) => (
                <tr key={record.id}>
                  <td data-label="Type">{record.type}</td>
                  <td data-label="File">{record.filename}</td>
                  <td data-label="By">{record.importedBy}</td>
                  <td data-label="Date">{record.date}</td>
                  <td data-label="Status"><span className={`status-badge ${getStatusClass(record.status)}`}>{record.status}</span></td>
                  <td data-label="Records">{record.recordsImported}/{record.recordsProcessed}</td>
                  <td data-label="Issues">
                    {record.errors > 0 && <span className="issue-tag issue-tag--error">{record.errors} errors</span>}
                    {record.warnings > 0 && <span className="issue-tag issue-tag--warning">{record.warnings} warnings</span>}
                  </td>
                  <td data-label="Actions"><div className="table-actions"><button className="link-button">View Log</button>{record.status === 'failed' && <button className="link-button">Retry</button>}</div></td>
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