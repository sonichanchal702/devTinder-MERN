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

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl my-6">Connections</h1>

      {/* ← map missing tha! */}
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
        return (
          <div
            key={_id}
            style={{ width: "50%", margin: "16px auto" }}
            className="flex justify-between items-center p-4 rounded-lg bg-base-300"
          >
            <div className="flex items-center gap-4">
              <img
                alt="photo"
                style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }}
                src={photoUrl}
              />
              <div className="text-left">
                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                {age && gender && <p className="text-sm text-gray-400">{age + ", " + gender}</p>}
                <p className="text-sm">{about}</p>
              </div>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary btn-sm">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;