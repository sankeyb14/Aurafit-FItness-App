import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { usePlan } from '../context/PlanContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { calculateUserCalorieTarget } from '../services/geminiService';
import { Sparkles, ArrowRight, ArrowLeft, ShieldAlert, User, Flame, Dumbbell, Flame as CalorieIcon } from 'lucide-react';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { updateProfile } = useUser();
  const { generateNewPlan } = usePlan();

  const [step, setStep] = useState(1); // Steps 1 to 7 (1A to 1G)
  const [loading, setLoading] = useState(false);

  // 1A: Personal Profile
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Anabelle',
    age: '25',
    sex: 'F',
    height_cm: '168',
    height_unit: 'cm',
    weight_kg: '58',
    weight_unit: 'kg',
    healthConditions_text: ''
  });

  // 1B: Lifestyle
  const [lifestyle, setLifestyle] = useState({
    level: 'moderate',
    avg_sleep_hours: '7.5',
    daily_steps: '9857'
  });

  // 1C: Fitness Level & Goal Physique
  const [fitnessLevel, setFitnessLevel] = useState('intermediate');
  const [goalPhysique, setGoalPhysique] = useState('toned');

  // 1D: Equipment Redesign
  const [equipmentType, setEquipmentType] = useState('home'); // 'gym' or 'home'
  const [customGymText, setCustomGymText] = useState('Cable machine, Leg press, Smith machine, Treadmill, Dumbbells');
  const [homeEquipment, setHomeEquipment] = useState(['dumbbells', 'pullup_bar', 'bodyweight']);
  const [dumbbellWeightRange, setDumbbellWeightRange] = useState('5kg-20kg');
  const [resistanceBandsLevel, setResistanceBandsLevel] = useState('medium');
  const [cardioEquipment, setCardioEquipment] = useState(['treadmill']);

  // 1E: Dietary Preferences
  const [dietaryPrefs, setDietaryPrefs] = useState({
    dietType: 'non-veg',
    restrictions: ['High-Protein']
  });

  // 1F: Calorie Target Setup
  const [calorieSetupMethod, setCalorieSetupMethod] = useState('auto'); // 'auto', 'goal_based', 'custom'
  const [selectedGoalIntent, setSelectedGoalIntent] = useState('moderate_deficit');
  const [customCalorieInput, setCustomCalorieInput] = useState('2000');

  // Computed Auto Calorie
  const computedAutoCalorie = calculateUserCalorieTarget(
    { age: personalInfo.age, sex: personalInfo.sex, height_cm: personalInfo.height_cm, weight_kg: personalInfo.weight_kg },
    lifestyle,
    goalPhysique
  );

  const getEffectiveCalorieTarget = () => {
    if (calorieSetupMethod === 'custom') return Number(customCalorieInput) || 2000;
    if (calorieSetupMethod === 'goal_based') {
      const offsets = { aggressive_deficit: -500, moderate_deficit: -250, maintenance: 0, surplus: 300, slight_surplus: 150 };
      return Math.round(computedAutoCalorie + (offsets[selectedGoalIntent] || 0));
    }
    return computedAutoCalorie;
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 7));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleToggleHomeEq = (eq) => {
    setHomeEquipment((prev) =>
      prev.includes(eq) ? prev.filter((i) => i !== eq) : [...prev, eq]
    );
  };

  const handleToggleCardioEq = (cEq) => {
    setCardioEquipment((prev) =>
      prev.includes(cEq) ? prev.filter((i) => i !== cEq) : [...prev, cEq]
    );
  };

  const handleToggleRestriction = (res) => {
    setDietaryPrefs((prev) => {
      const exists = prev.restrictions.includes(res);
      return {
        ...prev,
        restrictions: exists ? prev.restrictions.filter((r) => r !== res) : [...prev.restrictions, res]
      };
    });
  };

  const handleCompleteOnboarding = async () => {
    setStep(7); // Loading state (1G)
    setLoading(true);

    const parsedGymEquipment = customGymText.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
    const finalCalorieTarget = getEffectiveCalorieTarget();

    const fullProfile = {
      name: personalInfo.name || 'Athlete',
      personalInfo: {
        name: personalInfo.name || 'Athlete',
        age: Number(personalInfo.age) || 25,
        sex: personalInfo.sex,
        height_cm: personalInfo.height_unit === 'ft'
          ? Math.round(Number(personalInfo.height_cm) * 30.48)
          : Number(personalInfo.height_cm),
        weight_kg: personalInfo.weight_unit === 'lbs'
          ? Math.round(Number(personalInfo.weight_kg) * 0.453592)
          : Number(personalInfo.weight_kg),
        healthConditions_text: personalInfo.healthConditions_text
      },
      lifestyle: {
        level: lifestyle.level,
        avg_sleep_hours: Number(lifestyle.avg_sleep_hours) || 7.5,
        daily_steps: Number(lifestyle.daily_steps) || 9857
      },
      fitnessLevel,
      goalPhysique,
      equipmentType,
      customGymEquipment: parsedGymEquipment,
      homeEquipment,
      dumbbellWeightRange: homeEquipment.includes('dumbbells') ? dumbbellWeightRange : null,
      resistanceBandsLevel: homeEquipment.includes('bands') ? resistanceBandsLevel : null,
      cardioEquipment: homeEquipment.includes('cardio') ? cardioEquipment : [],
      dietaryPrefs,
      userCalorieTarget: finalCalorieTarget,
      calorieTargetMethod: calorieSetupMethod,
      createdAt: new Date().toISOString()
    };

    await updateProfile(fullProfile);
    await generateNewPlan(fullProfile);

    setLoading(false);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F3F4F8] flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto sm:max-w-lg md:max-w-xl">
      {/* Top Header & Progress */}
      {step < 7 && (
        <div className="pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
              Step {step} of 6
            </span>
            <div className="flex items-center gap-1.5 text-[#7C3AED] font-extrabold text-xs bg-purple-50 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> AuraFit AI Blueprint
            </div>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#7C3AED] h-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* SCREEN 1A: Personal Profile */}
      {step === 1 && (
        <div className="flex-1 my-auto py-4 space-y-5 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Personal Profile</h1>
            <p className="text-xs text-gray-500 mt-1">Basic metrics used for BMR calculation & exercise intensity.</p>
          </div>

          <div className="space-y-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <label className="block text-xs font-extrabold text-gray-700 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#7C3AED]" /> Full Name
              </label>
              <input
                type="text"
                required
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#7C3AED] focus:outline-none font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={personalInfo.age}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:outline-none font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Sex</label>
                <select
                  value={personalInfo.sex}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, sex: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:outline-none font-semibold"
                >
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={personalInfo.height_cm}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, height_cm: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:outline-none font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={personalInfo.weight_kg}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, weight_kg: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:outline-none font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Health Conditions / Past Injuries
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Lower back stiffness, knee pain on squats"
                value={personalInfo.healthConditions_text}
                onChange={(e) => setPersonalInfo({ ...personalInfo, healthConditions_text: e.target.value })}
                className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 1B: Lifestyle */}
      {step === 2 && (
        <div className="flex-1 my-auto py-4 space-y-5 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Daily Lifestyle</h1>
            <p className="text-xs text-gray-500 mt-1">Activity multiplier for total daily energy expenditure.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <div className="space-y-2">
              {[
                { id: 'sedentary', title: 'Sedentary', desc: 'Desk job, minimal daily movement (x1.2)' },
                { id: 'moderate', title: 'Moderately Active', desc: 'Light walking, 4k-8k daily steps (x1.55)' },
                { id: 'active', title: 'Active', desc: 'On your feet often, 8k-12k steps (x1.725)' },
                { id: 'highly_active', title: 'Highly Active', desc: 'Physical job or heavy daily training (x1.9)' }
              ].map((act) => (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => setLifestyle({ ...lifestyle, level: act.id })}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${
                    lifestyle.level === act.id
                      ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED] font-bold shadow-sm'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{act.title}</div>
                    <div className="text-[11px] font-normal text-gray-500">{act.desc}</div>
                  </div>
                  {lifestyle.level === act.id && <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]"></div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 1C: Fitness Level & Goal Physique */}
      {step === 3 && (
        <div className="flex-1 my-auto py-4 space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Goal & Level</h1>
            <p className="text-xs text-gray-500 mt-1">Determines rep schemes, cardio volume & progression priority.</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Target Goal Physique</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'skinny_lean', title: 'Skinny-Lean', note: 'Deficit + 4x Cardio' },
                  { id: 'toned', title: 'Toned Fit', note: 'Definition + 2-3x Cardio' },
                  { id: 'athletic', title: 'Athletic Build', note: 'Compound Strength' },
                  { id: 'calisthenics', title: 'Calisthenics', note: 'Bodyweight Skill' },
                  { id: 'power_lifter', title: 'Power Lifter', note: 'Heavy 5x5 Lifts' },
                  { id: 'endurance', title: 'Endurance', note: 'High Reps + 5x Cardio' }
                ].map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setGoalPhysique(goal.id)}
                    className={`p-3 rounded-2xl border text-left transition ${
                      goalPhysique === goal.id
                        ? 'border-[#FF5E3A] bg-orange-50 text-[#FF5E3A] font-bold shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{goal.title}</div>
                    <div className="text-[10px] text-gray-400">{goal.note}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Experience Level</label>
              <div className="grid grid-cols-2 gap-2">
                {['beginner', 'novice', 'intermediate', 'advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFitnessLevel(lvl)}
                    className={`p-3 rounded-2xl border text-center capitalize text-xs font-bold transition ${
                      fitnessLevel === lvl
                        ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED]'
                        : 'border-gray-200 bg-gray-50 text-gray-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 1D: EQUIPMENT REDESIGN (GYM VS HOME) */}
      {step === 4 && (
        <div className="flex-1 my-auto py-4 space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Equipment Constraint</h1>
            <p className="text-xs text-gray-500 mt-1">Plans are generated ONLY for equipment you possess.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Where do you train?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEquipmentType('gym')}
                  className={`py-3.5 rounded-2xl font-black text-xs border transition ${
                    equipmentType === 'gym'
                      ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-md'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  🏋️ Commercial Gym
                </button>
                <button
                  type="button"
                  onClick={() => setEquipmentType('home')}
                  className={`py-3.5 rounded-2xl font-black text-xs border transition ${
                    equipmentType === 'home'
                      ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-md'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  🏠 Home Setup
                </button>
              </div>
            </div>

            {equipmentType === 'gym' ? (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-gray-700">What machines/equipment does your gym have?</label>
                <textarea
                  rows={3}
                  value={customGymText}
                  onChange={(e) => setCustomGymText(e.target.value)}
                  placeholder="e.g., Cable machine, Leg press, Smith machine, Treadmill, Squat rack..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Select Home Equipment</label>
                <div className="space-y-2">
                  {[
                    { id: 'bodyweight', name: 'Bodyweight Only' },
                    { id: 'dumbbells', name: 'Dumbbells' },
                    { id: 'barbell', name: 'Barbell + Rack' },
                    { id: 'pullup_bar', name: 'Pull-up Bar' },
                    { id: 'bands', name: 'Resistance Bands' },
                    { id: 'cardio', name: 'Cardio Machine' }
                  ].map((eq) => {
                    const isChecked = homeEquipment.includes(eq.id);
                    return (
                      <div key={eq.id} className="space-y-2">
                        <button
                          type="button"
                          onClick={() => handleToggleHomeEq(eq.id)}
                          className={`w-full p-3 rounded-2xl border text-left text-xs font-extrabold transition flex items-center justify-between ${
                            isChecked
                              ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED]'
                              : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}
                        >
                          <span>{eq.name}</span>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-[#7C3AED] text-white' : 'bg-gray-200'
                          }`}>
                            {isChecked ? '✓' : ''}
                          </span>
                        </button>

                        {/* Extra prompts for specific equipment */}
                        {eq.id === 'dumbbells' && isChecked && (
                          <div className="pl-4">
                            <input
                              type="text"
                              placeholder="Weight range (e.g. 5kg-20kg)"
                              value={dumbbellWeightRange}
                              onChange={(e) => setDumbbellWeightRange(e.target.value)}
                              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
                            />
                          </div>
                        )}

                        {eq.id === 'cardio' && isChecked && (
                          <div className="pl-4 grid grid-cols-3 gap-2">
                            {['treadmill', 'bike', 'rower'].map((cEq) => (
                              <button
                                key={cEq}
                                type="button"
                                onClick={() => handleToggleCardioEq(cEq)}
                                className={`py-1.5 px-2 rounded-xl text-[10px] font-bold capitalize border ${
                                  cardioEquipment.includes(cEq) ? 'bg-[#FF5E3A] text-white border-[#FF5E3A]' : 'bg-gray-50 text-gray-600 border-gray-200'
                                }`}
                              >
                                {cEq}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SCREEN 1E: Dietary Preferences */}
      {step === 5 && (
        <div className="flex-1 my-auto py-4 space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dietary Preferences</h1>
            <p className="text-xs text-gray-500 mt-1">Configures nutrition tracking macro targets.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Diet Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['non-veg', 'veg', 'vegan', 'pescatarian'].map((diet) => (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => setDietaryPrefs({ ...dietaryPrefs, dietType: diet })}
                    className={`p-3 rounded-2xl border text-xs font-bold capitalize transition ${
                      dietaryPrefs.dietType === diet
                        ? 'border-[#FF5E3A] bg-orange-50 text-[#FF5E3A]'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Macro Focus / Restrictions</label>
              <div className="grid grid-cols-2 gap-2">
                {['High-Protein', 'Low-Carb', 'Dairy-Free', 'Gluten-Free'].map((res) => {
                  const isChecked = dietaryPrefs.restrictions.includes(res);
                  return (
                    <button
                      key={res}
                      type="button"
                      onClick={() => handleToggleRestriction(res)}
                      className={`p-2.5 rounded-2xl border text-xs font-semibold flex items-center justify-between transition ${
                        isChecked
                          ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED]'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span>{res}</span>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isChecked ? 'bg-[#7C3AED] text-white' : 'bg-gray-200'
                      }`}>
                        {isChecked ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 1F: CALORIE TARGET SETUP (NEW) */}
      {step === 6 && (
        <div className="flex-1 my-auto py-4 space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Calorie Target Setup</h1>
            <p className="text-xs text-gray-500 mt-1">Configure your daily nutritional goal for smart tracking.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <div className="space-y-3">
              {/* Option A: Auto Calculate */}
              <button
                type="button"
                onClick={() => setCalorieSetupMethod('auto')}
                className={`w-full p-4 rounded-2xl border text-left transition ${
                  calorieSetupMethod === 'auto'
                    ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED] shadow-sm'
                    : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-xs uppercase tracking-wider">Option A: Auto-Calculate (Recommended)</span>
                  <CalorieIcon className="w-4 h-4 text-[#7C3AED]" />
                </div>
                <p className="text-xs text-gray-500 mt-1">BMR x Activity x Goal ({goalPhysique.replace('_', ' ')})</p>
                <div className="text-xl font-black mt-2 text-[#7C3AED]">{computedAutoCalorie} kcal/day</div>
              </button>

              {/* Option B: Ask About Goal */}
              <button
                type="button"
                onClick={() => setCalorieSetupMethod('goal_based')}
                className={`w-full p-4 rounded-2xl border text-left transition ${
                  calorieSetupMethod === 'goal_based'
                    ? 'border-[#FF5E3A] bg-orange-50 text-[#FF5E3A] shadow-sm'
                    : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
              >
                <span className="font-extrabold text-xs uppercase tracking-wider block mb-1">Option B: Goal-Based Calorie Intent</span>
                <select
                  value={selectedGoalIntent}
                  onChange={(e) => setSelectedGoalIntent(e.target.value)}
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800"
                >
                  <option value="aggressive_deficit">Aggressive Fat Loss (-500 kcal)</option>
                  <option value="moderate_deficit">Moderate Fat Loss (-250 kcal)</option>
                  <option value="maintenance">Maintain Weight (Recomp)</option>
                  <option value="slight_surplus">Lean Muscle Gain (+150 kcal)</option>
                  <option value="surplus">Pure Strength Surplus (+300 kcal)</option>
                </select>
              </button>

              {/* Option C: Custom Target */}
              <button
                type="button"
                onClick={() => setCalorieSetupMethod('custom')}
                className={`w-full p-4 rounded-2xl border text-left transition ${
                  calorieSetupMethod === 'custom'
                    ? 'border-brandBlue bg-blue-50 text-brandBlue shadow-sm'
                    : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
              >
                <span className="font-extrabold text-xs uppercase tracking-wider block mb-1">Option C: Custom Calorie Target</span>
                <input
                  type="number"
                  value={customCalorieInput}
                  onChange={(e) => setCustomCalorieInput(e.target.value)}
                  placeholder="Enter calorie goal (e.g. 2100)"
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 1G: PLAN GENERATION LOADING */}
      {step === 7 && (
        <div className="flex-1 my-auto flex flex-col items-center justify-center text-center p-6 space-y-6 animate-fadeIn">
          <LoadingSpinner text="" />
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-gray-900">Customizing Equipment-Specific 8-Week AI Plan...</h2>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Generating primary, Alt A (easier), and Alt B (progression) exercise variants for {personalInfo.name}...
            </p>
          </div>
        </div>
      )}

      {/* Bottom Button Navigation */}
      {step < 7 && (
        <div className="pt-4 pb-2 flex gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="py-3.5 px-6 bg-gray-200 text-gray-700 font-bold rounded-2xl transition flex items-center justify-center text-xs"
            >
              Back
            </button>
          )}

          {step < 6 ? (
            <button
              onClick={handleNext}
              className="flex-1 py-3.5 px-6 bg-[#7C3AED] text-white font-extrabold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteOnboarding}
              className="flex-1 py-3.5 px-6 bg-[#FF5E3A] hover:bg-[#E04826] text-white font-black rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs"
            >
              <Sparkles className="w-4 h-4" /> Generate AI Plan & Calorie Target
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default OnboardingPage;
