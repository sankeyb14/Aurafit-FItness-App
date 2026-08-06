import { GoogleGenAI } from '@google/genai';
import { EXERCISE_DATABASE } from '../data/exerciseSeedData';

// Fallback algorithmically generated 8-week periodized workout plan
export function generateLocalFallbackPlan(userProfile) {
  const goal = userProfile.goalPhysique || 'athletic';
  const level = userProfile.fitnessLevel || 'intermediate';
  const equipment = userProfile.workoutEnv?.equipment || ['bodyweight'];
  const healthNotes = userProfile.personalInfo?.healthConditions_text || '';

  const goalTitles = {
    skinny_lean: "Hypertrophy & Lean Muscle Sculpt",
    toned: "Toning & High-Density Circuit",
    athletic: "Functional Athletic Performance",
    calisthenics: "Bodyweight Skill & Strength Progression",
    power_lifter: "Pure Strength & Heavy Compound 5x5",
    endurance: "Stamina & High Volume Conditioning"
  };

  const programName = `8-Week Custom ${goalTitles[goal] || "Personalized Fitness"} Program`;
  const customizationNotes = `Tailored for ${level} level, focusing on ${goal.replace('_', ' ')} with available equipment (${equipment.join(', ')}). ${healthNotes ? `Health accommodations: ${healthNotes}` : ''}`;

  // Filter exercise pool by available equipment
  const matchingExercises = EXERCISE_DATABASE.filter(ex => {
    return ex.equipment_needed.some(eq => eq === 'bodyweight' || equipment.includes(eq));
  });

  const pool = matchingExercises.length >= 12 ? matchingExercises : EXERCISE_DATABASE;

  const weeks = [];
  for (let w = 1; w <= 8; w++) {
    const isDeload = (w === 4 || w === 8); // Weeks 4 & 8 periodized deload
    const days = [];

    const dayTemplates = [
      { dayNum: 1, title: "Upper Body Power", focus: "Chest, Back, Shoulders & Arms" },
      { dayNum: 2, title: "Lower Body & Core", focus: "Quads, Hamstrings, Glutes & Abs" },
      { dayNum: 3, title: "Active Recovery & Mobility", focus: "Stretching & Mild Conditioning" },
      { dayNum: 4, title: "Push Hypertrophy", focus: "Chest, Shoulders & Triceps" },
      { dayNum: 5, title: "Pull & Posterior Chain", focus: "Back, Rear Delts & Biceps" },
      { dayNum: 6, title: "Full Body Conditioning", focus: "Compound Strength & Core" },
      { dayNum: 7, title: "Rest & Recovery", focus: "Complete Rest & Sleep Focus" }
    ];

    dayTemplates.forEach(dt => {
      let dayExercises = [];
      if (dt.dayNum !== 3 && dt.dayNum !== 7) {
        // Pick 4-5 relevant exercises
        const selected = pool
          .slice()
          .sort(() => 0.5 - Math.random())
          .slice(0, level === 'beginner' ? 4 : 5);

        dayExercises = selected.map((ex, idx) => ({
          id: ex.id || `ex_gen_${idx}`,
          name: ex.name,
          sets: isDeload ? 2 : (level === 'advanced' ? 4 : 3),
          reps: isDeload ? "8-10" : (goal === 'power_lifter' ? "5" : (goal === 'toned' ? "12-15" : "8-12")),
          rest_seconds: goal === 'power_lifter' ? 180 : 90,
          why: `Chosen to target ${ex.category} for your ${goal.replace('_', ' ')} goals.`,
          form_tips: ex.form_guide?.steps?.[0] || "Maintain strict form and control tempo."
        }));
      }

      days.push({
        dayNum: dt.dayNum,
        title: dt.title,
        focus: dt.focus,
        exercises: dayExercises
      });
    });

    weeks.push({
      weekNumber: w,
      isDeload,
      days
    });
  }

  return {
    programName,
    customizationNotes,
    startDate: new Date().toISOString(),
    currentWeek: 1,
    weeks
  };
}

export async function generateAIWorkoutPlan(userProfile) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn("Gemini API Key missing or default. Falling back to local plan generator.");
    return generateLocalFallbackPlan(userProfile);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
You are an expert Certified Strength and Conditioning Specialist (CSCS) and AI Fitness Coach.
Generate a structured 8-Week Periodized Workout Plan tailored for the following user profile:

User Profile:
- Age: ${userProfile.personalInfo?.age || 25}
- Sex: ${userProfile.personalInfo?.sex || 'M'}
- Height: ${userProfile.personalInfo?.height_cm || 175} cm
- Weight: ${userProfile.personalInfo?.weight_kg || 70} kg
- Fitness Level: ${userProfile.fitnessLevel || 'intermediate'}
- Goal Physique: ${userProfile.goalPhysique || 'athletic'}
- Workout Location & Equipment: ${userProfile.workoutEnv?.location || 'gym'}, Equipment: ${(userProfile.workoutEnv?.equipment || []).join(', ')}
- Lifestyle: ${userProfile.lifestyle?.level || 'moderate'}, Sleep: ${userProfile.lifestyle?.avg_sleep_hours || 7} hours
- Health Conditions/Injury Notes: ${userProfile.personalInfo?.healthConditions_text || 'None'}
- Dietary Preference: ${userProfile.dietaryPrefs?.dietType || 'non-veg'}

Return ONLY a valid JSON object matching this schema (no markdown fences, no explanatory text):
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

Make sure:
1. Provide 8 full weeks.
2. Week 4 and Week 8 should be periodized deload weeks with lighter volume.
3. Days 3 and 7 can be mobility or rest days with an empty exercises array.
4. Strictly respect equipment constraints and health conditions.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text?.trim();
    if (!text) throw new Error("Empty response from Gemini API");

    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(jsonString);

    return {
      ...parsedData,
      startDate: new Date().toISOString(),
      currentWeek: 1
    };
  } catch (error) {
    console.error("Gemini Plan Generation Error:", error);
    return generateLocalFallbackPlan(userProfile);
  }
}
