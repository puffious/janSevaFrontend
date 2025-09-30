import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import {
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Calendar,
} from "lucide-react";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const IssuesMap = ({ user }) => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Bangalore coordinates
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
  });
  const [filteredIssues, setFilteredIssues] = useState([]);

  // Mock data for issues with geographical spread
  useEffect(() => {
    const mockIssues = [
      {
        id: 1234,
        title: "Pothole on MG Road",
        description:
          "Large pothole causing traffic issues near the intersection",
        category: "Roads",
        status: "new",
        priority: "high",
        location: {
          lat: 12.9716,
          lng: 77.5946,
          address: "MG Road, Ward 5, Bangalore",
        },
        ward: "Ward 5",
        reportedBy: "Rajesh Kumar",
        reportedDate: "2024-01-15T10:30:00Z",
        assignedTo: null,
        images: ["https://via.placeholder.com/300x200?text=Pothole"],
      },
      {
        id: 1235,
        title: "Broken Street Light",
        description: "Street light not working on Brigade Road",
        category: "Lighting",
        status: "assigned",
        priority: "medium",
        location: {
          lat: 12.9616,
          lng: 77.6046,
          address: "Brigade Road, Ward 3, Bangalore",
        },
        ward: "Ward 3",
        reportedBy: "Priya Sharma",
        reportedDate: "2024-01-14T15:45:00Z",
        assignedTo: "Suresh Patel",
        images: ["https://via.placeholder.com/300x200?text=Street+Light"],
      },
      {
        id: 1236,
        title: "Garbage Collection Missed",
        description: "Garbage not collected for 3 days in residential area",
        category: "Waste Management",
        status: "in-progress",
        priority: "high",
        location: {
          lat: 12.9816,
          lng: 77.5846,
          address: "Jayanagar 4th Block, Ward 2, Bangalore",
        },
        ward: "Ward 2",
        reportedBy: "Arjun Reddy",
        reportedDate: "2024-01-13T08:20:00Z",
        assignedTo: "Kavitha Nair",
        images: ["https://via.placeholder.com/300x200?text=Garbage"],
      },
      {
        id: 1237,
        title: "Water Pipe Leak",
        description: "Water pipe burst causing flooding on the road",
        category: "Water Supply",
        status: "resolved",
        priority: "high",
        location: {
          lat: 12.9516,
          lng: 77.6146,
          address: "Indiranagar 1st Cross, Ward 1, Bangalore",
        },
        ward: "Ward 1",
        reportedBy: "Meera Iyer",
        reportedDate: "2024-01-12T07:15:00Z",
        assignedTo: "Ravi Krishnan",
        images: ["https://via.placeholder.com/300x200?text=Water+Leak"],
      },
      {
        id: 1238,
        title: "Stray Dog Issue",
        description: "Pack of stray dogs causing safety concerns",
        category: "Animal Control",
        status: "verified",
        priority: "medium",
        location: {
          lat: 12.9916,
          lng: 77.5746,
          address: "Koramangala 5th Block, Ward 4, Bangalore",
        },
        ward: "Ward 4",
        reportedBy: "Deepak Gupta",
        reportedDate: "2024-01-15T12:00:00Z",
        assignedTo: null,
        images: ["https://via.placeholder.com/300x200?text=Stray+Dogs"],
      },
      {
        id: 1239,
        title: "Road Construction Delay",
        description: "Road construction causing major traffic congestion",
        category: "Roads",
        status: "in-progress",
        priority: "high",
        location: {
          lat: 12.9416,
          lng: 77.5646,
          address: "Hosur Road Junction, Ward 6, Bangalore",
        },
        ward: "Ward 6",
        reportedBy: "Anita Joshi",
        reportedDate: "2024-01-10T09:00:00Z",
        assignedTo: "Vinod Construction Team",
        images: ["https://via.placeholder.com/300x200?text=Construction"],
      },
    ];
    setIssues(mockIssues);
  }, []);

  // Filter issues based on selected filters
  useEffect(() => {
    let filtered = issues;

    if (filters.status !== "all") {
      filtered = filtered.filter((issue) => issue.status === filters.status);
    }
    if (filters.priority !== "all") {
      filtered = filtered.filter(
        (issue) => issue.priority === filters.priority,
      );
    }
    if (filters.category !== "all") {
      filtered = filtered.filter(
        (issue) => issue.category === filters.category,
      );
    }

    setFilteredIssues(filtered);
  }, [issues, filters]);

  const getMarkerIcon = (status, priority) => {
    let color = "#007bff"; // default blue

    switch (status) {
      case "new":
        color = "#ffc107";
        break;
      case "verified":
        color = "#17a2b8";
        break;
      case "assigned":
        color = "#e83e8c";
        break;
      case "in-progress":
        color = "#fd7e14";
        break;
      case "resolved":
        color = "#28a745";
        break;
      default:
        color = "#6c757d";
    }

    const size = priority === "high" ? 35 : priority === "medium" ? 30 : 25;

    return L.divIcon({
      html: `<div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">!</div>`,
      className: "",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      new: { backgroundColor: "#ffeaa7", color: "#2d3436" },
      verified: { backgroundColor: "#74b9ff", color: "white" },
      assigned: { backgroundColor: "#fd79a8", color: "white" },
      "in-progress": { backgroundColor: "#fdcb6e", color: "#2d3436" },
      resolved: { backgroundColor: "#00b894", color: "white" },
    };

    const colors = statusColors[status] || {
      backgroundColor: "#ddd",
      color: "#333",
    };

    return (
      <span
        style={{
          ...styles.statusBadge,
          ...colors,
        }}
      >
        {status.replace("-", " ").toUpperCase()}
      </span>
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const MapUpdater = ({ issues }) => {
    const map = useMap();

    useEffect(() => {
      if (issues.length > 0) {
        const group = new L.featureGroup(
          issues.map((issue) =>
            L.marker([issue.location.lat, issue.location.lng]),
          ),
        );
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }, [issues, map]);

    return null;
  };

  return (
    <div style={styles.container}>
      {/* Controls Panel */}
      <div style={styles.controlsPanel}>
        <div style={styles.filtersSection}>
          <h3 style={styles.sectionTitle}>Map Filters</h3>
          <div style={styles.filtersGrid}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Status</label>
              <select
                style={styles.filterSelect}
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
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
              <label style={styles.filterLabel}>Priority</label>
              <select
                style={styles.filterSelect}
                value={filters.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Category</label>
              <select
                style={styles.filterSelect}
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Roads">Roads</option>
                <option value="Lighting">Lighting</option>
                <option value="Waste Management">Waste Management</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Animal Control">Animal Control</option>
              </select>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={styles.legendSection}>
          <h4 style={styles.legendTitle}>Legend</h4>
          <div style={styles.legendItems}>
            <div style={styles.legendItem}>
              <div
                style={{ ...styles.legendColor, backgroundColor: "#ffc107" }}
              ></div>
              <span>New Issues</span>
            </div>
            <div style={styles.legendItem}>
              <div
                style={{ ...styles.legendColor, backgroundColor: "#17a2b8" }}
              ></div>
              <span>Verified</span>
            </div>
            <div style={styles.legendItem}>
              <div
                style={{ ...styles.legendColor, backgroundColor: "#e83e8c" }}
              ></div>
              <span>Assigned</span>
            </div>
            <div style={styles.legendItem}>
              <div
                style={{ ...styles.legendColor, backgroundColor: "#fd7e14" }}
              ></div>
              <span>In Progress</span>
            </div>
            <div style={styles.legendItem}>
              <div
                style={{ ...styles.legendColor, backgroundColor: "#28a745" }}
              ></div>
              <span>Resolved</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsSection}>
          <h4 style={styles.statsTitle}>
            Visible Issues: {filteredIssues.length}
          </h4>
          <div style={styles.statsList}>
            {["new", "assigned", "in-progress", "resolved"].map((status) => {
              const count = filteredIssues.filter(
                (issue) => issue.status === status,
              ).length;
              return (
                <div key={status} style={styles.statItem}>
                  <span style={styles.statLabel}>
                    {status.replace("-", " ")}:
                  </span>
                  <span style={styles.statValue}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div style={styles.mapWrapper}>
        <MapContainer
          center={mapCenter}
          zoom={12}
          style={styles.mapContainer}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater issues={filteredIssues} />

          {filteredIssues.map((issue) => (
            <Marker
              key={issue.id}
              position={[issue.location.lat, issue.location.lng]}
              icon={getMarkerIcon(issue.status, issue.priority)}
            >
              <Popup>
                <div style={styles.popupContent}>
                  <div style={styles.popupHeader}>
                    <h4 style={styles.popupTitle}>Issue #{issue.id}</h4>
                    {getStatusBadge(issue.status)}
                  </div>

                  <h5 style={styles.popupIssueTitle}>{issue.title}</h5>
                  <p style={styles.popupDescription}>{issue.description}</p>

                  <div style={styles.popupDetails}>
                    <div style={styles.popupDetailItem}>
                      <MapPin size={14} />
                      <span>{issue.location.address}</span>
                    </div>
                    <div style={styles.popupDetailItem}>
                      <AlertTriangle size={14} />
                      <span>
                        Priority:{" "}
                        <strong
                          style={{
                            color:
                              issue.priority === "high"
                                ? "#dc3545"
                                : issue.priority === "medium"
                                  ? "#ffc107"
                                  : "#28a745",
                          }}
                        >
                          {issue.priority}
                        </strong>
                      </span>
                    </div>
                    <div style={styles.popupDetailItem}>
                      <User size={14} />
                      <span>Reported by: {issue.reportedBy}</span>
                    </div>
                    <div style={styles.popupDetailItem}>
                      <Calendar size={14} />
                      <span>{formatDate(issue.reportedDate)}</span>
                    </div>
                    {issue.assignedTo && (
                      <div style={styles.popupDetailItem}>
                        <User size={14} />
                        <span>Assigned to: {issue.assignedTo}</span>
                      </div>
                    )}
                  </div>

                  <button
                    style={styles.popupButton}
                    onClick={() => setSelectedIssue(issue)}
                  >
                    View Full Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div style={styles.modalOverlay} onClick={() => setSelectedIssue(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                Issue #{selectedIssue.id}: {selectedIssue.title}
              </h2>
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
                  <div>
                    <strong>Status:</strong>{" "}
                    {getStatusBadge(selectedIssue.status)}
                  </div>
                  <div>
                    <strong>Priority:</strong>{" "}
                    <span
                      style={{
                        color:
                          selectedIssue.priority === "high"
                            ? "#dc3545"
                            : selectedIssue.priority === "medium"
                              ? "#ffc107"
                              : "#28a745",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {selectedIssue.priority}
                    </span>
                  </div>
                  <div>
                    <strong>Category:</strong> {selectedIssue.category}
                  </div>
                  <div>
                    <strong>Location:</strong> {selectedIssue.location.address}
                  </div>
                  <div>
                    <strong>Reported by:</strong> {selectedIssue.reportedBy}
                  </div>
                  <div>
                    <strong>Reported on:</strong>{" "}
                    {formatDate(selectedIssue.reportedDate)}
                  </div>
                  {selectedIssue.assignedTo && (
                    <div>
                      <strong>Assigned to:</strong> {selectedIssue.assignedTo}
                    </div>
                  )}
                </div>
              </div>

              {selectedIssue.images && selectedIssue.images.length > 0 && (
                <div style={styles.modalSection}>
                  <h4>Images</h4>
                  <div style={styles.imagesGrid}>
                    {selectedIssue.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Issue ${index + 1}`}
                        style={styles.imagePreview}
                      />
                    ))}
                  </div>
                </div>
              )}
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
    backgroundColor: "#fff",
    display: "flex",
    height: "calc(100vh - 140px)",
    gap: "20px",
  },
  controlsPanel: {
    width: "300px",
    backgroundColor: "white",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    overflowY: "auto",
  },
  filtersSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#343a40",
    margin: 0,
    paddingBottom: "8px",
    borderBottom: "2px solid #e9ecef",
  },
  filtersGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  filterLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6c757d",
    textTransform: "uppercase",
  },
  filterSelect: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "white",
    fontSize: "14px",
  },
  legendSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  legendTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#343a40",
    margin: 0,
  },
  legendItems: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  },
  legendColor: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: "2px solid white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  },
  statsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  statsTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#343a40",
    margin: 0,
  },
  statsList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  statItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
  },
  statLabel: {
    color: "#6c757d",
    textTransform: "capitalize",
  },
  statValue: {
    fontWeight: "600",
    color: "#343a40",
  },
  mapWrapper: {
    flex: 1,
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    overflow: "hidden",
  },
  mapContainer: {
    height: "100%",
    width: "100%",
    borderRadius: "8px",
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  popupContent: {
    minWidth: "250px",
    maxWidth: "300px",
  },
  popupHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  popupTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#343a40",
  },
  popupIssueTitle: {
    margin: "8px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#343a40",
  },
  popupDescription: {
    margin: "8px 0",
    fontSize: "14px",
    color: "#6c757d",
    lineHeight: "1.4",
  },
  popupDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    margin: "12px 0",
  },
  popupDetailItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#6c757d",
  },
  popupButton: {
    width: "100%",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    marginTop: "8px",
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
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e9ecef",
  },
  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#6c757d",
    padding: "0",
    lineHeight: 1,
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  modalSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  modalDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  imagesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "8px",
  },
  imagePreview: {
    width: "100%",
    height: "100px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "1px solid #e9ecef",
  },
};

export default IssuesMap;
