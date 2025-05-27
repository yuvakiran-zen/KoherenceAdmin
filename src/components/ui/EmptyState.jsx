import { Link } from 'react-router-dom';

const EmptyState = ({ title, description, createLink, createLabel }) => {
  return (
    <div className="text-center py-12 px-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      <svg
        className="mx-auto h-16 w-16 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      {createLink && createLabel && (
        <div className="mt-6">
          <Link to={createLink} className="btn btn-primary">
            {createLabel}
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmptyState;