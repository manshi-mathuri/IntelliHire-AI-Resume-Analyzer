import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (

    // ===========================
    // HERO SECTION
    // ===========================
    <section className="bg-gradient-to-r from-sky-100 via-blue-50 to-purple-100">

      {/* ===========================
          MAIN CONTAINER
          Width ko center me rakhta hai
      =========================== */}
      <div className="max-w-7xl mx-auto px-6">

        {/* ===========================
            HERO LAYOUT
            Left + Right (2 Columns)
        =========================== */}
       <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-[70vh] py-12 md:py-0">

          {/* ===========================
              LEFT SIDE CONTENT
          =========================== */}
          <div className="w-full md:flex-1 max-w-3xl">
            
            {/* AI Badge */}
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              🤖 AI Powered Smart Hiring Platform
            </span>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
              Hire Smarter with AI,
              <br />
              Not Harder.
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-xl">
              Upload your resume, analyze job descriptions,
              and let AI help recruiters find the perfect candidate faster.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">

              <button
                onClick={() => navigate("/upload")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Get Started
              </button>
              
              <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition duration-200">
                Watch Demo
              </button>

            </div>

          </div>

          {/* ===========================
              RIGHT SIDE DASHBOARD
          =========================== */}
         <div className="w-full md:flex-1">

            {/* Dashboard Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 h-auto border border-gray-100">

              {/* Dashboard Heading */}
              <h3 className="text-xl font-bold">
                AI Resume Analysis
              </h3>

              {/* ===========================
                  ATS SCORE
              =========================== */}
              <div className="mt-6">

                {/* Score Row */}
                <div className="flex justify-between items-center">

                  <p className="text-gray-500 font-medium">
                    ATS Score
                  </p>

                  <span className="text-green-600 font-bold text-lg">
                    92%
                  </span>

                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

                  <div className="bg-green-500 h-3 rounded-full w-[92%]">

                  </div>

                </div>

              </div>

              {/* ===========================
                  SKILLS MATCHED
                  (Yahan add karenge)
                  Yahan span perfect hai kyunki hume sentence ke andar ek chhota part style karna tha.
              =========================== */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">
                  Skills Matched
                </h4>

                <div className="flex flex-wrap gap-3">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    React.js
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Node.js
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Express
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    MongoDB
                  </span>

                </div>
              </div>

              {/* ===========================
                  MISSING SKILLS
                  (Yahan add karenge)
              =========================== */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">
                  Missing Skills
                </h4>

                <div className="flex flex-wrap gap-3">

                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Docker
                  </span>

                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    AWS
                  </span>

                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Redis
                  </span>

                </div>
              </div>

              {/* ===========================
                  AI SUGGESTIONS
                  (Yahan add karenge)
              =========================== */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">
                  AI Suggestion
                </h4>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li>✅ Add Docker projects to strengthen your backend profile.</li>

                  <li>✅ Include cloud deployment experience (AWS).</li>

                  <li>✅ Mention measurable project achievements.</li>
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;