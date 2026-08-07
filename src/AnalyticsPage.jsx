import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useLogs } from '../context/LogContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { Flame, Utensils, TrendingUp, Calendar, Trophy, Zap } from 'lucide-react';

export function AnalyticsPage() {
  const { profile } = useUser();
  const { dailyLogs, streakInfo } = useLogs();
  const [activeTab, setActiveTab] = useState('workout'); // 'workout', 'nutrition'

  const userCalorieTarget = profile?.userCalorieTarget || 2000;

  // Mock 7-day trend data combined with real logs
  const weeklyData = [
    { day: 'Mon', calories: 1850, protein: 110, workoutDone: true },
    { day: 'Tue', calories: 2100, protein: 135, workoutDone: true },
    { day: 'Wed', calories: 1950, protein: 125, workoutDone: true },
    { day: 'Thu', calories: 1700, protein: 95, workoutDone: false },
    { day: 'Fri', calories: 2050, protein: 140, workoutDone: true },
    { day: 'Sat', calories: 2200, protein: 150, workoutDone: true },
    { day: 'Sun', calories: 1900, protein: 115, workoutDone: false }
  ];

  return (
    <div className="min-h-screen pb-24 pt-4 px-4 sm:px-6 max-w-md mx-auto sm:max-w-lg md:max-w-xl space-y-5 animate-fadeIn bg-[#F3F4F8]">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Performance Analytics</h1>
          <p className="text-xs text-gray-500 font-semibold">Weekly Strain & Nutrition Trends</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-[#FF5E3A] fill-[#FF5E3A]" />
          <span className="text-xs font-black text-[#FF5E3A]">{streakInfo?.currentStreak || 5} Day Streak</span>
        </div>
      </div>

      {/* Flexible Streak Banner */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#FF5E3A] flex items-center justify-center font-black text-lg">
            🔥
          </div>
          <div>
            <span className="font-black text-gray-900 block text-xs">Flexible Streak Active</span>
            <span className="text-[10px] text-gray-400 font-bold">1 Missed Day Allowed / Week</span>
          </div>
        </div>
        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          0/1 Missed
        </span>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-gray-100 text-xs font-black text-gray-400">
        <button
          onClick={() => setActiveTab('workout')}
          className={`flex-1 py-2.5 rounded-xl transition ${activeTab === 'workout' ? 'bg-[#7C3AED] text-white shadow-md' : 'hover:text-gray-900'}`}
        >
          Workout Consistency
        </button>
        <button
          onClick={() => setActiveTab('nutrition')}
          className={`flex-1 py-2.5 rounded-xl transition ${activeTab === 'nutrition' ? 'bg-[#FF5E3A] text-white shadow-md' : 'hover:text-gray-900'}`}
        >
          Nutrition & Caloric Intake
        </button>
      </div>

      {activeTab === 'workout' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 text-center">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase">Total Completed</span>
              <p className="text-2xl font-black text-[#7C3AED] mt-1">18 <span className="text-xs font-bold text-gray-400">sessions</span></p>
            </div>
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 text-center">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase">Weekly Strain</span>
              <p className="text-2xl font-black text-[#FF5E3A] mt-1">14.8 <span className="text-xs font-bold text-gray-400">Index</span></p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
            <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider">Weekly Caloric Burn Trend</h3>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F8" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#F3F4F8' }} />
                  <Bar dataKey="calories" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'nutrition' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider">Daily Calorie Target: {userCalorieTarget} kcal</h3>
              <span className="text-[10px] font-bold text-[#FF5E3A] bg-orange-50 px-2.5 py-0.5 rounded-full">Weekly Avg 1,950 kcal</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F8" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="calories" stroke="#FF5E3A" strokeWidth={3} dot={{ fill: '#FF5E3A', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
            <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider">Protein Intake Trend (Target: 130g)</h3>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="protein" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsPage;
