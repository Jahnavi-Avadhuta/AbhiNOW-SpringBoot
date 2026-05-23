import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, role } = useAuth();

  const driverActions = [
    { icon: '🗺️', title: 'Post a Route',
      desc: 'Share your daily route and earn',
      link: '/driver/post-route' },
    { icon: '📋', title: 'View Requests',
      desc: 'Accept or reject ride requests',
      link: '/driver/requests' },
    { icon: '🚗', title: 'My Rides',
      desc: 'View and complete your rides',
      link: '/driver/rides' },
  ];

  const passengerActions = [
    { icon: '🔍', title: 'Search Ride',
      desc: 'Find rides going your way',
      link: '/passenger/search' },
    { icon: '🎫', title: 'My Rides',
      desc: 'View your ride history',
      link: '/passenger/rides' },
  ];

  const actions = role === 'DRIVER' ? driverActions : passengerActions;

  return (
    <div className="page">
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Hey {user?.name}! 👋
          </h1>
          <p style={styles.sub}>
            What would you like to do today?
          </p>
        </div>
        <Link to="/choose-role" style={styles.switchBtn}>
          Switch Role ↔
        </Link>
      </div>

      {/* Role badge */}
      <div style={styles.roleBadge}>
        {role === 'DRIVER' ? '🚗 You are in Driver mode' :
         role === 'ADMIN'  ? '⚙️ Admin Panel' :
                             '🎒 You are in Passenger mode'}
      </div>

      {/* Action cards */}
      {role === 'ADMIN' ? (
        <div style={styles.adminCard}>
          <h3 style={{ color: '#fff', marginBottom: '8px' }}>
            ⚙️ Admin Panel
          </h3>
          <p style={{ color: '#555', marginBottom: '16px' }}>
            Manage users, rides, complaints and more
          </p>
          <Link to="/admin" style={styles.btnPrimary}>
            Open Admin Panel →
          </Link>
        </div>
      ) : (
        <div className="grid-3" style={{ marginTop: '32px' }}>
          {actions.map((action, i) => (
            <Link
              key={i}
              to={action.link}
              style={{ textDecoration: 'none' }}>
              <div className="card" style={styles.actionCard}>
                <div style={styles.actionIcon}>{action.icon}</div>
                <h3 style={styles.actionTitle}>{action.title}</h3>
                <p style={styles.actionDesc}>{action.desc}</p>
                <span style={styles.actionArrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  title: { color: '#fff', fontSize: '1.8rem', fontWeight: 700 },
  sub:   { color: '#555', fontSize: '0.9rem', marginTop: '4px' },
  switchBtn: {
    background: 'transparent',
    border: '1px solid #2a2a2a',
    color: '#aaa',
    textDecoration: 'none',
    padding: '9px 18px',
    borderRadius: '8px',
    fontSize: '0.88rem',
  },
  roleBadge: {
    display: 'inline-block',
    background: 'rgba(0,212,170,0.08)',
    border: '1px solid rgba(0,212,170,0.2)',
    color: '#00d4aa',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '0.85rem',
    marginBottom: '8px',
  },
  actionCard: {
    cursor: 'pointer',
    position: 'relative',
    minHeight: '160px',
  },
  actionIcon:  { fontSize: '2rem', marginBottom: '14px' },
  actionTitle: { color: '#fff', fontSize: '1.05rem',
    fontWeight: 600, marginBottom: '6px' },
  actionDesc:  { color: '#555', fontSize: '0.83rem', lineHeight: 1.6 },
  actionArrow: {
    position: 'absolute', bottom: '20px', right: '20px',
    color: '#00d4aa', fontSize: '1.2rem',
  },
  adminCard: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '14px',
    padding: '32px',
    marginTop: '32px',
    maxWidth: '400px',
  },
  btnPrimary: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #00d4aa, #0099ff)',
    color: '#fff',
    textDecoration: 'none',
    padding: '11px 22px',
    borderRadius: '9px',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
};

export default Dashboard;