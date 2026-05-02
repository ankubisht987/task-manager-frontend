import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    // ✅ validation added
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/auth/signup", form);
      alert("Account created successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-black p-6 rounded-xl shadow-lg w-80">
        
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        >
          <option value="MEMBER">Member</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          disabled={!form.name || !form.email || !form.password}
          className={`w-full py-2 rounded text-white ${
            !form.name || !form.email || !form.password
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Sign Up
        </button>

      </div>
    </div>
  );
};

export default Signup;
