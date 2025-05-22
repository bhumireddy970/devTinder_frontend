import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, removeReview } from "../utils/reviewSlice";
import { Link } from "react-router-dom";
const Review = () => {
  const reviewUsers = useSelector((state) => state.review);
  const dispatch = useDispatch();

  const get = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/request/recieved",
        { withCredentials: true }
      );
      dispatch(addReview(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    get();
  }, []);

  const handleReview = async (status, id) => {
    try {
      await axios.post(
        "http://localhost:3000/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeReview(id));
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!reviewUsers?.data) return null;
  if (reviewUsers.data.length === 0) {
    return (
      <>
        <div className="self-start w-full max-w-lg m-6 ">
          <Link to="/feed">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition">
              ← Back to Feed
            </button>
          </Link>
        </div>
        <div className="text-center mt-10 text-gray-500 text-lg">
          No Requests available
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="self-start w-full max-w-lg mb-6 ">
        <Link to="/feed">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition">
            ← Back to Feed
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
        User Requests
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reviewUsers?.data.map((user, index) => (
          <div
            key={user.id || index}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center transition-transform hover:scale-105 duration-300"
          >
            <img
              src={user?.fromUserID?.profilePicture}
              alt="User"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {user.fromUserID?.lastName}
            </h2>
            <div className="flex flex-row items-center mt-2">
              <p className="text-gray-600 text-center mx-2">
                {user.fromUserID?.age}
              </p>
              <p className="text-gray-600 text-center mx-2">
                {user.fromUserID?.gender}
              </p>
            </div>
            <p className="text-gray-600 text-center mt-2">
              {user.fromUserID?.aboutMe}
            </p>
            <div className="flex card-actions justify-center mt-2">
              <button
                className="btn btn-primary mx-4"
                onClick={() => {
                  handleReview("rejected", user?._id);
                }}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary "
                onClick={() => {
                  handleReview("accepted", user?._id);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
