import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setRole } from '../api/axios';
import { useAuth } from '../context/AuthContext';

const ChooseRole = () => {
  const [selected, setSelected] = useState(null);
  const [vehicle, setVehicle]   = useState('CAR');
  const [license, setLicense]   = useState('');
  const [loading, setLoading]   = useState(false);
  const { updateRole, user }    = useAuth();
  const navigate                = useNavigate();

  const handleChoose = async () => {
    if (!selected) {
      toast.error('Please select a role!');
      return;
    }
    setLoading(true);
    try {
      const data = {
        role: selected,
        ...(selected === 'DRIVER' && {
          vehicleType: vehicle,
          licenseNumber: license,
        }),
      };
      await setRole(data);
      updateRole(selected);
      toast.success(`You are now a ${selected}! 🚗`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to set role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div style={styles.container}>
        <h2 style={styles.title}>
          Hey {user?.name}! How do you want to ride? 😊
        </h2>
        <p style={styles.sub}>
          You can switch roles anytime from your dashboard
        </p>

        <div style={styles.cards}>
          {/* Passenger */}
          <div
            style={{
              ...styles.roleCard,
              ...(selected === 'USER' ? styles.selected : {}),
            }}
            onClick={() => setSelected('USER')}>
            <div style={styles.roleIcon}>🎒</div>
            <h3 style={styles.roleTitle}>Passenger</h3>
            <p style={styles.roleDesc}>
              Search for rides, book seats, and commute affordably
            </p>
          </div>

          {/* Driver */}
          <div
            style={{
              ...styles.roleCard,
              ...(selected === 'DRIVER' ? styles.selected : {}),
            }}
            onClick={() => setSelected('DRIVER')}>
            <div style={styles.roleIcon}>🚗</div>
            <h3 style={styles.roleTitle}>Driver</h3>
            <p style={styles.roleDesc}>
              Post your daily route, accept passengers, and earn money
            </p>
          </div>
        </div>

        {/* Driver extra fields */}
        {selected === 'DRIVER' && (
          <div style={styles.driverFields}>
            <div className="form-group">
              <label>Vehicle Type</label>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}>
                <option value="BIKE">🏍️ Bike</option>
                <option value="AUTO">🛺 Auto</option>
                <option value="CAR">🚗 Car</option>
              </select>
            </div>
            <div className="form-group">
              <label>License Number</label>
              <input
                placeholder="TS09AB1234"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
              />
            </div>
          </div>
        )}

        <button
          className="btn-primary"
          style={{ marginTop: '24px', maxWidth: '320px', width: '100%' }}
          onClick={handleChoose}
          disabled={loading}>
          {loading ? 'Setting role...' : 'Continue →'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
    padding: '0 20px',
  },
  title: { color: '#fff', fontSize: '1.6rem',
    fontWeight: 700, marginBottom: '8px' },
  sub: { color: '#555', fontSize: '0.88rem', marginBottom: '36px' },
  cards: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '24px',
  },
  roleCard: {
    background: '#1a1a1a',
    border: '2px solid #2a2a2a',
    borderRadius: '16px',
    padding: '32px 20px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
  },
  selected: {
    borderColor: '#00d4aa',
    background: 'rgba(0,212,170,0.05)',
  },
  roleIcon: { fontSize: '2.5rem', marginBottom: '14px' },
  roleTitle: { color: '#fff', fontSize: '1.1rem',
    fontWeight: 600, marginBottom: '8px' },
  roleDesc: { color: '#555', fontSize: '0.83rem', lineHeight: 1.6 },
  driverFields: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'left',
  },
};

export default ChooseRole;