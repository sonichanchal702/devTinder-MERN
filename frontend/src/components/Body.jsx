import { addConnections } from "../utils/slices/connectionSlice";
import { addRequests } from "../utils/slices/requestSlice";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    if (!userData) {
      dispatch(addConnections(null));
      dispatch(addRequests(null));
    }
  }, [userData]);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(BASE_URL + "/profile/view", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");   // ← was "/login", now goes to Landing
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;