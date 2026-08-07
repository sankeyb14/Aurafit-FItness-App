const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const admin = require("firebase-admin");

admin.initializeApp();

exports.generateWorkoutPlan = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userProfile } = req.body;
  if (!userProfile) {
    return res.status(400).json({ error: "Missing userProfile payload" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY environment variable not configured" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a Certified Strength and Conditioning Specialist (CSCS) AI Coach.
Generate an 8-Week Periodized Workout Plan tailored for:
Age: ${userProfile.personalInfo?.age || 25}, Sex: ${userProfile.personalInfo?.sex || 'M'}, Height: ${userProfile.personalInfo?.height_cm}cm, Weight: ${userProfile.personalInfo?.weight_kg}kg
Fitness Level: ${userProfile.fitnessLevel}, Goal Physique: ${userProfile.goalPhysique}
Location & Equipment: ${userProfile.workoutEnv?.location}, Equipment: ${(userProfile.workoutEnv?.equipment || []).join(', ')}
Health Conditions/Injuries: ${userProfile.personalInfo?.healthConditions_text || 'None'}

Return ONLY raw valid JSON matching this schema:
{
  "programName": "string",
  "customizationNotes": "string",
  "weeks": [
    {
      "weekNumber": 1,
      "days": [
        {
          "dayNum": 1,
          "title": "string",
          "focus": "string",
          "exercises": [
            {
              "id": "string",
              "name": "string",
              "sets": number,
              "reps": "string",
              "rest_seconds": number,
              "why": "string",
              "form_tips": "string"
            }
          ]
        }
      ]
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanJson = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    const planData = JSON.parse(cleanJson);

    return res.status(200).json({
      success: true,
      plan: {
        ...planData,
        startDate: new Date().toISOString(),
        currentWeek: 1
      }
    });
  } catch (err) {
    console.error("Cloud function plan generation error:", err);
    return res.status(500).json({ error: err.message });
  }
});
