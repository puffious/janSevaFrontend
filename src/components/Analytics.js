import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, MapPin, Filter, Download, RefreshCw } from 'lucide-react';

const Analytics = ({ user }) => {
  const [analytics, setAnalytics] = useState({});
  const [timeRange, setTimeRange] = useState('month');
  const [selectedWard, setSelectedWard] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock analytics data
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockAnalytics = {
        overview: {
          totalIssues: 1247,
          resolvedIssues: 892,
          averageResolutionTime: 3.2,
          resolutionRate: 71.5,
          trendsUp: true
        },
        issuesByStatus: [
          { status: 'New', count: 156, percentage: 12.5 },
          { status: 'Verified', count: 89, percentage: 7.1 },
          { status: 'Assigned', count: 110, percentage: 8.8 },
          { status: 'In Progress', count: 234, percentage: 18.8 },
          { status: 'Resolved', count: 658, percentage: 52.8 }
        ],
        issuesByCategory: [
          { category: 'Roads', count: 325, percentage: 26.1 },
          { category: 'Waste Management', count: 298, percentage: 23.9 },
          { category: 'Water Supply', count: 187, percentage: 15.0 },
          { category: 'Lighting', count: 156, percentage: 12.5 },
          { category: 'Parks & Recreation', count: 134, percentage: 10.7 },
          { category: 'Traffic Management', count: 89, percentage: 7.1 },
          { category: 'Animal Control', count: 58, percentage: 4.7 }
        ],
        issuesByWard: [
          { ward: 'Ward 1', count: 198, resolved: 145, resolutionRate: 73.2 },
          { ward: 'Ward 2', count: 234, resolved: 162, resolutionRate: 69.2 },
          { ward: 'Ward 3', count: 187, resolved: 134, resolutionRate: 71.7 },
          { ward: 'Ward 4', count: 156, resolved: 118, resolutionRate: 75.6 },
          { ward: 'Ward 5', count: 213, resolved: 158, resolutionRate: 74.2 },
          { ward: 'Ward 6', count: 145, resolved: 98, resolutionRate: 67.6 },
          { ward: 'Ward 7', count: 114, resolved: 77, resolutionRate: 67.5 }
        ],
        monthlyTrends: [
          { month: 'Jul', reported: 89, resolved: 67 },
          { month: 'Aug', reported: 134, resolved: 98 },
          { month: 'Sep', reported: 156, resolved: 124 },
          { month: 'Oct', reported: 187, resolved: 143 },
          { month: 'Nov', reported: 198, resolved: 156 },
          { month: 'Dec', reported: 234, resolved: 189 },
          { month: 'Jan', reported: 249, resolved: 215 }
        ],
        priorityDistribution: [
          { priority: 'High', count: 187, percentage: 15.0 },
          { priority: 'Medium', count: 623, percentage: 49.9 },
          { priority: 'Low', count: 437, percentage: 35.1 }
        ],
        workerPerformance: [
          { name: 'Sarah Wilson', assigned: 34, completed: 32, rate: 94.1 },
          { name: 'Mike Johnson', assigned: 28, completed: 25, rate: 89.3 },
          { name: 'John Smith', assigned: 31, completed: 26, rate: 83.9 },
          { name: 'Emily Davis', assigned: 25, completed: 21, rate: 84.0 },
          { name: 'Tom Brown', assigned: 22, completed: 17, rate: 77.3 }
        ]
      };
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, [timeRange, selectedWard]);

  const renderBarChart = (data, dataKey, colorKey = '#007bff') => (
    <div style={styles.barChart}>
      {data.map((item, index) => (
        <div key={index} style={styles.barChartItem}>
          <div style={styles.barChartLabel}>
            {item[Object.keys(item)[0]]}
          </div>
          <div style={styles.barChartBar}>
            <div
              style={{
                ...styles.barChartFill,
                width: `${(item[dataKey] / Math.max(...data.map(d => d[dataKey]))) * 100}%`,
                backgroundColor: Array.isArray(colorKey) ? colorKey[index % colorKey.length] : colorKey
              }}
            />
          </div>
          <div style={styles.barChartValue}>
            {item[dataKey]}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPieChart = (data, colors) => (
    <div style={styles.pieChartContainer}>
      <div style={styles.pieChart}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.pieSlice,
              backgroundColor: colors[index % colors.length],
              flex: item.percentage
            }}
          />
        ))}
      </div>
      <div style={styles.pieChartLegend}>
        {data.map((item, index) => (
          <div key={index} style={styles.legendItem}>
            <div
              style={{
                ...styles.legendColor,
                backgroundColor: colors[index % colors.length]
              }}
            />
            <span style={styles.legendLabel}>
              {item[Object.keys(item)[0]]} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const refreshData = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => setLoading(false), 1000);
  };

  const exportReport = () => {
    // Simulate export functionality
    alert('Report exported successfully!');
  };

  if (loading || !analytics.overview) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <RefreshCw size={48} style={{ animation: 'spin 1s linear infinite' }} />
          <p style={styles.loadingText}>Loading analytics...</p>
        </div>
      </div>
    );
  }

  const statusColors = ['#ffeaa7', '#74b9ff', '#fd79a8', '#fdcb6e', '#00b894'];
  const categoryColors = ['#e17055', '#00b894', '#0984e3', '#fdcb6e', '#6c5ce7', '#fd79a8', '#00cec9'];
  const priorityColors = ['#e17055', '#fdcb6e', '#00b894'];

  return (
    <div style={styles.container}>
      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.controlsLeft}>
          <select
            style={styles.select}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 3 Months</option>
            <option value="year">Last Year</option>
          </select>

          <select
            style={styles.select}
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
          >
            <option value="all">All Wards</option>
            <option value="ward1">Ward 1</option>
            <option value="ward2">Ward 2</option>
            <option value="ward3">Ward 3</option>
            <option value="ward4">Ward 4</option>
            <option value="ward5">Ward 5</option>
            <option value="ward6">Ward 6</option>
            <option value="ward7">Ward 7</option>
          </select>
        </div>

        <div style={styles.controlsRight}>
          <button style={styles.actionButton} onClick={refreshData}>
            <RefreshCw size={16} />
            Refresh
          </button>
          <button style={styles.actionButton} onClick={exportReport}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div style={styles.overviewGrid}>
        <div style={styles.overviewCard}>
          <div style={styles.overviewHeader}>
            <h3 style={styles.overviewTitle}>Total Issues</h3>
            <BarChart3 size={24} style={{ color: '#007bff' }} />
          </div>
          <div style={styles.overviewValue}>{analytics.overview.totalIssues.toLocaleString()}</div>
          <div style={styles.overviewSubtext}>
            {analytics.overview.trendsUp ? '↗️' : '↘️'} vs last period
          </div>
        </div>

        <div style={styles.overviewCard}>
          <div style={styles.overviewHeader}>
            <h3 style={styles.overviewTitle}>Resolved Issues</h3>
            <TrendingUp size={24} style={{ color: '#28a745' }} />
          </div>
          <div style={styles.overviewValue}>{analytics.overview.resolvedIssues.toLocaleString()}</div>
          <div style={styles.overviewSubtext}>
            {analytics.overview.resolutionRate}% resolution rate
          </div>
        </div>

        <div style={styles.overviewCard}>
          <div style={styles.overviewHeader}>
            <h3 style={styles.overviewTitle}>Avg Resolution Time</h3>
            <Calendar size={24} style={{ color: '#ffc107' }} />
          </div>
          <div style={styles.overviewValue}>{analytics.overview.averageResolutionTime} days</div>
          <div style={styles.overviewSubtext}>
            Target: 5 days
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={styles.chartsGrid}>
        {/* Issues by Status */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Issues by Status</h3>
          {renderBarChart(analytics.issuesByStatus, 'count', statusColors)}
        </div>

        {/* Issues by Category */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Issues by Category</h3>
          {renderPieChart(analytics.issuesByCategory, categoryColors)}
        </div>

        {/* Priority Distribution */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Priority Distribution</h3>
          {renderPieChart(analytics.priorityDistribution, priorityColors)}
        </div>

        {/* Monthly Trends */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Monthly Trends</h3>
          <div style={styles.lineChart}>
            {analytics.monthlyTrends.map((item, index) => (
              <div key={index} style={styles.lineChartItem}>
                <div style={styles.lineChartMonth}>{item.month}</div>
                <div style={styles.lineChartBars}>
                  <div
                    style={{
                      ...styles.lineChartBar,
                      height: `${(item.reported / 250) * 100}px`,
                      backgroundColor: '#007bff'
                    }}
                    title={`Reported: ${item.reported}`}
                  />
                  <div
                    style={{
                      ...styles.lineChartBar,
                      height: `${(item.resolved / 250) * 100}px`,
                      backgroundColor: '#28a745'
                    }}
                    title={`Resolved: ${item.resolved}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div style={styles.chartLegend}>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, backgroundColor: '#007bff'}} />
              <span>Reported</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, backgroundColor: '#28a745'}} />
              <span>Resolved</span>
            </div>
          </div>
        </div>

        {/* Ward Performance */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Ward Performance</h3>
          <div style={styles.wardTable}>
            <div style={styles.wardTableHeader}>
              <span>Ward</span>
              <span>Total</span>
              <span>Resolved</span>
              <span>Rate</span>
            </div>
            {analytics.issuesByWard.map((ward, index) => (
              <div key={index} style={styles.wardTableRow}>
                <span style={styles.wardName}>{ward.ward}</span>
                <span style={styles.wardCount}>{ward.count}</span>
                <span style={styles.wardResolved}>{ward.resolved}</span>
                <span style={{
                  ...styles.wardRate,
                  color: ward.resolutionRate >= 70 ? '#28a745' : '#ffc107'
                }}>
                  {ward.resolutionRate}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Worker Performance */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Top Performing Workers</h3>
          <div style={styles.workerTable}>
            {analytics.workerPerformance.map((worker, index) => (
              <div key={index} style={styles.workerRow}>
                <div style={styles.workerInfo}>
                  <span style={styles.workerName}>{worker.name}</span>
                  <span style={styles.workerStats}>
                    {worker.completed}/{worker.assigned} completed
                  </span>
                </div>
                <div style={styles.workerRate}>
                  <div
                    style={{
                      ...styles.workerRateBar,
                      width: `${worker.rate}%`,
                      backgroundColor: worker.rate >= 90 ? '#28a745' : worker.rate >= 80 ? '#ffc107' : '#dc3545'
                    }}
                  />
                  <span style={styles.workerRateText}>{worker.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    color: "#6c757d"
  },
  loadingText: {
    marginTop: "16px",
    fontSize: "16px"
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    padding: "16px",
    backgroundColor: "white",
    borderRadius: "8px",
    border: "1px solid #e9ecef"
  },
  controlsLeft: {
    display: "flex",
    gap: "12px"
  },
  controlsRight: {
    display: "flex",
    gap: "12px"
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "white",
    fontSize: "14px"
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
  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "32px"
  },
  overviewCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  overviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  overviewTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "#6c757d"
  },
  overviewValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#343a40",
    marginBottom: "8px"
  },
  overviewSubtext: {
    fontSize: "14px",
    color: "#6c757d"
  },
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "24px"
  },
  chartCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  chartTitle: {
    margin: "0 0 20px 0",
    fontSize: "18px",
    fontWeight: "600",
    color: "#343a40"
  },
  barChart: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  barChartItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  barChartLabel: {
    width: "80px",
    fontSize: "14px",
    color: "#6c757d",
    textAlign: "right"
  },
  barChartBar: {
    flex: 1,
    height: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    overflow: "hidden"
  },
  barChartFill: {
    height: "100%",
    borderRadius: "10px",
    transition: "width 0.3s ease"
  },
  barChartValue: {
    width: "40px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#343a40",
    textAlign: "left"
  },
  pieChartContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  pieChart: {
    display: "flex",
    height: "20px",
    borderRadius: "10px",
    overflow: "hidden"
  },
  pieSlice: {
    minWidth: "2px"
  },
  pieChartLegend: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  legendColor: {
    width: "12px",
    height: "12px",
    borderRadius: "2px"
  },
  legendLabel: {
    fontSize: "14px",
    color: "#6c757d"
  },
  chartLegend: {
    display: "flex",
    gap: "20px",
    marginTop: "16px",
    justifyContent: "center"
  },
  lineChart: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    height: "200px",
    padding: "20px 0",
    borderBottom: "1px solid #e9ecef"
  },
  lineChartItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px"
  },
  lineChartMonth: {
    fontSize: "12px",
    color: "#6c757d"
  },
  lineChartBars: {
    display: "flex",
    gap: "4px",
    alignItems: "end"
  },
  lineChartBar: {
    width: "12px",
    minHeight: "2px",
    borderRadius: "2px"
  },
  wardTable: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  wardTableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "16px",
    padding: "12px 0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#6c757d",
    borderBottom: "1px solid #e9ecef"
  },
  wardTableRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "16px",
    padding: "12px 0",
    fontSize: "14px",
    borderBottom: "1px solid #f8f9fa"
  },
  wardName: {
    fontWeight: "600",
    color: "#343a40"
  },
  wardCount: {
    color: "#6c757d"
  },
  wardResolved: {
    color: "#28a745",
    fontWeight: "500"
  },
  wardRate: {
    fontWeight: "600"
  },
  workerTable: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  workerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #f8f9fa"
  },
  workerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  workerName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#343a40"
  },
  workerStats: {
    fontSize: "12px",
    color: "#6c757d"
  },
  workerRate: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "120px"
  },
  workerRateBar: {
    height: "8px",
    borderRadius: "4px",
    transition: "width 0.3s ease"
  },
  workerRateText: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#343a40"
  }
};

export default Analytics;
