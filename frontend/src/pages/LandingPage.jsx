import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WORDS = ["Developers", "Athletes", "Creators", "Founders", "Hustlers"];

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (user) navigate("/feed");
  }, [user]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((p) => (p + 1) % WORDS.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lp {
          min-height: 100vh;
          background: #060412;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* ── Animated background orbs ── */
        .orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(100px);
          animation: drift 8s ease-in-out infinite alternate;
        }
        .orb-1 { width: 600px; height: 600px; background: rgba(124,58,237,0.18); top: -200px; left: -200px; animation-delay: 0s; }
        .orb-2 { width: 500px; height: 500px; background: rgba(37,99,235,0.14); bottom: -150px; right: -150px; animation-delay: -3s; }
        .orb-3 { width: 350px; height: 350px; background: rgba(244,114,182,0.1); top: 40%; left: 55%; animation-delay: -6s; }

        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.05); }
        }

        /* ── Nav ── */
        .lp-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 40px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .lp-logo {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          cursor: pointer;
          letter-spacing: -0.5px;
        }

        .lp-nav-right { display: flex; gap: 12px; align-items: center; }

        .btn-ghost-nav {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: rgba(255,255,255,0.7);
          padding: 9px 20px;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-ghost-nav:hover { background: rgba(255,255,255,0.06); color: #fff; }

        .btn-primary-nav {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          border-radius: 12px;
          color: #fff;
          padding: 9px 22px;
          font-size: 0.88rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(124,58,237,0.35);
        }
        .btn-primary-nav:hover { filter: brightness(1.15); transform: translateY(-1px); }

        /* ── Hero ── */
        .lp-hero {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 24px 80px;
          max-width: 900px;
          margin: 0 auto;
        }

        .lp-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          border-radius: 999px;
          padding: 8px 18px;
          font-size: 0.82rem;
          color: #c4b5fd;
          margin-bottom: 36px;
          letter-spacing: 0.3px;
        }

        .lp-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 12px;
          color: #fff;
        }

        .lp-word {
          display: inline-block;
          background: linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: opacity 0.3s ease, transform 0.3s ease;
          min-width: 320px;
        }
        .lp-word.hidden { opacity: 0; transform: translateY(12px); }
        .lp-word.visible { opacity: 1; transform: translateY(0); }

        .lp-sub {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: rgba(255,255,255,0.45);
          max-width: 540px;
          line-height: 1.7;
          margin: 24px auto 44px;
        }

        .lp-cta-group {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 60px;
        }

        .btn-cta-primary {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          border-radius: 16px;
          color: #fff;
          padding: 16px 36px;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 8px 32px rgba(124,58,237,0.4);
          letter-spacing: 0.2px;
        }
        .btn-cta-primary:hover { filter: brightness(1.12); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(124,58,237,0.55); }

        .btn-cta-ghost {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          color: rgba(255,255,255,0.7);
          padding: 16px 32px;
          font-size: 1rem;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.25s;
          backdrop-filter: blur(8px);
        }
        .btn-cta-ghost:hover { background: rgba(255,255,255,0.08); color: #fff; border-color: rgba(255,255,255,0.2); }

        /* ── Stats strip ── */
        .lp-stats {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 32px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.3); letter-spacing: 0.5px; }

        /* ── Divider ── */
        .lp-divider {
          position: relative;
          z-index: 10;
          max-width: 900px;
          margin: 0 auto;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent);
        }

        /* ── Features ── */
        .lp-features {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 24px;
        }

        .lp-section-label {
          text-align: center;
          font-size: 0.78rem;
          color: #a78bfa;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .lp-section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          text-align: center;
          margin-bottom: 56px;
          letter-spacing: -1px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 24px;
          padding: 32px 28px;
          transition: all 0.3s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(124,58,237,0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-card:hover { border-color: rgba(139,92,246,0.4); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(124,58,237,0.15); }
        .feature-card:hover::before { opacity: 1; }

        .feature-icon {
          width: 52px; height: 52px;
          border-radius: 16px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: #fff;
        }

        .feature-desc {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
        }

        /* ── How it works ── */
        .lp-how {
          position: relative;
          z-index: 10;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 48px;
        }

        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 24px 28px;
          transition: all 0.3s;
        }
        .step-item:hover { border-color: rgba(139,92,246,0.3); background: rgba(124,58,237,0.05); }

        .step-num {
          flex-shrink: 0;
          width: 36px; height: 36px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.9rem;
          color: #fff;
          box-shadow: 0 4px 16px rgba(124,58,237,0.4);
        }

        .step-content h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: #fff;
        }
        .step-content p { font-size: 0.85rem; color: rgba(255,255,255,0.4); line-height: 1.6; }

        /* ── Final CTA ── */
        .lp-final-cta {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 60px 24px 80px;
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-box {
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 32px;
          padding: 56px 40px;
          backdrop-filter: blur(20px);
        }

        .cta-box h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 900;
          margin-bottom: 14px;
          letter-spacing: -1px;
        }

        .cta-box p {
          color: rgba(255,255,255,0.4);
          font-size: 0.95rem;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        /* ── Footer ── */
        .lp-footer {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 24px;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.2);
          border-top: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>

      <div className="lp">
        {/* Orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Nav */}
        <nav className="lp-nav">
          <div className="lp-logo" onClick={() => navigate("/")}>🔥 Vibe</div>
          <div className="lp-nav-right">
            <button className="btn-ghost-nav" onClick={() => navigate("/login")}>Log in</button>
            <button className="btn-primary-nav" onClick={() => navigate("/login")}>Join Free →</button>
          </div>
        </nav>

        {/* Hero */}
        <section className="lp-hero">
          <div className="lp-chip">
            <span>✨</span>
            The networking platform built for real connections
          </div>

          <h1 className="lp-h1">
            Where{" "}
            <span className={`lp-word ${visible ? "visible" : "hidden"}`}>
              {WORDS[wordIndex]}
            </span>
            <br />
            Connect &amp; Grow
          </h1>

          <p className="lp-sub">
            Swipe through profiles, send connection requests, and build your
            network — whether you're a dev, an athlete, a creator, or just
            someone with big goals.
          </p>

          <div className="lp-cta-group">
            <button className="btn-cta-primary" onClick={() => navigate("/login")}>
              Join Free — it's instant ✦
            </button>
            <button className="btn-cta-ghost" onClick={() => navigate("/login")}>
              Browse profiles →
            </button>
          </div>

          {/* Stats */}
          <div className="lp-stats">
            {[
              { num: "10K+", label: "Members" },
              { num: "50K+", label: "Connections made" },
              { num: "4+", label: "User types" },
              { num: "100%", label: "Free to join" },
            ].map((s) => (
              <div className="stat-item" key={s.label}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="lp-divider" />

        {/* Features */}
        <section className="lp-features">
          <p className="lp-section-label">Why Vibe?</p>
          <h2 className="lp-section-title">Everything you need to grow your network</h2>
          <div className="features-grid">
            {[
              { icon: "🎯", title: "Smart Matching", desc: "Swipe through people who match your vibe — by skills, interests, or industry. No noise, just signal." },
              { icon: "⚡", title: "Instant Connect", desc: "Send a request, get accepted, start chatting. No gatekeeping, no waiting, no algorithms hiding people." },
              { icon: "🤖", title: "AI-Powered Bios", desc: "Our AI writes your bio from your skills and interests. One click — done. You show up at your best." },
              { icon: "🌍", title: "Any Industry", desc: "Developers, athletes, creators, founders — everyone's here. Your next collaborator might be in any field." },
              { icon: "💬", title: "Real-time Chat", desc: "Matched? Start talking instantly. No email, no DMs on another platform. Everything lives here." },
              { icon: "🔒", title: "Privacy First", desc: "You control who sees you. Your data stays yours — no ads, no selling your info, ever." },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="lp-how">
          <p className="lp-section-label">How it works</p>
          <h2 className="lp-section-title" style={{textAlign:"center", fontFamily:"Syne, sans-serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:800, letterSpacing:"-1px"}}>
            Three steps to your people
          </h2>
          <div className="steps-list">
            {[
              { n: "01", title: "Create your profile", desc: "Sign up in 30 seconds. Add your skills, interests, and let AI write your bio instantly." },
              { n: "02", title: "Swipe & discover", desc: "Browse profiles from your feed. Ignore or show interest — you're in full control." },
              { n: "03", title: "Connect & grow", desc: "Matched connections unlock chat. Build real relationships, not just follower counts." },
            ].map((s) => (
              <div className="step-item" key={s.n}>
                <div className="step-num">{s.n}</div>
                <div className="step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="lp-final-cta">
          <div className="cta-box">
            <h2>Ready to find<br />your people?</h2>
            <p>Join thousands already building real connections on Vibe.<br />Free forever. No credit card needed.</p>
            <button className="btn-cta-primary" onClick={() => navigate("/login")}>
              Get Started Free →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="lp-footer">
          © 2026 Vibe · Built with ❤️ · All rights reserved
        </footer>
      </div>
    </>
  );
};

export default LandingPage;