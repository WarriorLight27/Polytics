
import React, { useState, useEffect } from 'react';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import { User } from './types';
import { getMockUser } from './services/api';
import Spinner from './components/ui/Spinner';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate checking for a logged-in user
    setTimeout(() => {
      // In a real app, you'd check localStorage or a session cookie
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    const mockUser = await getMockUser();
    setUser(mockUser);
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
