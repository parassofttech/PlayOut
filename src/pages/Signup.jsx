import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return alert("Please fill all fields");
    }

    try {
      const url = "http://localhost:8000/api/user/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();

      const { success, message, error } = result;

      if (success) {
        alert(message);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        alert(error.details?.[0]?.message || message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-black px-4">

      {/* Background Blur */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full top-20 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full bottom-20 right-10"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white">
              Create Account
            </h1>

            <p className="text-gray-400 mt-2">
              Join us and start your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-gray-300 text-sm">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={signupInfo.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={signupInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={signupInfo.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:scale-[1.02] transition"
            >
              Create Account
            </button>

          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;