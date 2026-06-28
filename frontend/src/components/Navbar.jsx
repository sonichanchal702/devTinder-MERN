import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/slices/constants";
import { removeUser } from "../utils/slices/userSlice";
import { addFeed } from "../utils/slices/feedSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        BASE_URL + "/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(removeUser());
      dispatch(addFeed(null));
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <>
      <style>{`
        .vibe-nav {
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(6, 4, 18, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
          box-sizing: border-box;
        }

        .vibe-nav-inner {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .vibe-logo {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          cursor: pointer;
          letter-spacing: -0.5px;
          flex-shrink: 0;
        }

        .vibe-nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .vibe-welcome {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
        }

        .vibe-avatar-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(139,92,246,0.5);
          cursor: pointer;
          background: none;
          padding: 0;
          flex-shrink: 0;
          transition: border-color 0.2s;
        }

        .vibe-avatar-btn:hover { border-color: rgba(139,92,246,0.9); }

        .vibe-avatar-btn img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Dropdown */
        .vibe-dropdown {
          position: relative;
        }

        .vibe-dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 200px;
          background: rgba(15, 10, 35, 0.97);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          display: none;
          z-index: 200;
        }

        .vibe-dropdown:focus-within .vibe-dropdown-menu {
          display: block;
        }

        .vibe-dropdown-menu a,
        .vibe-dropdown-menu button {
          display: block;
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, color 0.15s;
          box-sizing: border-box;
        }

        .vibe-dropdown-menu a:hover {
          background: rgba(139,92,246,0.12);
          color: #fff;
        }

        .vibe-dropdown-menu .logout-btn {
          color: rgba(248,113,113,0.8);
          margin-top: 4px;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 12px;
        }

        .vibe-dropdown-menu .logout-btn:hover {
          background: rgba(239,68,68,0.1);
          color: #f87171;
        }

        .vibe-dropdown-divider {
          height: 1px;
          background: rgba(139,92,246,0.1);
          margin: 4px 8px;
        }
      `}</style>

      <nav className="vibe-nav">
        <div className="vibe-nav-inner">
          {/* Logo */}
          <Link to={user ? "/feed" : "/"} className="vibe-logo">
            🔥 Vibe
          </Link>

          {/* Right side */}
          {user ? (
            <div className="vibe-nav-right">
              <span className="vibe-welcome hidden sm:block">
                Hey, {user.firstName} 👋
              </span>

              <div className="vibe-dropdown" tabIndex={0}>
                <button className="vibe-avatar-btn">
                  <img src={user.photoUrl} alt={user.firstName} />
                </button>

                <div className="vibe-dropdown-menu">
                  <Link to="/profile">👤 Profile</Link>
                  <Link to="/feed">🔥 Discover</Link>
                  <Link to="/connections">🔗 Connections</Link>
                  <Link to="/requests">📬 Requests</Link>
                  <div className="vibe-dropdown-divider" />
                  <Link to="/premium">⭐ Premium</Link>
                  <button className="logout-btn" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="vibe-nav-right">
              <button
                onClick={() => navigate("/login")}
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                  padding: "8px 18px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Login →
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;