import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { routinesAPI } from '../../services/api';
import PageHeader from '../../components/ui/PageHeader';
import EmptyState from '../../components/ui/EmptyState';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const data = await routinesAPI.getAll();
        setRoutines(data);
      } catch (error) {
        console.error('Failed to fetch routines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  const filteredRoutines = routines.filter(routine =>
    routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    routine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    routine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Routines"
        description="Manage your wellness routines"
        createButtonLabel="Create Routine"
        createButtonLink="/routines/create"
      />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search routines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {routines.length === 0 ? (
        <EmptyState
          title="No routines yet"
          description="Get started by creating a new routine."
          createLink="/routines/create"
          createLabel="Create Routine"
        />
      ) : filteredRoutines.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No routines match your search.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredRoutines.map((routine) => (
            <motion.div 
              key={routine.id}
              className="card"
              variants={item}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{routine.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{routine.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-gray-100 rounded-full px-3 py-1 mr-2">{routine.category}</span>
                  <span>{routine.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  {routine.steps.length} steps
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
                <Link 
                  to={`/routines/${routine.id}`}
                  className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Routines;