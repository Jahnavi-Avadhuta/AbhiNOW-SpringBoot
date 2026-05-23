import { useParams } from 'react-router-dom';
import MapView from '../../components/MapView';
import useRideTracking from '../../hooks/useRideTracking';

const LiveTracking = () => {
  const { rideId } = useParams();
  const { driverLocation, connected } =
    useRideTracking(parseInt(rideId));

  return (
    <div className="page">
      <div style={styles.header}>
        <h2 style={styles.title}>🚗 Live Ride Tracking</h2>
        <div style={{
          ...styles.status,
          background: connected
            ? 'rgba(0,212,170,0.1)' : 'rgba(255,107,107,0.1)',
          color: connected ? '#00d4aa' : '#ff6b6b',
          border: `1px solid ${connected
            ? 'rgba(0,212,170,0.3)' : 'rgba(255,107,107,0.3)'}`,
        }}>
          {connected ? '🟢 Connected' : '🔴 Connecting...'}
        </div>
      </div>

      {driverLocation ? (
        <div style={styles.info}>
          <p style={styles.infoText}>
            📍 Driver is at: {driverLocation.lat.toFixed(4)},
            {driverLocation.lng.toFixed(4)}
          </p>
          <p style={styles.infoText}>
            🕐 Last updated: {driverLocation.timestamp}
          </p>
        </div>
      ) : (
        <div style={styles.waiting}>
          ⏳ Waiting for driver location...
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <MapView
          driverLocation={driverLocation}
          showDirections={false}
        />
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: { color: '#fff', fontSize: '1.5rem', fontWeight: 700 },
  status: {
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  info: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '16px',
  },
  infoText: { color: '#aaa', fontSize: '0.88rem', marginBottom: '6px' },
  waiting: {
    color: '#555',
    textAlign: 'center',
    padding: '20px',
    fontSize: '0.9rem',
  },
};

export default LiveTracking;