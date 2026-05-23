import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { bookRide } from '../../api/axios';
import MapView from '../../components/MapView';

const RideResults = () => {
  const { state }    = useLocation();
  const navigate     = useNavigate();
  const results      = state?.results || [];
  const form         = state?.form    || {};
  const [booking, setBooking] = useState(null);

  const handleBook = async (routeId) => {
    setBooking(routeId);
    try {
      await bookRide({
        routeId,
        pickupLocation: form.fromLocation,
        dropLocation:   form.toLocation,
      });
      toast.success('Ride booked! Waiting for driver 🚗');
      navigate('/passenger/rides');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(null);
    }
  };

  const stars = (n) => '⭐'.repeat(Math.round(n));

  return (
    <div className="page">
      <h2 style={styles.title}>🔍 Available Rides</h2>
      <p style={styles.sub}>
        {form.fromLocation} → {form.toLocation} •{' '}
        {results.length} ride{results.length !== 1 ? 's' : ''} found
      </p>

      {results.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>😕</div>
          <p>No rides available right now.</p>
          <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>
            Check back later or try different locations!
          </p>
        </div>
      ) : (
        <div className="grid-2" style={{ marginTop: '24px' }}>
          {results.map((route) => (
            <div key={route.routeId} style={styles.card}>
              <div style={styles.driverRow}>
                <div style={styles.avatar}>
                  {route.driverName?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={styles.driverName}>
                    {route.driverName}
                  </div>
                  <div style={styles.rating}>
                    {route.totalRatings > 0
                      ? `${stars(route.averageRating)} (${route.totalRatings})`
                      : 'No ratings yet'}
                  </div>
                </div>
                <span className="badge badge-teal">
                  {route.vehicleType}
                </span>
              </div>

              <div style={styles.routeRow}>
                <span style={styles.loc}>
                  📍 {route.startLocation}
                </span>
                <span style={styles.arrow}>→</span>
                <span style={styles.loc}>
                  🏁 {route.endLocation}
                </span>
              </div>

              {route.waypoints?.length > 2 && (
                <div style={styles.waypoints}>
                  🛣️ Via: {route.waypoints.slice(1, -1).join(', ')}
                </div>
              )}

			  <div style={styles.fareRow}>
			    <span style={styles.fare}>
			      ₹{route.estimatedFare?.toFixed(2)}
			    </span>
			    <span style={styles.dist}>
			      {route.distanceKm?.toFixed(1)} km
			    </span>
			  </div>

			  {/* Map showing route */}
			  <div
			    style={{
			      marginTop: '16px',
			      marginBottom: '12px',
			    }}
			  >
			    <MapView
			      pickup={
			        route.startLocation + ', Hyderabad'
			      }
			      drop={
			        route.endLocation + ', Hyderabad'
			      }
			      waypoints={
			        route.waypoints
			          ?.slice(1, -1)
			          .map(
			            (w) =>
			              w + ', Hyderabad'
			          ) || []
			      }
			      showDirections={true}
			    />
			  </div>

			  <button
			    className="btn-primary"
			    style={{ marginTop: '12px' }}
                onClick={() => handleBook(route.routeId)}
                disabled={booking === route.routeId}>
                {booking === route.routeId
                  ? 'Booking...' : 'Book This Ride 🚗'}
              </button>
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
  },
  driverRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  avatar: {
    width: '42px', height: '42px',
    background: 'linear-gradient(135deg, #00d4aa, #0099ff)',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 700, fontSize: '1.1rem',
  },
  driverName: { color: '#fff', fontWeight: 600, fontSize: '0.95rem' },
  rating: { color: '#555', fontSize: '0.78rem', marginTop: '2px' },
  routeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },
  loc:   { color: '#aaa', fontSize: '0.88rem' },
  arrow: { color: '#00d4aa' },
  waypoints: {
    color: '#555', fontSize: '0.8rem', marginBottom: '12px'
  },
  fareRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },
  fare: {
    color: '#00d4aa', fontSize: '1.4rem', fontWeight: 700
  },
  dist: { color: '#555', fontSize: '0.85rem' },
};

export default RideResults;