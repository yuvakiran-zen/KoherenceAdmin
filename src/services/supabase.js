import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export const authService = {
  // Get current session
  getCurrentSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  // Sign in with email and password
  signInWithEmail: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Reset password
  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  // Update password
  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },

  // Set up auth state change listener
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }
};