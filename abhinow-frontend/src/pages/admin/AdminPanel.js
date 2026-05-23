import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  getAdminStats, getAllUsers,
  suspendUser, unsuspendUser, deleteUser
} from '../../api/axios';

const AdminPanel = () => {
  const [section, setSection] = useState('overview');
  const [stats, setStats]     = useState(null);
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [section]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (section === 'overview') {
        const res = await getAdminStats();
        setStats(res.data.data);
      } else if (section === 'users') {
        const res = await getAllUsers();
        setUsers(res.data.data || []);
      }
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = async (id, isSuspended) => {
    try {
      if (isSuspended) await unsuspendUser(id);
      else await suspendUser(id);
      toast.success(isSuspended ? 'User unsuspended!' : 'User suspended!');
      loadData();
    } catch {
      toast.error('Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await deleteUser(id);
      toast.success('User deleted!');
      loadData();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.brand}>
          <span style={{ color: '#fff', fontWeight: 700 }}>Abhi</span>
          <span style={{ color: '#00d4aa', fontWeight: 700 }}>NOW</span>
          <div style={styles.adminBadge}>⚙️ ADMIN</div>
        </div>

        {[
          { key: 'overview',   icon: '📊', label: 'Overview' },
          { key: 'users',      icon: '👥', label: 'Users' },
        ].map(item => (
          <div
            key={item.key}
            style={{
              ...styles.navItem,
              ...(section === item.key ? styles.navActive : {}),
            }}
            onClick={() => setSection(item.key)}>
            {item.icon} {item.label}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={styles.main}>

        {/* OVERVIEW */}
        {section === 'overview' && (
          <>
            <h2 style={styles.title}>📊 Dashboard Overview</h2>
            {loading ? (
              <div className="loading">Loading stats... ⏳</div>
            ) : stats && (
              <div className="grid-3" style={{ marginTop: '24px' }}>
                {[
                  { icon: '👥', label: 'Total Users',
                    value: stats.totalUsers },
                  { icon: '🚗', label: 'Total Rides',
                    value: stats.totalRides },
                  { icon: '✅', label: 'Completed',
                    value: stats.completedRides },
                  { icon: '❌', label: 'Cancelled',
                    value: stats.cancelledRides },
                  { icon: '💰', label: 'App Revenue',
                    value: `₹${stats.totalRevenue?.toFixed(0)}` },
                  { icon: '🛣️', label: 'Active Routes',
                    value: stats.activeRoutes },
                  { icon: '🚨', label: 'Pending Complaints',
                    value: stats.pendingComplaints },
                  { icon: '🔴', label: 'Suspended Users',
                    value: stats.suspendedUsers },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <div style={{ fontSize: '1.4rem',
                      marginBottom: '8px' }}>{s.icon}</div>
                    <div className="label">{s.label}</div>
                    <div className="value">{s.value}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* USERS */}
        {section === 'users' && (
          <>
            <h2 style={styles.title}>👥 User Management</h2>
            {loading ? (
              <div className="loading">Loading users... ⏳</div>
            ) : (
              <div style={styles.tableWrap}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Trust</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.userId}>
                        <td style={{ color: '#fff' }}>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone || '—'}</td>
                        <td>
                          <span className="badge badge-blue">
                            {u.role}
                          </span>
                        </td>
                        <td>⭐ {u.trustScore}</td>
                        <td>
                          <span className={`badge ${
                            u.suspended ? 'badge-red' : 'badge-teal'
                          }`}>
                            {u.suspended ? 'Suspended' : 'Active'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              className={u.suspended
                                ? 'btn-success' : 'btn-danger'}
                              style={{ fontSize: '0.75rem',
                                padding: '4px 10px' }}
                              onClick={() => handleSuspend(
                                u.userId, u.suspended)}>
                              {u.suspended ? 'Unsuspend' : 'Suspend'}
                            </button>
                            <button
                              className="btn-danger"
                              style={{ fontSize: '0.75rem',
                                padding: '4px 10px' }}
                              onClick={() => handleDelete(u.userId)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    minHeight: 'calc(100vh - 60px)',
  },
  sidebar: {
    width: '220px',
    background: '#111',
    borderRight: '1px solid #2a2a2a',
    padding: '24px 16px',
    flexShrink: 0,
  },
  brand: {
    fontSize: '1.3rem',
    marginBottom: '8px',
    paddingBottom: '16px',
    borderBottom: '1px solid #2a2a2a',
  },
  adminBadge: {
    display: 'inline-block',
    background: 'rgba(255,107,107,0.1)',
    border: '1px solid rgba(255,107,107,0.2)',
    color: '#ff6b6b',
    borderRadius: '6px',
    padding: '2px 8px',
    fontSize: '0.7rem',
    fontWeight: 600,
    marginTop: '6px',
  },
  navItem: {
    padding: '10px 12px',
    borderRadius: '9px',
    color: '#555',
    fontSize: '0.88rem',
    cursor: 'pointer',
    marginTop: '4px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  navActive: {
    background: 'rgba(0,212,170,0.1)',
    color: '#00d4aa',
    border: '1px solid rgba(0,212,170,0.2)',
  },
  main: {
    flex: 1,
    padding: '40px 48px',
    overflowX: 'auto',
  },
  title: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '8px',
  },
  tableWrap: {
    marginTop: '24px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '14px',
    padding: '24px',
    overflowX: 'auto',
  },
};

export default AdminPanel;