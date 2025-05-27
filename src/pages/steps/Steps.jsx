import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { stepsAPI } from '../../services/api';
import PageHeader from '../../components/ui/PageHeader';
import EmptyState from '../../components/ui/EmptyState';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Steps = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const data = await stepsAPI.getAll();
        setSteps(data);
      } catch (error) {
        console.error('Failed to fetch steps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

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
        title="Steps"
        description="Manage individual steps for your routines"
        createButtonLabel="Create Step"
        createButtonLink="/steps/create"
      />

      {steps.length === 0 ? (
        <EmptyState
          title="No steps yet"
          description="Get started by creating a new step."
          createLink="/steps/create"
          createLabel="Create Step"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.id} className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-gray-100 rounded-full px-3 py-1 mr-2">{step.type}</span>
                  <span>{step.duration}</span>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
                <Link 
                  to={`/steps/${step.id}`}
                  className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Steps;