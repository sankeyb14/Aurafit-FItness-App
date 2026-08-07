import React from 'react';
import { getWeekDaysArray } from '../utils/formatters';
import { Check, Flame } from 'lucide-react';

export function WeeklyCalendar({ dailyLogs = {} }) {
  const weekDays = getWeekDaysArray();

  const completedCount = weekDays.filter(d => {
    const log = dailyLogs[d.dateStr];
    return log?.workoutLogged?.completed;
  }).length;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-secondary fill-secondary" />
          Weekly Streak Tracker
        </h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-primary">
          {completedCount} / 7 Workouts
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center">
        {weekDays.map((day) => {
          const log = dailyLogs[day.dateStr];
          const isDone = log?.workoutLogged?.completed;
          const isDietLogged = log?.dietLog?.total_calories > 0;

          return (
            <div
              key={day.dateStr}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                day.isToday ? 'ring-2 ring-primary ring-offset-1 bg-indigo-50/50' : 'bg-gray-50'
              }`}
            >
              <span className="text-[11px] font-semibold text-gray-400 uppercase">{day.dayName}</span>
              <span className={`text-xs font-bold my-1 ${day.isToday ? 'text-primary' : 'text-gray-700'}`}>
                {day.dayNum}
              </span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-success text-white shadow-sm scale-105'
                    : isDietLogged
                    ? 'bg-amber-100 text-amber-600'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyCalendar;
