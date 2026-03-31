import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(BASE_URL + "/connections", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log("Connections data:", res.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Connections error:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) return (
    <>
      <style>{`
        .empty-connections {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          font-family: 'DM Sans', sans-serif;
          text-align: center;
        }
        .empty-icon { font-size: 3.5rem; margin-bottom: 16px; animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .empty-title { font-family:'Syne',sans-serif; font-size:1.4rem; font-weight:700; color:#fff; margin:0 0 8px; }
        .empty-sub { font-size:0.88rem; color:rgba(255,255,255,0.4); }
      `}</style>
      <div className="empty-connections">
        <div className="empty-icon">🔗</div>
        <h2 className="empty-title">No connections yet</h2>
        <p className="empty-sub">Start liking developers to build your network</p>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .conn-page {
          max-width: 680px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'DM Sans', sans-serif;
        }

        .conn-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .conn-label {
          font-size: 0.72rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(167,139,250,0.6);
          font-weight: 500;
          margin-bottom: 8px;
        }

        .conn-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .conn-count {
          display: inline-block;
          margin-left: 10px;
          background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.3));
          border: 1px solid rgba(139,92,246,0.3);
          color: #a78bfa;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 20px;
          vertical-align: middle;
        }

        .conn-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(139,92,246,0.12);
          border-radius: 18px;
          margin-bottom: 12px;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }

        .conn-card:hover {
          border-color: rgba(139,92,246,0.3);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }

        .conn-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .conn-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(139,92,246,0.3);
          flex-shrink: 0;
        }

        .conn-name {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 3px;
        }

        .conn-meta {
          font-size: 0.75rem;
          color: #a78bfa;
          margin: 0 0 4px;
          font-weight: 500;
        }

        .conn-about {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.45);
          margin: 0;
          max-width: 320px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .chat-btn {
          padding: 8px 18px;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 0.82rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: none;
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 3px 14px rgba(124,58,237,0.3);
          white-space: nowrap;
          display: inline-block;
        }

        .chat-btn:hover {
          filter: brightness(1.12);
          transform: scale(1.04);
          box-shadow: 0 6px 20px rgba(124,58,237,0.45);
        }

        .chat-btn:active { transform: scale(0.97); }
      `}</style>

      <div className="conn-page">
        <div className="conn-header">
          <p className="conn-label">Your Network</p>
          <h1 className="conn-title">
            Connections
            <span className="conn-count">{connections.length}</span>
          </h1>
        </div>

        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div key={_id} className="conn-card">
              <div className="conn-left">
                <img className="conn-avatar" alt="photo" src={photoUrl} />
                <div>
                  <h2 className="conn-name">{firstName + " " + lastName}</h2>
                  {age && gender && (
                    <p className="conn-meta">{age} • {gender}</p>
                  )}
                  <p className="conn-about">{about}</p>
                </div>
              </div>
              <Link to={"/chat/" + _id}>
                <button className="chat-btn">💬 Chat</button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;