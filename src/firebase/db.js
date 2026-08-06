import { db } from './config';
import { doc, getDoc, setDoc, collection, getDocs, updateDoc } from 'firebase/firestore';

const STORAGE_KEYS = {
  USER: 'aurafit_user_profile',
  PLAN: 'aurafit_workout_plan',
  LOGS: 'aurafit_daily_logs'
};

// USER PROFILE OPS
export async function saveUserProfile(userId, profileData) {
  const dataToSave = {
    ...profileData,
    userId,
    lastUpdated: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(dataToSave));

  try {
    if (userId && !userId.startsWith('local_')) {
      const userRef = doc(db, 'USERS', userId);
      await setDoc(userRef, dataToSave, { merge: true });
    }
  } catch (err) {
    console.warn("Firestore save profile fallback to localStorage:", err);
  }

  return dataToSave;
}

export async function getUserProfile(userId) {
  try {
    if (userId && !userId.startsWith('local_')) {
      const userRef = doc(db, 'USERS', userId);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn("Firestore load profile fallback to localStorage:", err);
  }

  const cached = localStorage.getItem(STORAGE_KEYS.USER);
  return cached ? JSON.parse(cached) : null;
}

// WORKOUT PLAN OPS
export async function saveWorkoutPlan(userId, planData) {
  const dataToSave = {
    ...planData,
    userId,
    planId: planData.planId || `plan_${Date.now()}`,
    generatedAt: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(dataToSave));

  try {
    if (userId && !userId.startsWith('local_')) {
      const planRef = doc(db, 'WORKOUT_PLANS', dataToSave.planId);
      await setDoc(planRef, dataToSave, { merge: true });
    }
  } catch (err) {
    console.warn("Firestore save plan fallback to localStorage:", err);
  }

  return dataToSave;
}

export async function getWorkoutPlan(userId) {
  try {
    if (userId && !userId.startsWith('local_')) {
      const q = collection(db, 'WORKOUT_PLANS');
      const querySnapshot = await getDocs(q);
      let foundPlan = null;
      querySnapshot.forEach(docSnap => {
        if (docSnap.data().userId === userId) {
          foundPlan = docSnap.data();
        }
      });
      if (foundPlan) {
        localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(foundPlan));
        return foundPlan;
      }
    }
  } catch (err) {
    console.warn("Firestore load plan fallback to localStorage:", err);
  }

  const cached = localStorage.getItem(STORAGE_KEYS.PLAN);
  return cached ? JSON.parse(cached) : null;
}

// DAILY LOGS OPS
export async function saveDailyLog(userId, dateStr, logData) {
  const cachedLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '{}');
  const updatedLog = {
    ...(cachedLogs[dateStr] || {}),
    ...logData,
    userId,
    date: dateStr,
    updatedAt: new Date().toISOString()
  };

  cachedLogs[dateStr] = updatedLog;
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(cachedLogs));

  try {
    if (userId && !userId.startsWith('local_')) {
      const logRef = doc(db, 'DAILY_LOGS', `${userId}_${dateStr}`);
      await setDoc(logRef, updatedLog, { merge: true });
    }
  } catch (err) {
    console.warn("Firestore save daily log fallback to localStorage:", err);
  }

  return cachedLogs;
}

export async function getDailyLogs(userId) {
  try {
    if (userId && !userId.startsWith('local_')) {
      const q = collection(db, 'DAILY_LOGS');
      const querySnapshot = await getDocs(q);
      const logs = {};
      querySnapshot.forEach(docSnap => {
        const d = docSnap.data();
        if (d.userId === userId && d.date) {
          logs[d.date] = d;
        }
      });
      if (Object.keys(logs).length > 0) {
        localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
        return logs;
      }
    }
  } catch (err) {
    console.warn("Firestore load daily logs fallback to localStorage:", err);
  }

  return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '{}');
}
