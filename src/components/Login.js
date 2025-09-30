import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'staff'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (credentials.username && credentials.password) {
        const userData = {
          id: 1,
          username: credentials.username,
          role: credentials.role,
          name: credentials.username.charAt(0).toUpperCase() + credentials.username.slice(1),
          email: `${credentials.username}@municipality.gov`
        };
        onLogin(userData);
      } else {
        setError('Please enter username and password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const demoUsers = [
    { username: 'admin', role: 'admin', name: 'System Administrator' },
    { username: 'supervisor', role: 'supervisor', name: 'Area Supervisor' },
    { username: 'staff', role: 'staff', name: 'Municipal Staff' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.loginCard}>
          <h1 style={styles.title}>Municipal Admin Dashboard</h1>
          <p style={styles.subtitle}>Sign in to manage civic issues</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Role</label>
              <select
                name="role"
                value={credentials.role}
                onChange={handleChange}
                style={styles.input}
                disabled={loading}
              >
                <option value="staff">Staff</option>
                <option value="supervisor">Supervisor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button
              type="submit"
              style={{
                ...styles.button,
                backgroundColor: loading ? '#6c757d' : '#007bff',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={styles.demoSection}>
            <h3 style={styles.demoTitle}>Demo Users:</h3>
            <div style={styles.chipContainer}>
              {demoUsers.map((user) => (
                <div
                  key={user.username}
                  style={styles.chip}
                  onClick={() => {
                    setCredentials({
                      username: user.username,
                      password: 'demo123',
                      role: user.role
                    });
                  }}
                >
                  {user.name} ({user.role})
                </div>
              ))}
            </div>
            <p style={styles.demoNote}>Click on any demo user to auto-fill credentials</p>
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
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  content: {
    flex: 1,
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "500px"
  },
  loginCard: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px"
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: "28px",
    fontWeight: "700",
    color: "#343a40"
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    color: "#6c757d",
    fontSize: "16px"
  },
  formGroup: {
    marginBottom: 24
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#343a40",
    fontSize: "14px"
  },
  input: {
    marginBottom: 0,
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s"
  },
  button: {
    marginTop: 16,
    padding: "14px 24px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    width: "100%",
    transition: "background-color 0.2s"
  },
  error: {
    color: "#dc3545",
    fontSize: "14px",
    marginBottom: "16px",
    padding: "8px 12px",
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    borderRadius: "4px"
  },
  demoSection: {
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #e9ecef"
  },
  demoTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#343a40",
    textAlign: "center"
  },
  chipContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: 12,
    marginBottom: "16px"
  },
  chip: {
    margin: 0,
    padding: "10px 16px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center"
  },
  demoNote: {
    fontSize: "12px",
    color: "#6c757d",
    textAlign: "center",
    fontStyle: "italic"
  }
};

export default Login;
