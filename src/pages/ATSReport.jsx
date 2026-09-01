import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

function ATSReport() {
  const location = useLocation();
  const navigate = useNavigate();

  const savedAnalysis = sessionStorage.getItem("atsAnalysis");

  const analysis =
    location.state?.analysis ||
    (savedAnalysis ? JSON.parse(savedAnalysis) : null);


  // =========================
  // DOWNLOAD PDF
  // =========================
  function handleDownloadPDF() {
    const doc = new jsPDF();

    let yPosition = 20;


    // ATS Report Heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    doc.text("ATS Report", 20, yPosition);

    yPosition += 15;


    // ATS Score
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    doc.text("ATS Score", 20, yPosition);

    yPosition += 10;

    doc.setFontSize(18);

    doc.text(
      `${analysis.atsScore}/100`,
      20,
      yPosition
    );

    yPosition += 12;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");


    // =========================
    // MATCHED SKILLS
    // =========================
    doc.setFont("helvetica", "bold");

    doc.text(
      "Matched Skills",
      20,
      yPosition
    );

    yPosition += 8;

    doc.setFont("helvetica", "normal");

    const matchedSkillsText = doc.splitTextToSize(
      analysis.matchedSkills.join(", "),
      170
    );

    doc.text(
      matchedSkillsText,
      20,
      yPosition
    );

    yPosition +=
      matchedSkillsText.length * 7 + 10;


    // =========================
    // MISSING SKILLS
    // =========================
    doc.setFont("helvetica", "bold");

    doc.text(
      "Missing Skills",
      20,
      yPosition
    );

    yPosition += 8;

    doc.setFont("helvetica", "normal");

    const missingSkillsText = doc.splitTextToSize(
      analysis.missingSkills.join(", "),
      170
    );

    doc.text(
      missingSkillsText,
      20,
      yPosition
    );

    yPosition +=
      missingSkillsText.length * 7 + 10;


    // =========================
    // SUGGESTIONS
    // =========================
    doc.setFont("helvetica", "bold");

    doc.text(
      "Suggestions",
      20,
      yPosition
    );

    yPosition += 10;

    doc.setFont("helvetica", "normal");


    analysis.suggestions.forEach(
      (suggestion, index) => {

        const suggestionText =
          doc.splitTextToSize(
            `${index + 1}. ${suggestion}`,
            170
          );

        const suggestionHeight =
          suggestionText.length * 7;


        // Check if new page is required
        if (
          yPosition + suggestionHeight > 270
        ) {
          doc.addPage();

          yPosition = 20;
        }


        doc.text(
          suggestionText,
          20,
          yPosition
        );


        yPosition +=
          suggestionText.length * 7 + 5;
      }
    );


    // Download PDF
    doc.save("ats-report.pdf");
  }


  // =========================
  // NO ANALYSIS FOUND
  // =========================
  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">
          No analysis found. Please upload your resume first.
        </p>
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-gray-50 py-20">

      <div className="max-w-5xl mx-auto px-6">
        

     <div className="flex gap-6 mb-8">

  <button
    onClick={() => navigate("/")}
    className="text-blue-600 font-semibold hover:text-blue-800 cursor-pointer"
  >
    ← Back to Home
  </button>

  <button
  onClick={() => navigate("/dashboard")}
  className="text-blue-600 font-semibold hover:text-blue-800 cursor-pointer"
>
  ← Back to History
</button>

</div>
      
        {/* Page Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          ATS Report
        </h1>


        {/* ATS Score */}
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">

          <h2 className="text-2xl font-bold">
            ATS Score
          </h2>


          <p className="text-5xl font-bold text-blue-600 mt-4">
            {analysis.atsScore}
          </p>


          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mt-6">

            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{
                width: `${analysis.atsScore}%`
              }}
            ></div>

          </div>


          {/* Score Status */}
          <p className="mt-4 text-lg font-semibold text-gray-700">

            {analysis.atsScore >= 80
              ? "Excellent Match"
              : analysis.atsScore >= 60
              ? "Good Match"
              : analysis.atsScore >= 40
              ? "Average Match"
              : "Needs Improvement"}

          </p>

        </div>


        {/* Matched Skills */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

          <h2 className="text-2xl font-bold">
            Matched Skills
          </h2>


          <div className="flex flex-wrap gap-3 mt-5">

            {analysis.matchedSkills?.map(
              (skill) => (

                <span
                  key={skill}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
                >
                  {skill}
                </span>

              )
            )}

          </div>

        </div>


        {/* Missing Skills */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

          <h2 className="text-2xl font-bold">
            Missing Skills
          </h2>


          <div className="flex flex-wrap gap-3 mt-5">

            {analysis.missingSkills?.map(
              (skill) => (

                <span
                  key={skill}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium"
                >
                  {skill}
                </span>

              )
            )}

          </div>

        </div>


        {/* Suggestions */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

          <h2 className="text-2xl font-bold">
            Suggestions
          </h2>


          <div className="mt-5 space-y-4">

            {analysis.suggestions?.map(
              (suggestion, index) => (

                <div
                  key={index}
                  className="bg-blue-50 p-4 rounded-xl"
                >
                  <p className="text-gray-700">
                    {index + 1}. {suggestion}
                  </p>
                </div>

              )
            )}

          </div>

        </div>


        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-4">

          <button
            onClick={() =>
              navigate("/upload")
            }
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Analyze Another Resume
          </button>


          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition cursor-pointer"
          >
            Download PDF
          </button>

        </div>

      </div>

    </main>
  );
}

export default ATSReport;