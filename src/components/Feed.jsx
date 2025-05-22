import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed && feed.length > 0) return;

    try {
      const response = await axios.get(
        "http://localhost:3000/feed",

        { withCredentials: true }
      );
      dispatch(addFeed(response.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-animate min-h-screen">
      {feed?.map((user, index) => (
        <UserCard key={user.id || index} user={user} />
      ))}
    </div>
  );
};

export default Feed;
