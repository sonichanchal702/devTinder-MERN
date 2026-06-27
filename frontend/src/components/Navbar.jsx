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
    dispatch(addFeed(null));          // ← clears feed
    localStorage.removeItem("token");
    navigate("/");
  }
};



  return (
    <div className="navbar bg-base-300 px-4 sticky top-0 z-50">
      <div className="flex-1">
        <Link
          to={user ? "/feed" : "/"}
          className="btn btn-ghost text-xl font-extrabold tracking-tight"
        >
          🔥 Vibe
        </Link>
      </div>

      {user ? (
        <div className="flex-none gap-2 items-center">
          <span className="text-sm text-base-content/60 hidden sm:block">
            Welcome, {user.firstName}
          </span>
          <div className="dropdown dropdown-end mx-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge badge-primary badge-sm">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium ⭐</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-error hover:bg-error/10 w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default NavBar;