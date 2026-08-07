import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getWorkoutPlan, saveWorkoutPlan } from '../firebase/db';
import { generateAIWorkoutPlan } from '../services/geminiService';

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const { currentUser } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function load() {
      if (currentUser?.uid) {
        setLoadingPlan(true);
        const data = await getWorkoutPlan(currentUser.uid);
        setPlan(data);
        setLoadingPlan(false);
      }
    }
    load();
  }, [currentUser]);

  const generateNewPlan = async (userProfile) => {
    if (!currentUser?.uid) return null;
    setGenerating(true);
    try {
      const generatedData = await generateAIWorkoutPlan(userProfile);
      const saved = await saveWorkoutPlan(currentUser.uid, generatedData);
      setPlan(saved);
      return saved;
    } catch (err) {
      console.error("Failed to generate plan:", err);
      return null;
    } finally {
      setGenerating(false);
    }
  };

  const updateCurrentWeek = async (weekNum) => {
    if (!plan) return;
    const updated = { ...plan, currentWeek: weekNum };
    setPlan(updated);
    if (currentUser?.uid) {
      await saveWorkoutPlan(currentUser.uid, updated);
    }
  };

  return (
    <PlanContext.Provider value={{ plan, loadingPlan, generating, generateNewPlan, updateCurrentWeek }}>
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);
