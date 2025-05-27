import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { programsAPI, routinesAPI } from '../../services/api';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [programRoutines, setProgramRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    duration: '',
    isActive: true
  });

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const programData = await programsAPI.getById(id);
        setProgram(programData);
        setFormData({
          name: programData.name,
          description: programData.description,
          category: programData.category,
          duration: programData.duration,
          isActive: programData.isActive
        });

        // Fetch routines data
        const allRoutines = await routinesAPI.getAll();
        const filteredRoutines = allRoutines.filter(routine => 
          programData.routines.includes(routine.id)
        );
        setProgramRoutines(filteredRoutines);
      } catch (error) {
        console.error('Failed to fetch program details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProgram = await programsAPI.update(id, formData);
      setProgram(updatedProgram);
      setEditing(false);
    } catch (error) {
      console.error('Failed to update program:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await programsAPI.delete(id);
        navigate('/programs');
      } catch (error) {
        console.error('Failed to delete program:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900">Program not found</h2>
        <p className="mt-2 text-gray-600">The program you're looking for doesn't exist or has been removed.</p>
        <Link to="/programs" className="mt-4 inline-block btn btn-primary">Back to Programs</Link>
      </div>
    );
  }

  if (editing) {
    return (
      <div>
        <PageHeader
          title="Edit Program"
          description={`Update details for ${program.name}`}
        />

        <div className="card p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-4">
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
                    className="input"
                  />
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
                    className="input"
                  ></textarea>
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
                      className="input"
                    >
                      <option value="">Select a category</option>
                      <option value="meditation">Meditation</option>
                      <option value="yoga">Yoga</option>
                      <option value="sleep">Sleep</option>
                      <option value="wellness">Wellness</option>
                      <option value="fitness">Fitness</option>
                    </select>
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
                      className="input"
                    />
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

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={program.name}
        description={`Program details and routines`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Program Details */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Program Details</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditing(true)}
                className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="btn bg-red-50 border border-red-300 text-red-700 hover:bg-red-100 text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 text-gray-900">{program.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1 text-gray-900">{program.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                <p className="mt-1 text-gray-900">{program.duration}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${program.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {program.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created</h3>
                <p className="mt-1 text-gray-900">{new Date(program.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Program Stats */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Program Stats</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Routines</h3>
                <span className="text-lg font-semibold text-primary-600">{programRoutines.length}</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full" 
                  style={{ width: `${Math.min(100, programRoutines.length * 10)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
                <span className="text-lg font-semibold text-green-600">68%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">User Satisfaction</h3>
                <span className="text-lg font-semibold text-purple-600">4.5/5</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Routines */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Program Routines</h2>
          <Link to="/routines" className="btn btn-primary text-sm">
            Manage Routines
          </Link>
        </div>

        {programRoutines.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No routines assigned to this program yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {programRoutines.map(routine => (
              <div key={routine.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{routine.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{routine.description}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span>{routine.duration}</span>
                      <span className="mx-1">•</span>
                      <span>{routine.category}</span>
                      <span className="mx-1">•</span>
                      <span>{routine.steps.length} steps</span>
                    </div>
                  </div>
                  <Link to={`/routines/${routine.id}`} className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramDetail;