import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import MapView from '../../components/MapView';
import useRideTracking from '../../hooks/useRideTracking';
import toast from 'react-hot-toast';

const DriverLiveTracking = () => {
  const { rideId }              = useParams();
  const { user }                = useAuth();
  const navigate                = useNavigate();
  const { connected, sendLocation } =
    useRideTracking(parseInt(rideId));

  const [sharing, setSharing]   = useState(false);
  const [watchId, setWatchId]   = useState(null);
  const [myLocation, setMyLocation] = useState(null);

  const startSharing = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported!');
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMyLocation(loc);

        // Send to WebSocket
        sendLocation(
          position.coords.latitude,
          position.coords.longitude,
          user?.name || 'Driver'
        );
      },
      (error) => {
        toast.error('Location error: ' + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    setWatchId(id);
    setSharing(true);
    toast.success('Location sharing started! 📍');
  };

  const stopSharing = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setSharing(false);
    toast.success('Location sharing stopped');
  };

  useEffect(() => {
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [watchId]);

  return (
    <div className="page">
      <div style={styles.header}>
        <h2 style={styles.title}>📍 Share Your Location</h2>
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

      <p style={styles.sub}>
        Share your live location with the passenger during the ride
      </p>

      <div style={styles.actions}>
        {!sharing ? (
          <button
            className="btn-primary"
            style={{ maxWidth: '280px' }}
            onClick={startSharing}
            disabled={!connected}>
            📍 Start Sharing Location
          </button>
        ) : (
          <button
            className="btn-danger"
            style={{ maxWidth: '280px', padding: '12px 24px' }}
            onClick={stopSharing}>
            ⏹ Stop Sharing
          </button>
        )}
      </div>

      {sharing && myLocation && (
        <div style={styles.info}>
          <p style={styles.infoText}>
            ✅ Sharing live location with passenger
          </p>
          <p style={styles.infoText}>
            📍 Your location: {myLocation.lat.toFixed(4)},
            {myLocation.lng.toFixed(4)}
          </p>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <MapView
          driverLocation={myLocation}
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
    marginBottom: '8px',
  },
  title: { color: '#fff', fontSize: '1.5rem', fontWeight: 700 },
  sub: { color: '#555', fontSize: '0.88rem', marginBottom: '24px' },
  status: {
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  actions: { marginBottom: '20px' },
  info: {
    background: '#1a1a1a',
    border: '1px solid rgba(0,212,170,0.2)',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '16px',
  },
  infoText: {
    color: '#aaa', fontSize: '0.88rem', marginBottom: '6px'
  },
};

export default DriverLiveTracking;