import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routinesAPI, stepsAPI } from '../../services/api';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const CreateRoutine = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    category: '',
    steps: []
  });
  
  return (
    <div>
      <PageHeader
        title="Create Routine"
        description="Add a new wellness routine"
      />
      
      <div className="card p-6">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900">Routine Creation Coming Soon</h3>
          <p className="mt-2 text-gray-500">This feature is under development.</p>
          <button
            onClick={() => navigate('/routines')}
            className="mt-4 btn btn-primary"
          >
            Back to Routines
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoutine;