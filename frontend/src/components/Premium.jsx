import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(BASE_URL + "/premium/verify", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        BASE_URL + "/payment/verify",
        { membershipType: type },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setIsUserPremium(true);
      alert("🎉 " + type + " Premium Activated!");
    } catch (err) {
      console.error(err);
    }
  };

  return isUserPremium ? (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-yellow-500">
        🌟 You are already a Premium User!
      </h1>
    </div>
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- 100 connection Requests per day</li>
            <li>- Blue Tick</li>
            <li>- 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- Infinite connection Requests per day</li>
            <li>- Blue Tick</li>
            <li>- 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>

        </div>
      </div>
    </div>
  );
};

export default Premium;