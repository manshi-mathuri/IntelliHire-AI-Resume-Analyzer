require("dotenv").config();

const express = require("express");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.routes");
const mongoose = require("mongoose");
const AnalysisModel = require("./src/models/analysis.model");
const authMiddleware = require("./src/middleware/auth.middleware");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const app = express();
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected seccessfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });


const upload = multer();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/test", (req, res) => {
  res.send("Backend is working");
});

app.post(
  "/api/analyze",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {

    const parser = new PDFParse({
      data: req.file.buffer
    });

    const result = await parser.getText();

    const resumeText = result.text;
    const jobDescription = req.body.jobDescription;

    const prompt = `
Resume:
${resumeText}

Job Description:
${jobDescription}

Analyze this resume according to the job description.

Give the response only in JSON format like this:

{
  "atsScore": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "suggestions": []
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt
    });

    console.log(response.text);

    const cleanResponse = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(cleanResponse);
    const savedAnalysis = await AnalysisModel.create({
      userId: req.userId,
      atsScore: analysis.atsScore,
      matchedSkills: analysis.matchedSkills,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions
    });

    console.log("ATS Score:", analysis.atsScore);

    res.json({
      message: "Resume analyzed successfully",
      analysis
    });

  });
// =============================
// GET ANALYSIS HISTORY
// =============================
app.get("/api/analyses", authMiddleware, async (req, res) => {
  try {
    const analyses = await AnalysisModel.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      analyses: analyses
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch analysis history"
    });
  }
});


// =============================
// DELETE ANALYSIS
// =============================
app.delete("/api/analyses/:id", authMiddleware, async (req, res) => {
  try {
    const analysis = await AnalysisModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found"
      });
    }

    return res.status(200).json({
      message: "Analysis deleted successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete analysis"
    });
  }
});
app.listen(5000, () => {
  console.log("server is running on port 5000");
});