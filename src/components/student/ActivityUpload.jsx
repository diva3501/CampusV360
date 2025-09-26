import React, { useState } from 'react';
import './ActivityUpload.css'; 

const ActivityUpload = () => {
  const [formData, setFormData] = useState({
    activityType: '',
    title: '',
    description: '',
    date: '',
    institution: '',
    credits: '',
    file: null
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const activityTypes = [
    { value: 'research', label: 'Research Publication', icon: '📚', credits: '3-5' },
    { value: 'internship', label: 'Industry Internship', icon: '🏢', credits: '2-4' },
    { value: 'mooc', label: 'MOOC Completion', icon: '💻', credits: '1-3' },
    { value: 'certification', label: 'Certification', icon: '🏆', credits: '1-3' },
    { value: 'hackathon', label: 'Hackathon/Competition', icon: '🚀', credits: '1-3' },
    { value: 'volunteer', label: 'Volunteer Work', icon: '🤝', credits: '1-2' },
    { value: 'workshop', label: 'Workshop/Seminar', icon: '🎓', credits: '0.5-2' },
    { value: 'project', label: 'Project Work', icon: '⚙️', credits: '2-4' },
    { value: 'conference', label: 'Conference Presentation', icon: '🎤', credits: '2-4' },
    { value: 'other', label: 'Other', icon: '📋', credits: '1-3' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({ ...prev, file: e.dataTransfer.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          alert('Activity submitted successfully! It will be reviewed by faculty.');
          setFormData({ activityType: '', title: '', description: '', date: '', institution: '', credits: '', file: null });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };
  
  const resetForm = () => {
    setFormData({ activityType: '', title: '', description: '', date: '', institution: '', credits: '', file: null });
  };

  const selectedActivityType = activityTypes.find(type => type.value === formData.activityType);

  return (
    <div className="fade-in">
      <div className="upload-container">
        <div className="upload-header">
          <div className="upload-header-icon">📤</div>
          <h2>Upload New Activity</h2>
          <p>Submit your extracurricular activities and achievements for review</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="upload-form">
            <div>
              <label className="form-label">Select Activity Type <span className="required">*</span></label>
              <div className="grid-container activity-type-grid">
                {activityTypes.map((type) => (
                  <label key={type.value} className="activity-type-label">
                    <input type="radio" name="activityType" value={type.value} checked={formData.activityType === type.value} onChange={handleInputChange} className="sr-only" required />
                    <div className={`activity-type-card ${formData.activityType === type.value ? 'activity-type-card--selected' : ''}`}>
                      <div className="activity-type-icon">{type.icon}</div>
                      <h4 className="activity-type-title">{type.label}</h4>
                      <p className="activity-type-credits">{type.credits} credits</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-grid">
              <div>
                <label className="form-label">Activity Title <span className="required">*</span></label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="form-input" placeholder="Enter activity title" required />
              </div>
              <div>
                <label className="form-label">Date of Activity <span className="required">*</span></label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="form-input" required />
              </div>
            </div>

            <div className="form-grid">
              <div>
                <label className="form-label">Institution/Organization</label>
                <input type="text" name="institution" value={formData.institution} onChange={handleInputChange} className="form-input" placeholder="Name of institution" />
              </div>
              <div>
                <label className="form-label">Expected Credits</label>
                <input type="number" name="credits" value={formData.credits} onChange={handleInputChange} className="form-input" placeholder={selectedActivityType ? selectedActivityType.credits : "0"} min="0" max="10" step="0.5" />
              </div>
            </div>

            <div>
              <label className="form-label">Description <span className="required">*</span></label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={5} className="form-input" placeholder="Provide a detailed description of your activity..." required></textarea>
            </div>

            <div>
              <label className="form-label">Evidence/Certificate Upload <span className="required">*</span></label>
              <div className={`file-drop-zone ${dragActive ? 'file-drop-zone--active' : ''}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" required={!formData.file} />
                <label htmlFor="file-upload" className="file-drop-label">
                  <div className="file-drop-icon">📄</div>
                  <p className="file-drop-text">{formData.file ? 'File Selected!' : 'Click to upload or drag and drop'}</p>
                  <p className="file-drop-hint">PDF, Images, or Documents (Max 10MB)</p>
                  {formData.file && (
                    <div className="selected-file-info">
                      <p>📎 {formData.file.name}</p>
                      <small>{(formData.file.size / 1024 / 1024).toFixed(2)} MB</small>
                    </div>
                  )}
                </label>
              </div>
            </div>
            
            {isUploading && (
              <div className="upload-progress-box">
                <div className="progress-text-container">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fg" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            <div className="guidelines-box">
              <h4>Submission Guidelines</h4>
              <div className="guidelines-grid">
                <ul>
                  <li>✓ Ensure all required fields are completed accurately</li>
                  <li>✓ Upload clear, legible certificates or evidence</li>
                  <li>✓ Provide detailed descriptions for better evaluation</li>
                </ul>
                <ul>
                  <li>✓ Review your submission before submitting</li>
                  <li>✓ Keep original documents for your records</li>
                  <li>✓ Check file size limits and supported formats</li>
                </ul>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={resetForm} className="button button--secondary" disabled={isUploading}>Reset Form</button>
              <button type="submit" className="button button--primary" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="button-icon">🚀</span>
                    Submit for Review
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivityUpload;