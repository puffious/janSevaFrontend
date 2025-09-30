import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, User, AlertTriangle, CheckCircle, Clock, Camera, MessageSquare, ArrowLeft, Edit } from 'lucide-react';

const IssueDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState('');

  // Mock data for issue detail
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockIssue = {
        id: parseInt(id),
        title: "Pothole on Main Street",
        description: "Large pothole causing traffic issues near the intersection. The pothole is approximately 2 feet wide and 6 inches deep, creating a hazard for vehicles and motorcycles. Multiple citizens have reported damage to their vehicles.",
        category: "Roads",
        status: "in-progress",
        priority: "high",
        location: {
          lat: 12.9716,
          lng: 77.5946,
          address: "Main Street, Ward 5",
          landmark: "Near City Bank ATM"
        },
        ward: "Ward 5",
        reportedBy: {
          name: "John Citizen",
          phone: "+91-9876543210",
          email: "john.citizen@email.com"
        },
        reportedDate: "2024-01-15T10:30:00Z",
        assignedTo: {
          name: "Mike Johnson",
          phone: "+91-9876543212",
          role: "Road Maintenance Supervisor"
        },
        assignedDate: "2024-01-15T14:00:00Z",
        images: [
          "https://via.placeholder.com/400x300?text=Pothole+Image+1",
          "https://via.placeholder.com/400x300?text=Pothole+Image+2",
          "https://via.placeholder.com/400x300?text=Pothole+Image+3"
        ],
        progressImages: [
          "https://via.placeholder.com/400x300?text=Work+Started"
        ],
        timeline: [
          {
            date: "2024-01-15T10:30:00Z",
            action: "Issue reported",
            user: "John Citizen",
            type: "report",
            details: "Issue reported by citizen via mobile app"
          },
          {
            date: "2024-01-15T11:15:00Z",
            action: "Issue verified",
            user: "Admin",
            type: "verification",
            details: "Field verification completed. Issue confirmed as high priority."
          },
          {
            date: "2024-01-15T14:00:00Z",
            action: "Assigned to Mike Johnson",
            user: "Supervisor",
            type: "assignment",
            details: "Assigned to road maintenance team lead"
          },
          {
            date: "2024-01-16T09:00:00Z",
            action: "Work started",
            user: "Mike Johnson",
            type: "progress",
            details: "Repair work commenced. Materials delivered to site."
          },
          {
            date: "2024-01-16T15:30:00Z",
            action: "Progress update",
            user: "Mike Johnson",
            type: "progress",
            details: "50% completion. Pothole filled, awaiting asphalt compaction."
          }
        ],
        comments: [
          {
            id: 1,
            user: "John Citizen",
            date: "2024-01-15T12:00:00Z",
            message: "Thank you for the quick response. This has been a problem for weeks."
          },
          {
            id: 2,
            user: "Mike Johnson",
            date: "2024-01-16T09:15:00Z",
            message: "Work has started. We expect to complete the repair by end of day today."
          }
        ],
        estimatedCompletion: "2024-01-17T17:00:00Z",
        tags: ["traffic-hazard", "urgent", "main-road"]
      };
      setIssue(mockIssue);
      setLoading(false);
    }, 1000);
  }, [id]);

  const getStatusBadge = (status) => {
    const statusColors = {
      new: { backgroundColor: '#ffeaa7', color: '#2d3436' },
      verified: { backgroundColor: '#74b9ff', color: 'white' },
      assigned: { backgroundColor: '#fd79a8', color: 'white' },
      'in-progress': { backgroundColor: '#fdcb6e', color: '#2d3436' },
      resolved: { backgroundColor: '#00b894', color: 'white' }
    };

    const colors = statusColors[status] || { backgroundColor: '#ddd', color: '#333' };

    return (
      <span style={{
        ...styles.statusBadge,
        ...colors
      }}>
        {status.replace('-', ' ').toUpperCase()}
      </span>
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = () => {
    if (!statusUpdate) return;

    const newTimelineEntry = {
      date: new Date().toISOString(),
      action: `Status updated to ${statusUpdate}`,
      user: user.name,
      type: 'status-update',
      details: `Status changed from ${issue.status} to ${statusUpdate}`
    };

    setIssue(prev => ({
      ...prev,
      status: statusUpdate,
      timeline: [...prev.timeline, newTimelineEntry]
    }));

    setShowUpdateModal(false);
    setStatusUpdate('');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      user: user.name,
      date: new Date().toISOString(),
      message: newComment
    };

    setIssue(prev => ({
      ...prev,
      comments: [...prev.comments, newCommentObj]
    }));

    setNewComment('');
  };

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'report': return <AlertTriangle size={16} />;
      case 'verification': return <CheckCircle size={16} />;
      case 'assignment': return <User size={16} />;
      case 'progress': return <Clock size={16} />;
      case 'status-update': return <Edit size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <p>Loading issue details...</p>
        </div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h2>Issue not found</h2>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back to Issues
        </button>
        <div style={styles.headerActions}>
          {user.role !== 'staff' && (
            <button
              style={styles.updateButton}
              onClick={() => setShowUpdateModal(true)}
            >
              <Edit size={16} />
              Update Status
            </button>
          )}
        </div>
      </div>

      <div style={styles.content}>
        {/* Main Issue Details */}
        <div style={styles.mainSection}>
          <div style={styles.issueHeader}>
            <div style={styles.issueTitle}>
              <h1>Issue #{issue.id}: {issue.title}</h1>
              <div style={styles.badges}>
                {getStatusBadge(issue.status)}
                <span style={{
                  ...styles.priorityBadge,
                  backgroundColor: getPriorityColor(issue.priority),
                  color: issue.priority === 'medium' ? '#000' : '#fff'
                }}>
                  {issue.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>
          </div>

          <div style={styles.issueDescription}>
            <h3>Description</h3>
            <p>{issue.description}</p>
          </div>

          {/* Issue Details Grid */}
          <div style={styles.detailsGrid}>
            <div style={styles.detailCard}>
              <h4>Location</h4>
              <div style={styles.detailItem}>
                <MapPin size={16} />
                <div>
                  <div>{issue.location.address}</div>
                  {issue.location.landmark && (
                    <div style={styles.landmark}>Near: {issue.location.landmark}</div>
                  )}
                </div>
              </div>
            </div>

            <div style={styles.detailCard}>
              <h4>Reporter</h4>
              <div style={styles.detailItem}>
                <User size={16} />
                <div>
                  <div>{issue.reportedBy.name}</div>
                  <div style={styles.contactInfo}>{issue.reportedBy.phone}</div>
                </div>
              </div>
            </div>

            <div style={styles.detailCard}>
              <h4>Reported</h4>
              <div style={styles.detailItem}>
                <Calendar size={16} />
                <div>{formatDate(issue.reportedDate)}</div>
              </div>
            </div>

            {issue.assignedTo && (
              <div style={styles.detailCard}>
                <h4>Assigned To</h4>
                <div style={styles.detailItem}>
                  <User size={16} />
                  <div>
                    <div>{issue.assignedTo.name}</div>
                    <div style={styles.roleInfo}>{issue.assignedTo.role}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Images Section */}
          {issue.images && issue.images.length > 0 && (
            <div style={styles.imagesSection}>
              <h3><Camera size={20} /> Issue Images</h3>
              <div style={styles.imagesGrid}>
                {issue.images.map((image, index) => (
                  <img key={index} src={image} alt={`Issue ${index + 1}`} style={styles.imagePreview} />
                ))}
              </div>
            </div>
          )}

          {/* Progress Images */}
          {issue.progressImages && issue.progressImages.length > 0 && (
            <div style={styles.imagesSection}>
              <h3><Camera size={20} /> Progress Images</h3>
              <div style={styles.imagesGrid}>
                {issue.progressImages.map((image, index) => (
                  <img key={index} src={image} alt={`Progress ${index + 1}`} style={styles.imagePreview} />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {issue.tags && issue.tags.length > 0 && (
            <div style={styles.tagsSection}>
              <h4>Tags</h4>
              <div style={styles.chipContainer}>
                {issue.tags.map((tag, index) => (
                  <span key={index} style={styles.chip}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Timeline */}
          <div style={styles.timelineSection}>
            <h3>Timeline</h3>
            <div style={styles.timeline}>
              {issue.timeline.map((event, index) => (
                <div key={index} style={styles.timelineItem}>
                  <div style={styles.timelineIcon}>
                    {getTimelineIcon(event.type)}
                  </div>
                  <div style={styles.timelineContent}>
                    <div style={styles.timelineAction}>{event.action}</div>
                    <div style={styles.timelineUser}>by {event.user}</div>
                    <div style={styles.timelineDate}>{formatDateShort(event.date)}</div>
                    {event.details && (
                      <div style={styles.timelineDetails}>{event.details}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div style={styles.commentsSection}>
            <h3><MessageSquare size={20} /> Comments</h3>
            <div style={styles.comments}>
              {issue.comments.map((comment) => (
                <div key={comment.id} style={styles.comment}>
                  <div style={styles.commentHeader}>
                    <strong>{comment.user}</strong>
                    <span style={styles.commentDate}>{formatDateShort(comment.date)}</span>
                  </div>
                  <div style={styles.commentMessage}>{comment.message}</div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div style={styles.addComment}>
              <textarea
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <button
                style={styles.commentButton}
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showUpdateModal && (
        <div style={styles.modalOverlay} onClick={() => setShowUpdateModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2>Update Issue Status</h2>
              <button style={styles.closeButton} onClick={() => setShowUpdateModal(false)}>
                ×
              </button>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.formGroup}>
                <label>Current Status: {getStatusBadge(issue.status)}</label>
              </div>
              <div style={styles.formGroup}>
                <label>New Status:</label>
                <select
                  style={styles.input}
                  value={statusUpdate}
                  onChange={(e) => setStatusUpdate(e.target.value)}
                >
                  <option value="">Select new status</option>
                  <option value="verified">Verified</option>
                  <option value="assigned">Assigned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div style={styles.modalActions}>
                <button style={styles.cancelButton} onClick={() => setShowUpdateModal(false)}>
                  Cancel
                </button>
                <button
                  style={styles.confirmButton}
                  onClick={handleStatusUpdate}
                  disabled={!statusUpdate}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    minHeight: "100vh"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    color: "#6c757d"
  },
  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px"
  },
  errorContainer: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#6c757d"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    backgroundColor: "white",
    borderBottom: "1px solid #e9ecef"
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  headerActions: {
    display: "flex",
    gap: "12px"
  },
  updateButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  content: {
    display: "flex",
    gap: "24px",
    padding: "24px",
    maxWidth: "1400px",
    margin: "0 auto"
  },
  mainSection: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  sidebar: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  issueHeader: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e9ecef"
  },
  issueTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px"
  },
  badges: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  statusBadge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  priorityBadge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  issueDescription: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e9ecef"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px"
  },
  detailCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e9ecef"
  },
  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginTop: "8px"
  },
  landmark: {
    fontSize: "14px",
    color: "#6c757d",
    marginTop: "4px"
  },
  contactInfo: {
    fontSize: "14px",
    color: "#6c757d",
    fontFamily: "monospace"
  },
  roleInfo: {
    fontSize: "14px",
    color: "#6c757d"
  },
  imagesSection: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e9ecef"
  },
  imagesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
    marginTop: "16px"
  },
  imagePreview: {
    width: "100%",
    height: "150px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "1px solid #e9ecef",
    cursor: "pointer"
  },
  tagsSection: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e9ecef"
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "12px"
  },
  chip: {
    padding: "6px 12px",
    backgroundColor: "#e9ecef",
    borderRadius: "16px",
    fontSize: "12px",
    color: "#6c757d"
  },
  timelineSection: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e9ecef"
  },
  timeline: {
    marginTop: "16px"
  },
  timelineItem: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #f8f9fa"
  },
  timelineIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6c757d",
    flexShrink: 0
  },
  timelineContent: {
    flex: 1
  },
  timelineAction: {
    fontWeight: "600",
    color: "#343a40",
    marginBottom: "4px"
  },
  timelineUser: {
    fontSize: "14px",
    color: "#6c757d",
    marginBottom: "2px"
  },
  timelineDate: {
    fontSize: "12px",
    color: "#adb5bd",
    marginBottom: "8px"
  },
  timelineDetails: {
    fontSize: "14px",
    color: "#6c757d",
    fontStyle: "italic"
  },
  commentsSection: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e9ecef"
  },
  comments: {
    marginTop: "16px",
    marginBottom: "16px"
  },
  comment: {
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    marginBottom: "12px"
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  commentDate: {
    fontSize: "12px",
    color: "#adb5bd"
  },
  commentMessage: {
    fontSize: "14px",
    color: "#343a40",
    lineHeight: "1.4"
  },
  addComment: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #e9ecef"
  },
  commentInput: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    resize: "vertical",
    marginBottom: "12px"
  },
  commentButton: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "500px",
    width: "90%"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e9ecef"
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#6c757d",
    padding: "0",
    lineHeight: 1
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px"
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "20px"
  },
  cancelButton: {
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  },
  confirmButton: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default IssueDetail;
