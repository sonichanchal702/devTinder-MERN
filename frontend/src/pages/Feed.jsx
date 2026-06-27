import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slices/feedSlice";
import { useEffect } from "react";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const currentUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(BASE_URL + "/feed", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // ── LOADING ──
  if (!feed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <p className="text-base-content/40 text-sm tracking-widest uppercase animate-pulse">
          Finding your people...
        </p>
      </div>
    );
  }

  // Filter out own profile as safety net
  // but this prevents edge cases where own card slips through)
  const filteredFeed = feed.filter(
    (u) => u._id?.toString() !== currentUser?._id?.toString()
  );

  // ── EMPTY ──
  if (filteredFeed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-base-300 flex items-center justify-center text-5xl shadow-inner">
          🌐
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">You've seen everyone!</h2>
          <p className="text-base-content/50 text-sm max-w-xs leading-relaxed">
            No new profiles right now. Check back soon — new people join every day.
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <a href="/connections" className="btn btn-primary btn-sm">My Connections →</a>
          <a href="/requests" className="btn btn-ghost btn-sm border border-base-300">View Requests</a>
        </div>
      </div>
    );
  }

  // ── FEED ──
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10 gap-6">
      <p className="text-base-content/30 text-xs tracking-widest uppercase">
        {filteredFeed.length} {filteredFeed.length === 1 ? "person" : "people"} to discover
      </p>
      <UserCard user={filteredFeed[0]} />
      <div className="flex items-center gap-6 mt-2 text-base-content/25 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-6 rounded-full border border-error/40 flex items-center justify-center text-error text-xs">✕</span>
          Ignore
        </span>
        <span className="w-1 h-1 rounded-full bg-base-content/20" />
        <span className="flex items-center gap-1.5">
          Interested
          <span className="w-6 h-6 rounded-full border border-success/40 flex items-center justify-center text-success text-xs">✓</span>
        </span>
      </div>
    </div>
  );
};

export default Feed;