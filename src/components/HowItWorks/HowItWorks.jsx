import { motion } from "framer-motion";
function HowItWorks() {
  const howItWork = [
    {
      number: "1",
      title: "Upload Resume ",
      description: "Upload your resume and paste the job description.",
    },
    {
      number: "2",
      title: "AI Analysis",
      description: " AI compares your resume skills with the job requirements.",
    },
    {
      number: "3",
      title: " Get Detailed Report",
      description: " Receive ATS score, matched skills, missing skills, and suggestions.",
    },
  ]
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-center">
          How IntelliHire Works </h2>

        <p className="text-gray-600 text-center mt-6 max-w-2xl mx-auto leading-relaxed">
          Analyze your resume in three simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {howItWork.map((step) => (

            <div
              key={step.number}
              className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >

              <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center">
                {step.number}
              </div>
              
              <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto mt-5"></div>

              <h3 className="text-2xl font-bold mt-6 text-gray-900">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {step.description}
              </p>

            </div>

          ))}
        </div>
      </div>
    </section>
  )
}
export default HowItWorks;