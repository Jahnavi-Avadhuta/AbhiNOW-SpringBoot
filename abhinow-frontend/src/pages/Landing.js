import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            ⚡ Built for Hyderabad's daily commuters
          </div>
          <h1 style={styles.heroTitle}>
            Ride Smarter.<br />
            <span style={styles.gradient}>Commute Together.</span>
          </h1>
          <p style={styles.heroSub}>
            AbhiNOW connects students and professionals on the same
            daily routes — saving money, cutting pollution, and making
            every commute easier.
          </p>
          <div style={styles.heroActions}>
            {user ? (
              <Link to="/dashboard" style={styles.btnPrimary}>
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" style={styles.btnPrimary}>
                  Get Started Free
                </Link>
                <Link to="/login" style={styles.btnSecondary}>
                  Login
                </Link>
              </>
            )}
          </div>
          <p style={styles.slogan}>Saath chalein? Abhi? 🚗</p>
        </div>
      </section>

      {/* STATS */}
      <div style={styles.stats}>
        {[
          { num: '200+', label: 'Locations in Hyderabad' },
          { num: '3',    label: 'Vehicle Types' },
          { num: '10%',  label: 'Low Commission' },
          { num: '0',    label: 'Ads. Ever.' },
        ].map((s, i) => (
          <div key={i} style={styles.statItem}>
            <div style={styles.statNum}>{s.num}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why AbhiNOW?</h2>
        <div style={styles.featureGrid}>
          {[
            { icon: '🎓', title: 'Student-First',
              desc: 'Built for students and daily commuters on fixed routes.' },
            { icon: '🔄', title: 'Ongoing Routes',
              desc: 'No random rides. Drivers post fixed daily routes.' },
            { icon: '💰', title: 'Fair Pricing',
              desc: 'Transparent fares with only 10% platform commission.' },
            { icon: '⚡', title: 'Surge Aware',
              desc: 'Dynamic pricing during peak hours keeps things fair.' },
            { icon: '🌿', title: 'Eco-Friendly',
              desc: 'Fewer vehicles, less fuel, lower carbon footprint.' },
            { icon: '🛡️', title: 'Secure',
              desc: 'JWT auth, BCrypt passwords, role-based access.' },
          ].map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h4 style={styles.featureTitle}>{f.title}</h4>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.howSection}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.steps}>
          {[
            { n: '1', title: 'Register',
              desc: 'Create a free account in seconds.' },
            { n: '2', title: 'Choose Role',
              desc: 'Switch between Driver and Passenger anytime.' },
            { n: '3', title: 'Post or Find',
              desc: 'Drivers post routes. Passengers search and book.' },
            { n: '4', title: 'Ride & Earn',
              desc: 'Complete rides and track your earnings.' },
          ].map((s, i) => (
            <div key={i} style={styles.step}>
              <div style={styles.stepNum}>{s.n}</div>
              <h4 style={styles.stepTitle}>{s.title}</h4>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerBrand}>
          <span style={{ color: '#fff', fontWeight: 700 }}>Abhi</span>
          <span style={{ color: '#00d4aa', fontWeight: 700 }}>NOW</span>
        </div>
        <p style={styles.footerText}>
          Made with ❤️ by <b>Jahnavi Avadhuta</b>
        </p>
        <p style={styles.footerCopy}>© 2026 AbhiNOW</p>
      </footer>
    </div>
  );
};

const styles = {
  hero: {
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '80px 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute', inset: 0,
    background: `
      radial-gradient(ellipse at 20% 30%,
        rgba(0,212,170,0.08) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 70%,
        rgba(0,153,255,0.07) 0%, transparent 55%)`,
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative', zIndex: 1,
    maxWidth: '680px',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(0,212,170,0.08)',
    border: '1px solid rgba(0,212,170,0.2)',
    borderRadius: '999px',
    padding: '6px 18px',
    fontSize: '0.82rem',
    color: '#00d4aa',
    marginBottom: '28px',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.15,
    letterSpacing: '-1.5px',
    marginBottom: '18px',
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  gradient: {
    background: 'linear-gradient(135deg, #00d4aa, #0099ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    color: '#666',
    fontSize: '1.05rem',
    lineHeight: 1.7,
    marginBottom: '36px',
  },
  heroActions: {
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '24px',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #00d4aa, #0099ff)',
    color: '#fff',
    textDecoration: 'none',
    padding: '13px 28px',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '1rem',
  },
  btnSecondary: {
    background: 'transparent',
    border: '1px solid #2a2a2a',
    color: '#aaa',
    textDecoration: 'none',
    padding: '13px 28px',
    borderRadius: '10px',
    fontSize: '1rem',
  },
  slogan: {
    color: '#444',
    fontSize: '0.9rem',
    fontStyle: 'italic',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    padding: '50px 24px',
    borderTop: '1px solid #2a2a2a',
    borderBottom: '1px solid #2a2a2a',
    flexWrap: 'wrap',
  },
  statItem: { textAlign: 'center' },
  statNum: {
    color: '#fff',
    fontSize: '2rem',
    fontWeight: 700,
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  statLabel: { color: '#555', fontSize: '0.85rem', marginTop: '4px' },
  features: {
    padding: '90px 24px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: '2rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '48px',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  featureCard: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '16px',
    padding: '28px',
  },
  featureIcon: { fontSize: '1.8rem', marginBottom: '14px' },
  featureTitle: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '8px',
  },
  featureDesc: { color: '#555', fontSize: '0.875rem', lineHeight: 1.6 },
  howSection: {
    padding: '90px 24px',
    background: '#111',
    borderTop: '1px solid #2a2a2a',
  },
  steps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '32px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  step: { textAlign: 'center' },
  stepNum: {
    width: '52px', height: '52px',
    background: 'linear-gradient(135deg, #00d4aa, #0099ff)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#fff',
  },
  stepTitle: {
    color: '#fff',
    fontSize: '0.95rem',
    fontWeight: 600,
    marginBottom: '6px',
  },
  stepDesc: { color: '#555', fontSize: '0.83rem', lineHeight: 1.6 },
  footer: {
    background: '#111',
    borderTop: '1px solid #2a2a2a',
    padding: '32px 48px',
    textAlign: 'center',
  },
  footerBrand: { fontSize: '1.4rem', marginBottom: '10px' },
  footerText: { color: '#444', fontSize: '0.85rem', marginBottom: '6px' },
  footerCopy: { color: '#333', fontSize: '0.78rem' },
};

export default Landing;