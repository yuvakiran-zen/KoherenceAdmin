import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { programsAPI } from '../../services/api';
import PageHeader from '../../components/ui/PageHeader';
import EmptyState from '../../components/ui/EmptyState';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programsAPI.getAll();
        setPrograms(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch programs:', error);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await programsAPI.delete(id);
        setPrograms(programs.filter(program => program.id !== id));
      } catch (error) {
        console.error('Failed to delete program:', error);
      }
    }
  };

  const filteredPrograms = programs
    .filter(program => {
      if (filter === 'active') return program.isActive;
      if (filter === 'inactive') return !program.isActive;
      return true; // 'all' filter
    })
    .filter(program =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Animation variants
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
        title="Programs"
        description="Create and manage your wellness programs"
        createButtonLabel="Create Program"
        createButtonLink="/programs/create"
      />

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="input sm:w-40"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Programs</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {programs.length === 0 ? (
        <EmptyState
          title="No programs yet"
          description="Get started by creating a new program."
          createLink="/programs/create"
          createLabel="Create Program"
        />
      ) : filteredPrograms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No programs match your search.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredPrograms.map((program) => (
            <motion.div 
              key={program.id} 
              className="card overflow-hidden" 
              variants={item}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {program.name}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${program.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {program.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{program.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-gray-100 rounded-full px-3 py-1 mr-2">{program.category}</span>
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {program.routines.length} routines
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
                <Link 
                  to={`/programs/${program.id}`}
                  className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(program.id)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Programs;