import React, { useState, useEffect } from 'react';
import { Users, MapPin, Clock, CheckCircle, AlertTriangle, Search, Filter, Plus } from 'lucide-react';

const Assignments = ({ user }) => {
  const [workers, setWorkers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [unassignedIssues, setUnassignedIssues] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    ward: 'all'
  });

  // Mock data for workers
  useEffect(() => {
    const mockWorkers = [
      {
        id: 1,
        name: "John Smith",
        role: "Road Maintenance",
        phone: "+91-9876543210",
        email: "john.smith@municipality.gov",
        ward: "Ward 1",
        status: "available",
        currentAssignments: 2,
        completedThisMonth: 15,
        rating: 4.8,
        specialties: ["Potholes", "Road Repair", "Traffic Signs"]
      },
      {
        id: 2,
        name: "Sarah Wilson",
        role: "Waste Management",
        phone: "+91-9876543211",
        email: "sarah.wilson@municipality.gov",
        ward: "Ward 2",
        status: "busy",
        currentAssignments: 5,
        completedThisMonth: 22,
        rating: 4.9,
        specialties: ["Garbage Collection", "Recycling", "Street Cleaning"]
      },
      {
        id: 3,
        name: "Mike Johnson",
        role: "Electrical Maintenance",
        phone: "+91-9876543212",
        email: "mike.johnson@municipality.gov",
        ward: "Ward 3",
        status: "available",
        currentAssignments: 1,
        completedThisMonth: 18,
        rating: 4.7,
        specialties: ["Street Lights", "Electrical Repairs", "Power Lines"]
      },
      {
        id: 4,
        name: "Emily Davis",
        role: "Water & Plumbing",
        phone: "+91-9876543213",
        email: "emily.davis@municipality.gov",
        ward: "Ward 1",
        status: "available",
        currentAssignments: 3,
        completedThisMonth: 12,
        rating: 4.6,
        specialties: ["Pipe Repairs", "Water Leaks", "Drainage"]
      },
      {
        id: 5,
        name: "Tom Brown",
        role: "General Maintenance",
        phone: "+91-9876543214",
        email: "tom.brown@municipality.gov",
        ward: "Ward 4",
        status: "on-leave",
        currentAssignments: 0,
        completedThisMonth: 8,
        rating: 4.5,
        specialties: ["General Repairs", "Park Maintenance", "Building Issues"]
      }
    ];
    setWorkers(mockWorkers);
  }, []);

  // Mock data for unassigned issues
  useEffect(() => {
    const mockUnassignedIssues = [
      {
        id: 1240,
        title: "Broken Traffic Signal",
        category: "Traffic Management",
        priority: "high",
        location: { address: "Main Junction, Ward 1" },
        reportedDate: "2024-01-16T09:00:00Z",
        ward: "Ward 1"
      },
      {
        id: 1241,
        title: "Overflowing Drain",
        category: "Water Supply",
        priority: "medium",
        location: { address: "Market Street, Ward 2" },
        reportedDate: "2024-01-16T11:30:00Z",
        ward: "Ward 2"
      },
      {
        id: 1242,
        title: "Park Bench Repair",
        category: "Parks & Recreation",
        priority: "low",
        location: { address: "Central Park, Ward 3" },
        reportedDate: "2024-01-16T14:15:00Z",
        ward: "Ward 3"
      }
    ];
    setUnassignedIssues(mockUnassignedIssues);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#28a745';
      case 'busy': return '#ffc107';
      case 'on-leave': return '#6c757d';
      default: return '#007bff';
    }
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAssignIssue = (workerId, issueId) => {
    const worker = workers.find(w => w.id === workerId);
    const issue = unassignedIssues.find(i => i.id === issueId);

    if (worker && issue) {
      // Update worker's current assignments
      setWorkers(prev => prev.map(w =>
        w.id === workerId
          ? { ...w, currentAssignments: w.currentAssignments + 1, status: w.currentAssignments >= 4 ? 'busy' : w.status }
          : w
      ));

      // Remove from unassigned issues
      setUnassignedIssues(prev => prev.filter(i => i.id !== issueId));

      // Add to assignments (in a real app, this would be saved to backend)
      const newAssignment = {
        id: Date.now(),
        workerId,
        workerName: worker.name,
        issueId,
        issueTitle: issue.title,
        assignedDate: new Date().toISOString(),
        status: 'assigned'
      };

      setAssignments(prev => [...prev, newAssignment]);
      setShowAssignModal(false);
      setSelectedIssue(null);
    }
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'all' || worker.status === filters.status;
    const matchesWard = filters.ward === 'all' || worker.ward === filters.ward;

    return matchesSearch && matchesStatus && matchesWard;
  });

  return (
    <div style={styles.container}>
      {/* Header with Search and Filters */}
      <div style={styles.header}>
        <div style={styles.searchContainer}>
          <Search size={16} style={styles.searchIcon} />
          <input
            style={styles.searchInput}
            placeholder="Search workers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={styles.filtersContainer}>
          <select
            style={styles.filterSelect}
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="on-leave">On Leave</option>
          </select>

          <select
            style={styles.filterSelect}
            value={filters.ward}
            onChange={(e) => setFilters(prev => ({ ...prev, ward: e.target.value }))}
          >
            <option value="all">All Wards</option>
            <option value="Ward 1">Ward 1</option>
            <option value="Ward 2">Ward 2</option>
            <option value="Ward 3">Ward 3</option>
            <option value="Ward 4">Ward 4</option>
          </select>
        </div>
      </div>

      <div style={styles.content}>
        {/* Workers List */}
        <div style={styles.workersSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Workers ({filteredWorkers.length})</h3>
          </div>

          <div style={styles.workersGrid}>
            {filteredWorkers.map(worker => (
              <div key={worker.id} style={styles.workerCard}>
                <div style={styles.workerHeader}>
                  <div style={styles.workerAvatar}>
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={styles.workerInfo}>
                    <h4 style={styles.workerName}>{worker.name}</h4>
                    <p style={styles.workerRole}>{worker.role}</p>
                    <div style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(worker.status),
                      color: worker.status === 'busy' ? '#000' : '#fff'
                    }}>
                      {worker.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>

                <div style={styles.workerStats}>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Current:</span>
                    <span style={styles.statValue}>{worker.currentAssignments}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Completed:</span>
                    <span style={styles.statValue}>{worker.completedThisMonth}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Rating:</span>
                    <span style={styles.statValue}>⭐ {worker.rating}</span>
                  </div>
                </div>

                <div style={styles.workerDetails}>
                  <div style={styles.detailItem}>
                    <MapPin size={14} />
                    <span>{worker.ward}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.phone}>{worker.phone}</span>
                  </div>
                </div>

                <div style={styles.specialties}>
                  <h5 style={styles.specialtiesTitle}>Specialties:</h5>
                  <div style={styles.chipContainer}>
                    {worker.specialties.map((specialty, idx) => (
                      <span key={idx} style={styles.chip}>{specialty}</span>
                    ))}
                  </div>
                </div>

                <button
                  style={styles.viewButton}
                  onClick={() => setSelectedWorker(worker)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Unassigned Issues */}
        {user.role !== 'staff' && (
          <div style={styles.unassignedSection}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Unassigned Issues ({unassignedIssues.length})</h3>
            </div>

            <div style={styles.issuesList}>
              {unassignedIssues.map(issue => (
                <div key={issue.id} style={styles.issueCard}>
                  <div style={styles.issueHeader}>
                    <h4 style={styles.issueTitle}>#{issue.id}: {issue.title}</h4>
                    <span style={{
                      ...styles.priorityBadge,
                      backgroundColor: getPriorityColor(issue.priority),
                      color: issue.priority === 'medium' ? '#000' : '#fff'
                    }}>
                      {issue.priority.toUpperCase()}
                    </span>
                  </div>

                  <div style={styles.issueDetails}>
                    <div style={styles.detailItem}>
                      <MapPin size={14} />
                      <span>{issue.location.address}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <Clock size={14} />
                      <span>{formatDate(issue.reportedDate)}</span>
                    </div>
                  </div>

                  <button
                    style={styles.assignButton}
                    onClick={() => {
                      setSelectedIssue(issue);
                      setShowAssignModal(true);
                    }}
                  >
                    <Plus size={16} />
                    Assign Worker
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <div style={styles.modalOverlay} onClick={() => setSelectedWorker(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{selectedWorker.name}</h2>
              <button style={styles.closeButton} onClick={() => setSelectedWorker(null)}>
                ×
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.modalSection}>
                <h4>Contact Information</h4>
                <p><strong>Phone:</strong> {selectedWorker.phone}</p>
                <p><strong>Email:</strong> {selectedWorker.email}</p>
                <p><strong>Ward:</strong> {selectedWorker.ward}</p>
              </div>

              <div style={styles.modalSection}>
                <h4>Performance</h4>
                <p><strong>Current Assignments:</strong> {selectedWorker.currentAssignments}</p>
                <p><strong>Completed This Month:</strong> {selectedWorker.completedThisMonth}</p>
                <p><strong>Rating:</strong> ⭐ {selectedWorker.rating}/5.0</p>
              </div>

              <div style={styles.modalSection}>
                <h4>Specialties</h4>
                <div style={styles.chipContainer}>
                  {selectedWorker.specialties.map((specialty, idx) => (
                    <span key={idx} style={styles.chip}>{specialty}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && selectedIssue && (
        <div style={styles.modalOverlay} onClick={() => setShowAssignModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Assign Issue #{selectedIssue.id}</h2>
              <button style={styles.closeButton} onClick={() => setShowAssignModal(false)}>
                ×
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.modalSection}>
                <h4>Issue Details</h4>
                <p><strong>Title:</strong> {selectedIssue.title}</p>
                <p><strong>Category:</strong> {selectedIssue.category}</p>
                <p><strong>Priority:</strong> {selectedIssue.priority}</p>
                <p><strong>Location:</strong> {selectedIssue.location.address}</p>
              </div>

              <div style={styles.modalSection}>
                <h4>Select Worker</h4>
                <div style={styles.workersList}>
                  {workers
                    .filter(w => w.status !== 'on-leave')
                    .map(worker => (
                    <div
                      key={worker.id}
                      style={styles.workerOption}
                      onClick={() => handleAssignIssue(worker.id, selectedIssue.id)}
                    >
                      <div style={styles.workerOptionInfo}>
                        <strong>{worker.name}</strong>
                        <span style={styles.workerOptionRole}>{worker.role}</span>
                        <span style={styles.workerOptionWard}>{worker.ward}</span>
                      </div>
                      <div style={styles.workerOptionStats}>
                        <span>Current: {worker.currentAssignments}</span>
                        <span>⭐ {worker.rating}</span>
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    padding: "16px",
    backgroundColor: "white",
    borderRadius: "8px",
    border: "1px solid #e9ecef"
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    color: "#6c757d"
  },
  searchInput: {
    padding: "8px 12px 8px 40px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    width: "300px",
    fontSize: "14px"
  },
  filtersContainer: {
    display: "flex",
    gap: "12px"
  },
  filterSelect: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "white",
    fontSize: "14px"
  },
  content: {
    display: "flex",
    gap: "24px"
  },
  workersSection: {
    flex: 2
  },
  unassignedSection: {
    flex: 1
  },
  sectionHeader: {
    marginBottom: "16px"
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#343a40",
    margin: 0
  },
  workersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px"
  },
  workerCard: {
    backgroundColor: "white",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  workerHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px"
  },
  workerAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "16px"
  },
  workerInfo: {
    flex: 1
  },
  workerName: {
    margin: "0 0 4px 0",
    fontSize: "18px",
    fontWeight: "600",
    color: "#343a40"
  },
  workerRole: {
    margin: "0 0 8px 0",
    color: "#6c757d",
    fontSize: "14px"
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  workerStats: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px"
  },
  statItem: {
    textAlign: "center"
  },
  statLabel: {
    display: "block",
    fontSize: "12px",
    color: "#6c757d",
    marginBottom: "4px"
  },
  statValue: {
    display: "block",
    fontSize: "16px",
    fontWeight: "600",
    color: "#343a40"
  },
  workerDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px"
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#6c757d"
  },
  phone: {
    fontFamily: "monospace",
    fontSize: "13px"
  },
  specialties: {
    marginBottom: "16px"
  },
  specialtiesTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#343a40",
    marginBottom: "8px"
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px"
  },
  chip: {
    padding: "4px 8px",
    backgroundColor: "#e9ecef",
    borderRadius: "12px",
    fontSize: "12px",
    color: "#6c757d"
  },
  viewButton: {
    width: "100%",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
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
    padding: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  issueHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px"
  },
  issueTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "#343a40",
    flex: 1,
    marginRight: "12px"
  },
  priorityBadge: {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  issueDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px"
  },
  assignButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    width: "100%",
    padding: "8px 16px",
    backgroundColor: "#28a745",
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
    maxWidth: "600px",
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
    gap: "20px"
  },
  modalSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  workersList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  workerOption: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    border: "1px solid #e9ecef",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  workerOptionInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  workerOptionRole: {
    fontSize: "14px",
    color: "#6c757d"
  },
  workerOptionWard: {
    fontSize: "12px",
    color: "#adb5bd"
  },
  workerOptionStats: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
    fontSize: "12px",
    color: "#6c757d"
  }
};

export default Assignments;
