import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { programsAPI, routinesAPI } from '../../services/api';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const CreateProgram = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    duration: '',
    isActive: true,
    routines: []
  });
  const [allRoutines, setAllRoutines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRoutines = async () => {
      setLoading(true);
      try {
        const data = await routinesAPI.getAll();
        setAllRoutines(data);
      } catch (error) {
        console.error('Failed to fetch routines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRoutineToggle = (routineId) => {
    setFormData(prevData => {
      const routineIds = [...prevData.routines];
      const index = routineIds.indexOf(routineId);
      
      if (index === -1) {
        routineIds.push(routineId);
      } else {
        routineIds.splice(index, 1);
      }
      
      return { ...prevData, routines: routineIds };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Program name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    try {
      const newProgram = await programsAPI.create(formData);
      navigate(`/programs/${newProgram.id}`);
    } catch (error) {
      console.error('Failed to create program:', error);
      setErrors({ submit: 'Failed to create program. Please try again.' });
    } finally {
      setSubmitting(false);
    }
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
        title="Create Program"
        description="Add a new wellness program to your platform"
      />

      <div className="card p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Program Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Program Information</h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Program Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter program name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className={`input ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Describe the program"
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`input ${errors.category ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a category</option>
                    <option value="meditation">Meditation</option>
                    <option value="yoga">Yoga</option>
                    <option value="sleep">Sleep</option>
                    <option value="wellness">Wellness</option>
                    <option value="fitness">Fitness</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className={`input ${errors.duration ? 'border-red-500' : ''}`}
                    placeholder="e.g., 4 weeks"
                  />
                  {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active Program
                </label>
              </div>
            </div>

            {/* Program Routines */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Program Routines</h3>
              
              {allRoutines.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allRoutines.map(routine => (
                    <div key={routine.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id={`routine-${routine.id}`}
                          checked={formData.routines.includes(routine.id)}
                          onChange={() => handleRoutineToggle(routine.id)}
                          className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`routine-${routine.id}`} className="ml-2 block">
                          <span className="text-sm font-medium text-gray-700">{routine.name}</span>
                          <p className="text-xs text-gray-500">{routine.description}</p>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <span>{routine.duration}</span>
                            <span className="mx-1">•</span>
                            <span>{routine.category}</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No routines available. Create routines first.</p>
              )}
            </div>

            {errors.submit && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/programs')}
                className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary flex items-center"
              >
                {submitting && <LoadingSpinner size="sm" />}
                <span className={submitting ? 'ml-2' : ''}>
                  {submitting ? 'Creating...' : 'Create Program'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProgram;