import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTruckMoving } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };


  useEffect(() => {
  if (localStorage.getItem("isLoggedIn")) {
    navigate("/dashboard");
  }
}, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md">
        
        <div className="flex justify-center mb-5">
          <h1 className="text-5xl">🚚</h1>
        </div>
        <h1 className="text-3xl font-bold text-white text-center">
          FleetDash Login
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Welcome back! Sign in to continue.
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5 mt-8"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full bg-slate-800 p-3 rounded-lg text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full bg-slate-800 p-3 rounded-lg text-white"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Forgot Password?
            </button>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;