import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
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

  const fetchUser = async () => {
  if (userData) return;
  try {
    const token = localStorage.getItem("token"); // ← token lo
    const res = await axios.get(BASE_URL + "/profile/view", {
      headers: { Authorization: `Bearer ${token}` }, // ← header mein bhejo
      withCredentials: true,
    });
    dispatch(addUser(res.data));
  } catch (err) {
    if (err.response?.status === 401) {
      navigate("/login");
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