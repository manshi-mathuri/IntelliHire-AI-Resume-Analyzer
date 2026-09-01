import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const response = await fetch(
  "/api/auth/register",
  {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      setMessage(data.message);

      if (response.ok) {
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);

      setIsError(true);
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Sign Up
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Create your IntelliHire account to get started
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 mb-5"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 mb-5"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Signup
          </button>

        </form>

        {/* Success / Error Message */}
        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Signup;