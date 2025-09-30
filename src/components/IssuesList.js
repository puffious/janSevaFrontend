import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, User, AlertTriangle, CheckCircle, Clock, Eye, FileText } from 'lucide-react';

const IssuesList = ({ user, searchQuery }) => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    ward: 'all'
  });
  const [sortBy, setSortBy] = useState('date');
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Mock data for issues
  useEffect(() => {
    const mockIssues = [
      {
        id: 1234,
        title: "Pothole on Main Street",
        description: "Large pothole causing traffic issues near the intersection",
        category: "Roads",
        status: "new",
        priority: "high",
        location: { lat: 12.9716, lng: 77.5946, address: "Main Street, Ward 5" },
        ward: "Ward 5",
        reportedBy: "John Citizen",
        reportedDate: "2024-01-15T10:30:00Z",
        assignedTo: null,
        images: ["https://via.placeholder.com/300x200?text=Pothole"],
        timeline: [
          { date: "2024-01-15T10:30:00Z", action: "Issue reported", user: "John Citizen" }
        ]
      },
      {
        id: 1235,
        title: "Broken Street Light",
        description: "Street light not working on Park Avenue",
        category: "Lighting",
        status: "assigned",
        priority: "medium",
        location: { lat: 12.9716, lng: 77.5946, address: "Park Avenue, Ward 3" },
        ward: "Ward 3",
        reportedBy: "Jane Doe",
        reportedDate: "2024-01-14T15:45:00Z",
        assignedTo: "Mike Johnson",
        images: ["https://via.placeholder.com/300x200?text=Street+Light"],
        timeline: [
          { date: "2024-01-14T15:45:00Z", action: "Issue reported", user: "Jane Doe" },
          { date: "2024-01-14T16:30:00Z", action: "Issue verified", user: "Admin" },
          { date: "2024-01-15T09:00:00Z", action: "Assigned to Mike Johnson", user: "Supervisor" }
        ]
      },
      {
        id: 1236,
        title: "Garbage Collection Missed",
        description: "Garbage not collected for 3 days in residential area",
        category: "Waste Management",
        status: "in-progress",
        priority: "high",
        location: { lat: 12.9716, lng: 77.5946, address: "Elm Street, Ward 2" },
        ward: "Ward 2",
        reportedBy: "Robert Smith",
        reportedDate: "2024-01-13T08:20:00Z",
        assignedTo: "Sarah Wilson",
        images: ["https://via.placeholder.com/300x200?text=Garbage"],
        timeline: [
          { date: "2024-01-13T08:20:00Z", action: "Issue reported", user: "Robert Smith" },
          { date: "2024-01-13T10:15:00Z", action: "Issue verified", user: "Admin" },
          { date: "2024-01-13T14:30:00Z", action: "Assigned to Sarah Wilson", user: "Supervisor" },
          { date: "2024-01-14T11:00:00Z", action: "Work started", user: "Sarah Wilson" }
        ]
      },
      {
        id: 1237,
        title: "Water Pipe Leak",
        description: "Water pipe burst causing flooding on the road",
        category: "Water Supply",
        status: "resolved",
        priority: "high",
        location: { lat: 12.9716, lng: 77.5946, address: "Oak Road, Ward 1" },
        ward: "Ward 1",
        reportedBy: "Mary Johnson",
        reportedDate: "2024-01-12T07:15:00Z",
        assignedTo: "Tom Brown",
        images: ["https://via.placeholder.com/300x200?text=Water+Leak"],
        timeline: [
          { date: "2024-01-12T07:15:00Z", action: "Issue reported", user: "Mary Johnson" },
          { date: "2024-01-12T08:00:00Z", action: "Issue verified", user: "Admin" },
          { date: "2024-01-12T09:30:00Z", action: "Assigned to Tom Brown", user: "Supervisor" },
          { date: "2024-01-12T10:45:00Z", action: "Work started", user: "Tom Brown" },
          { date: "2024-01-12T16:20:00Z", action: "Work completed", user: "Tom Brown" },
          { date: "2024-01-12T17:00:00Z", action: "Issue resolved", user: "Admin" }
        ]
      },
      {
        id: 1238,
        title: "Stray Dog Issue",
        description: "Pack of stray dogs causing safety concerns",
        category: "Animal Control",
        status: "verified",
        priority: "medium",
        location: { lat: 12.9716, lng: 77.5946, address: "Pine Street, Ward 4" },
        ward: "Ward 4",
        reportedBy: "David Lee",
        reportedDate: "2024-01-15T12:00:00Z",
        assignedTo: null,
        images: ["https://via.placeholder.com/300x200?text=Stray+Dogs"],
        timeline: [
          { date: "2024-01-15T12:00:00Z", action: "Issue reported", user: "David Lee" },
          { date: "2024-01-15T13:30:00Z", action: "Issue verified", user: "Admin" }
        ]
      }
    ];
    setIssues(mockIssues);
  }, []);

  // Filter and search issues
  useEffect(() => {
    let filtered = issues;

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.ward.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.status !== 'all') {
      filtered = filtered.filter(issue => issue.status === filters.status);
    }
    if (filters.priority !== 'all') {
      filtered = filtered.filter(issue => issue.priority === filters.priority);
    }
    if (filters.category !== 'all') {
      filtered = filtered.filter(issue => issue.category === filters.category);
    }
    if (filters.ward !== 'all') {
      filtered = filtered.filter(issue => issue.ward === filters.ward);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.reportedDate) - new Date(a.reportedDate);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setFilteredIssues(filtered);
  }, [issues, searchQuery, filters, sortBy]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { className: 'status-new', label: 'New' },
      verified: { className: 'status-verified', label: 'Verified' },
      assigned: { className: 'status-assigned', label: 'Assigned' },
      'in-progress': { className: 'status-in-progress', label: 'In Progress' },
      resolved: { className: 'status-resolved', label: 'Resolved' }
    };

    const config = statusConfig[status] || { className: 'status-new', label: status };
    return (
      <span style={{
        ...styles.statusBadge,
        ...getStatusColors(status)
      }}>
        {config.label}
      </span>
    );
  };

  const getStatusColors = (status) => {
    switch (status) {
      case 'new': return { backgroundColor: '#ffeaa7', color: '#2d3436' };
      case 'verified': return { backgroundColor: '#74b9ff', color: 'white' };
      case 'assigned': return { backgroundColor: '#fd79a8', color: 'white' };
      case 'in-progress': return { backgroundColor: '#fdcb6e', color: '#2d3436' };
      case 'resolved': return { backgroundColor: '#00b894', color: 'white' };
      default: return { backgroundColor: '#ddd', color: '#333' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e17055';
      case 'medium': return '#fdcb6e';
      case 'low': return '#00b894';
      default: return '#ddd';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAssignIssue = (issueId) => {
    // Simulate assignment
    setIssues(prev => prev.map(issue =>
      issue.id === issueId
        ? { ...issue, status: 'assigned', assignedTo: 'John Worker' }
        : issue
    ));
  };

  return (
    <div style={styles.container}>
      {/* Filters Bar */}
      <div style={styles.filtersBar}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Status:</label>
          <select
            style={styles.filterSelect}
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="verified">Verified</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Priority:</label>
          <select
            style={styles.filterSelect}
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Category:</label>
          <select
            style={styles.filterSelect}
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Roads">Roads</option>
            <option value="Lighting">Lighting</option>
            <option value="Waste Management">Waste Management</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Animal Control">Animal Control</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Sort by:</label>
          <select
            style={styles.filterSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date Reported</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div style={styles.resultsHeader}>
        <span style={styles.resultsCount}>
          Showing {filteredIssues.length} of {issues.length} issues
        </span>
      </div>

      {/* Issues List */}
      <div style={styles.issuesList}>
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            style={{
              ...styles.issueCard,
              borderLeft: `4px solid ${getPriorityColor(issue.priority)}`
            }}
            onClick={() => setSelectedIssue(issue)}
          >
            <div style={styles.issueHeader}>
              <div style={styles.issueTitle}>
                <AlertTriangle size={16} style={{ marginRight: '8px', color: getPriorityColor(issue.priority) }} />
                Issue #{issue.id}: {issue.title}
              </div>
              {getStatusBadge(issue.status)}
            </div>

            <div style={styles.issueDescription}>
              {issue.description}
            </div>

            <div style={styles.issueDetails}>
              <div style={styles.detailItem}>
                <MapPin size={14} />
                <span>{issue.location.address}</span>
              </div>
              <div style={styles.detailItem}>
                <Calendar size={14} />
                <span>{formatDate(issue.reportedDate)}</span>
              </div>
              <div style={styles.detailItem}>
                <User size={14} />
                <span>Reported by: {issue.reportedBy}</span>
              </div>
              {issue.assignedTo && (
                <div style={styles.detailItem}>
                  <User size={14} />
                  <span>Assigned to: {issue.assignedTo}</span>
                </div>
              )}
            </div>

            <div style={styles.issueActions}>
              <button style={styles.actionButton}>
                <Eye size={16} />
                View Details
              </button>
              {user.role !== 'staff' && issue.status === 'verified' && (
                <button
                  style={styles.assignButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAssignIssue(issue.id);
                  }}
                >
                  <User size={16} />
                  Assign Worker
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div style={styles.emptyState}>
          <FileText size={48} style={{ color: '#6c757d', marginBottom: '16px' }} />
          <h3 style={styles.emptyTitle}>No issues found</h3>
          <p style={styles.emptyDescription}>
            Try adjusting your filters or search query to find issues.
          </p>
        </div>
      )}

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div style={styles.modalOverlay} onClick={() => setSelectedIssue(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Issue #{selectedIssue.id}: {selectedIssue.title}</h2>
              <button
                style={styles.closeButton}
                onClick={() => setSelectedIssue(null)}
              >
                ×
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.modalSection}>
                <h4>Description</h4>
                <p>{selectedIssue.description}</p>
              </div>

              <div style={styles.modalSection}>
                <h4>Details</h4>
                <div style={styles.modalDetails}>
                  <div><strong>Status:</strong> {getStatusBadge(selectedIssue.status)}</div>
                  <div><strong>Priority:</strong> <span style={{ color: getPriorityColor(selectedIssue.priority), fontWeight: 'bold', textTransform: 'capitalize' }}>{selectedIssue.priority}</span></div>
                  <div><strong>Category:</strong> {selectedIssue.category}</div>
                  <div><strong>Location:</strong> {selectedIssue.location.address}</div>
                  <div><strong>Reported by:</strong> {selectedIssue.reportedBy}</div>
                  <div><strong>Reported on:</strong> {formatDate(selectedIssue.reportedDate)}</div>
                  {selectedIssue.assignedTo && <div><strong>Assigned to:</strong> {selectedIssue.assignedTo}</div>}
                </div>
              </div>

              {selectedIssue.images && selectedIssue.images.length > 0 && (
                <div style={styles.modalSection}>
                  <h4>Images</h4>
                  <div style={styles.imagesGrid}>
                    {selectedIssue.images.map((image, index) => (
                      <img key={index} src={image} alt={`Issue ${index + 1}`} style={styles.imagePreview} />
                    ))}
                  </div>
                </div>
              )}

              <div style={styles.modalSection}>
                <h4>Timeline</h4>
                <div style={styles.timeline}>
                  {selectedIssue.timeline.map((event, index) => (
                    <div key={index} style={styles.timelineItem}>
                      <div style={styles.timelineContent}>
                        <strong>{event.action}</strong>
                        <div style={styles.timelineUser}>by {event.user}</div>
                        <div style={styles.timelineDate}>{formatDate(event.date)}</div>
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

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  filtersBar: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginBottom: "20px",
    padding: "16px",
    backgroundColor: "white",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    flexWrap: "wrap"
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  filterLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6c757d",
    textTransform: "uppercase"
  },
  filterSelect: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "white",
    fontSize: "14px"
  },
  resultsHeader: {
    padding: "0 16px",
    marginBottom: "16px"
  },
  resultsCount: {
    fontSize: "14px",
    color: "#6c757d"
  },
  issuesList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  issueCard: {
    backgroundColor: "white",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  issueHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px"
  },
  issueTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#343a40",
    display: "flex",
    alignItems: "center"
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  issueDescription: {
    color: "#6c757d",
    marginBottom: "16px",
    lineHeight: "1.5"
  },
  issueDetails: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "16px"
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#6c757d"
  },
  issueActions: {
    display: "flex",
    gap: "12px",
    paddingTop: "16px",
    borderTop: "1px solid #e9ecef"
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  assignButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#6c757d"
  },
  emptyTitle: {
    marginBottom: "8px",
    color: "#343a40"
  },
  emptyDescription: {
    margin: 0
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
    maxWidth: "700px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e9ecef"
  },
  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600"
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
    gap: "24px"
  },
  modalSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  modalDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  imagesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "12px"
  },
  imagePreview: {
    width: "100%",
    height: "120px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "1px solid #e9ecef"
  },
  timeline: {
    borderLeft: "2px solid #e9ecef",
    paddingLeft: "20px"
  },
  timelineItem: {
    marginBottom: "20px",
    position: "relative"
  },
  timelineContent: {
    position: "relative"
  },
  timelineUser: {
    fontSize: "14px",
    color: "#6c757d",
    marginTop: "4px"
  },
  timelineDate: {
    fontSize: "12px",
    color: "#adb5bd",
    marginTop: "2px"
  }
};

export default IssuesList;
