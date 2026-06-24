import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

const USER_TYPES = ["Developer", "Athlete", "Creator", "Celebrity", "Other"];
const USER_TYPE_ICONS = {
  Developer: "💻", Athlete: "⚡", Creator: "🎨", Celebrity: "🌟", Other: "🚀",
};

const EditProfile = ({ user }) => {
  const [firstName, setFirstName]   = useState(user.firstName);
  const [lastName, setLastName]     = useState(user.lastName);
  const [photoUrl, setPhotoUrl]     = useState(user.photoUrl);
  const [age, setAge]               = useState(user.age || "");
  const [gender, setGender]         = useState(user.gender || "");
  const [about, setAbout]           = useState(user.about || "");
  const [userType, setUserType]     = useState(user.userType || "Developer");
  const [skillsInput, setSkillsInput] = useState(
    (user.skills || []).join(", ")
  );
  const [github, setGithub]     = useState(user.socialLinks?.github || "");
  const [linkedin, setLinkedin] = useState(user.socialLinks?.linkedin || "");
  const [twitter, setTwitter]   = useState(user.socialLinks?.twitter || "");
  const [error, setError]       = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    // Convert comma-separated skills string to array
    const skillsArray = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName, lastName, photoUrl, age, gender, about,
          userType,
          skills: skillsArray,
          socialLinks: { github, linkedin, twitter },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .edit-page {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 40px;
          padding: 40px 24px;
          font-family: 'DM Sans', sans-serif;
          flex-wrap: wrap;
        }

        .edit-card {
          width: 420px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .edit-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 8px;
          text-align: center;
        }

        .edit-section-label {
          font-size: 0.68rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(167,139,250,0.5);
          margin: 20px 0 10px;
          display: block;
        }

        .edit-input-group { margin-bottom: 12px; }

        .edit-label {
          display: block;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.45);
          margin-bottom: 6px;
          font-weight: 500;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        .edit-input {
          width: 100%;
          padding: 10px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 10px;
          color: #fff;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }

        .edit-input:focus {
          border-color: rgba(139,92,246,0.55);
          background: rgba(255,255,255,0.07);
        }

        .edit-input::placeholder { color: rgba(255,255,255,0.2); }

        .edit-select {
          width: 100%;
          padding: 10px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 10px;
          color: #fff;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          cursor: pointer;
          box-sizing: border-box;
        }

        .edit-select option { background: #1a0d2e; color: #fff; }

        .type-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .type-btn {
          padding: 9px 6px;
          border-radius: 10px;
          border: 1px solid rgba(139,92,246,0.15);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.4);
          font-size: 0.78rem;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .type-btn.active {
          border-color: rgba(139,92,246,0.6);
          background: rgba(124,58,237,0.18);
          color: #c4b5fd;
          font-weight: 600;
        }

        .type-btn:hover:not(.active) {
          border-color: rgba(139,92,246,0.3);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.7);
        }

        .divider-line {
          height: 1px;
          background: rgba(139,92,246,0.1);
          margin: 20px 0;
        }

        .edit-error {
          color: #f87171;
          font-size: 0.8rem;
          text-align: center;
          padding: 8px 12px;
          background: rgba(248,113,113,0.08);
          border-radius: 8px;
          border: 1px solid rgba(248,113,113,0.15);
          margin: 8px 0;
        }

        .save-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: 20px;
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(124,58,237,0.3);
        }

        .save-btn:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(124,58,237,0.45);
        }

        .save-btn:active { transform: scale(0.98); }

        .preview-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(167,139,250,0.6);
          text-align: center;
          margin-bottom: 16px;
        }

        .toast-success {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.3);
          backdrop-filter: blur(12px);
          color: #6ee7b7;
          padding: 12px 24px;
          border-radius: 14px;
          font-size: 0.88rem;
          font-weight: 500;
          z-index: 1000;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {showToast && (
        <div className="toast-success">✅ Profile saved successfully!</div>
      )}

      <div className="edit-page">
        {/* ── FORM ── */}
        <div className="edit-card">
          <h2 className="edit-title">Edit Profile</h2>

          {/* Basic Info */}
          <span className="edit-section-label">Basic Info</span>

          <div className="edit-input-group">
            <label className="edit-label">First Name</label>
            <input type="text" value={firstName} className="edit-input"
              placeholder="John" onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div className="edit-input-group">
            <label className="edit-label">Last Name</label>
            <input type="text" value={lastName} className="edit-input"
              placeholder="Doe" onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div className="edit-input-group">
            <label className="edit-label">Photo URL</label>
            <input type="text" value={photoUrl} className="edit-input"
              placeholder="https://..." onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div className="edit-input-group">
              <label className="edit-label">Age</label>
              <input type="number" value={age} className="edit-input"
                placeholder="25" onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="edit-input-group">
              <label className="edit-label">Gender</label>
              <select value={gender} className="edit-select"
                onChange={(e) => setGender(e.target.value)}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="edit-input-group">
            <label className="edit-label">About</label>
            <input type="text" value={about} className="edit-input"
              placeholder="Tell us about yourself..."
              onChange={(e) => setAbout(e.target.value)} />
          </div>

          <div className="divider-line" />

          {/* User Type */}
          <span className="edit-section-label">I am a...</span>
          <div className="type-grid">
            {USER_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className={`type-btn ${userType === t ? "active" : ""}`}
                onClick={() => setUserType(t)}
              >
                {USER_TYPE_ICONS[t]} {t}
              </button>
            ))}
          </div>

          <div className="divider-line" />

          {/* Skills */}
          <span className="edit-section-label">Skills & Interests</span>
          <div className="edit-input-group">
            <label className="edit-label">Skills (comma separated)</label>
            <input
              type="text"
              value={skillsInput}
              className="edit-input"
              placeholder="React, Node.js, MongoDB..."
              onChange={(e) => setSkillsInput(e.target.value)}
            />
          </div>

          <div className="divider-line" />

          {/* Social Links */}
          <span className="edit-section-label">Social Links</span>

          <div className="edit-input-group">
            <label className="edit-label">GitHub</label>
            <input type="text" value={github} className="edit-input"
              placeholder="https://github.com/username"
              onChange={(e) => setGithub(e.target.value)} />
          </div>

          <div className="edit-input-group">
            <label className="edit-label">LinkedIn</label>
            <input type="text" value={linkedin} className="edit-input"
              placeholder="https://linkedin.com/in/username"
              onChange={(e) => setLinkedin(e.target.value)} />
          </div>

          <div className="edit-input-group">
            <label className="edit-label">Twitter / X</label>
            <input type="text" value={twitter} className="edit-input"
              placeholder="https://twitter.com/username"
              onChange={(e) => setTwitter(e.target.value)} />
          </div>

          {error && <p className="edit-error">{error}</p>}

          <button className="save-btn" onClick={saveProfile}>
            Save Profile →
          </button>
        </div>

        {/* ── PREVIEW ── */}
        <div>
          <p className="preview-label">Live Preview</p>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about,
                    userType, skills: skillsInput.split(",").map(s => s.trim()).filter(Boolean),
                    socialLinks: { github, linkedin, twitter } }}
            isPreview={true}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;