import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserProfile, saveUserProfile } from '../firebase/db';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    async function load() {
      if (currentUser?.uid) {
        setLoadingProfile(true);
        const data = await getUserProfile(currentUser.uid);
        setProfile(data);
        setLoadingProfile(false);
      }
    }
    load();
  }, [currentUser]);

  const updateProfile = async (newProfileData) => {
    if (!currentUser?.uid) return;
    const merged = { ...profile, ...newProfileData };
    setProfile(merged);
    await saveUserProfile(currentUser.uid, merged);
  };

  const isOnboarded = Boolean(profile && profile.fitnessLevel && profile.goalPhysique);

  return (
    <UserContext.Provider value={{ profile, loadingProfile, updateProfile, isOnboarded }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
