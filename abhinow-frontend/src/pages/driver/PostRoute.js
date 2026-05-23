import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { postRoute, getLocations } from '../../api/axios';

const PostRoute = () => {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    startLocation: '',
    endLocation: '',
    startTime: '',
    vehicleType: 'CAR',
    licenseNumber: '',
  });
  const [waypoints, setWaypoints]   = useState([]);
  const [wpSearch, setWpSearch]     = useState('');
  const [loading, setLoading]       = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getLocations().then(res =>
      setLocations(res.data.data || []));
  }, []);

  const filtered = locations.filter(l =>
    l.locationName.toLowerCase().includes(wpSearch.toLowerCase()) &&
    !waypoints.includes(l.locationName));

  const addWaypoint = (name) => {
    setWaypoints([...waypoints, name]);
    setWpSearch('');
  };

  const removeWaypoint = (name) =>
    setWaypoints(waypoints.filter(w => w !== name));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postRoute({
        ...form,
        startTime: form.startTime + ':00',
        waypoints,
      });
      toast.success('Route posted successfully! 🗺️');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post route');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="form-card" style={{ maxWidth: '540px' }}>
        <h2>🗺️ Post a Route</h2>
        <p className="subtitle">Share your route and earn by giving rides</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vehicle Type</label>
            <select
              value={form.vehicleType}
              onChange={e =>
                setForm({ ...form, vehicleType: e.target.value })}>
              <option value="BIKE">🏍️ Bike</option>
              <option value="AUTO">🛺 Auto</option>
              <option value="CAR">🚗 Car</option>
            </select>
          </div>

          <div className="form-group">
            <label>License Number</label>
            <input
              placeholder="TS09AB1234"
              value={form.licenseNumber}
              onChange={e =>
                setForm({ ...form, licenseNumber: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              value={form.startTime}
              onChange={e =>
                setForm({ ...form, startTime: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Start Location</label>
            <select
              value={form.startLocation}
              onChange={e =>
                setForm({ ...form, startLocation: e.target.value })}
              required>
              <option value="">Select start location</option>
              {locations.map(l => (
                <option key={l.locationId} value={l.locationName}>
                  {l.locationName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>End Location</label>
            <select
              value={form.endLocation}
              onChange={e =>
                setForm({ ...form, endLocation: e.target.value })}
              required>
              <option value="">Select end location</option>
              {locations.map(l => (
                <option key={l.locationId} value={l.locationName}>
                  {l.locationName}
                </option>
              ))}
            </select>
          </div>

          {/* Waypoints */}
          <div className="form-group">
            <label>Waypoints (stops along route)</label>
            <div style={styles.wpBox}>
              <input
                placeholder="🔍 Search locations..."
                value={wpSearch}
                onChange={e => setWpSearch(e.target.value)}
                style={styles.wpSearch}
              />
              {wpSearch && (
                <div style={styles.wpDropdown}>
                  {filtered.slice(0, 8).map(l => (
                    <div
                      key={l.locationId}
                      style={styles.wpItem}
                      onClick={() => addWaypoint(l.locationName)}>
                      📍 {l.locationName}
                    </div>
                  ))}
                </div>
              )}
              <div style={styles.chips}>
                {waypoints.length === 0 ? (
                  <span style={styles.noChips}>
                    No waypoints added yet
                  </span>
                ) : waypoints.map(w => (
                  <div key={w} style={styles.chip}>
                    📍 {w}
                    <button
                      type="button"
                      style={styles.chipX}
                      onClick={() => removeWaypoint(w)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}>
            {loading ? 'Posting...' : 'Post Route →'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wpBox: {
    background: '#111',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    padding: '12px',
    position: 'relative',
  },
  wpSearch: {
    width: '100%', background: '#1a1a1a',
    border: '1px solid #333', color: '#fff',
    borderRadius: '8px', padding: '10px 12px',
    fontSize: '0.9rem', outline: 'none',
    marginBottom: '8px',
  },
  wpDropdown: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    maxHeight: '160px',
    overflowY: 'auto',
    marginBottom: '8px',
  },
  wpItem: {
    padding: '9px 12px',
    color: '#aaa',
    fontSize: '0.88rem',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    minHeight: '36px',
    marginTop: '8px',
  },
  noChips: { color: '#444', fontSize: '0.82rem' },
  chip: {
    background: 'rgba(0,212,170,0.1)',
    border: '1px solid rgba(0,212,170,0.25)',
    color: '#00d4aa',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '0.82rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  chipX: {
    background: 'none', border: 'none',
    color: '#00d4aa', cursor: 'pointer',
    fontSize: '0.75rem', padding: 0,
  },
};

export default PostRoute;