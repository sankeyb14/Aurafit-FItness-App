import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getDailyLogs, saveDailyLog } from '../firebase/db';
import { formatDateISO } from '../utils/formatters';
import { calculateStreaks } from '../utils/streakCalculator';

const LogContext = createContext();

export function LogProvider({ children }) {
  const { currentUser } = useAuth();
  const [dailyLogs, setDailyLogs] = useState({});
  const [loadingLogs, setLoadingLogs] = useState(true);

  const todayStr = formatDateISO(new Date());

  useEffect(() => {
    async function load() {
      if (currentUser?.uid) {
        setLoadingLogs(true);
        const logsMap = await getDailyLogs(currentUser.uid);
        setDailyLogs(logsMap || {});
        setLoadingLogs(false);
      }
    }
    load();
  }, [currentUser]);

  const todayLog = dailyLogs[todayStr] || {
    date: todayStr,
    workoutLogged: { completed: false, duration_minutes: 0, exercises_done: [] },
    dietLog: { meals: [], macros: { protein_g: 0, carbs_g: 0, fat_g: 0 }, total_calories: 0 },
    sleepHours: 0,
    energyLevel: 3,
    notes: ''
  };

  const updateLogForDate = async (dateStr, partialData) => {
    if (!currentUser?.uid) return;
    const existing = dailyLogs[dateStr] || { date: dateStr };

    const merged = {
      ...existing,
      ...partialData,
      workoutLogged: {
        ...(existing.workoutLogged || {}),
        ...(partialData.workoutLogged || {})
      },
      dietLog: {
        ...(existing.dietLog || {}),
        ...(partialData.dietLog || {})
      }
    };

    const updatedMap = await saveDailyLog(currentUser.uid, dateStr, merged);
    setDailyLogs({ ...updatedMap });
  };

  const logWorkoutCompletion = async (completed, duration_minutes = 45, exercises_done = []) => {
    await updateLogForDate(todayStr, {
      workoutLogged: { completed, duration_minutes, exercises_done }
    });
  };

  const addMealLog = async (mealType, name, calories, protein, carbs, fat) => {
    const currentMeals = todayLog.dietLog?.meals || [];
    const newMeal = {
      id: `meal_${Date.now()}`,
      meal_type: mealType,
      name,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMeals = [...currentMeals, newMeal];

    const total_calories = updatedMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const protein_g = updatedMeals.reduce((sum, m) => sum + (m.protein || 0), 0);
    const carbs_g = updatedMeals.reduce((sum, m) => sum + (m.carbs || 0), 0);
    const fat_g = updatedMeals.reduce((sum, m) => sum + (m.fat || 0), 0);

    await updateLogForDate(todayStr, {
      dietLog: {
        meals: updatedMeals,
        macros: { protein_g, carbs_g, fat_g },
        total_calories
      }
    });
  };

  const deleteMealLog = async (mealId) => {
    const currentMeals = todayLog.dietLog?.meals || [];
    const updatedMeals = currentMeals.filter(m => m.id !== mealId);

    const total_calories = updatedMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const protein_g = updatedMeals.reduce((sum, m) => sum + (m.protein || 0), 0);
    const carbs_g = updatedMeals.reduce((sum, m) => sum + (m.carbs || 0), 0);
    const fat_g = updatedMeals.reduce((sum, m) => sum + (m.fat || 0), 0);

    await updateLogForDate(todayStr, {
      dietLog: {
        meals: updatedMeals,
        macros: { protein_g, carbs_g, fat_g },
        total_calories
      }
    });
  };

  const logSleepAndEnergy = async (sleepHours, energyLevel, notes = '') => {
    await updateLogForDate(todayStr, {
      sleepHours: Number(sleepHours),
      energyLevel: Number(energyLevel),
      notes
    });
  };

  const streakInfo = calculateStreaks(dailyLogs);

  return (
    <LogContext.Provider value={{
      dailyLogs,
      todayLog,
      loadingLogs,
      streakInfo,
      logWorkoutCompletion,
      addMealLog,
      deleteMealLog,
      logSleepAndEnergy,
      updateLogForDate
    }}>
      {children}
    </LogContext.Provider>
  );
}

export const useLogs = () => useContext(LogContext);
