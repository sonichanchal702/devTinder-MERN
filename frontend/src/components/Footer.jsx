const Footer = () => {
  return (
    <>
      <style>{`
        .vibe-footer {
          width: 100%;
          box-sizing: border-box;
          background: rgba(6,4,18,0.9);
          border-top: 1px solid rgba(139,92,246,0.12);
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
        }

        .vibe-footer-left {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .vibe-footer-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 0.9rem;
        }

        .vibe-footer-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .vibe-footer-link {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          transition: color 0.2s;
        }

        .vibe-footer-link:hover { color: rgba(167,139,250,0.7); }
      `}</style>

      <footer className="vibe-footer">
        <div className="vibe-footer-left">
          <span className="vibe-footer-logo">🔥 Vibe</span>
          <span>© {new Date().getFullYear()} · All rights reserved</span>
        </div>
        <div className="vibe-footer-right">
          <a href="#" className="vibe-footer-link">Privacy</a>
          <a href="#" className="vibe-footer-link">Terms</a>
          <a href="#" className="vibe-footer-link">Contact</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;