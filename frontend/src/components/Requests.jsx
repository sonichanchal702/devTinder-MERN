import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/slices/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, requestId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        BASE_URL + "/connectionReq/review/" + status + "/" + requestId,
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(BASE_URL + "/profile/request/recieved", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Requests error:", err);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .req-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 40px 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .req-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .req-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(167,139,250,0.7);
          margin-bottom: 8px;
        }

        .req-title {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .req-count {
          display: inline-block;
          margin-top: 8px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.25);
          border-radius: 999px;
          padding: 3px 14px;
          font-size: 0.78rem;
          color: #c4b5fd;
        }

        .req-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 40vh;
          gap: 12px;
          text-align: center;
        }

        .req-empty-icon {
          font-size: 3.5rem;
          opacity: 0.4;
        }

        .req-empty-text {
          font-size: 1.1rem;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
        }

        .req-empty-sub {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.2);
          max-width: 280px;
          line-height: 1.6;
        }

        .req-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .req-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(139,92,246,0.14);
          border-radius: 20px;
          padding: 18px 20px;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
          animation: reqIn 0.3s ease;
        }

        @keyframes reqIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .req-item:hover {
          border-color: rgba(139,92,246,0.3);
          background: rgba(124,58,237,0.05);
          transform: translateX(3px);
        }

        .req-avatar {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          object-fit: cover;
          border: 1.5px solid rgba(139,92,246,0.2);
          flex-shrink: 0;
        }

        .req-info { flex: 1; min-width: 0; }

        .req-name {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .req-meta {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 4px;
        }

        .req-about {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .req-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .req-btn {
          padding: 8px 18px;
          border-radius: 12px;
          border: none;
          font-size: 0.82rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
          white-space: nowrap;
        }

        .req-btn:active { transform: scale(0.96); }

        .req-btn-reject {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
        }

        .req-btn-reject:hover {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.4);
          transform: translateY(-1px);
        }

        .req-btn-accept {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: #fff;
          box-shadow: 0 4px 16px rgba(124,58,237,0.3);
        }

        .req-btn-accept:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(124,58,237,0.45);
        }
      `}</style>

      <div className="req-page">
        <div className="req-header">
          <p className="req-eyebrow">📬 Incoming</p>
          <h1 className="req-title">Connection Requests</h1>
          {requests && requests.length > 0 && (
            <span className="req-count">{requests.length} pending</span>
          )}
        </div>

        {(!requests || requests.length === 0) ? (
          <div className="req-empty">
            <div className="req-empty-icon">📭</div>
            <p className="req-empty-text">No requests yet</p>
            <p className="req-empty-sub">
              When someone shows interest in your profile, their request will appear here.
            </p>
          </div>
        ) : (
          <div className="req-list">
            {requests.map((request) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } = request;
              return (
                <div key={_id} className="req-item">
                  <img
                    src={photoUrl || "https://via.placeholder.com/58?text=?"}
                    alt={firstName}
                    className="req-avatar"
                  />
                  <div className="req-info">
                    <p className="req-name">{firstName} {lastName}</p>
                    {(age || gender) && (
                      <p className="req-meta">
                        {age}{age && gender && " · "}{gender}
                      </p>
                    )}
                    {about && <p className="req-about">{about}</p>}
                  </div>
                  <div className="req-actions">
                    <button
                      className="req-btn req-btn-reject"
                      onClick={() => reviewRequest("rejected", request.requestId)}
                    >
                      Reject
                    </button>
                    <button
                      className="req-btn req-btn-accept"
                      onClick={() => reviewRequest("accepted", request.requestId)}
                    >
                      Accept →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Requests;