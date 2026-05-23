import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { rateRide } from '../../api/axios';

const RateRide = () => {
  const { rideId } = useParams();
  const navigate   = useNavigate();
  const [stars, setStars]     = useState(0);
  const [hover, setHover]     = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const labels = ['', 'Poor 😞', 'Fair 😐',
    'Good 😊', 'Great 😄', 'Excellent 🤩'];

  const handleSubmit = async () => {
    if (stars === 0) {
      toast.error('Please select a star rating!');
      return;
    }
    setLoading(true);
    try {
      await rateRide({
        rideId: parseInt(rideId),
        stars,
        comment,
      });
      toast.success('Rating submitted! ⭐');
      navigate('/passenger/rides');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to rate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="form-card" style={{ textAlign: 'center' }}>
        <h2>⭐ Rate Your Ride</h2>
        <p className="subtitle">
          How was your experience with the driver?
        </p>

        {/* Stars */}
        <div style={styles.stars}>
          {[1,2,3,4,5].map((s) => (
            <span
              key={s}
              style={{
                ...styles.star,
                color: s <= (hover || stars) ? '#ffc107' : '#333',
              }}
              onClick={() => setStars(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}>
              ★
            </span>
          ))}
        </div>

        {(hover || stars) > 0 && (
          <p style={styles.label}>{labels[hover || stars]}</p>
        )}

        <div className="form-group" style={{ textAlign: 'left',
          marginTop: '24px' }}>
          <label>Comment (optional)</label>
          <textarea
            rows={3}
            placeholder="Great ride! Very smooth... 🚗"
            value={comment}
            onChange={e => setComment(e.target.value)}
            style={styles.textarea}
          />
        </div>

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Rating ⭐'}
        </button>

        <button
          className="btn-secondary"
          style={{ width: '100%', marginTop: '10px' }}
          onClick={() => navigate('/passenger/rides')}>
          Skip
        </button>
      </div>
    </div>
  );
};

const styles = {
  stars: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '24px',
    marginBottom: '8px',
  },
  star: {
    fontSize: '3rem',
    cursor: 'pointer',
    transition: 'color 0.15s, transform 0.15s',
  },
  label: {
    color: '#ffc107',
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '8px',
  },
  textarea: {
    width: '100%',
    background: '#111',
    border: '1px solid #2a2a2a',
    color: '#fff',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '0.9rem',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
};

export default RateRide;