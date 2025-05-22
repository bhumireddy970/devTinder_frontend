import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
export default function LoginForm() {
  const [formData, setFormData] = useState(
    {
      email: "venkata@gmail.com",
      password: "Venkata@123",
    },
    { withCredentials: true }
  );
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors({});
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));

      setFormData({ email: "", password: "" });

      setToast(true);
      setTimeout(() => {
        setToast(false);
        navigate("/feed");
      }, 500);
    } catch (error) {
      console.error("Login failed:", error);
      setServerError(
        error.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>User logged successfully.</span>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">
          DevTender Login
        </h2>

        {serverError && (
          <p className="text-sm text-red-500 text-center">{serverError}</p>
        )}

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`peer w-full border rounded-lg p-4 pt-6 bg-transparent text-sm outline-none transition ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-700"
            }`}
            placeholder=" "
          />
          <label className="absolute left-4 top-2.5 text-gray-500 text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm transition-all dark:text-gray-400">
            Email Address
          </label>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`peer w-full border rounded-lg p-4 pt-6 bg-transparent text-sm outline-none transition ${
              errors.password
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-700"
            }`}
            placeholder=" "
          />
          <label className="absolute left-4 top-2.5 text-gray-500 text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm transition-all dark:text-gray-400">
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-5 text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Bottom */}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
