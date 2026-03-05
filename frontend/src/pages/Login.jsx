import { useState } from "react";

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen my-10">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">

          <h2 className="card-title justify-center">Login!</h2>

          {/* Email input */}
          <div className="flex justify-center">
            <label className="input validator my-10 flex items-center gap-3">
              
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>

              <input
                type="email"
                placeholder="mail@site.com"
                required
                className="grow"
                onChange={(e) => setEmailId(e.target.value)}
              />

            </label>
          </div>

          {/* Password input */}
          <div className="flex justify-center">
            <label className="input validator my-10 flex items-center gap-3">

              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>

              <input
                type="password"
                placeholder="Password"
                required
                className="grow"
                onChange={(e) => setPassword(e.target.value)}
              />

            </label>
          </div>

          <div className="card-actions justify-center">
            <button className="btn">Login</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;