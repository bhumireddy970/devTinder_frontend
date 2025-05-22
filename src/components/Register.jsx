import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    aboutMe: "",
    skills: "",
    profilePicture: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors({});
  };

  // Basic validation matching your schema rules
  const validate = () => {
    const err = {};

    if (!formData.firstName || formData.firstName.length < 4)
      err.firstName = "First name must be at least 4 characters";

    if (!formData.emailId.includes("@")) err.emailId = "Invalid email";

    if (!formData.password || formData.password.length < 6)
      err.password = "Password must be at least 6 characters";

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
        // Convert skills string to array for backend
        const dataToSend = {
          ...formData,
          skills: formData.skills
            ? formData.skills.split(",").map((s) => s.trim())
            : [],
          age: Number(formData.age),
        };

        await axios.post("http://localhost:3000/signup", dataToSend);
        setSuccessMsg("Registration successful! Please login.");
        setFormData({
          firstName: "",
          lastName: "",
          emailId: "",
          password: "",
          age: "",
          gender: "",
          aboutMe: "",
          skills: "",
          profilePicture: "",
        });
        setErrors({});
        navigate("/login");
      } catch (error) {
        setErrors({
          api: error.response?.data?.message || "Registration failed",
        });
        setSuccessMsg("");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-animate p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-8 backdrop-blur-sm space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Register
        </h2>

        {/* First Name */}
        <div>
          <label className="block mb-1 font-semibold">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.firstName
                ? "border-red-500 ring-red-400"
                : "border-gray-300 ring-indigo-400"
            }`}
            placeholder="Your first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1 font-semibold">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 border-gray-300 ring-indigo-400"
            placeholder="Your last name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.emailId
                ? "border-red-500 ring-red-400"
                : "border-gray-300 ring-indigo-400"
            }`}
            placeholder="you@example.com"
          />
          {errors.emailId && (
            <p className="text-red-500 text-sm mt-1">{errors.emailId}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 ring-red-400"
                : "border-gray-300 ring-indigo-400"
            }`}
            placeholder="At least 6 characters"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-semibold">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.age
                ? "border-red-500 ring-red-400"
                : "border-gray-300 ring-indigo-400"
            }`}
            placeholder="18 or older"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-semibold">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.gender
                ? "border-red-500 ring-red-400"
                : "border-gray-300 ring-indigo-400"
            }`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        {/* About Me */}
        <div>
          <label className="block mb-1 font-semibold">About Me</label>
          <textarea
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleChange}
            rows={3}
            maxLength={250}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.aboutMe
                ? "border-red-500 ring-red-400"
                : "border-gray-300 ring-indigo-400"
            }`}
            placeholder="Tell us about yourself (max 250 chars)"
          />
          {errors.aboutMe && (
            <p className="text-red-500 text-sm mt-1">{errors.aboutMe}</p>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-1 font-semibold">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.skills
                ? "border-red-500 ring-red-400"
                : "border-gray-300 ring-indigo-400"
            }`}
            placeholder="Comma separated (max 10)"
          />
          {errors.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
          )}
        </div>

        {/* Profile Picture URL */}
        <div>
          <label className="block mb-1 font-semibold">
            Profile Picture URL
          </label>
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 border-gray-300 ring-indigo-400"
            placeholder="Link to profile picture (optional)"
          />
        </div>

        {/* API error */}
        {errors.api && (
          <p className="text-red-600 font-semibold text-center">{errors.api}</p>
        )}

        {/* Success message */}
        {successMsg && (
          <p className="text-green-600 font-semibold text-center">
            {successMsg}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded transition duration-300"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Do you have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
