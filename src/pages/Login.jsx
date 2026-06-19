import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Please fill all fields");
    }
      setLoading(true);


    try {
      const response = await fetch(
        "http://localhost:8000/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );

      const result = await response.json();

      const {
        success,
        message,
        jwtToken,
        name,
        email,
        error,
      } = result;

      if (success) {
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("email", email);
        localStorage.setItem("name", name);
        
        window.dispatchEvent(new Event("storage"));

        handleSuccess(message);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || message);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
      handleChange("Something went wrong");
    } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-950 via-slate-900 to-black px-4">

      {/* Glow Effects */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full top-20 left-10"></div>

      <div className="absolute w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full bottom-20 right-10"></div>

      <div className="relative w-full max-w-md">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white">
              Login
            </h1>

            <p className="text-gray-400 mt-2">
              Login to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm font-medium">
                Email Address
              </label>

              <div className="relative mt-2">
                <input
                  type="email"
                  name="email"
                  value={loginInfo.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="
                    peer
                    w-full
                    bg-transparent
                    text-white
                    py-3
                    outline-none
                    border-b
                    border-gray-600
                    placeholder:italic
                    placeholder:text-gray-400
                  "
                />

                <span
                  className="
                    absolute
                    left-0
                    bottom-0
                    h-0.5
                    w-0
                    bg-cyan-500
                    transition-all
                    duration-300
                    peer-focus:w-full
                  "
                ></span>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm font-medium">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type="password"
                  name="password"
                  value={loginInfo.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="
                    peer
                    w-full
                    bg-transparent
                    text-white
                    py-3
                    outline-none
                    border-b
                    border-gray-600
                    placeholder:italic
                    placeholder:text-gray-400
                  "
                />

                <span
                  className="
                    absolute
                    left-0
                    bottom-0
                    h-0.5
                    w-0
                    bg-cyan-500
                    transition-all
                    duration-300
                    peer-focus:w-full
                  "
                ></span>
              </div>
            </div>

            {/* Button */}
            <button
  type="submit"
  disabled={loading}
  className="
    w-full
    py-3
    rounded-xl
    bg-linear-to-r
    from-cyan-500
    to-blue-600
    text-white
    font-bold
    transition
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
>
  {loading ? "Login..." : "Login"}
</button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 font-semibold hover:text-cyan-300"
            >
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;