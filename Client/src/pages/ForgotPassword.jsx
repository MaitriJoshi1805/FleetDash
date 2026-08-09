import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (email === "admin@gmail.com") {
      alert("Password reset link sent successfully.");
      navigate("/");
    } else {
      alert("Email not found");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white text-center">
          Forgot Password
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Enter your registered email.
        </p>

        <form onSubmit={handleReset} className="space-y-5 mt-8">

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 p-3 rounded-lg text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          >
            Send Reset Link
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-lg"
          >
            Back to Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;