import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        <span style={styles.abhi}>Abhi</span>
        <span style={styles.now}>NOW</span>
      </Link>

      <div style={styles.right}>
        {user ? (
          <>
            <span style={styles.greeting}>
              Hey, {user.name}! 👋
            </span>
            <span style={styles.roleBadge}>
              {role}
            </span>
            <Link to="/dashboard" style={styles.link}>
              Dashboard
            </Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    style={styles.link}>Login</Link>
            <Link to="/register" style={styles.btnPrimary}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: 'rgba(15,15,15,0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #2a2a2a',
    padding: '14px 48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    textDecoration: 'none',
    fontSize: '1.6rem',
    fontWeight: 800,
    fontFamily: 'Georgia, serif',
  },
  abhi: { color: '#ffffff' },
  now:  { color: '#00d4aa' },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  greeting: {
    color: '#aaa',
    fontSize: '0.9rem',
  },
  roleBadge: {
    background: 'rgba(0,212,170,0.1)',
    border: '1px solid rgba(0,212,170,0.3)',
    color: '#00d4aa',
    borderRadius: '6px',
    padding: '3px 10px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  link: {
    color: '#aaa',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #00d4aa, #0099ff)',
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #333',
    color: '#aaa',
    padding: '7px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.88rem',
  },
};

export default Navbar;