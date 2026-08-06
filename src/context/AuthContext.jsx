import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signInAnonymously, signOut as firebaseSignOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('aurafit_auth_user');
    return saved ? JSON.parse(saved) : { uid: `local_user_${Date.now()}`, isAnonymous: true };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uObj = { uid: user.uid, email: user.email, isAnonymous: user.isAnonymous };
        setCurrentUser(uObj);
        localStorage.setItem('aurafit_auth_user', JSON.stringify(uObj));
      } else {
        // Fallback guest user
        const localUser = JSON.parse(localStorage.getItem('aurafit_auth_user')) || {
          uid: `local_user_${Date.now()}`,
          isAnonymous: true
        };
        setCurrentUser(localUser);
        localStorage.setItem('aurafit_auth_user', JSON.stringify(localUser));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.warn("Guest sign in fallback:", err);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn("Sign out fallback:", err);
    }
    localStorage.clear();
    const freshGuest = { uid: `local_user_${Date.now()}`, isAnonymous: true };
    setCurrentUser(freshGuest);
    localStorage.setItem('aurafit_auth_user', JSON.stringify(freshGuest));
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
