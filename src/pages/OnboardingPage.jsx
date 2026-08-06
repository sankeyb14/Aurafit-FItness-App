import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { usePlan } from '../context/PlanContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Sparkles, ArrowRight, ArrowLeft, Dumbbell, Activity, HeartPulse, ShieldAlert, Target } from 'lucide-react';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { updateProfile } = useUser();
  const { generateNewPlan } = usePlan();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [personalInfo, setPersonalInfo] = useState({
    age: '26',
    sex: 'M',
    height_cm: '175',
    height_unit: 'cm',
    weight_kg: '72',
    weight_unit: 'kg',
    healthConditions_text: ''
  });

  const [lifestyle, setLifestyle] = useState({
    level: 'moderate',
    avg_sleep_hours: '7',
    daily_steps: '8000'
  });

  const [fitnessLevel, setFitnessLevel] = useState('intermediate');
  const [goalPhysique, setGoalPhysique] = useState('athletic');

  const [workoutEnv, setWorkoutEnv] = useState({
    location: 'gym',
    equipment: ['dumbbells', 'barbell', 'cable', 'pullup_bar', 'bodyweight']
  });

  const [dietaryPrefs, setDietaryPrefs] = useState({
    dietType: 'non-veg',
    restrictions: ['High-Protein']
  });

  // Step Nav validation
  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleToggleEquipment = (eq) => {
    setWorkoutEnv((prev) => {
      const exists = prev.equipment.includes(eq);
      const updated = exists
        ? prev.equipment.filter((item) => item !== eq)
        : [...prev.equipment, eq];
      return { ...prev, equipment: updated };
    });
  };

  const handleToggleRestriction = (res) => {
    setDietaryPrefs((prev) => {
      const exists = prev.restrictions.includes(res);
      const updated = exists
        ? prev.restrictions.filter((item) => item !== res)
        : [...prev.restrictions, res];
      return { ...prev, restrictions: updated };
    });
  };

  const handleCompleteOnboarding = async () => {
    setStep(6); // Show loading screen 1F
    setLoading(true);

    const fullProfile = {
      personalInfo: {
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
        avg_sleep_hours: Number(lifestyle.avg_sleep_hours) || 7,
        daily_steps: Number(lifestyle.daily_steps) || 8000
      },
      fitnessLevel,
      goalPhysique,
      workoutEnv,
      dietaryPrefs,
      createdAt: new Date().toISOString()
    };

    await updateProfile(fullProfile);
    await generateNewPlan(fullProfile);

    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto sm:max-w-lg md:max-w-xl">
      {/* Top Header & Progress */}
      {step < 6 && (
        <div className="pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Step {step} of 5
            </span>
            <div className="flex items-center gap-1.5 text-primary font-bold text-xs bg-indigo-50 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> AuraFit AI Setup
            </div>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* SCREEN 1A: Personal Profile */}
      {step === 1 && (
        <div className="flex-1 my-auto py-4 space-y-5 animate-fadeIn">
          <div>
            <h1 className="text-2xl font-black text-textDark tracking-tight">Tell Us About Yourself</h1>
            <p className="text-xs text-gray-500 mt-1">Personal info helps Gemini AI calculate your caloric expenditure and strain index.</p>
          </div>

          <div className="space-y-4 bg-white p-5 rounded-3xl shadow-card border border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  required
                  value={personalInfo.age}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Sex</label>
                <select
                  value={personalInfo.sex}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, sex: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none font-semibold"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-700">Height</label>
                  <button
                    type="button"
                    onClick={() => setPersonalInfo({ ...personalInfo, height_unit: personalInfo.height_unit === 'cm' ? 'ft' : 'cm' })}
                    className="text-[10px] font-bold text-primary hover:underline uppercase"
                  >
                    Switch to {personalInfo.height_unit === 'cm' ? 'FT' : 'CM'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    required
                    value={personalInfo.height_cm}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, height_cm: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none font-semibold"
                  />
                  <span className="absolute right-3 top-3 text-xs text-gray-400 font-bold uppercase">{personalInfo.height_unit}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-700">Weight</label>
                  <button
                    type="button"
                    onClick={() => setPersonalInfo({ ...personalInfo, weight_unit: personalInfo.weight_unit === 'kg' ? 'lbs' : 'kg' })}
                    className="text-[10px] font-bold text-primary hover:underline uppercase"
                  >
                    Switch to {personalInfo.weight_unit === 'kg' ? 'LBS' : 'KG'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    required
                    value={personalInfo.weight_kg}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, weight_kg: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none font-semibold"
                  />
                  <span className="absolute right-3 top-3 text-xs text-gray-400 font-bold uppercase">{personalInfo.weight_unit}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Health Conditions / Past Injuries (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Lower back stiffness, knee pain on squats"
                value={personalInfo.healthConditions_text}
                onChange={(e) => setPersonalInfo({ ...personalInfo, healthConditions_text: e.target.value })}
                className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 1B: Lifestyle */}
      {step === 2 && (
        <div className="flex-1 my-auto py-4 space-y-5 animate-fadeIn">
          <div>
            <h1 className="text-2xl font-black text-textDark tracking-tight">Your Daily Lifestyle</h1>
            <p className="text-xs text-gray-500 mt-1">How active are you outside of planned workouts?</p>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-card border border-gray-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Activity Level</label>
              <div className="space-y-2">
                {[
                  { id: 'sedentary', title: 'Sedentary', desc: 'Desk job, minimal daily movement' },
                  { id: 'moderate', title: 'Moderately Active', desc: 'Light walking, 4k-8k daily steps' },
                  { id: 'active', title: 'Active', desc: 'On your feet often, 8k-12k steps' },
                  { id: 'highly_active', title: 'Highly Active', desc: 'Physical job or high athletic training' }
                ].map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setLifestyle({ ...lifestyle, level: act.id })}
                    className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${
                      lifestyle.level === act.id
                        ? 'border-primary bg-indigo-50/70 text-primary font-bold shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{act.title}</div>
                      <div className="text-[11px] font-normal text-gray-500">{act.desc}</div>
                    </div>
                    {lifestyle.level === act.id && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Avg Sleep (Hours)</label>
                <input
                  type="number"
                  value={lifestyle.avg_sleep_hours}
                  onChange={(e) => setLifestyle({ ...lifestyle, avg_sleep_hours: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Daily Steps (Target)</label>
                <input
                  type="number"
                  value={lifestyle.daily_steps}
                  onChange={(e) => setLifestyle({ ...lifestyle, daily_steps: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 1C: Fitness Level + Goal Physique */}
      {step === 3 && (
        <div className="flex-1 my-auto py-4 space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-2xl font-black text-textDark tracking-tight">Level & Physique Goal</h1>
            <p className="text-xs text-gray-500 mt-1">This dictates volume, rep ranges, and rest intervals.</p>
          </div>

          <div className="space-y-4">
            {/* Fitness Level */}
            <div className="bg-white p-4 rounded-3xl shadow-card border border-gray-100">
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Current Fitness Level</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'beginner', title: 'Beginner', note: '< 5 pushups' },
                  { id: 'novice', title: 'Novice', note: '5-10 pushups' },
                  { id: 'intermediate', title: 'Intermediate', note: 'Consistent 1 yr' },
                  { id: 'advanced', title: 'Advanced', note: '2+ yrs training' }
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setFitnessLevel(lvl.id)}
                    className={`p-3 rounded-2xl border text-left transition ${
                      fitnessLevel === lvl.id
                        ? 'border-primary bg-indigo-50 text-primary font-bold shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{lvl.title}</div>
                    <div className="text-[10px] text-gray-400">{lvl.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Physique */}
            <div className="bg-white p-4 rounded-3xl shadow-card border border-gray-100">
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Target Goal Physique</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'skinny_lean', title: 'Skinny-Lean', emoji: '⚡' },
                  { id: 'toned', title: 'Toned Fit', emoji: '✨' },
                  { id: 'athletic', title: 'Athletic Build', emoji: '🏆' },
                  { id: 'calisthenics', title: 'Calisthenics', emoji: '🤸' },
                  { id: 'power_lifter', title: 'Power Lifter', emoji: '🏋️' },
                  { id: 'endurance', title: 'Endurance Runner', emoji: '🏃' }
                ].map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setGoalPhysique(goal.id)}
                    className={`p-3 rounded-2xl border text-left transition flex items-center gap-2 ${
                      goalPhysique === goal.id
                        ? 'border-secondary bg-orange-50 text-secondary font-bold shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{goal.emoji}</span>
                    <span className="text-xs">{goal.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 1D: Workout Environment + Equipment */}
      {step === 4 && (
        <div className="flex-1 my-auto py-4 space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-2xl font-black text-textDark tracking-tight">Workout Environment</h1>
            <p className="text-xs text-gray-500 mt-1">We will only prescribe exercises using equipment you possess.</p>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-card border border-gray-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Primary Workout Location</label>
              <div className="grid grid-cols-3 gap-2">
                {['home', 'gym', 'hybrid'].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setWorkoutEnv({ ...workoutEnv, location: loc })}
                    className={`py-2.5 text-xs font-bold rounded-2xl capitalize border transition ${
                      workoutEnv.location === loc
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Available Equipment (Check all that apply)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bodyweight', name: 'Bodyweight Only' },
                  { id: 'dumbbells', name: 'Dumbbells' },
                  { id: 'barbell', name: 'Barbell & Plates' },
                  { id: 'pullup_bar', name: 'Pull-up Bar' },
                  { id: 'bands', name: 'Resistance Bands' },
                  { id: 'cable', name: 'Cable Machine' },
                  { id: 'cardio', name: 'Cardio Machines' }
                ].map((eq) => {
                  const isChecked = workoutEnv.equipment.includes(eq.id);
                  return (
                    <button
                      key={eq.id}
                      type="button"
                      onClick={() => handleToggleEquipment(eq.id)}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition flex items-center justify-between ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50 text-primary'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span>{eq.name}</span>
                      <span className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                        isChecked ? 'bg-primary text-white border-primary' : 'border-gray-300'
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

      {/* SCREEN 1E: Dietary Preferences */}
      {step === 5 && (
        <div className="flex-1 my-auto py-4 space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-2xl font-black text-textDark tracking-tight">Dietary Preferences</h1>
            <p className="text-xs text-gray-500 mt-1">Empowers meal logging suggestions and daily macro target ratios.</p>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-card border border-gray-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Diet Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'non-veg', name: 'Non-Vegetarian' },
                  { id: 'veg', name: 'Vegetarian' },
                  { id: 'vegan', name: 'Vegan' },
                  { id: 'pescatarian', name: 'Pescatarian' }
                ].map((diet) => (
                  <button
                    key={diet.id}
                    type="button"
                    onClick={() => setDietaryPrefs({ ...dietaryPrefs, dietType: diet.id })}
                    className={`p-3 rounded-2xl border text-xs font-bold transition ${
                      dietaryPrefs.dietType === diet.id
                        ? 'border-secondary bg-orange-50 text-secondary shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    {diet.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Restrictions / Focus</label>
              <div className="grid grid-cols-2 gap-2">
                {['High-Protein', 'Low-Carb', 'Dairy-Free', 'Gluten-Free', 'Nut-Free', 'Keto'].map((res) => {
                  const isChecked = dietaryPrefs.restrictions.includes(res);
                  return (
                    <button
                      key={res}
                      type="button"
                      onClick={() => handleToggleRestriction(res)}
                      className={`p-2.5 rounded-2xl border text-xs font-semibold flex items-center justify-between transition ${
                        isChecked
                          ? 'border-primary bg-indigo-50 text-primary'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span>{res}</span>
                      <span className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                        isChecked ? 'bg-primary text-white border-primary' : 'border-gray-300'
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

      {/* SCREEN 1F: Loading State during Gemini plan generation */}
      {step === 6 && (
        <div className="flex-1 my-auto flex flex-col items-center justify-center text-center p-6 space-y-6 animate-fadeIn">
          <LoadingSpinner text="" />
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-textDark">Customizing Your 8-Week AI Plan...</h2>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Gemini AI is analyzing your goals, equipment, and injuries to construct a periodized training program.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Button Navigation */}
      {step < 6 && (
        <div className="pt-4 pb-2 flex gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="py-3 px-5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-2xl transition flex items-center justify-center gap-1 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="flex-1 py-3 px-5 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteOnboarding}
              className="flex-1 py-3.5 px-5 orange-gradient hover:opacity-95 text-white font-extrabold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles className="w-5 h-5" /> Generate My AI Plan
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default OnboardingPage;
