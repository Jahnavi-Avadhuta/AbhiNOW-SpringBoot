import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(form);

      loginUser(res.data.data);
      toast.success('Welcome back! 🚗');

      const role = res.data.data.role;

      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/choose-role');
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h2>Welcome back 👋</h2>
        <p className="subtitle">
          Login to your AbhiNOW account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Google Login Button */}
        <a
          href="http://localhost:8080/oauth2/authorization/google"
          style={styles.googleBtn}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            style={{
              width: '18px',
              height: '18px'
            }}
          />
          Continue with Google
        </a>

        <p style={styles.bottom}>
          Don't have an account?{' '}
          <Link
            to="/register"
            style={styles.link}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '20px 0',
  },

  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#2a2a2a',
  },

  dividerText: {
    color: '#555',
    fontSize: '0.82rem',
  },

  googleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    background: '#fff',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '12px',
    fontSize: '0.95rem',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },

  bottom: {
    color: '#555',
    fontSize: '0.85rem',
    textAlign: 'center',
    marginTop: '20px',
  },

  link: {
    color: '#00d4aa',
    textDecoration: 'none',
  },
};

export default Login;