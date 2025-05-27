import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';

const CreateStep = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <PageHeader
        title="Create Step"
        description="Add a new step for your routines"
      />
      
      <div className="card p-6">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900">Step Creation Coming Soon</h3>
          <p className="mt-2 text-gray-500">This feature is under development.</p>
          <button
            onClick={() => navigate('/steps')}
            className="mt-4 btn btn-primary"
          >
            Back to Steps
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStep;