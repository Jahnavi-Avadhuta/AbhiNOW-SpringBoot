import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

const Register = () => {
  const [step, setStep]   = useState(1); // 1=form, 2=otp
  const [form, setForm]   = useState({
    name: '', email: '', phone: '', password: ''
  });
  const [otp, setOtp]         = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser }         = useAuth();
  const navigate              = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Step 1 — Register and send OTP
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(form);
      loginUser(res.data.data);
      toast.success('Account created! OTP sent to your phone 📱');
      setStep(2); // go to OTP step
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/otp/verify', {
        phone: form.phone,
        otp: otp,
      });
      toast.success('Phone verified! Welcome to AbhiNOW 🎉');
      navigate('/choose-role');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      await axios.post('/otp/send', { phone: form.phone });
      toast.success('New OTP sent! 📱');
    } catch {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="page-center">
      <div className="form-card">

        {step === 1 ? (
          <>
            <h2>Join AbhiNOW 🚗</h2>
            <p className="subtitle">
              Create your free account today
            </p>

            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  placeholder="Jahnavi Avadhuta"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
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
                <label>Phone Number</label>
                <input
                  name="phone"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}>
                {loading
                  ? 'Creating account...'
                  : 'Create Account →'}
              </button>
            </form>

            <p style={styles.bottom}>
              Already have an account?{' '}
              <Link to="/login" style={styles.link}>
                Login here
              </Link>
            </p>
          </>
        ) : (
          <>
            {/* OTP STEP */}
            <h2>Verify Your Phone 📱</h2>
            <p className="subtitle">
              We sent a 6-digit OTP to{' '}
              <strong style={{ color: '#00d4aa' }}>
                +91 {form.phone}
              </strong>
            </p>

            <form onSubmit={handleVerify}>
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  maxLength={6}
                  style={{ fontSize: '1.4rem',
                    textAlign: 'center', letterSpacing: '8px' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP ✅'}
              </button>
            </form>

            <button
              className="btn-secondary"
              style={{ width: '100%', marginTop: '12px' }}
              onClick={handleResend}>
              Resend OTP 🔄
            </button>

            <p style={styles.bottom}>
              Wrong number?{' '}
              <span
                style={{ ...styles.link, cursor: 'pointer' }}
                onClick={() => setStep(1)}>
                Go back
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  bottom: {
    color: '#555', fontSize: '0.85rem',
    textAlign: 'center', marginTop: '20px'
  },
  link: { color: '#00d4aa', textDecoration: 'none' },
};

export default Register;