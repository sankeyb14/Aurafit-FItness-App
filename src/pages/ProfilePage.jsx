import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { usePlan } from '../context/PlanContext';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Toast } from '../components/Toast';
import { User, Sparkles, LogOut, Settings, Dumbbell, ShieldAlert, Heart, RefreshCw } from 'lucide-react';

export function ProfilePage() {
  const { profile, updateProfile } = useUser();
  const { plan, generateNewPlan, updateCurrentWeek, generating } = usePlan();
  const { logout } = useAuth();

  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const currentWeek = plan?.currentWeek || 1;
  const progressPct = Math.round((currentWeek / 8) * 100);

  const handleRegeneratePlan = async () => {
    if (!profile) return;
    const newPlan = await generateNewPlan(profile);
    if (newPlan) {
      setToastMsg("AI Workout Plan successfully re-generated! 🚀");
      setShowToast(true);
    }
  };

  const handleWeekChange = (e) => {
    const val = Number(e.target.value);
    updateCurrentWeek(val);
    setToastMsg(`Updated active plan to Week ${val}`);
    setShowToast(true);
  };

  return (
    <div className="min-h-screen pb-24 pt-4 px-4 sm:px-6 max-w-md mx-auto sm:max-w-lg md:max-w-xl space-y-5 animate-fadeIn">
      <Toast message={toastMsg} isOpen={showToast} onClose={() => setShowToast(false)} />

      {generating && <LoadingSpinner fullScreen text="Re-generating AI Workout Plan with Gemini..." />}

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-card border border-gray-100">
        <div>
          <h1 className="text-xl font-black text-textDark tracking-tight">Athlete Profile</h1>
          <p className="text-xs text-gray-400 font-medium">Manage preferences & training plan</p>
        </div>
        <div className="w-10 h-10 gradient-header text-white rounded-2xl flex items-center justify-center font-extrabold text-sm shadow">
          <User className="w-5 h-5" />
        </div>
      </div>

      {/* User Info Card */}
      <Card className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-black text-textDark">
              Personal Profile
            </h2>
            <p className="text-xs text-gray-500 capitalize">
              {profile?.personalInfo?.age || 25} yrs • {profile?.personalInfo?.sex || 'M'} • {profile?.personalInfo?.height_cm || 175}cm • {profile?.personalInfo?.weight_kg || 72}kg
            </p>
          </div>
          <span className="text-xs font-bold text-primary bg-indigo-50 px-3 py-1 rounded-full capitalize">
            {profile?.fitnessLevel || 'Intermediate'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
          <div className="p-2.5 bg-gray-50 rounded-xl">
            <span className="text-gray-400 font-bold uppercase text-[10px]">Goal Physique</span>
            <p className="font-bold text-gray-800 capitalize">{profile?.goalPhysique?.replace('_', ' ') || 'Athletic'}</p>
          </div>
          <div className="p-2.5 bg-gray-50 rounded-xl">
            <span className="text-gray-400 font-bold uppercase text-[10px]">Diet Type</span>
            <p className="font-bold text-gray-800 capitalize">{profile?.dietaryPrefs?.dietType || 'Non-Veg'}</p>
          </div>
        </div>

        {profile?.personalInfo?.healthConditions_text && (
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Health Notes: </span>
              <span>{profile.personalInfo.healthConditions_text}</span>
            </div>
          </div>
        )}
      </Card>

      {/* Current Plan Card */}
      <Card className="gradient-header text-white p-5 space-y-4 shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-white">
              Active Program
            </span>
            <h3 className="text-xl font-black mt-2 leading-tight">
              {plan?.programName || '8-Week AI Training Program'}
            </h3>
          </div>
          <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-white/90">
            <span>Program Progress</span>
            <span>Week {currentWeek} of 8 ({progressPct}%)</span>
          </div>
          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div className="bg-secondary h-full transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs">
          <span className="text-white/80 font-medium">Select Current Week:</span>
          <select
            value={currentWeek}
            onChange={handleWeekChange}
            className="bg-white/20 text-white font-bold px-3 py-1 rounded-xl border border-white/30 focus:outline-none text-xs"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(w => (
              <option key={w} value={w} className="text-gray-900 font-bold">Week {w}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Plan Re-Generation */}
      <Card className="p-5 space-y-3 border-dashed border-2 border-primary/30 bg-indigo-50/30">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary text-white rounded-xl">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-textDark">Finished 8 Weeks or Want Variety?</h3>
            <p className="text-[11px] text-gray-500">Generate a fresh periodized plan using your updated stats</p>
          </div>
        </div>
        <button
          onClick={handleRegeneratePlan}
          className="w-full py-3 orange-gradient hover:opacity-95 text-white font-extrabold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Re-Generate AI Plan with Gemini
        </button>
      </Card>

      {/* Equipment & Settings Summary */}
      <Card className="space-y-3">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <Settings className="w-4 h-4 text-primary" /> Active Equipment & Environment
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {(profile?.workoutEnv?.equipment || ['bodyweight', 'dumbbells']).map((eq, i) => (
            <span key={i} className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg capitalize">
              ✓ {eq.replace('_', ' ')}
            </span>
          ))}
        </div>
      </Card>

      {/* Logout Action */}
      <button
        onClick={logout}
        className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-danger font-extrabold text-xs rounded-2xl border border-red-200 transition flex items-center justify-center gap-2 shadow-sm"
      >
        <LogOut className="w-4 h-4" /> Sign Out & Reset Data
      </button>
    </div>
  );
}

export default ProfilePage;
