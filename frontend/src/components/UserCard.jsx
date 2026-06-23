import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/slices/constants";
import { removeUserFromFeed } from "../utils/slices/feedSlice";

const UserCard = ({ user, isPreview = false }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    if (!userId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        BASE_URL + "/connectionReq/send/" + status + "/" + userId,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Send request error:", err);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        .ucard {
          width: 320px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 28px;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .ucard:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 70px rgba(124,58,237,0.2);
        }
        .ucard-img-wrap {
          position: relative;
          height: 260px;
          overflow: hidden;
        }
        .ucard-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .ucard:hover .ucard-img { transform: scale(1.04); }
        .ucard-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6,4,18,0.88) 0%, transparent 55%);
        }
        .ucard-name-wrap {
          position: absolute;
          bottom: 16px; left: 18px; right: 18px;
        }
        .ucard-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 900;
          color: #fff;
          margin: 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        .ucard-meta {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.6);
          margin-top: 3px;
        }
        .ucard-body { padding: 18px 20px 22px; }
        .ucard-about {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 42px;
        }
        .ucard-actions {
          display: flex;
          justify-content: center;
          gap: 28px;
        }
        .ucard-btn {
          width: 54px; height: 54px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
        }
        .ucard-btn-ignore {
          background: rgba(239,68,68,0.1);
          border: 1.5px solid rgba(239,68,68,0.35) !important;
          color: #f87171;
        }
        .ucard-btn-ignore:hover {
          background: rgba(239,68,68,0.2);
          transform: scale(1.12);
          box-shadow: 0 6px 20px rgba(239,68,68,0.3);
        }
        .ucard-btn-interested {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: #fff;
          box-shadow: 0 6px 20px rgba(124,58,237,0.4);
        }
        .ucard-btn-interested:hover {
          filter: brightness(1.15);
          transform: scale(1.12);
          box-shadow: 0 8px 28px rgba(124,58,237,0.55);
        }
        .ucard-btn:active { transform: scale(0.95) !important; }
        .ucard-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none !important;
          filter: none !important;
        }
        .ucard-hint {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-top: 10px;
        }
        .ucard-hint-item {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.3px;
        }
        .ucard-preview-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.15);
          border-radius: 12px;
          color: rgba(167,139,250,0.6);
          font-size: 0.75rem;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }
      `}</style>

      <div className="ucard">
        {/* Photo */}
        <div className="ucard-img-wrap">
          <img
            src={photoUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + firstName}
            alt={firstName}
            className="ucard-img"
          />
          <div className="ucard-overlay" />
          <div className="ucard-name-wrap">
            <p className="ucard-name">{firstName} {lastName}</p>
            {(age || gender) && (
              <p className="ucard-meta">
                {age}{age && gender && " · "}{gender}
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="ucard-body">
          <p className="ucard-about">
            {about || "No bio yet — this person is a mystery! 👀"}
          </p>

          {/* Preview mode — show label, disable buttons */}
          {isPreview ? (
            <>
              <div className="ucard-actions">
                <button className="ucard-btn ucard-btn-ignore" disabled>✕</button>
                <button className="ucard-btn ucard-btn-interested" disabled>✓</button>
              </div>
              <div className="ucard-preview-badge">
                👁 Live Preview — save to activate
              </div>
            </>
          ) : (
            <>
              <div className="ucard-actions">
                <button
                  className="ucard-btn ucard-btn-ignore"
                  onClick={() => handleSendRequest("ignored", _id)}
                  title="Ignore"
                >
                  ✕
                </button>
                <button
                  className="ucard-btn ucard-btn-interested"
                  onClick={() => handleSendRequest("interested", _id)}
                  title="Interested"
                >
                  ✓
                </button>
              </div>
              <div className="ucard-hint">
                <span className="ucard-hint-item">✕ Ignore</span>
                <span className="ucard-hint-item">✓ Interested</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCard;