import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const resetEmail = localStorage.getItem("resetEmail");

  const handleResetPassword = (e) => {
    e.preventDefault();

    setError("");

    if (!resetEmail) {
      setError("Password reset session expired.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please fill both password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save new password
    localStorage.setItem("adminPassword", newPassword);

    // Remove temporary reset email
    localStorage.removeItem("resetEmail");

    alert("Password changed successfully!");

    // Go back to login
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-white text-center">
          Reset Password
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Create your new password.
        </p>

        {/* ERROR */}
        {error && (
          <div className="mt-5 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleResetPassword}
          className="space-y-5 mt-8"
        >

          {/* NEW PASSWORD */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* RESET */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Reset Password
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

export default ResetPassword;