import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/slices/constants";
import { removeUserFromFeed } from "../utils/slices/feedSlice";

const USER_TYPE_CONFIG = {
  Developer: { icon: "💻", color: "rgba(96,165,250,0.15)",  border: "rgba(96,165,250,0.3)",  text: "#93c5fd" },
  Athlete:   { icon: "⚡", color: "rgba(52,211,153,0.15)",  border: "rgba(52,211,153,0.3)",  text: "#6ee7b7" },
  Creator:   { icon: "🎨", color: "rgba(251,146,60,0.15)",  border: "rgba(251,146,60,0.3)",  text: "#fdba74" },
  Celebrity: { icon: "🌟", color: "rgba(251,191,36,0.15)",  border: "rgba(251,191,36,0.3)",  text: "#fcd34d" },
  Other:     { icon: "🚀", color: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.3)", text: "#c4b5fd" },
};

const UserCard = ({ user, isPreview = false }) => {
  const {
    _id, firstName, lastName, photoUrl,
    age, gender, about,
    skills = [], userType = "Developer",
    socialLinks = {},
  } = user;

  const dispatch = useDispatch();
  const [leaving, setLeaving] = useState(null); // "left" | "right" | null
  const typeConfig = USER_TYPE_CONFIG[userType] || USER_TYPE_CONFIG.Other;

  const handleSendRequest = async (status, userId) => {
    if (!userId || isPreview) return;
    const dir = status === "interested" ? "right" : "left";
    setLeaving(dir);

    // Wait for animation then dispatch
    setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          BASE_URL + "/connectionReq/send/" + status + "/" + userId,
          {},
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );
        dispatch(removeUserFromFeed(userId));
      } catch (err) {
        console.error(err);
        setLeaving(null); // reset on error
      }
    }, 400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        .ucard-wrap { position: relative; width: 320px; }

        .ucard {
          width: 320px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 28px;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          user-select: none;
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
          background: linear-gradient(to top, rgba(6,4,18,0.92) 0%, rgba(6,4,18,0.2) 50%, transparent 100%);
        }

        .ucard-top-badges {
          position: absolute;
          top: 12px; left: 12px; right: 12px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .ucard-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 600;
          backdrop-filter: blur(8px);
          border: 1px solid;
          letter-spacing: 0.3px;
        }

        .ucard-name-wrap {
          position: absolute;
          bottom: 14px; left: 16px; right: 16px;
        }

        .ucard-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 900;
          color: #fff;
          margin: 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        .ucard-meta {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.6);
          margin-top: 3px;
        }

        .ucard-body { padding: 16px 18px 20px; }

        .ucard-about {
          font-size: 0.84rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 36px;
        }

        .ucard-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }

        .skill-tag {
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(124,58,237,0.12);
          border: 1px solid rgba(139,92,246,0.2);
          color: #c4b5fd;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.2px;
        }

        .ucard-social {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
          font-size: 0.72rem;
          text-decoration: none;
          transition: all 0.2s;
        }

        .social-link:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border-color: rgba(255,255,255,0.15);
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
          font-size: 1.25rem;
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
        }

        .ucard-btn-ignore {
          background: rgba(239,68,68,0.1);
          border: 1.5px solid rgba(239,68,68,0.35) !important;
          color: #f87171;
        }

        .ucard-btn-ignore:hover {
          background: rgba(239,68,68,0.2);
          transform: scale(1.12) rotate(-8deg);
          box-shadow: 0 6px 20px rgba(239,68,68,0.3);
        }

        .ucard-btn-interested {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: #fff;
          box-shadow: 0 6px 20px rgba(124,58,237,0.4);
        }

        .ucard-btn-interested:hover {
          filter: brightness(1.15);
          transform: scale(1.12) rotate(8deg);
          box-shadow: 0 8px 28px rgba(124,58,237,0.55);
        }

        .ucard-btn:active { transform: scale(0.93) !important; }

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
        }

        .ucard-preview-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.15);
          border-radius: 10px;
          color: rgba(167,139,250,0.5);
          font-size: 0.72rem;
          letter-spacing: 0.5px;
          margin-top: 10px;
        }

        /* Swipe overlay indicators */
        .swipe-indicator {
          position: absolute;
          top: 20px;
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
          z-index: 10;
          pointer-events: none;
          border: 3px solid;
        }

        .swipe-indicator-nope {
          left: 16px;
          background: rgba(239,68,68,0.15);
          border-color: #ef4444;
          color: #ef4444;
          transform: rotate(-15deg);
        }

        .swipe-indicator-like {
          right: 16px;
          background: rgba(124,58,237,0.15);
          border-color: #7c3aed;
          color: #7c3aed;
          transform: rotate(15deg);
        }
      `}</style>

      <AnimatePresence>
        {leaving === null || isPreview ? (
          <motion.div
            className="ucard-wrap"
            animate={
              leaving === "left"
                ? { x: -500, rotate: -20, opacity: 0 }
                : leaving === "right"
                ? { x: 500, rotate: 20, opacity: 0 }
                : { x: 0, rotate: 0, opacity: 1 }
            }
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={
              leaving
                ? { duration: 0.4, ease: "easeIn" }
                : { duration: 0.4, ease: "easeOut" }
            }
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
          >
            <div className="ucard">
              {/* Photo */}
              <div className="ucard-img-wrap">
                <img
                  src={photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`}
                  alt={firstName}
                  className="ucard-img"
                />
                <div className="ucard-overlay" />

                {/* Swipe indicators */}
                {leaving === "left" && (
                  <div className="swipe-indicator swipe-indicator-nope">Nope</div>
                )}
                {leaving === "right" && (
                  <div className="swipe-indicator swipe-indicator-like">Vibe ✓</div>
                )}

                {/* Top badges */}
                <div className="ucard-top-badges">
                  <div
                    className="ucard-type-badge"
                    style={{
                      background: typeConfig.color,
                      borderColor: typeConfig.border,
                      color: typeConfig.text,
                    }}
                  >
                    {typeConfig.icon} {userType}
                  </div>
                </div>

                {/* Name overlay */}
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
                {about && (
                  <p className="ucard-about">{about}</p>
                )}

                {/* Skill tags */}
                {skills.length > 0 && (
                  <div className="ucard-skills">
                    {skills.slice(0, 5).map((s) => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))}
                    {skills.length > 5 && (
                      <span className="skill-tag">+{skills.length - 5}</span>
                    )}
                  </div>
                )}

                {/* Social links */}
                {!isPreview && (socialLinks.github || socialLinks.linkedin || socialLinks.twitter) && (
                  <div className="ucard-social">
                    {socialLinks.github && (
                      <a href={socialLinks.github} target="_blank" rel="noreferrer" className="social-link">
                        🐙 GitHub
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-link">
                        💼 LinkedIn
                      </a>
                    )}
                    {socialLinks.twitter && (
                      <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="social-link">
                        🐦 Twitter
                      </a>
                    )}
                  </div>
                )}

                {/* Buttons */}
                {isPreview ? (
                  <>
                    <div className="ucard-actions">
                      <button className="ucard-btn ucard-btn-ignore" disabled>✕</button>
                      <button className="ucard-btn ucard-btn-interested" disabled>✓</button>
                    </div>
                    <div className="ucard-preview-badge">👁 Live Preview — save to activate</div>
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
                      <span className="ucard-hint-item">✕ Nope</span>
                      <span className="ucard-hint-item">✓ Vibe</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default UserCard;