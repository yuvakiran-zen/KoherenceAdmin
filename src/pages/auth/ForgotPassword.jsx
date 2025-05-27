import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Reset password error:', err);
      setError('Failed to send reset instructions. Please check your email and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-6 pt-8 pb-10">
          <div className="flex justify-center">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Koherence Admin
            </h2>
          </div>
          
          {!isSubmitted ? (
            <>
              <h2 className="mt-6 text-center text-xl font-bold text-gray-900">
                Reset your password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Enter your email and we'll send you instructions to reset your password
              </p>
              
              {error && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn btn-primary w-full flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="mt-6 text-center">
              <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
              <p className="mt-2 text-sm text-gray-600">
                We've sent instructions to reset your password to {email}.
                Please check your inbox.
              </p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              Back to login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;