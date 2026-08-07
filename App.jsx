import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider, useUser } from './context/UserContext';
import { PlanProvider } from './context/PlanContext';
import { LogProvider } from './context/LogContext';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { Navigation } from './components/Navigation';
import { LoadingSpinner } from './components/LoadingSpinner';

function RootRedirect() {
  const { isOnboarded, loadingProfile } = useUser();
  if (loadingProfile) return <LoadingSpinner fullScreen text="Loading profile..." />;
  return isOnboarded ? <Navigate to="/dashboard" replace /> : <Navigate to="/onboarding" replace />;
}

function Layout({ children }) {
  const location = useLocation();
  const showNav = ['/dashboard', '/analytics', '/profile'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1F2937]">
      {children}
      {showNav && <Navigation />}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <PlanProvider>
            <LogProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<RootRedirect />} />
                  <Route path="/onboarding" element={<OnboardingPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </LogProvider>
          </PlanProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
