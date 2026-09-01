import { useNavigate } from "react-router-dom";
function CTA() {
  
    const navigate = useNavigate();
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl">

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Land Your Dream Job?
          </h2>

          <p className="text-blue-100 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Upload your resume and let IntelliHire analyze your ATS score,
            identify missing skills, and help you land your dream job faster.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-8 mt-10">
            <button 
             onClick={() => navigate("/upload")}
            className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              Upload Resume
            </button>

            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 hover:-translate-y-1 transition duration-300 cursor-pointer">
              Watch Demo
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTA;