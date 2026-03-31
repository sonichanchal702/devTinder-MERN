import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
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
          width: 400px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .edit-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 24px;
          text-align: center;
        }

        .edit-input-group {
          margin-bottom: 14px;
        }

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
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 10px;
          color: #fff;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }

        .edit-input:focus {
          border-color: rgba(139, 92, 246, 0.55);
          background: rgba(255,255,255,0.07);
        }

        .edit-input::placeholder { color: rgba(255,255,255,0.2); }

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
          padding: 12px;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: 16px;
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
        }

        .save-btn:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(124, 58, 237, 0.45);
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
          background: rgba(16, 185, 129, 0.15);
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
        {/* Form */}
        <div className="edit-card">
          <h2 className="edit-title">Edit Profile</h2>

          <div className="edit-input-group">
            <label className="edit-label">First Name</label>
            <input type="text" value={firstName} className="edit-input" placeholder="John"
              onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div className="edit-input-group">
            <label className="edit-label">Last Name</label>
            <input type="text" value={lastName} className="edit-input" placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div className="edit-input-group">
            <label className="edit-label">Photo URL</label>
            <input type="text" value={photoUrl} className="edit-input" placeholder="https://..."
              onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>

          <div className="edit-input-group">
            <label className="edit-label">Age</label>
            <input type="text" value={age} className="edit-input" placeholder="25"
              onChange={(e) => setAge(e.target.value)} />
          </div>

          <div className="edit-input-group">
            <label className="edit-label">Gender</label>
            <input type="text" value={gender} className="edit-input" placeholder="male / female / other"
              onChange={(e) => setGender(e.target.value)} />
          </div>

          <div className="edit-input-group">
            <label className="edit-label">About</label>
            <input type="text" value={about} className="edit-input" placeholder="Tell us about yourself..."
              onChange={(e) => setAbout(e.target.value)} />
          </div>

          {error && <p className="edit-error">{error}</p>}

          <button className="save-btn" onClick={saveProfile}>
            Save Profile →
          </button>
        </div>

        {/* Preview */}
        <div>
          <p className="preview-label">Live Preview</p>
          <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
      </div>
    </>
  );
};

export default EditProfile;