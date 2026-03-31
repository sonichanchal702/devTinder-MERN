import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(BASE_URL + "/premium/verify", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        BASE_URL + "/payment/verify",
        { membershipType: type },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setIsUserPremium(true);
      alert("🎉 " + type + " Premium Activated!");
    } catch (err) {
      console.error(err);
    }
  };

  if (isUserPremium) return (
    <>
      <style>{`
        .premium-active {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
          font-family: 'DM Sans', sans-serif;
          text-align: center;
        }
        .premium-star { font-size: 4rem; margin-bottom: 16px; animation: spin 4s linear infinite; }
        @keyframes spin { 0%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(180deg) scale(1.1)} 100%{transform:rotate(360deg) scale(1)} }
        .premium-active-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 10px;
        }
        .premium-active-sub { font-size: 0.9rem; color: rgba(255,255,255,0.4); }
      `}</style>
      <div className="premium-active">
        <div className="premium-star">🌟</div>
        <h1 className="premium-active-title">You're a Premium Member!</h1>
        <p className="premium-active-sub">Enjoy all exclusive benefits of your membership</p>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .premium-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .premium-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .premium-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(251,191,36,0.7);
          font-weight: 500;
          margin-bottom: 10px;
        }

        .premium-title {
          font-family: 'Syne', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 12px;
          letter-spacing: -0.5px;
        }

        .premium-sub {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .plan-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
          overflow: hidden;
        }

        .plan-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 24px 24px 0 0;
        }

        .plan-card.silver::before {
          background: linear-gradient(90deg, #94a3b8, #cbd5e1, #94a3b8);
        }

        .plan-card.gold::before {
          background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
        }

        .plan-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }

        .plan-card.gold {
          border-color: rgba(251,191,36,0.25);
        }

        .plan-card.gold:hover {
          border-color: rgba(251,191,36,0.4);
        }

        .plan-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 16px;
        }

        .plan-badge.silver-badge {
          background: rgba(148,163,184,0.15);
          border: 1px solid rgba(148,163,184,0.3);
          color: #cbd5e1;
        }

        .plan-badge.gold-badge {
          background: rgba(251,191,36,0.15);
          border: 1px solid rgba(251,191,36,0.3);
          color: #fbbf24;
        }

        .plan-icon { font-size: 2.5rem; margin-bottom: 12px; display: block; }

        .plan-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 6px;
        }

        .plan-duration {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.4);
          margin: 0 0 20px;
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
        }

        .plan-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          padding: 7px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .plan-features li:last-child { border-bottom: none; }

        .feature-check {
          width: 18px; height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          flex-shrink: 0;
        }

        .feature-check.silver-check { background: rgba(148,163,184,0.2); color: #cbd5e1; }
        .feature-check.gold-check { background: rgba(251,191,36,0.2); color: #fbbf24; }

        .btn-silver {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #64748b, #94a3b8);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(100,116,139,0.3);
          letter-spacing: 0.3px;
        }

        .btn-silver:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(100,116,139,0.4);
        }

        .btn-gold {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #d97706, #f59e0b, #fbbf24);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(245,158,11,0.4);
          letter-spacing: 0.3px;
        }

        .btn-gold:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(245,158,11,0.55);
        }

        .btn-silver:active, .btn-gold:active { transform: scale(0.98); }

        .popular-tag {
          position: absolute;
          top: 16px; right: 16px;
          background: linear-gradient(135deg, #d97706, #fbbf24);
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 3px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }
      `}</style>

      <div className="premium-page">
        <div className="premium-header">
          <p className="premium-eyebrow">⭐ Upgrade</p>
          <h1 className="premium-title">Choose Your Plan</h1>
          <p className="premium-sub">Unlock premium features and connect with more developers</p>
        </div>

        <div className="plans-grid">
          {/* Silver */}
          <div className="plan-card silver">
            <span className="plan-badge silver-badge">Silver</span>
            <span className="plan-icon">🥈</span>
            <h2 className="plan-name">Silver Membership</h2>
            <p className="plan-duration">Valid for 3 months</p>
            <ul className="plan-features">
              <li><span className="feature-check silver-check">✓</span> Chat with other people</li>
              <li><span className="feature-check silver-check">✓</span> 100 connection requests/day</li>
              <li><span className="feature-check silver-check">✓</span> Blue Tick verification</li>
              <li><span className="feature-check silver-check">✓</span> Priority support</li>
            </ul>
            <button className="btn-silver" onClick={() => handleBuyClick("silver")}>
              Get Silver →
            </button>
          </div>

          {/* Gold */}
          <div className="plan-card gold">
            <div className="popular-tag">Most Popular</div>
            <span className="plan-badge gold-badge">Gold</span>
            <span className="plan-icon">🥇</span>
            <h2 className="plan-name">Gold Membership</h2>
            <p className="plan-duration">Valid for 6 months</p>
            <ul className="plan-features">
              <li><span className="feature-check gold-check">✓</span> Chat with other people</li>
              <li><span className="feature-check gold-check">✓</span> Unlimited connection requests</li>
              <li><span className="feature-check gold-check">✓</span> Gold Tick verification</li>
              <li><span className="feature-check gold-check">✓</span> Priority support</li>
            </ul>
            <button className="btn-gold" onClick={() => handleBuyClick("gold")}>
              Get Gold →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Premium;