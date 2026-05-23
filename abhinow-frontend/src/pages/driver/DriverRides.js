import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getDriverRides, completeRide } from '../../api/axios';

const DriverRides = () => {
  const [rides, setRides]   = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRides = async () => {
    try {
      const res = await getDriverRides();
      setRides(res.data.data || []);
    } catch {
      toast.error('Failed to load rides');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRides(); }, []);

  const handleComplete = async (rideId) => {
    try {
      await completeRide(rideId);
      toast.success('Ride completed! 🎉');
      fetchRides();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to complete');
    }
  };

  if (loading) return <div className="loading">Loading rides... ⏳</div>;

  return (
    <div className="page">
      <h2 style={styles.title}>🚗 My Rides</h2>
      <p style={styles.sub}>{rides.length} total rides</p>

      {rides.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🚗</div>
          <p>No rides yet. Post a route to get started!</p>
        </div>
      ) : (
        <div className="grid-2" style={{ marginTop: '24px' }}>
          {rides.map((ride) => (
            <div key={ride.rideId} style={styles.card}>
              <div style={styles.row}>
                <span style={styles.label}>Passenger</span>
                <span style={styles.value}>{ride.passengerName}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Route</span>
                <span style={styles.value}>
                  {ride.pickupLocation} → {ride.dropLocation}
                </span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Fare</span>
                <span style={{ color: '#00d4aa', fontWeight: 600 }}>
                  ₹{ride.totalFare?.toFixed(2)}
                </span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Your Earnings</span>
                <span style={{ color: '#00d4aa', fontWeight: 600 }}>
                  ₹{ride.driverEarnings?.toFixed(2)}
                </span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Distance</span>
                <span style={styles.value}>
                  {ride.distanceKm?.toFixed(2)} km
                </span>
              </div>
              <div style={styles.statusRow}>
                <span className={`badge badge-${
                  ride.rideStatus === 'COMPLETED' ? 'teal' :
                  ride.rideStatus === 'CANCELLED' ? 'red' : 'yellow'
                }`}>
                  {ride.rideStatus}
                </span>
				{ride.rideStatus === 'STARTED' && (
				  <>
				    <Link
				      to={`/driver/track/${ride.rideId}`}
				      style={styles.trackBtn}
				    >
				      📍 Share Location
				    </Link>

				    <button
				      className="btn-success"
				      onClick={() =>
				        handleComplete(ride.rideId)
				      }
				    >
				      Complete Ride ✅
				    </button>
				  </>
				)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  title: { color: '#fff', fontSize: '1.5rem', fontWeight: 700 },
  sub:   { color: '#555', fontSize: '0.88rem', marginTop: '4px' },
  empty: { textAlign: 'center', padding: '80px', color: '#555' },
  emptyIcon: { fontSize: '3rem', marginBottom: '16px' },
  card: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '14px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { color: '#555', fontSize: '0.82rem' },
  value: { color: '#aaa', fontSize: '0.88rem' },
  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },

  trackBtn: {
    color: '#0099ff',
    textDecoration: 'none',
    fontSize: '0.82rem',
    border:
      '1px solid rgba(0,153,255,0.3)',
    padding: '5px 12px',
    borderRadius: '6px',
    display: 'inline-block',
  },
};

export default DriverRides;