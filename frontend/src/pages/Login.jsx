import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/slices/constants";

const Login = () => {
  const [email, setEmailId] = useState("sunder@gmail.com");
  const [password, setPassword] = useState("Sunder@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    // ← pehle sab clear karo
    localStorage.removeItem("token");
    
    const res = await axios.post(
      BASE_URL + "/login",
      { email: email, password },
      { withCredentials: true }
    );
    localStorage.setItem("token", res.data.token);
    dispatch(addUser(res.data));
    navigate("/feed");
  } catch (err) {
    setError(err?.response?.data?.message || "Something went wrong");
  }
};

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #080614;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .login-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .login-blob-1 {
          width: 400px; height: 400px;
          background: rgba(124, 58, 237, 0.2);
          top: -100px; left: -100px;
        }

        .login-blob-2 {
          width: 300px; height: 300px;
          background: rgba(37, 99, 235, 0.15);
          bottom: -80px; right: -80px;
        }

        .login-blob-3 {
          width: 200px; height: 200px;
          background: rgba(244, 114, 182, 0.1);
          top: 50%; left: 60%;
        }

        .login-card {
          position: relative;
          z-index: 10;
          width: 420px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 28px;
          padding: 40px 36px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.08);
        }

        .login-brand {
          text-align: center;
          margin-bottom: 28px;
        }

        .login-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          margin: 0;
        }

        .login-tagline {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.35);
          margin-top: 4px;
        }

        .login-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          text-align: center;
          margin-bottom: 24px;
        }

        .input-group {
          margin-bottom: 14px;
        }

        .input-label {
          display: block;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 6px;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .login-input {
          width: 100%;
          padding: 11px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 12px;
          color: #fff;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }

        .login-input:focus {
          border-color: rgba(139, 92, 246, 0.6);
          background: rgba(255,255,255,0.08);
        }

        .login-input::placeholder { color: rgba(255,255,255,0.2); }

        .error-msg {
          color: #f87171;
          font-size: 0.8rem;
          text-align: center;
          margin: 8px 0;
          padding: 8px 12px;
          background: rgba(248, 113, 113, 0.08);
          border-radius: 8px;
          border: 1px solid rgba(248,113,113,0.15);
          display: ${(error) => error ? 'block' : 'none'};
        }

        .login-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: 16px;
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35);
          letter-spacing: 0.3px;
        }

        .login-btn:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(124, 58, 237, 0.5);
        }

        .login-btn:active { transform: translateY(0) scale(0.98); }

        .toggle-text {
          text-align: center;
          margin-top: 20px;
          font-size: 0.83rem;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: color 0.2s;
        }

        .toggle-text:hover { color: #a78bfa; }

        .divider {
          height: 1px;
          background: rgba(139, 92, 246, 0.15);
          margin: 20px 0;
        }
      `}</style>

      <div className="login-page">
        <div className="login-blob login-blob-1" />
        <div className="login-blob login-blob-2" />
        <div className="login-blob login-blob-3" />

        <div className="login-card">
          <div className="login-brand">
            <h1 className="login-brand-name"> 🔥 Vibe</h1>
            <p className="login-tagline">Where your people find you</p>
          
          </div>

          <div className="divider" />

          <h2 className="login-title">{isLoginForm ? "Welcome back" : "Create account"}</h2>

          {!isLoginForm && (
            <>
              <div className="input-group">
                <label className="input-label">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  className="login-input"
                  placeholder="John"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  className="login-input"
                  placeholder="Doe"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="text"
              value={email}
              className="login-input"
              placeholder="you@example.com"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              value={password}
              className="login-input"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-msg" style={{display: 'block'}}>{error}</p>}

          <button
            className="login-btn"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Sign In →" : "Create Account →"}
          </button>

          <p
            className="toggle-text"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm ? "New here? Create an account" : "Already have an account? Sign in"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;