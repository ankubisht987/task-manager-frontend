import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    // ✅ validation added back
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("user", res.data.email);
      localStorage.setItem("role", res.data.role);

      setSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setSuccess(false);
      alert(err.response?.data || "Login failed"); // ✅ better error
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80 flex flex-col gap-4">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          disabled={!form.email || !form.password} // ✅ disable button
          className={`p-2 rounded-lg text-white transition duration-200 ${
            !form.email || !form.password
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Login
        </button>

        {success && (
          <p className="text-green-500 text-center font-semibold">
            Login Successfully
          </p>
        )}

        <p className="text-sm text-center mt-3">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
