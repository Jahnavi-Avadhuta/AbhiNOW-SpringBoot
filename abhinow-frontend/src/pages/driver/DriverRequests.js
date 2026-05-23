import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getRequests, handleRequest } from '../../api/axios';

const DriverRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await getRequests();
      setRequests(res.data.data || []);
    } catch {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handle = async (id, action) => {
    try {
      await handleRequest(id, action);
      toast.success(`Request ${action}ED! ✅`);
      fetchRequests();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  if (loading) return <div className="loading">Loading requests... ⏳</div>;

  return (
    <div className="page">
      <h2 style={styles.title}>📋 Pending Ride Requests</h2>
      <p style={styles.sub}>
        {requests.length} pending request{requests.length !== 1 ? 's' : ''}
      </p>

      {requests.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🎉</div>
          <p>No pending requests right now!</p>
        </div>
      ) : (
        <div className="grid-2" style={{ marginTop: '24px' }}>
          {requests.map((req) => (
            <div key={req.requestId} style={styles.card}>
              <div style={styles.passenger}>
                👤 <strong style={{ color: '#fff' }}>
                  {req.passengerName}
                </strong>
              </div>
              <div style={styles.route}>
                <span style={styles.loc}>
                  📍 {req.pickupLocation}
                </span>
                <span style={styles.arrow}>→</span>
                <span style={styles.loc}>
                  🏁 {req.dropLocation}
                </span>
              </div>
              <div style={styles.actions}>
                <button
                  className="btn-success"
                  onClick={() => handle(req.requestId, 'ACCEPT')}>
                  ✅ Accept
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handle(req.requestId, 'REJECT')}>
                  ❌ Reject
                </button>
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
  empty: {
    textAlign: 'center', padding: '80px',
    color: '#555',
  },
  emptyIcon: { fontSize: '3rem', marginBottom: '16px' },
  card: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '14px',
    padding: '24px',
  },
  passenger: {
    color: '#aaa', fontSize: '0.9rem',
    marginBottom: '14px',
  },
  route: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  loc:   { color: '#aaa', fontSize: '0.88rem' },
  arrow: { color: '#00d4aa' },
  actions: { display: 'flex', gap: '12px' },
};

export default DriverRequests;