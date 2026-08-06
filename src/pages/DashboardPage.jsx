import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { usePlan } from '../context/PlanContext';
import { useLogs } from '../context/LogContext';
import { Card } from '../components/Card';
import { CircularProgress } from '../components/CircularProgress';
import { WeeklyCalendar } from '../components/WeeklyCalendar';
import { MealLoggerModal } from '../components/MealLoggerModal';
import { ExerciseDetailModal } from '../components/ExerciseDetailModal';
import { Toast } from '../components/Toast';
import { formatNiceDate } from '../utils/formatters';
import { Flame, CheckSquare, Square, Clock, Plus, Moon, Battery, ChevronRight, Info, Utensils, Trash2, Calendar, Sparkles } from 'lucide-react';

export function DashboardPage() {
  const { profile } = useUser();
  const { plan } = usePlan();
  const { todayLog, dailyLogs, streakInfo, logWorkoutCompletion, logSleepAndEnergy, deleteMealLog } = useLogs();

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Today Workout Log State
  const [workoutDone, setWorkoutDone] = useState(todayLog.workoutLogged?.completed || false);
  const [duration, setDuration] = useState(todayLog.workoutLogged?.duration_minutes || 45);
  const [sleepHours, setSleepHours] = useState(todayLog.sleepHours || 7.5);
  const [energyLevel, setEnergyLevel] = useState(todayLog.energyLevel || 4);
  const [notes, setNotes] = useState(todayLog.notes || '');

  // Calculate current day in program
  const currentWeekNum = plan?.currentWeek || 1;
  const currentWeekObj = plan?.weeks?.find((w) => w.weekNumber === currentWeekNum) || plan?.weeks?.[0];

  const todayDateObj = new Date();
  const dayOfWeek = todayDateObj.getDay(); // 0-6 (Sun-Sat)
  const dayNum = dayOfWeek === 0 ? 7 : dayOfWeek; // 1-7 (Mon-Sun)

  const todayWorkoutDay = currentWeekObj?.days?.find((d) => d.dayNum === dayNum) || currentWeekObj?.days?.[0];
  const nextWorkoutDay = currentWeekObj?.days?.find((d) => d.dayNum === (dayNum % 7) + 1) || currentWeekObj?.days?.[1];

  const handleSaveWorkoutLog = async () => {
    await logWorkoutCompletion(workoutDone, Number(duration), todayWorkoutDay?.exercises || []);
    triggerToast("Workout log saved successfully! 🔥");
  };

  const handleSaveSleepAndEnergy = async () => {
    await logSleepAndEnergy(sleepHours, energyLevel, notes);
    triggerToast("Sleep & Energy log saved! 🌙");
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const meals = todayLog.dietLog?.meals || [];
  const totalCal = todayLog.dietLog?.total_calories || 0;

  return (
    <div className="min-h-screen pb-24 pt-4 px-4 sm:px-6 max-w-md mx-auto sm:max-w-lg md:max-w-xl space-y-5 animate-fadeIn">
      <Toast message={toastMessage} isOpen={showToast} onClose={() => setShowToast(false)} />

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-card border border-gray-100">
        <div>
          <h1 className="text-xl font-black text-textDark tracking-tight">
            Hello, {profile?.personalInfo?.sex === 'F' ? 'Athlete' : 'Champion'} 👋
          </h1>
          <p className="text-xs font-medium text-gray-400">{formatNiceDate(new Date())}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-secondary fill-secondary animate-pulse" />
            <span className="text-xs font-black text-secondary">{streakInfo.currentStreak} Days</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Workout Plan Card (Today / Tomorrow) */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            Week {currentWeekNum} of 8 • Today's Workout
          </h2>
          <span className="text-xs font-semibold text-primary bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Day {dayNum} of 7
          </span>
        </div>

        <Card className="gradient-header text-white p-5 space-y-4 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-white">
                {plan?.programName || "8-Week AI Training"}
              </span>
              <h3 className="text-xl font-black mt-2 leading-tight">
                {todayWorkoutDay?.title || "Full Body Workout"}
              </h3>
              <p className="text-xs text-white/80 font-medium mt-0.5">
                Focus: {todayWorkoutDay?.focus || "Strength & Endurance"}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold bg-secondary text-white px-3 py-1 rounded-xl shadow">
                {todayWorkoutDay?.exercises?.length || 0} Exercises
              </span>
            </div>
          </div>

          {/* Exercise List */}
          <div className="space-y-2 pt-2">
            {todayWorkoutDay?.exercises?.length > 0 ? (
              todayWorkoutDay.exercises.map((ex, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedExercise(ex)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-2xl flex items-center justify-between cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{ex.name}</h4>
                      <p className="text-[11px] text-white/70">
                        {ex.sets} Sets × {ex.reps} reps • {ex.rest_seconds}s rest
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/70" />
                </div>
              ))
            ) : (
              <div className="text-center py-4 bg-white/10 rounded-2xl">
                <p className="text-xs font-medium text-white/90">Rest & Active Mobility Day 🎉</p>
                <p className="text-[11px] text-white/70">Focus on foam rolling, light walks, and sleep recovery.</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* SECTION 2: Daily Logging */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider px-1">Today's Activity Logging</h2>

        {/* 2A: Workout Completion Log */}
        <Card className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWorkoutDone(!workoutDone)}
                className="text-primary transition"
              >
                {workoutDone ? (
                  <CheckSquare className="w-6 h-6 text-success fill-success/10" />
                ) : (
                  <Square className="w-6 h-6 text-gray-300" />
                )}
              </button>
              <div>
                <h3 className="text-xs font-bold text-textDark">Completed Today's Workout?</h3>
                <p className="text-[11px] text-gray-400">Mark done to increase your streak</p>
              </div>
            </div>

            {workoutDone && (
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-10 text-xs font-bold text-center bg-transparent border-none focus:outline-none"
                />
                <span className="text-[10px] text-gray-400 font-bold">min</span>
              </div>
            )}
          </div>

          <button
            onClick={handleSaveWorkoutLog}
            className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs rounded-xl transition"
          >
            Save Workout Status
          </button>
        </Card>

        {/* 2B: Meal Logging */}
        <Card className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 text-secondary rounded-xl">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-textDark">Meals & Calorie Log</h3>
                <p className="text-[11px] text-gray-400">{meals.length} meals logged • {totalCal} kcal</p>
              </div>
            </div>
            <button
              onClick={() => setIsMealModalOpen(true)}
              className="px-3 py-1.5 bg-secondary hover:bg-secondary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Meal
            </button>
          </div>

          {/* Logged Meal Items */}
          {meals.length > 0 && (
            <div className="space-y-2 pt-1 border-t border-gray-100">
              {meals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl text-xs">
                  <div>
                    <span className="font-bold text-gray-800 capitalize">[{meal.meal_type}] </span>
                    <span className="text-gray-600">{meal.name}</span>
                    <div className="text-[10px] text-gray-400">
                      P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-secondary">{meal.calories} cal</span>
                    <button onClick={() => deleteMealLog(meal.id)} className="text-gray-300 hover:text-danger">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* 2C: Sleep & Energy */}
        <Card className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1 mb-1">
                <Moon className="w-3.5 h-3.5 text-indigo-500" /> Sleep (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-bold focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1 mb-1">
                <Battery className="w-3.5 h-3.5 text-amber-500" /> Energy Level (1-5)
              </label>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(e.target.value)}
                  className="w-full accent-secondary"
                />
                <span className="text-xs font-black text-secondary w-4 text-center">{energyLevel}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Workout Notes / Reflections</label>
            <input
              type="text"
              placeholder="e.g. Felt strong on bench press, slight hamstring tight"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <button
            onClick={handleSaveSleepAndEnergy}
            className="w-full py-2 bg-gray-800 hover:bg-gray-900 text-white font-bold text-xs rounded-xl transition"
          >
            Save Daily Recovery & Notes
          </button>
        </Card>
      </div>

      {/* SECTION 3: Streak Tracker & Weekly Heatmap */}
      <div className="space-y-4">
        <WeeklyCalendar dailyLogs={dailyLogs} />

        <Card className="flex items-center justify-between p-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-3xl shadow-lg">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full">
              Streak Milestone
            </span>
            <h3 className="text-2xl font-black mt-1.5">{streakInfo.currentStreak} Days 🔥</h3>
            <p className="text-xs text-white/80">Best Historical Streak: {streakInfo.bestStreak} Days</p>
          </div>
          <CircularProgress
            value={streakInfo.currentStreak}
            max={30}
            size={80}
            strokeWidth={8}
            primaryColor="#FFFFFF"
            accentColor="#FEF3C7"
            title={`${streakInfo.currentStreak}`}
            subtitle="streak"
          />
        </Card>
      </div>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExercise}
        isOpen={Boolean(selectedExercise)}
        onClose={() => setSelectedExercise(null)}
      />

      {/* Meal Logger Modal */}
      <MealLoggerModal
        isOpen={isMealModalOpen}
        onClose={() => setIsMealModalOpen(false)}
      />
    </div>
  );
}

export default DashboardPage;
