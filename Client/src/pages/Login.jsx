import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTruckMoving } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const adminEmail = "admin@gmail.com";

    // Default password is admin123
    // After password reset, use the new password from localStorage
    const savedPassword =
      localStorage.getItem("adminPassword") || "admin123";

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (
      email.trim().toLowerCase() === adminEmail &&
      password === savedPassword
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">

        {/* LOGO */}
        <div className="flex justify-center mb-5">
          <div className="bg-blue-600 p-4 rounded-2xl">
            <FaTruckMoving className="text-white text-4xl" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-white text-center">
          FleetDash Login
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Welcome back! Sign in to continue.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5 mt-8"
        >

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>

        </form>

        {/* DEFAULT LOGIN INFO */}
        <div className="mt-6 bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 text-center">
            Default login:
          </p>

          <p className="text-xs text-slate-300 text-center mt-1">
            admin@gmail.com / admin123
          </p>
        </div>

      </div>

    </div>
  );
}

export default Login;