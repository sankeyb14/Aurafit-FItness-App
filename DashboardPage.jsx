import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { usePlan } from '../context/PlanContext';
import { useLogs } from '../context/LogContext';
import { ExerciseDetailModal, normalizeExerciseItem } from '../components/ExerciseDetailModal';
import { MealLoggerModal } from '../components/MealLoggerModal';
import { Toast } from '../components/Toast';
import { Flame, Sparkles, AlertCircle } from 'lucide-react';

export function DashboardPage() {
  const { profile } = useUser();
  const { plan, updateExerciseVariant } = usePlan();
  const { todayLog, streakInfo, logWorkoutCompletion, addMealLog } = useLogs();

  const [selectedExerciseItem, setSelectedExerciseItem] = useState(null);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [adaptationModal, setAdaptationModal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Today Workout Log State
  const [workoutDone, setWorkoutDone] = useState(todayLog.workoutLogged?.completed || false);
  const [actualRepsInput, setActualRepsInput] = useState('8');

  const currentWeekNum = plan?.currentWeek || 1;
  const currentWeekObj = plan?.weeks?.find((w) => w.weekNum === currentWeekNum) || plan?.weeks?.[0];

  const todayDateObj = new Date();
  const dayOfWeek = todayDateObj.getDay();
  const dayNum = dayOfWeek === 0 ? 7 : dayOfWeek;

  const todayWorkoutDay = currentWeekObj?.days?.find((d) => d.dayNum === dayNum) || currentWeekObj?.days?.[0];
  const userCalorieTarget = profile?.userCalorieTarget || plan?.userCalorieTarget || 2000;

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const meals = todayLog.dietLog?.meals || [
    { id: 1, type: 'Breakfast', name: 'Omelet (2 eggs)', calories: 180, protein: 14, carbs: 2, fat: 14 },
    { id: 2, type: 'Lunch', name: 'White Rice & Fish Curry', calories: 388, protein: 25, carbs: 45, fat: 12 }
  ];

  const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
  const totalProtein = meals.reduce((sum, m) => sum + (m.protein || 0), 0);
  const totalCarbs = meals.reduce((sum, m) => sum + (m.carbs || 0), 0);
  const totalFat = meals.reduce((sum, m) => sum + (m.fat || 0), 0);

  const handleToggleWorkoutComplete = () => {
    const nextDone = !workoutDone;
    setWorkoutDone(nextDone);
    logWorkoutCompletion(nextDone, 45, []);
    triggerToast(nextDone ? 'Workout Completed! Streak updated 🔥' : 'Workout status updated');
  };

  const handleSaveActualReps = (exItem) => {
    const norm = normalizeExerciseItem(exItem);
    const planned = Number(norm?.currentVariant?.reps?.split('-')[0]) || 10;
    const actual = Number(actualRepsInput) || 8;

    if (actual < planned) {
      setAdaptationModal({
        type: 'reps_missed',
        exName: norm?.currentVariant?.name || 'Exercise',
        planned,
        actual
      });
    } else {
      triggerToast('Great job hitting target reps! Progressive overload recorded 🚀');
    }
  };

  const handleAddMeal = (mealData) => {
    addMealLog(mealData);
    triggerToast(`Added ${mealData.name} (${mealData.calories} kcal)`);
  };

  return (
    <div className="min-h-screen pb-24 pt-4 px-4 sm:px-6 max-w-md mx-auto sm:max-w-lg md:max-w-xl space-y-6 animate-fadeIn bg-[#F3F4F8]">
      <Toast message={toastMessage} isOpen={showToast} onClose={() => setShowToast(false)} />

      {/* TOP HEADER */}
      <div className="flex justify-between items-center pt-1">
        <div>
          <p className="text-xs font-semibold text-gray-500">Hi {profile?.name || 'Anabelle'},</p>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Get In Shape</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full flex items-center gap-1">
            <Flame className="w-4 h-4 text-[#FF5E3A] fill-[#FF5E3A] animate-pulse" />
            <span className="text-xs font-black text-[#FF5E3A]">{streakInfo?.currentStreak || 5} Day Streak</span>
          </div>
        </div>
      </div>

      {/* FEATURED TODAY WORKOUT BANNER */}
      <div className="bg-[#FF5E3A] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex justify-between items-center">
        <div className="space-y-3 z-10 max-w-[68%]">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            Week {currentWeekNum} • {todayWorkoutDay?.dayTitle || 'Workout Day'}
          </span>
          <h2 className="text-2xl font-black leading-tight">{todayWorkoutDay?.dayTitle || 'Shoulder Press'}</h2>
          <p className="text-xs text-white/85 font-medium">{todayWorkoutDay?.focus || 'Chest, Back & Shoulders'}</p>
          
          <button
            onClick={handleToggleWorkoutComplete}
            className={`mt-2 px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition ${
              workoutDone ? 'bg-emerald-500 text-white shadow-md' : 'bg-white text-[#FF5E3A] shadow-md hover:scale-105'
            }`}
          >
            {workoutDone ? '✓ Workout Completed' : '▶ Mark Workout Done'}
          </button>
        </div>

        <div className="text-7xl select-none transform translate-x-2">🧘‍♀️</div>
      </div>

      {/* WARM-UP GUIDANCE CARD */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" /> 5-Min Warm-Up Guidance
          </h3>
          <span className="text-[10px] font-bold text-gray-400">Included in workout</span>
        </div>
        <ul className="text-xs text-gray-600 space-y-1 font-medium pl-1">
          {(todayWorkoutDay?.warmup?.steps || [
            '2 min light jumping jacks or treadmill walking',
            '10 arm circles & shoulder swings',
            '1 light warm-up set of first exercise'
          ]).map((step, idx) => (
            <li key={idx} className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* TODAY'S EXERCISES (ROBUSTLY NORMALIZED WITH NAME & DETAILS) */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Prescribed Exercises</h3>
          <span className="text-xs font-bold text-[#7C3AED] bg-purple-50 px-3 py-1 rounded-full">
            Equipment Constrained
          </span>
        </div>

        <div className="space-y-3">
          {(todayWorkoutDay?.exercises || []).map((exItem, idx) => {
            const norm = normalizeExerciseItem(exItem);
            if (!norm || !norm.currentVariant) return null;
            const variant = norm.currentVariant;
            const variantKey = norm.userSelectedVariant || 'primary';

            return (
              <div key={idx} className="bg-white p-4.5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase text-[#7C3AED] bg-purple-50 px-2.5 py-0.5 rounded-full">
                      {variant.muscleGroup} • {variantKey.toUpperCase()} VARIANT
                    </span>
                    <h4 className="text-sm font-black text-gray-900 leading-snug">{variant.name}</h4>
                    <p className="text-xs text-gray-500 font-semibold">{variant.sets} Sets × {variant.reps} Reps • {variant.restSeconds}s rest</p>
                  </div>

                  <button
                    onClick={() => setSelectedExerciseItem(exItem)}
                    className="text-xs font-extrabold text-[#7C3AED] bg-purple-50 px-3.5 py-2 rounded-2xl hover:bg-purple-100 transition whitespace-nowrap"
                  >
                    Form & Alts →
                  </button>
                </div>

                {/* Log Reps Prompt */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-500">Log Actual Reps:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={String(variant.reps).split('-')[0] || 10}
                      onChange={(e) => setActualRepsInput(e.target.value)}
                      className="w-14 p-1.5 bg-gray-50 border border-gray-200 rounded-xl text-center font-black"
                    />
                    <button
                      onClick={() => handleSaveActualReps(exItem)}
                      className="px-3 py-1.5 bg-gray-900 text-white font-bold rounded-xl text-[11px]"
                    >
                      Save Reps
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CARDIO INTEGRATION (GOAL-BASED) */}
      {todayWorkoutDay?.cardio && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-5 rounded-3xl shadow-md space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase bg-white/20 px-3 py-0.5 rounded-full">
              Cardio Integration • {todayWorkoutDay.cardio.frequency}
            </span>
            <span className="text-xs font-bold">{todayWorkoutDay.cardio.duration}</span>
          </div>
          <h4 className="text-lg font-black">{todayWorkoutDay.cardio.type}</h4>
          <p className="text-xs text-white/80 font-medium">Keep heart rate in aerobic zone for caloric burn.</p>
        </div>
      )}

      {/* DAILY NUTRITION TRACKER BAR */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">Nutrition & Macros</h3>
            <p className="text-lg font-black text-gray-900 mt-0.5">{totalCalories} / {userCalorieTarget} <span className="text-xs font-bold text-gray-400">kcal</span></p>
          </div>
          <button
            onClick={() => setIsMealModalOpen(true)}
            className="px-3.5 py-2 bg-[#FF5E3A] text-white text-xs font-black rounded-2xl shadow-sm hover:scale-105 transition"
          >
            + Add Meal
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-[#FF5E3A] h-full transition-all duration-300"
            style={{ width: `${Math.min(100, (totalCalories / userCalorieTarget) * 100)}%` }}
          ></div>
        </div>

        {/* Macro Pill breakdown */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <div className="bg-purple-50 p-2.5 rounded-2xl text-[#7C3AED]">
            <span className="block text-[10px] text-gray-400 uppercase">Protein</span>
            <span className="font-black text-sm">{totalProtein}g</span>
          </div>
          <div className="bg-orange-50 p-2.5 rounded-2xl text-[#FF5E3A]">
            <span className="block text-[10px] text-gray-400 uppercase">Carbs</span>
            <span className="font-black text-sm">{totalCarbs}g</span>
          </div>
          <div className="bg-cyan-50 p-2.5 rounded-2xl text-cyan-600">
            <span className="block text-[10px] text-gray-400 uppercase">Fat</span>
            <span className="font-black text-sm">{totalFat}g</span>
          </div>
        </div>
      </div>

      {/* ADAPTATION MODAL */}
      {adaptationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-500">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-black text-gray-900">Performance Adaptation</h3>
            </div>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              You logged {adaptationModal.actual} reps (planned {adaptationModal.planned}) for <strong>{adaptationModal.exName}</strong>. How would you like the AI to adapt?
            </p>

            <div className="space-y-2 text-xs font-bold">
              <button
                onClick={() => { triggerToast('Reduced weight target for next session'); setAdaptationModal(null); }}
                className="w-full p-3 bg-gray-50 border rounded-2xl text-left hover:bg-purple-50 hover:text-[#7C3AED] transition"
              >
                A) Reduce weight next time (-2.5kg)
              </button>
              <button
                onClick={() => { triggerToast('Switched to easier bodyweight variant (Alt A)'); setAdaptationModal(null); }}
                className="w-full p-3 bg-gray-50 border rounded-2xl text-left hover:bg-purple-50 hover:text-[#7C3AED] transition"
              >
                B) Try easier variation next time (Alt A)
              </button>
              <button
                onClick={() => { triggerToast('Increased rest interval (+30s)'); setAdaptationModal(null); }}
                className="w-full p-3 bg-gray-50 border rounded-2xl text-left hover:bg-purple-50 hover:text-[#7C3AED] transition"
              >
                C) Increase rest time between sets (+30s)
              </button>
              <button
                onClick={() => { setAdaptationModal(null); }}
                className="w-full p-3 bg-gray-200 text-gray-700 rounded-2xl text-center"
              >
                D) Keep as-is (I will handle weight)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXERCISE DETAIL MODAL */}
      {selectedExerciseItem && (
        <ExerciseDetailModal
          exerciseItem={selectedExerciseItem}
          onClose={() => setSelectedExerciseItem(null)}
          onSelectVariant={(variantKey) => {
            updateExerciseVariant(selectedExerciseItem.exerciseId, variantKey);
            triggerToast(`Switched exercise variant to ${variantKey.toUpperCase()}!`);
          }}
        />
      )}

      {/* MEAL LOGGER MODAL */}
      {isMealModalOpen && (
        <MealLoggerModal
          isOpen={isMealModalOpen}
          onClose={() => setIsMealModalOpen(false)}
          onSaveMeal={handleAddMeal}
        />
      )}
    </div>
  );
}

export default DashboardPage;
