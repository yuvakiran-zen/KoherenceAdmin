import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { routinesAPI } from '../../services/api';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const RoutineDetail = () => {
  const { id } = useParams();
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutineDetails = async () => {
      try {
        const data = await routinesAPI.getById(id);
        setRoutine(data);
      } catch (error) {
        console.error('Failed to fetch routine details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutineDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!routine) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900">Routine not found</h2>
        <p className="mt-2 text-gray-600">The routine you're looking for doesn't exist or has been removed.</p>
        <Link to="/routines" className="mt-4 inline-block btn btn-primary">Back to Routines</Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={routine.name}
        description={`Routine details and steps`}
      />

      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Routine Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-gray-900">{routine.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Category</h3>
              <p className="mt-1 text-gray-900">{routine.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Duration</h3>
              <p className="mt-1 text-gray-900">{routine.duration}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Created</h3>
              <p className="mt-1 text-gray-900">{new Date(routine.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Routine Steps</h2>
          <Link to="/steps" className="btn btn-primary text-sm">
            Manage Steps
          </Link>
        </div>

        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900">Detailed Steps View Coming Soon</h3>
          <p className="mt-2 text-gray-500">This feature is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default RoutineDetail;