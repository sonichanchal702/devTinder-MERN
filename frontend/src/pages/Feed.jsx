import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slices/feedSlice";
import { useEffect } from "react";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const currentUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(BASE_URL + "/feed", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // ── LOADING ──
  if (!feed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <p className="text-base-content/40 text-sm tracking-widest uppercase animate-pulse">
          Finding your people...
        </p>
      </div>
    );
  }

  // Filter out own profile as safety net
  // but this prevents edge cases where own card slips through)
  const filteredFeed = feed.filter(
    (u) => u._id?.toString() !== currentUser?._id?.toString()
  );

  // TO — upgraded empty state:
if (filteredFeed.length === 0) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        .empty-root {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .empty-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          z-index: 0;
        }

        .empty-orb-1 {
          width: 300px; height: 300px;
          background: rgba(124,58,237,0.12);
          top: 10%; left: 20%;
        }

        .empty-orb-2 {
          width: 250px; height: 250px;
          background: rgba(37,99,235,0.1);
          bottom: 10%; right: 20%;
        }

        .empty-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .empty-icon-wrap {
          width: 100px;
          height: 100px;
          border-radius: 32px;
          background: rgba(124,58,237,0.1);
          border: 1px solid rgba(139,92,246,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.8rem;
          margin-bottom: 28px;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .empty-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 900;
          color: #fff;
          margin: 0 0 12px;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .empty-title span {
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .empty-sub {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.4);
          max-width: 360px;
          line-height: 1.7;
          margin: 0 0 36px;
        }

        .empty-stats {
          display: flex;
          gap: 24px;
          margin-bottom: 36px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .empty-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 16px;
          padding: 14px 20px;
          min-width: 100px;
        }

        .empty-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }

        .empty-stat-label {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.5px;
          display: block;
          margin-top: 2px;
        }

        .empty-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 32px;
        }

        .empty-btn-primary {
          padding: 12px 24px;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: filter 0.2s, transform 0.15s;
          box-shadow: 0 4px 20px rgba(124,58,237,0.35);
        }

        .empty-btn-primary:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
        }

        .empty-btn-ghost {
          padding: 12px 24px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          color: rgba(255,255,255,0.65);
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s, color 0.2s;
        }

        .empty-btn-ghost:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }

        .empty-tip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 12px;
          padding: 10px 16px;
          font-size: 0.78rem;
          color: rgba(167,139,250,0.7);
          max-width: 340px;
        }
      `}</style>

      <div className="empty-root">
        <div className="empty-orb empty-orb-1" />
        <div className="empty-orb empty-orb-2" />

        <div className="empty-content">
          {/* Floating icon */}
          <div className="empty-icon-wrap">🎯</div>

          {/* Title */}
          <h2 className="empty-title">
            You're all caught up,<br />
            <span>legend! 🔥</span>
          </h2>

          {/* Subtitle */}
          <p className="empty-sub">
            You've swiped through everyone available right now.
            New people join every day — come back tomorrow and
            your next big connection might be waiting.
          </p>

          {/* Mini stats */}
          <div className="empty-stats">
            <div className="empty-stat">
              <span className="empty-stat-num">✓</span>
              <span className="empty-stat-label">Feed complete</span>
            </div>
            <div className="empty-stat">
              <span className="empty-stat-num">🔗</span>
              <span className="empty-stat-label">Check connections</span>
            </div>
            <div className="empty-stat">
              <span className="empty-stat-num">📬</span>
              <span className="empty-stat-label">Check requests</span>
            </div>
          </div>

          {/* Actions */}
          <div className="empty-actions">
            <a href="/connections" className="empty-btn-primary">
              🔗 My Connections
            </a>
            <a href="/requests" className="empty-btn-ghost">
              📬 View Requests
            </a>
          </div>

          {/* Tip */}
          <div className="empty-tip">
            💡 Tip — complete your profile to get more matches
          </div>
        </div>
      </div>
    </>
  );
}

  // ── FEED ──
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10 gap-6">
      <p className="text-base-content/30 text-xs tracking-widest uppercase">
        {filteredFeed.length} {filteredFeed.length === 1 ? "person" : "people"} to discover
      </p>
      <UserCard user={filteredFeed[0]} />
      <div className="flex items-center gap-6 mt-2 text-base-content/25 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-6 rounded-full border border-error/40 flex items-center justify-center text-error text-xs">✕</span>
          Ignore
        </span>
        <span className="w-1 h-1 rounded-full bg-base-content/20" />
        <span className="flex items-center gap-1.5">
          Interested
          <span className="w-6 h-6 rounded-full border border-success/40 flex items-center justify-center text-success text-xs">✓</span>
        </span>
      </div>
    </div>
  );
};

export default Feed;