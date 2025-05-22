import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

export default function Profile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, aboutMe, skills, profilePicture } =
    user;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    age,
    gender,
    aboutMe,
    skills: Array.isArray(skills) ? skills.join(", ") : "",
    profilePicture,
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [toast, setToast] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors({});
  };

  const validate = () => {
    const err = {};
    if (!formData.firstName || formData.firstName.length < 4)
      err.firstName = "First name must be at least 4 characters";
    if (formData.age && formData.age < 18) err.age = "Age must be at least 18";
    if (
      formData.gender &&
      !["male", "female", "others"].includes(formData.gender.toLowerCase())
    )
      err.gender = "Gender must be male, female, or others";
    if (formData.aboutMe && formData.aboutMe.length > 250)
      err.aboutMe = "About me should be less than 250 characters";
    if (formData.skills) {
      const skillsArr = formData.skills.split(",").map((s) => s.trim());
      if (skillsArr.length > 10) err.skills = "Max 10 skills allowed";
    }
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();

    if (Object.keys(err).length) {
      setErrors(err);
      setSuccessMsg("");
    } else {
      try {
        const dataToSend = {
          ...formData,
          skills: formData.skills
            ? formData.skills.split(",").map((s) => s.trim())
            : [],
          age: Number(formData.age),
        };

        const user = await axios.patch(
          "http://localhost:3000/profile/update",
          dataToSend,
          { withCredentials: true }
        );
        dispatch(addUser(user.data));
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);

        setErrors({});
      } catch (error) {
        setErrors({
          api: error.response?.data?.message || "Profile update failed",
        });
        setSuccessMsg("");
      }
    }
  };

  return (
    <div className="bg-gradient-animate min-h-screen flex flex-col items-center justify-center p-6">
      {toast && (
        <div className="toast toast-end toast-middle mb-4">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="self-start w-full max-w-lg mb-6 ">
        <Link to="/feed">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition">
            ← Back to Feed
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full max-w-5xl gap-8">
        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 bg-white bg-opacity-90 rounded-xl shadow-xl p-8 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Edit Profile
          </h2>

          {/* Fields */}
          {[
            {
              label: "First Name",
              name: "firstName",
              type: "text",
              placeholder: "Your first name",
              error: errors.firstName,
            },
            {
              label: "Last Name",
              name: "lastName",
              type: "text",
              placeholder: "Your last name",
            },
            {
              label: "Age",
              name: "age",
              type: "number",
              placeholder: "18 or older",
              error: errors.age,
            },
            {
              label: "Gender",
              name: "gender",
              type: "select",
              options: ["", "male", "female", "others"],
              error: errors.gender,
            },
            {
              label: "About Me",
              name: "aboutMe",
              type: "textarea",
              placeholder: "Tell us about yourself (max 250 chars)",
              error: errors.aboutMe,
            },
            {
              label: "Skills",
              name: "skills",
              type: "text",
              placeholder: "Comma separated (max 10)",
              error: errors.skills,
            },
            {
              label: "Profile Picture URL",
              name: "profilePicture",
              type: "text",
              placeholder: "Link to profile picture (optional)",
            },
          ].map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block mb-1 font-semibold">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  rows={3}
                  maxLength={250}
                  className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                    field.error
                      ? "border-red-500 ring-red-400"
                      : "border-gray-300 ring-indigo-400"
                  }`}
                  placeholder={field.placeholder}
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                    field.error
                      ? "border-red-500 ring-red-400"
                      : "border-gray-300 ring-indigo-400"
                  }`}
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt
                        ? opt.charAt(0).toUpperCase() + opt.slice(1)
                        : "Select gender"}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                    field.error
                      ? "border-red-500 ring-red-400"
                      : "border-gray-300 ring-indigo-400"
                  }`}
                  placeholder={field.placeholder}
                />
              )}
              {field.error && (
                <p className="text-red-500 text-sm mt-1">{field.error}</p>
              )}
            </div>
          ))}

          {errors.api && (
            <p className="text-red-600 font-semibold text-center mt-2">
              {errors.api}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded transition duration-300 mt-4"
          >
            Save
          </button>
        </form>

        {/* User Preview Card */}
        <div className="w-full md:w-1/2">
          <UserCard user={formData} />
        </div>
      </div>
    </div>
  );
}
