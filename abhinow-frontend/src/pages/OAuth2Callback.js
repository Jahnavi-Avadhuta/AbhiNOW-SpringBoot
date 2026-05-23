import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const OAuth2Callback = () => {
  const [params]  = useSearchParams();
  const { loginUser } = useAuth();
  const navigate  = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    const name  = params.get('name');
    const email = params.get('email');
    const role  = params.get('role');
    const error = params.get('error');

    if (error) {
      toast.error('Google login failed. Please try again.');
      navigate('/login');
      return;
    }

    if (token) {
      loginUser({ token, name, email, role });
      toast.success(`Welcome ${name}! 🎉`);

      if (role === 'ADMIN') navigate('/admin');
      else navigate('/choose-role');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.spinner}>⏳</div>
      <p style={styles.text}>Signing you in with Google...</p>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f0f0f',
  },
  spinner: { fontSize: '3rem', marginBottom: '16px' },
  text: { color: '#555', fontSize: '1rem' },
};

export default OAuth2Callback;