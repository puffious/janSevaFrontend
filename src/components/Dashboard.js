import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Users, AlertTriangle, CheckCircle, Clock, Settings, Bell, Search, Filter } from 'lucide-react';
import IssuesList from './IssuesList';
import IssuesMap from './IssuesMap';
import Analytics from './Analytics';
import Assignments from './Assignments';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path && ['overview', 'issues', 'map', 'assignments', 'analytics'].includes(path)) {
      setActiveTab(path);
    }
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab}`);
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: MapPin, roles: ['admin', 'supervisor', 'staff'] },
    { id: 'issues', label: 'Issues List', icon: AlertTriangle, roles: ['admin', 'supervisor', 'staff'] },
    { id: 'map', label: 'Map View', icon: MapPin, roles: ['admin', 'supervisor', 'staff'] },
    { id: 'assignments', label: 'Assignments', icon: Users, roles: ['admin', 'supervisor'] },
    { id: 'analytics', label: 'Analytics', icon: CheckCircle, roles: ['admin', 'supervisor'] }
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(user.role)
  );

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Municipal Dashboard</h2>
          <div style={styles.userBadge}>
            <div style={styles.userAvatar}>
              {user.name.charAt(0)}
            </div>
            <div>
              <div style={styles.userName}>{user.name}</div>
              <div style={styles.userRole}>{user.role}</div>
            </div>
          </div>
        </div>

        <nav style={styles.nav}>
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  ...styles.navItem,
                  backgroundColor: activeTab === item.id ? '#007bff' : 'transparent'
                }}
                onClick={() => handleTabChange(item.id)}
              >
                <Icon size={20} style={styles.navIcon} />
                {item.label}
              </div>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.navItem} onClick={() => navigate('/settings')}>
            <Settings size={20} style={styles.navIcon} />
            Settings
          </div>
          <button style={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.pageTitle}>
              {filteredMenuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.searchContainer}>
              <Search size={16} style={styles.searchIcon} />
              <input
                style={styles.searchInput}
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={styles.notificationIcon}>
              <Bell size={20} />
              {notifications > 0 && (
                <span style={styles.notificationBadge}>{notifications}</span>
              )}
            </div>
          </div>
        </div>

        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<OverviewTab user={user} />} />
            <Route path="/overview" element={<OverviewTab user={user} />} />
            <Route path="/issues" element={<IssuesList user={user} searchQuery={searchQuery} />} />
            <Route path="/map" element={<IssuesMap user={user} />} />
            <Route path="/assignments" element={<Assignments user={user} />} />
            <Route path="/analytics" element={<Analytics user={user} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const OverviewTab = ({ user }) => {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    assigned: 0,
    inProgress: 0,
    resolved: 0
  });

  useEffect(() => {
    // Simulate fetching stats
    setStats({
      total: 156,
      new: 23,
      assigned: 45,
      inProgress: 67,
      resolved: 21
    });
  }, []);

  return (
    <div>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.total}</div>
          <div style={styles.statLabel}>Total Issues</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statNumber, color: '#ffeaa7'}}>{stats.new}</div>
          <div style={styles.statLabel}>New Issues</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statNumber, color: '#fd79a8'}}>{stats.assigned}</div>
          <div style={styles.statLabel}>Assigned</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statNumber, color: '#fdcb6e'}}>{stats.inProgress}</div>
          <div style={styles.statLabel}>In Progress</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statNumber, color: '#00b894'}}>{stats.resolved}</div>
          <div style={styles.statLabel}>Resolved</div>
        </div>
      </div>

      <div style={styles.quickActions}>
        <h3 style={styles.sectionTitle}>Quick Actions</h3>
        <div style={styles.actionGrid}>
          <button style={styles.actionButton}>
            <AlertTriangle size={24} />
            <span>View New Issues</span>
          </button>
          <button style={styles.actionButton}>
            <Users size={24} />
            <span>Assign Workers</span>
          </button>
          <button style={styles.actionButton}>
            <Clock size={24} />
            <span>Overdue Issues</span>
          </button>
          <button style={styles.actionButton}>
            <CheckCircle size={24} />
            <span>Review Completed</span>
          </button>
        </div>
      </div>

      <div style={styles.recentActivity}>
        <h3 style={styles.sectionTitle}>Recent Activity</h3>
        <div style={styles.activityList}>
          <div style={styles.activityItem}>
            <div style={styles.activityDot}></div>
            <div>
              <strong>Issue #1234</strong> assigned to John Doe
              <div style={styles.activityTime}>5 minutes ago</div>
            </div>
          </div>
          <div style={styles.activityItem}>
            <div style={styles.activityDot}></div>
            <div>
              <strong>Issue #1233</strong> marked as resolved
              <div style={styles.activityTime}>15 minutes ago</div>
            </div>
          </div>
          <div style={styles.activityItem}>
            <div style={styles.activityDot}></div>
            <div>
              New issue reported in Ward 5
              <div style={styles.activityTime}>1 hour ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    minHeight: "100vh"
  },
  sidebar: {
    width: "280px",
    backgroundColor: "#343a40",
    color: "white",
    display: "flex",
    flexDirection: "column"
  },
  sidebarHeader: {
    padding: "24px 20px",
    borderBottom: "1px solid #495057"
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "white"
  },
  userBadge: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  userAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "16px"
  },
  userName: {
    fontWeight: "600",
    fontSize: "14px"
  },
  userRole: {
    fontSize: "12px",
    color: "#adb5bd",
    textTransform: "capitalize"
  },
  nav: {
    flex: 1,
    padding: "20px 0"
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    margin: "4px 0",
    cursor: "pointer",
    transition: "background-color 0.2s",
    borderRadius: "0"
  },
  navIcon: {
    marginRight: "12px"
  },
  sidebarFooter: {
    padding: "20px 0",
    borderTop: "1px solid #495057"
  },
  logoutButton: {
    width: "calc(100% - 40px)",
    margin: "0 20px",
    padding: "10px 16px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "12px"
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8f9fa"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    backgroundColor: "white",
    borderBottom: "1px solid #e9ecef"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#343a40",
    margin: 0
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
    width: "250px",
    fontSize: "14px"
  },
  notificationIcon: {
    position: "relative",
    cursor: "pointer",
    padding: "8px"
  },
  notificationBadge: {
    position: "absolute",
    top: "2px",
    right: "2px",
    backgroundColor: "#dc3545",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "10px",
    fontWeight: "600"
  },
  content: {
    flex: 1,
    padding: "24px"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "32px"
  },
  statCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  statNumber: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#007bff",
    marginBottom: "8px"
  },
  statLabel: {
    fontSize: "14px",
    color: "#6c757d",
    textTransform: "uppercase",
    fontWeight: "600"
  },
  quickActions: {
    marginBottom: "32px"
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#343a40"
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px"
  },
  actionButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "24px",
    backgroundColor: "white",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  recentActivity: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  activityItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px"
  },
  activityDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    marginTop: "6px",
    flexShrink: 0
  },
  activityTime: {
    fontSize: "12px",
    color: "#6c757d",
    marginTop: "4px"
  }
};

export default Dashboard;
