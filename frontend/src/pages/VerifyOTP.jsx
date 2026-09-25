
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  async function handleResendOTP() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    });

    const data = await response.json();

    alert(data.message);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        otp: otp
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      navigate("/login");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Verify Your Email
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest"
          />

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Verify OTP
          </button>

          <button
            type="button"
            onClick={handleResendOTP}
            className="w-full mt-3 border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-200 cursor-pointer"
          >
            Resend OTP
          </button>

        </form>

      </div>
    </div>
  );
}

export default VerifyOTP;