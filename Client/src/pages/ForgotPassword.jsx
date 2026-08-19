import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    setError("");

    const adminEmail = "admin@gmail.com";

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (email.trim().toLowerCase() !== adminEmail) {
      setError("Email not found. Please enter the registered email.");
      return;
    }

    // Store verified email temporarily
    localStorage.setItem("resetEmail", adminEmail);

    // Go to reset password page
    navigate("/reset-password");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-white text-center">
          Forgot Password
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Enter your registered email to reset your password.
        </p>

        {/* ERROR */}
        {error && (
          <div className="mt-5 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleReset}
          className="space-y-5 mt-8"
        >

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* CONTINUE */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Continue
          </button>

          {/* BACK */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition"
          >
            Back to Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;