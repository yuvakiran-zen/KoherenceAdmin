import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/supabase';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize authentication state
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        // Get current session
        const currentSession = await authService.getCurrentSession();
        setSession(currentSession);
        
        if (currentSession) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Set up auth state change listener
    const { data: authListener } = authService.onAuthStateChange(async (session) => {
      setSession(session);
      if (session) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Clean up subscription
    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { user, session } = await authService.signInWithEmail(email, password);
      setUser(user);
      setSession(session);
      return { user, session };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      setUser(null);
      setSession(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      await authService.resetPassword(email);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      await authService.updatePassword(newPassword);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    error,
    login,
    logout,
    resetPassword,
    updatePassword,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};