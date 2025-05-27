import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stepsAPI } from '../../services/api';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const StepDetail = () => {
  const { id } = useParams();
  const [step, setStep] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStepDetails = async () => {
      try {
        const data = await stepsAPI.getById(id);
        setStep(data);
      } catch (error) {
        console.error('Failed to fetch step details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStepDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!step) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900">Step not found</h2>
        <p className="mt-2 text-gray-600">The step you're looking for doesn't exist or has been removed.</p>
        <Link to="/steps" className="mt-4 inline-block btn btn-primary">Back to Steps</Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={step.name}
        description={`Step details`}
      />

      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Step Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-gray-900">{step.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Instructions</h3>
            <p className="mt-1 text-gray-900">{step.instruction}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Type</h3>
              <p className="mt-1 text-gray-900">{step.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Duration</h3>
              <p className="mt-1 text-gray-900">{step.duration}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Created</h3>
              <p className="mt-1 text-gray-900">{new Date(step.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepDetail;