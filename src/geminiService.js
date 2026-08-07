import { GoogleGenerativeAI } from '@google/generative-ai';

// Helper: Calculate BMR and Calorie Target
export function calculateUserCalorieTarget(personalInfo, lifestyle, goalPhysique, customCalorie = null) {
  if (customCalorie) return Number(customCalorie);

  const age = Number(personalInfo?.age) || 25;
  const height = Number(personalInfo?.height_cm) || 175;
  const weight = Number(personalInfo?.weight_kg) || 70;
  const sex = personalInfo?.sex || 'M';

  // Mifflin-St Jeor BMR Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = sex === 'F' ? bmr - 161 : bmr + 5;

  const activityMultipliers = {
    sedentary: 1.2,
    moderate: 1.55,
    active: 1.725,
    highly_active: 1.9
  };

  const activityLevel = lifestyle?.level || 'moderate';
  const tdee = bmr * (activityMultipliers[activityLevel] || 1.55);

  const goalAdjustments = {
    skinny_lean: -300,
    toned: -150,
    athletic: 0,
    calisthenics: 100,
    power_lifter: 300,
    endurance: -100
  };

  const adjustment = goalAdjustments[goalPhysique] || 0;
  return Math.round(tdee + adjustment);
}

// Fallback algorithmically generated 8-week periodized workout plan strictly constrained by equipment & goal
export function generateLocalFallbackPlan(userProfile) {
  const goal = userProfile.goalPhysique || 'athletic';
  const level = userProfile.fitnessLevel || 'intermediate';
  const eqType = userProfile.equipmentType || 'home';
  const availableEquipment = eqType === 'gym' 
    ? (userProfile.customGymEquipment || ['Cable machine', 'Leg press', 'Dumbbells', 'Barbell'])
    : (userProfile.homeEquipment || ['bodyweight']);

  const userCalorieTarget = calculateUserCalorieTarget(
    userProfile.personalInfo,
    userProfile.lifestyle,
    goal,
    userProfile.userCalorieTarget
  );

  const isBodyweightOnly = eqType === 'home' && availableEquipment.includes('bodyweight') && availableEquipment.length === 1;
  const hasDumbbells = availableEquipment.some(e => e.toLowerCase().includes('dumbbell'));
  const hasBarbell = availableEquipment.some(e => e.toLowerCase().includes('barbell') || e.toLowerCase().includes('rack'));
  const hasPullupBar = availableEquipment.some(e => e.toLowerCase().includes('pullup') || e.toLowerCase().includes('pull-up'));

  // Goal Specific Cardio Rules
  const cardioRules = {
    skinny_lean: { frequency: "4x/week", duration: "25-30 min", type: "Mix of Steady & HIIT", mandatory: true },
    toned: { frequency: "2-3x/week", duration: "20-25 min", type: "Steady Cardio", mandatory: false },
    athletic: { frequency: "2-3x/week", duration: "15-20 min", type: "Metabolic Circuit", mandatory: false },
    calisthenics: { frequency: "1-2x/week", duration: "10-15 min", type: "Light Recovery Cardio", mandatory: false },
    power_lifter: { frequency: "1x/week", duration: "15 min max", type: "Light Walking on Rest Day", mandatory: false },
    endurance: { frequency: "5x/week", duration: "40+ min", type: "Interval & Long Slow Distance", mandatory: true }
  };

  // Structured Triple Variant Exercise Database (Primary, AltA, AltB)
  const EXERCISE_MATRIX = [
    {
      primary: { name: hasBarbell ? 'Barbell Bench Press' : (hasDumbbells ? 'Dumbbell Bench Press' : 'Standard Push-up'), muscleGroup: 'Chest', sets: goal === 'power_lifter' ? 5 : 3, reps: goal === 'power_lifter' ? '5' : (goal === 'endurance' ? '15-20' : '8-12'), restSeconds: goal === 'power_lifter' ? 180 : 90, why: 'Primary pressing movement for chest & front delt strength.', formTips: ['Keep feet flat on floor', 'Lower under control to mid-chest', 'Explosive press up'], commonMistakes: ['Flaring elbows 90 degrees', 'Bouncing off chest'], injuryPrevention: 'Tuck elbows at 45 degrees.' },
      altA: { name: 'Incline Push-up', type: 'easier_bodyweight', sets: 3, reps: '12-15', restSeconds: 90, why: 'Easier bodyweight alternative targeting upper chest with less strain.', formTips: ['Place hands on elevated bench', 'Keep core tight in plank'], commonMistakes: ['Sagging hips', 'Half reps'], injuryPrevention: 'Engage core to protect lower back.' },
      altB: { name: hasDumbbells ? 'Weighted Push-up (Dumbbell on Back)' : 'Decline Push-up', type: 'progression_harder', sets: 3, reps: '8-10', restSeconds: 90, why: 'Advanced progression for chest overload.', formTips: ['Elevate feet on bench', 'Lower chest to floor'], commonMistakes: ['Dropping hips'], injuryPrevention: 'Maintain strict plank posture.' }
    },
    {
      primary: { name: hasBarbell ? 'Barbell Back Squat' : (hasDumbbells ? 'Dumbbell Goblet Squat' : 'Bodyweight Air Squat'), muscleGroup: 'Legs', sets: goal === 'power_lifter' ? 5 : 3, reps: goal === 'power_lifter' ? '5' : (goal === 'endurance' ? '15-20' : '10-12'), restSeconds: goal === 'power_lifter' ? 180 : 90, why: 'Lower body compound builder for quads & glutes.', formTips: ['Keep chest up', 'Squat until thighs parallel to floor', 'Drive through heels'], commonMistakes: ['Knees caving in', 'Rising onto toes'], injuryPrevention: 'Push knees outward inline with toes.' },
      altA: { name: 'Chair-Assisted Squat', type: 'easier_bodyweight', sets: 3, reps: '12-15', restSeconds: 60, why: 'Easier variation to master depth and balance.', formTips: ['Sit back onto chair edge', 'Stand up without using hands'], commonMistakes: ['Slouching back'], injuryPrevention: 'Keep spine neutral.' },
      altB: { name: hasPullupBar ? 'Bulgarian Split Squat' : 'Jump Squat', type: 'progression_harder', sets: 3, reps: '8-10', restSeconds: 90, why: 'Unilateral leg progression for explosive power.', formTips: ['Front foot flat', 'Lower back knee toward floor'], commonMistakes: ['Front knee over toe'], injuryPrevention: 'Maintain balance and control tempo.' }
    },
    {
      primary: { name: hasPullupBar ? 'Pull-Up' : (hasDumbbells ? 'Dumbbell Bent-Over Row' : 'Inverted Row'), muscleGroup: 'Back', sets: 3, reps: goal === 'power_lifter' ? '5' : '8-12', restSeconds: 90, why: 'Upper body pulling pattern for lats & upper back.', formTips: ['Grip shoulder width', 'Pull chest to bar/weights', 'Squeeze shoulder blades'], commonMistakes: ['Kipping legs', 'Rounding lower back'], injuryPrevention: 'Engage scapula before pulling.' },
      altA: { name: 'Doorframe Row / Resistance Band Pull', type: 'easier_bodyweight', sets: 3, reps: '12-15', restSeconds: 60, why: 'Light pulling alternative for back activation.', formTips: ['Hold doorframe with both hands', 'Lean back and pull chest to frame'], commonMistakes: ['Using arms only'], injuryPrevention: 'Keep shoulders down.' },
      altB: { name: hasPullupBar ? 'Chin-Up' : 'Archer Row', type: 'progression_harder', sets: 3, reps: '6-8', restSeconds: 90, why: 'Harder pulling progression for lat overload.', formTips: ['Palms facing you', 'Pull until chin over bar'], commonMistakes: ['Partial reps'], injuryPrevention: 'Full range of motion.' }
    },
    {
      primary: { name: hasDumbbells ? 'Dumbbell Shoulder Press' : 'Pike Push-Up', muscleGroup: 'Shoulders', sets: 3, reps: '8-12', restSeconds: 90, why: 'Vertical overhead pressing for shoulder caps.', formTips: ['Press vertically overhead', 'Lockout elbows gently at top'], commonMistakes: ['Excessive back arching'], injuryPrevention: 'Keep core braced.' },
      altA: { name: 'High-Pike Shoulder Hold', type: 'easier_bodyweight', sets: 3, reps: '20-30s hold', restSeconds: 60, why: 'Isometric shoulder stability alternative.', formTips: ['Hips high in upside down V', 'Hold steady'], commonMistakes: ['Sagging shoulders'], injuryPrevention: 'Push ground away.' },
      altB: { name: 'Elevated Feet Pike Push-up', type: 'progression_harder', sets: 3, reps: '6-8', restSeconds: 90, why: 'Heavy bodyweight overhead pressing progression.', formTips: ['Feet on bench/box', 'Lower top of head toward floor'], commonMistakes: ['Flaring elbows'], injuryPrevention: 'Keep head path angled forward.' }
    },
    {
      primary: { name: 'Plank Hold', muscleGroup: 'Core', sets: 3, reps: '45s hold', restSeconds: 60, why: 'Anti-extension core bracing stability.', formTips: ['Forearms on floor', 'Body in straight line', 'Squeeze glutes & abs'], commonMistakes: ['Sagging hips'], injuryPrevention: 'Keep pelvis neutral.' },
      altA: { name: 'Knee Plank', type: 'easier_bodyweight', sets: 3, reps: '30s hold', restSeconds: 45, why: 'Regression for core engagement.', formTips: ['Knees on mat', 'Straight line shoulders to knees'], commonMistakes: ['Hips stuck in air'], injuryPrevention: 'Brace abdominal wall.' },
      altB: { name: 'Single-Leg Plank Hold', type: 'progression_harder', sets: 3, reps: '30s each leg', restSeconds: 60, why: 'Unilateral anti-rotation core challenge.', formTips: ['Lift one leg 2 inches', 'Keep hips level'], commonMistakes: ['Twisting hips'], injuryPrevention: 'Engage core tight.' }
    }
  ];

  const weeks = [];
  for (let w = 1; w <= 8; w++) {
    const isDeload = (w === 4 || w === 8);
    const days = [];

    const dayTitles = [
      { dayNum: 1, title: 'Upper Body Push & Core', focus: 'Chest, Shoulders & Triceps' },
      { dayNum: 2, title: 'Lower Body & Legs', focus: 'Quads, Hamstrings & Glutes' },
      { dayNum: 3, title: 'Active Recovery & Cardio', focus: 'Mobility & Conditioning' },
      { dayNum: 4, title: 'Upper Body Pull & Back', focus: 'Lats, Rhomboids & Biceps' },
      { dayNum: 5, title: 'Full Body Compound Power', focus: 'Functional Total Body' },
      { dayNum: 6, title: 'Cardio & Core Conditioning', focus: 'Endurance & Core' },
      { dayNum: 7, title: 'Rest & Regeneration', focus: 'Sleep & Hydration' }
    ];

    dayTitles.forEach(dt => {
      let dayExercises = [];
      if (dt.dayNum !== 3 && dt.dayNum !== 7) {
        dayExercises = EXERCISE_MATRIX.map((exItem, idx) => {
          const p = exItem.primary;
          const altA = exItem.altA;
          const altB = exItem.altB;

          const adjustedSets = isDeload ? Math.max(2, p.sets - 1) : p.sets;
          const adjustedReps = isDeload ? '6-8' : p.reps;

          return {
            exerciseId: `ex_w${w}_d${dt.dayNum}_${idx}`,
            userSelectedVariant: 'primary',
            primary: { ...p, sets: adjustedSets, reps: adjustedReps },
            altA: { ...altA, sets: adjustedSets, reps: altA.reps },
            altB: { ...altB, sets: adjustedSets, reps: altB.reps }
          };
        });
      }

      days.push({
        dayNum: dt.dayNum,
        dayTitle: dt.title,
        focus: dt.focus,
        warmup: {
          durationMins: 5,
          steps: ['2 min light jumping jacks or walking', '10 Arm circles & leg swings', '1 light warmup set of first exercise']
        },
        exercises: dayExercises,
        cardio: cardioRules[goal] || cardioRules.athletic
      });
    });

    weeks.push({
      weekNum: w,
      weekTitle: isDeload ? `Week ${w}: Deload & Technique Week` : `Week ${w}: Volume & Strength Build`,
      isDeload,
      days
    });
  }

  return {
    programName: `8-Week Custom ${goal.toUpperCase().replace('_', ' ')} Program`,
    userCalorieTarget,
    generatedForEquipment: availableEquipment,
    generatedForGoal: goal,
    startDate: new Date().toISOString(),
    currentWeek: 1,
    userSkippedDeload: [],
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
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const eqType = userProfile.equipmentType || 'home';
    const availableEquipment = eqType === 'gym' 
      ? (userProfile.customGymEquipment || []).join(', ')
      : (userProfile.homeEquipment || []).join(', ');

    const prompt = `
You are a Certified Strength and Conditioning Specialist (CSCS) AI Coach.
Generate an 8-Week Periodized Workout Plan with STRICT EQUIPMENT CONSTRAINTS.

USER PROFILE:
- Age: ${userProfile.personalInfo?.age || 25}, Sex: ${userProfile.personalInfo?.sex || 'F'}
- Height: ${userProfile.personalInfo?.height_cm || 175}cm, Weight: ${userProfile.personalInfo?.weight_kg || 70}kg
- Fitness Level: ${userProfile.fitnessLevel || 'intermediate'}
- Goal Physique: ${userProfile.goalPhysique || 'toned'}
- Equipment Type: ${eqType}
- AVAILABLE EQUIPMENT (STRICT CONSTRAINT): [${availableEquipment}]
- Health Conditions/Injuries: ${userProfile.personalInfo?.healthConditions_text || 'None'}

CRITICAL RULES:
1. ONLY suggest exercises using available equipment. If user has Bodyweight Only, DO NOT suggest dumbbells or barbells EVER.
2. For EVERY exercise in the plan, output 3 variants: "primary" (target), "altA" (easier/bodyweight), "altB" (progression/harder).
3. Weeks 4 and 8 MUST be deload weeks (-40% volume).

Return ONLY raw JSON matching this schema:
{
  "programName": "string",
  "weeks": [
    {
      "weekNum": 1,
      "weekTitle": "string",
      "isDeload": false,
      "days": [
        {
          "dayNum": 1,
          "dayTitle": "string",
          "focus": "string",
          "warmup": { "durationMins": 5, "steps": ["string"] },
          "cardio": { "frequency": "string", "duration": "string", "type": "string", "mandatory": boolean },
          "exercises": [
            {
              "exerciseId": "string",
              "userSelectedVariant": "primary",
              "primary": { "name": "string", "muscleGroup": "string", "sets": 3, "reps": "string", "restSeconds": 90, "why": "string", "formTips": ["string"], "commonMistakes": ["string"], "injuryPrevention": "string" },
              "altA": { "name": "string", "type": "easier_bodyweight", "sets": 3, "reps": "string", "restSeconds": 90, "why": "string", "formTips": ["string"], "commonMistakes": ["string"], "injuryPrevention": "string" },
              "altB": { "name": "string", "type": "progression_harder", "sets": 3, "reps": "string", "restSeconds": 90, "why": "string", "formTips": ["string"], "commonMistakes": ["string"], "injuryPrevention": "string" }
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
    const parsedData = JSON.parse(cleanJson);

    return {
      ...parsedData,
      userCalorieTarget: calculateUserCalorieTarget(userProfile.personalInfo, userProfile.lifestyle, userProfile.goalPhysique, userProfile.userCalorieTarget),
      generatedForEquipment: availableEquipment,
      generatedForGoal: userProfile.goalPhysique,
      startDate: new Date().toISOString(),
      currentWeek: 1,
      userSkippedDeload: []
    };
  } catch (error) {
    console.error("Gemini AI plan generation error:", error);
    return generateLocalFallbackPlan(userProfile);
  }
}
