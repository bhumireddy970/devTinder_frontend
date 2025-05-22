import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleIgnore = async () => {
    try {
      await axios.post(
        `http://localhost:3000/request/send/ignored/${user._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(user._id));
      navigate("/feed");
    } catch (error) {
      console.error(
        "Error ignoring user:",
        error.response?.data || error.message
      );
    }
  };
  const handleInerested = async () => {
    try {
      await axios.post(
        `http://localhost:3000/request/send/interested/${user._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(user._id));
      navigate("/feed");
    } catch (error) {
      console.error(
        "Error ignoring user:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div className="card bg-base-100 w-80 shadow-sm">
      <figure>
        <img src={user.profilePicture} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        {user.age && user.gender && (
          <p className="font-bold">{user.age + " " + user.gender}</p>
        )}
        {user.aboutMe && <p>{user.aboutMe}</p>}

        {user.skills && user.skills.length > 0 && (
          <p className="text-sm text-gray-600">Skills: {user.skills}</p>
        )}
        <div className="flex card-actions justify-center">
          <button className="btn btn-primary mx-4" onClick={handleIgnore}>
            Ignore
          </button>
          <button className="btn btn-secondary " onClick={handleInerested}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
