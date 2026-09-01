import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("token");
      setMenuOpen(false);
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 md:gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              I
            </div>

            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
              Intelli<span className="text-blue-600">Hire</span>
            </h1>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-2">

            <a
              href="#features"
              className="px-3 py-2 rounded-lg text-gray-600 font-medium hover:text-blue-600 hover:bg-blue-50 transition"
            >
              Features
            </a>

            <a
              href="#about"
              className="px-3 py-2 rounded-lg text-gray-600 font-medium hover:text-blue-600 hover:bg-blue-50 transition"
            >
              About
            </a>

            {token ? (
              <>
                <button
                  onClick={() => navigate("/upload")}
                  className="px-3 py-2 rounded-lg text-gray-600 font-medium hover:text-blue-600 hover:bg-blue-50 transition"
                >
                  Upload Resume
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-3 py-2 rounded-lg text-gray-600 font-medium hover:text-blue-600 hover:bg-blue-50 transition"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="px-3 py-2 rounded-lg text-gray-600 font-medium hover:text-blue-600 hover:bg-blue-50 transition"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 py-2 rounded-lg text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition duration-200 cursor-pointer"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
              </>
            )}

          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl font-bold"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-2">

            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Features
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              About
            </a>

            {token ? (
              <>
                <button
                  onClick={() => {
                    navigate("/upload");
                    setMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Upload Resume
                </button>

                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    navigate("/signup");
                    setMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Sign Up
                </button>
              </>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;