import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getPassengerRides } from '../../api/axios';
import MapView from '../../components/MapView';

const PassengerRides = () => {
  const [rides, setRides]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPassengerRides()
      .then(res => setRides(res.data.data || []))
      .catch(() => toast.error('Failed to load rides'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading rides... ⏳</div>;

  return (
    <div className="page">
      <h2 style={styles.title}>🎫 My Rides</h2>
      <p style={styles.sub}>{rides.length} total rides</p>

      {rides.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🚗</div>
          <p>No rides yet!</p>
          <Link to="/passenger/search" style={styles.searchBtn}>
            Search for a Ride →
          </Link>
        </div>
      ) : (
        <div className="grid-2" style={{ marginTop: '24px' }}>
          {rides.map((ride) => (
            <div key={ride.rideId} style={styles.card}>
              <div style={styles.row}>
                <span style={styles.label}>Driver</span>
                <span style={styles.value}>{ride.driverName}</span>
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
			    <span style={styles.label}>Distance</span>
			    <span style={styles.value}>
			      {ride.distanceKm?.toFixed(2)} km
			    </span>
			  </div>
			  {/* Map showing ride route */}
			  <div
			    style={{
			      marginTop: '16px',
			      marginBottom: '12px',
			    }}
			  >
			    <MapView
			      pickup={
			        ride.pickupLocation + ', Hyderabad'
			      }
			      drop={
			        ride.dropLocation + ', Hyderabad'
			      }
			      showDirections={true}
			    />
			  </div>
              <div style={styles.statusRow}>
                <span className={`badge badge-${
                  ride.rideStatus === 'COMPLETED' ? 'teal' :
                  ride.rideStatus === 'CANCELLED' ? 'red' : 'yellow'
                }`}>
                  {ride.rideStatus}
                </span>
                {ride.rideStatus === 'COMPLETED' && !ride.rated && (
                  <Link
                    to={`/passenger/rate/${ride.rideId}`}
                    style={styles.rateBtn}>
                    ⭐ Rate Driver
                  </Link>
                )}
				{ride.rideStatus === 'STARTED' && (
				  <Link
				    to={`/passenger/track/${ride.rideId}`}
				    style={styles.trackBtn}
				  >
				    📍 Track Live
				  </Link>
				)}
                {ride.rated && (
                  <span style={styles.ratedBadge}>✅ Rated</span>
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
  title: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 700
  },

  sub: {
    color: '#555',
    fontSize: '0.88rem',
    marginTop: '4px'
  },

  empty: {
    textAlign: 'center',
    padding: '80px',
    color: '#555'
  },

  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '16px'
  },

  searchBtn: {
    display: 'inline-block',
    marginTop: '16px',
    color: '#00d4aa',
    textDecoration: 'none',
    border: '1px solid rgba(0,212,170,0.3)',
    padding: '8px 18px',
    borderRadius: '8px',
    fontSize: '0.88rem',
  },

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

  label: {
    color: '#555',
    fontSize: '0.82rem'
  },

  value: {
    color: '#aaa',
    fontSize: '0.88rem'
  },

  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },

  rateBtn: {
    color: '#ffc107',
    textDecoration: 'none',
    fontSize: '0.82rem',
    border: '1px solid rgba(255,193,7,0.3)',
    padding: '5px 12px',
    borderRadius: '6px',
  },

  trackBtn: {
    color: '#0099ff',
    textDecoration: 'none',
    fontSize: '0.82rem',
    border: '1px solid rgba(0,153,255,0.3)',
    padding: '5px 12px',
    borderRadius: '6px',
  },

  ratedBadge: {
    color: '#00d4aa',
    fontSize: '0.82rem',
  },
};

export default PassengerRides;