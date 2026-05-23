import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { searchRides, getLocations } from '../../api/axios';

const SearchRide = () => {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    fromLocation: '', toLocation: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getLocations().then(res =>
      setLocations(res.data.data || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.fromLocation === form.toLocation) {
      toast.error('From and To cannot be the same!');
      return;
    }
    setLoading(true);
    try {
      const res = await searchRides(form);
      navigate('/passenger/results', {
        state: { results: res.data.data, form }
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h2>🔍 Search a Ride</h2>
        <p className="subtitle">
          Find someone going your way — Abhi!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>From</label>
            <select
              value={form.fromLocation}
              onChange={e =>
                setForm({ ...form, fromLocation: e.target.value })}
              required>
              <option value="">Select pickup location</option>
              {locations.map(l => (
                <option key={l.locationId} value={l.locationName}>
                  {l.locationName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>To</label>
            <select
              value={form.toLocation}
              onChange={e =>
                setForm({ ...form, toLocation: e.target.value })}
              required>
              <option value="">Select drop location</option>
              {locations.map(l => (
                <option key={l.locationId} value={l.locationName}>
                  {l.locationName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}>
            {loading ? 'Searching...' : 'Search Rides 🔍'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchRide;