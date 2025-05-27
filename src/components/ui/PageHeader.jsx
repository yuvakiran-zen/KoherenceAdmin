import { Link } from 'react-router-dom';

const PageHeader = ({ title, description, createButtonLabel, createButtonLink }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-5 border-b">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-gray-600">{description}</p>}
      </div>
      {createButtonLabel && createButtonLink && (
        <Link
          to={createButtonLink}
          className="mt-4 sm:mt-0 btn btn-primary inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          {createButtonLabel}
        </Link>
      )}
    </div>
  );
};

export default PageHeader;