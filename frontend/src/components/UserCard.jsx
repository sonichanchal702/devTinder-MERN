import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/slices/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
       BASE_URL + "/connectionReq/send/" + status + "/" + userId,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
        <div className="card bg-base-300 w-72 shadow-xl rounded-2xl overflow-hidden" 
      style={{maxWidth: "250px", maxHeight: "450px"}}>
      <figure style={{height: "180px", overflow: "hidden"}}>
        <img
          src={photoUrl}
          alt="photo"
          style={{width: "100%", height: "100%", objectFit: "cover"}}
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p className="text-sm text-gray-400">{age + ", " + gender}</p>
        )}
        <p className="text-sm">{about}</p>
        <div className="card-actions justify-center my-2 gap-4">
          <button
            className="btn btn-error btn-sm"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            ❌ Ignore
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleSendRequest("interested", _id)}
          >
            ✅ Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;