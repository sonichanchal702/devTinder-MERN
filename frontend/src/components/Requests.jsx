import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/slices/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, requestId) => {
    console.log("Review request:", status, requestId);
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      BASE_URL + "/connectionReq/review/" + status + "/" + requestId,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
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
    console.log("Requests data:", res.data); // ← add karo
    dispatch(addRequests(res.data.data));
  } catch (err) {
    console.error("Requests error:", err);
  }
};

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
  <div className="text-center my-10">
    <h1 className="font-bold text-white text-3xl my-6">Connection Requests</h1>

    {requests.map((request) => {
      const { _id, firstName, lastName, photoUrl, age, gender, about } = request;
      return (
        <div
          key={_id}
          style={{ width: "50%", margin: "16px auto" }}
          className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300"
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
          <div className="flex gap-2">
            <button
              className="btn btn-error btn-sm"
            onClick={() => reviewRequest("rejected", request.requestId)}
            >
              Reject
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => reviewRequest("accepted", request.requestId)}
            >
              Accept
            </button>
          </div>
        </div>
      );
    })}
  </div>
);
};
export default Requests;