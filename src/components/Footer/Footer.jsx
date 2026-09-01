import { useNavigate } from "react-router-dom";



function Footer() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    // ===========================
    // FOOTER SECTION
    // ===========================
    <footer className="bg-gray-900 text-white py-16">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6">

        {/* ===========================
            FOOTER GRID
        =========================== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* ===========================
              COMPANY INFO
          =========================== */}
          <div>

            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              IntelliHire
            </h3>

            <p className="text-gray-400 mt-4 leading-relaxed">
              AI-powered resume analysis platform that helps job seekers
              improve their ATS score and build stronger resumes.
            </p>

          </div>

          {/* ===========================
              QUICK LINKS
          =========================== */}
          <div>

            <h3 className="text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3 text-gray-400">

              <li
                onClick={() => navigate("/")}
                className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer"
              >
                Home
              </li>

              <li
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer"
              >
                Features
              </li>

              <li
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer"
              >
                How It Works
              </li>

              <li
                onClick={() =>
                  navigate(token ? "/upload" : "/login")
                }
                className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer"
              >
                Upload Resume
              </li>

            </ul>

          </div>

          {/* ===========================
              RESOURCES
          =========================== */}
          <div>

            <h3 className="text-xl font-semibold">
              Resources
            </h3>

            <ul className="mt-4 space-y-3 text-gray-400">

              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Terms & Conditions
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Help Center
              </li>

              <li className="hover:text-white transition cursor-pointer">
                FAQ
              </li>

            </ul>

          </div>

          {/* ===========================
              CONTACT
          =========================== */}
          <div>

            <h3 className="text-xl font-semibold">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-gray-400">

              <a
                href="mailto:support@intellihire.com"
                className="block hover:text-white transition"
              >
                📧 support@intellihire.com
              </a>

              <a
                href="tel:+916205270651"
                className="block hover:text-white transition"
              >
                📞 +91 6205270651
              </a>

              <p>
                📍 India
              </p>

            </div>
            {/* Follow Us */}
            <div className="mt-8">

              <h4 className="text-lg font-semibold text-white">
                Follow Us
              </h4>

              <div className="flex items-center gap-4 mt-4">

                <a
                  href="https://github.com/manshi-mathuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/manshi-kumari07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  LinkedIn
                </a>
                

                <a
                  href="YOUR_INSTAGRAM_PROFILE_URL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  Instagram
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* ===========================
            FOOTER BOTTOM
        =========================== */}

        <hr className="border-gray-700 my-10 opacity-60" />

        <p className="text-center text-gray-500 text-sm">
          © 2026 IntelliHire. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;