import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/logout",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeUser());
      dispatch(clearFeed());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DivTinder</a>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="form-controls pr-5">Welcome {user.lastName}</div>
          <div className="dropdown dropdown-end mr-9  ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.profilePicture}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  to="/profile"
                  className="flex justify-between items-center"
                >
                  <span>Profile</span>
                  <span className="badge">New</span>
                </Link>
              </li>

              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/review">Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
